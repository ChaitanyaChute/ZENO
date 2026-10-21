"use server";

import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export async function generateWorkflow(workflowId: string, prompt: string) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  console.log("[generateWorkflow] workflowId:", workflowId);
  console.log("[generateWorkflow] cookies present:", !!accessToken);

  if (!accessToken && !refreshToken) {
    return { error: "Not authenticated. Please log in again.", status: 401 };
  }

  // Build cookie header
  const buildCookieHeader = (access?: string, refresh?: string) => {
    const parts: string[] = [];
    if (access) parts.push(`accessToken=${access}`);
    if (refresh) parts.push(`refreshToken=${refresh}`);
    return parts.join("; ");
  };

  try {
    let res = await fetch(
      `${API_URL}/api/workflows/${workflowId}/generate`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: buildCookieHeader(accessToken, refreshToken),
        },
        body: JSON.stringify({ prompt }),
      }
    );

    if (res.status === 401 && refreshToken) {
      // Attempt to refresh the token
      const refreshRes = await fetch(`${API_URL}/api/auth/refresh`, {
        method: "POST",
        headers: {
          Cookie: buildCookieHeader(undefined, refreshToken),
        },
      });

      if (refreshRes.ok) {
        const setCookies = refreshRes.headers.getSetCookie();
        let newAccessToken = accessToken;
        
        for (const cookieStr of setCookies) {
          if (cookieStr.startsWith("accessToken=")) {
            const tokenVal = cookieStr.split(";")[0]?.split("=")[1];
            if (tokenVal) {
              newAccessToken = tokenVal;
              // Update the Next.js cookie store
              cookieStore.set("accessToken", newAccessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: 15 * 60, // 15 mins
              });
            }
          }
        }

        // Retry original request with new token
        res = await fetch(`${API_URL}/api/workflows/${workflowId}/generate`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Cookie: buildCookieHeader(newAccessToken, refreshToken),
          },
          body: JSON.stringify({ prompt }),
        });
      }
    }

    const data = await res.json();
    console.log("[generateWorkflow] Express status:", res.status);

    return { ...data, status: res.status };
  } catch (error: any) {
    console.error("[generateWorkflow] Fetch error:", error?.message);
    return { error: error?.message || "Failed to reach backend", status: 502 };
  }
}
