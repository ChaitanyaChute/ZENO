import { headers } from "next/headers";
import { redirect } from "next/navigation";

export function getApiUrl(): string {
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, "");
  }
  if (process.env.NODE_ENV === "production" || process.env.VERCEL) {
    return "https://api.zeno.chait8nya.me";
  }
  return "http://localhost:3001";
}

export async function requireAuth() {
  const reqHeaders = await headers();
  const cookieStr = reqHeaders.get("cookie") || "";
  const apiUrl = getApiUrl();

  try {
    const res = await fetch(`${apiUrl}/api/auth/me`, {
      headers: { cookie: cookieStr },
      cache: "no-store",
    });

    if (!res.ok) {
      console.warn(`[requireAuth] Unauthenticated (status: ${res.status}), cookies present: ${Boolean(cookieStr)}`);
      redirect("/login");
    }
    
    const user = await res.json();
    return { user };
  } catch (error: any) {
    if (error?.digest?.startsWith?.("NEXT_REDIRECT")) {
      throw error;
    }
    console.error(`[requireAuth] Error fetching ${apiUrl}/api/auth/me:`, error?.message || error);
    redirect("/login");
  }
}

export async function requireUnauth() {
  const reqHeaders = await headers();
  const cookieStr = reqHeaders.get("cookie") || "";
  const apiUrl = getApiUrl();

  try {
    const res = await fetch(`${apiUrl}/api/auth/me`, {
      headers: { cookie: cookieStr },
      cache: "no-store",
    });

    if (res.ok) {
      redirect("/workflows");
    }
  } catch (error: any) {
    if (error?.digest?.startsWith?.("NEXT_REDIRECT")) {
      throw error;
    }
    // Expected to fail if unauthenticated, so do nothing.
  }
}
