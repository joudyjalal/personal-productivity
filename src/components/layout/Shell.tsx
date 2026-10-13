import { useState, type ReactNode } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";

type ShellProps = {
  children?: ReactNode;
  title?: string;
};

export function Shell({ children, title }: ShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const closeSidebar = () => setSidebarOpen(false);
  const openSidebar = () => setSidebarOpen(true);

  return (
    <div className="relative flex min-h-screen w-full overflow-x-hidden bg-(--background) font-sans text-(--foreground) antialiased">
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={closeSidebar}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] md:hidden"
        />
      )}

      <Sidebar isOpen={sidebarOpen} onNavigate={closeSidebar} />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar title={title} onMenuClick={openSidebar} />

        <main className="mx-auto w-full max-w-6xl min-w-0 flex-1 overflow-x-hidden p-3 sm:p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
