import { AuthLayout } from "@/components/auth/auth-layout";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const Layout = async ({ children }: { children: React.ReactNode; }) => {
  const reqHeaders = await headers();
  const cookieStr = reqHeaders.get('cookie') || '';

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/api/auth/me`, {
      headers: { cookie: cookieStr },
      cache: 'no-store'
    });

    if (res.ok) {
      redirect("/workflows");
    }
  } catch (error) {
    // If error, means backend is down or token invalid. Either way, stay on login page.
  }

  return (
    <AuthLayout>
      {children}
    </AuthLayout>
  );
};

export default Layout;
