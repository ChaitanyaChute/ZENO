import { AppSidebar } from "components/app-sidebar";
import { SidebarInset, SidebarProvider } from "components/ui/sidebar"
import { requireAuth } from "@/lib/auth/auth-utils";

const Layout = async ({ children }: { children: React.ReactNode; }) => {
  const { user } = await requireAuth();

  return (
    <SidebarProvider>
      <AppSidebar user={user} />
      <SidebarInset className="bg-accent/20">
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Layout;
