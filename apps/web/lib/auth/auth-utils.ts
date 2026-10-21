import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function requireAuth() {
  const reqHeaders = await headers();
  const cookieStr = reqHeaders.get("cookie") || "";
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

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
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

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
