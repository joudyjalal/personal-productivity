import { useLocation } from "react-router-dom";
import { useTheme } from "@/context/ThemeContext";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

const routeTitles: Record<string, string> = {
  "/": "Dashboard",
  "/projects": "Projects",
  "/schedule": "Daily Schedule",
  "/goals": "Goals",
  "/statistics": "Statistics",
  "/notes": "Notes",
  "/end-of-day": "End of Day",
};

interface TopbarProps {
  title?: string;
}

export function Topbar({ title }: TopbarProps) {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const currentTitle = title || routeTitles[location.pathname] || "Dashboard";

  return (
    <header className="h-16 shrink-0 border-b border-(--border) bg-(--surface) px-6 flex items-center justify-between sticky top-0 z-30">
      <div>
        <h2 className="text-lg font-bold text-(--foreground) leading-none">
          {currentTitle}
        </h2>
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleTheme}
          title="Toggle Theme"
        >
          {theme === "dark" ? (
            <Sun className="w-5 h-5 text-(--warning)" />
          ) : (
            <Moon className="w-5 h-5 text-(--info)" />
          )}
        </Button>
      </div>
    </header>
  );
}