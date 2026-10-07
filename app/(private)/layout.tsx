import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/features/layout/sidebar/app-sidebar";
import { RequireAuth } from "@/features/auth/components/require-auth";

export const instant = false

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  return (
    <RequireAuth>
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
    </RequireAuth>
  );
}