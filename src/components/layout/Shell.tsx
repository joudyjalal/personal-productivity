import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

type ShellProps = {
  children: React.ReactNode;
};

export function Shell({ children }: ShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-(--background) text-(--foreground)">
      <Sidebar
        isOpen={isSidebarOpen}
        onNavigate={() => setIsSidebarOpen(false)}
      />

      <div className="flex flex-col min-h-screen transition-all duration-300 md:pl-[240px]">
        <Topbar onMenuClick={() => setIsSidebarOpen((prev) => !prev)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}