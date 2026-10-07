import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/features/layout/sidebar/app-sidebar";

const RootPrivateLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-svh">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger />
          </header>
          <main className="">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default RootPrivateLayout;