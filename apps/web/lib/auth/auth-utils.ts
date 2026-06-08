import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function requireAuth() {
  const reqHeaders = await headers();
  const cookieStr = reqHeaders.get("cookie") || "";

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/api/auth/me`, {
      headers: { cookie: cookieStr },
      cache: "no-store",
    });

    if (!res.ok) {
      redirect("/login");
    }
    
    const user = await res.json();
    return { user };
  } catch (error) {
    redirect("/login");
  }
}

export async function requireUnauth() {
  const reqHeaders = await headers();
  const cookieStr = reqHeaders.get("cookie") || "";

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/api/auth/me`, {
      headers: { cookie: cookieStr },
      cache: "no-store",
    });

    if (res.ok) {
      redirect("/workflows");
    }
  } catch (error) {
    // Expected to fail if unauthenticated, so do nothing.
  }
}
