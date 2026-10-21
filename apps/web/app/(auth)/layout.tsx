import { AuthLayout } from "@/components/auth/auth-layout";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getApiUrl } from "@/lib/auth/auth-utils";

const Layout = async ({ children }: { children: React.ReactNode; }) => {
  const reqHeaders = await headers();
  const cookieStr = reqHeaders.get('cookie') || '';
  const apiUrl = getApiUrl();

  try {
    const res = await fetch(`${apiUrl}/api/auth/me`, {
      headers: { cookie: cookieStr },
      cache: 'no-store'
    });

    if (res.ok) {
      redirect("/workflows");
    }
  } catch (error: any) {
    if (error?.digest?.startsWith?.("NEXT_REDIRECT")) {
      throw error;
    }
    // If error, means backend is down or token invalid. Either way, stay on login page.
  }

  return (
    <AuthLayout>
      {children}
    </AuthLayout>
  );
};

export default Layout;
