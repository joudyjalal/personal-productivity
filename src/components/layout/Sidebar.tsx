import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  Target,
  FileText,
  CheckSquare,
  Moon,
} from "lucide-react";

const navItems = [
  { name: "Dashboard", path: "/", icon: LayoutDashboard },
  { name: "Daily Schedule", path: "/schedule", icon: Calendar },
  { name: "Goals", path: "/goals", icon: Target },
  { name: "Notes", path: "/notes", icon: FileText },
  { name: "Sleep", path: "/sleep", icon: Moon },
  { name: "End of Day", path: "/eod", icon: CheckSquare },
];

type SidebarProps = {
  isOpen: boolean;
  onNavigate: () => void;
};

export function Sidebar({ isOpen, onNavigate }: SidebarProps) {
  return (
    <>
      {isOpen && (
        <div
          onClick={onNavigate}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 bottom-0 z-50
          flex h-screen w-[260px] max-w-[85vw] shrink-0 flex-col
          border-r border-(--border) bg-(--surface) p-4 text-(--foreground)
          shadow-xl transition-transform duration-300 ease-in-out
          md:w-[240px] md:max-w-none md:translate-x-0 md:shadow-none
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div className="mb-6 px-2 pt-1 md:mb-8 shrink-0">
          <h1 className="text-lg font-extrabold tracking-tight text-(--foreground)">
            Daily
          </h1>
          <div className="text-sm font-bold uppercase tracking-wide text-(--primary)">
            Routine
          </div>
        </div>

        <nav className="flex-1 space-y-1.5 overflow-y-auto pr-1">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => {
                  if (window.innerWidth < 768) {
                    onNavigate();
                  }
                }}
                className={({ isActive }) =>
                  `flex min-h-11 items-center gap-3 rounded-(--radius) border-l-2 px-3.5 py-2.5 text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? "border-(--primary) bg-(--secondary) font-semibold text-(--secondary-foreground)"
                      : "border-transparent text-(--muted-foreground) hover:bg-(--surface-muted) hover:text-(--foreground)"
                  }`
                }
              >
                <Icon className="h-[18px] w-[18px] shrink-0" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
