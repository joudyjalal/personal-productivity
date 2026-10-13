import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTheme } from "@/context/ThemeContext";
import { Sun, Moon, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

const routeTitles: Record<string, string> = {
  "/": "Dashboard",
  "/projects": "Projects",
  "/schedule": "Daily Schedule",
  "/goals": "Goals",
  "/stats": "Statistics",
  "/notes": "Notes",
  "/eod": "End of Day",
};

interface TopbarProps {
  title?: string;
  onMenuClick?: () => void;
}

export function Topbar({ title, onMenuClick }: TopbarProps) {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const currentTitle =
    title || routeTitles[location.pathname] || "Dashboard";

  return (
    <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center justify-between gap-3 border-b border-(--border) bg-(--surface) px-3 sm:h-16 sm:px-4 md:px-6">
      <div className="flex min-w-0 flex-1 items-center gap-2.5 sm:gap-3">
       
        {isMobile && (
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={onMenuClick}
            aria-label="Open navigation menu"
            title="Open menu"
            className="h-9 w-9 shrink-0"
          >
            <Menu className="h-5 w-5" />
          </Button>
        )}

        <h2 className="min-w-0 truncate text-base font-bold leading-tight text-(--foreground) sm:text-lg">
          {currentTitle}
        </h2>
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={toggleTheme}
          title="Toggle Theme"
          aria-label="Toggle Theme"
          className="h-9 w-9 sm:h-10 sm:w-10"
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5 text-(--warning)" />
          ) : (
            <Moon className="h-5 w-5 text-(--info)" />
          )}
        </Button>
      </div>
    </header>
  );
}