import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FolderGit2,
  Calendar,
  Target,
  BarChart3,
  FileText,
  CheckSquare,
} from "lucide-react";
const navItems = [
  { name: "Dashboard", path: "/", icon: LayoutDashboard },
  { name: "Projects", path: "/projects", icon: FolderGit2 },
  { name: "Daily Schedule", path: "/schedule", icon: Calendar },
  { name: "Goals", path: "/goals", icon: Target },
  { name: "Statistics", path: "/stats", icon: BarChart3 },
  { name: "Notes", path: "/notes", icon: FileText },
  { name: "End of Day", path: "/eod", icon: CheckSquare },
];
export function Sidebar() {
  return (
    <aside className="w-[240px] shrink-0 bg-[var(--surface)] border-r border-[var(--border)] flex flex-col h-screen sticky top-0 z-40 overflow-y-auto p-4 text-[var(--foreground)]">
      <div className="mb-8 px-2">
        <h1 className="text-lg font-extrabold tracking-tight text-[var(--foreground)]">
          Daily
        </h1>
        <div className="text-[var(--primary)] font-bold text-sm tracking-wide uppercase">
          Routine
        </div>
      </div>
      <nav className="space-y-1.5 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-[var(--radius)] text-xs font-medium transition-colors ${
                  isActive
                    ? "bg-[var(--secondary)] text-[var(--secondary-foreground)] font-semibold border-l-2 border-[var(--primary)]"
                    : "text-[var(--muted-foreground)] hover:bg-[var(--surface-muted)] hover:text-[var(--foreground)]"
                }`
              }
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
