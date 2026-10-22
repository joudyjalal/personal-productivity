import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

type ShellProps = {
  children: React.ReactNode;
};

export function Shell({ children }: ShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

 
  const currentLang = localStorage.getItem("life_os_language") || "en";
  const isRtl = currentLang === "ar";

  return (
    <div className="min-h-screen bg-(--background) text-(--foreground)">
      <Sidebar
        isOpen={isSidebarOpen}
        onNavigate={() => setIsSidebarOpen(false)}
      />
      <div 
        className={`flex flex-col min-h-screen transition-all duration-300 ${
          isRtl ? "md:pr-[240px]" : "md:pl-[240px]"
        }`}
      >
        <Topbar onMenuClick={() => setIsSidebarOpen((prev) => !prev)} />

        <main className="flex-1 p-4 md:p-6 transition-all duration-200">
          {children}
        </main>
      </div>
    </div>
  );
}