import { useState, useEffect } from "react";
import { Check, Plus, X, Trash2, RotateCcw } from "lucide-react";

interface ScheduleItem {
  id: string;
  time: string;
  icon: string;
  title: string;
  completed: boolean;
}

const initialSchedule: ScheduleItem[] = [
  {
    id: "1",
    time: "09:00–09:15",
    icon: "🙏",
    title: " Planning",
    completed: false,
  },
  {
    id: "2",
    time: "09:15–10:15",
    icon: "💻",
    title: "Project Development",
    completed: false,
  },
  {
    id: "3",
    time: "10:15–11:00",
    icon: "🇬🇧",
    title: "English Study",
    completed: false,
  },
  {
    id: "4",
    time: "11:00–11:15",
    icon: "☕",
    title: "Break",
    completed: false,
  },
  {
    id: "5",
    time: "11:15–12:15",
    icon: "📊",
    title: "Data Analysis",
    completed: false,
  },
  {
    id: "6",
    time: "12:15–01:00",
    icon: "💪",
    title: "Exercises & Practice",
    completed: false,
  },
  {
    id: "7",
    time: "01:00–02:00",
    icon: "🍽️",
    title: "Lunch & Rest",
    completed: false,
  },
  {
    id: "8",
    time: "04:45–05:00",
    icon: "📝",
    title: "Daily Review",
    completed: false,
  },
];

export function DailySchedule() {
  const [items, setItems] = useState<ScheduleItem[]>(() => {
    const saved = localStorage.getItem("daily_schedule_items");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return initialSchedule;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTime, setNewTime] = useState("");
  const [newIcon, setNewIcon] = useState("📌");
  const [newTitle, setNewTitle] = useState("");

  useEffect(() => {
    localStorage.setItem("daily_schedule_items", JSON.stringify(items));
  }, [items]);

  const completedCount = items.filter((item) => item.completed).length;
  const progressPercentage =
    items.length > 0 ? Math.round((completedCount / items.length) * 100) : 0;

  const toggleComplete = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item,
      ),
    );
  };

  const handleDeleteTask = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // منع تفعيل الضغط على المهمة عند النقر على زر الحذف
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleResetSchedule = () => {
    localStorage.removeItem("daily_schedule_items");
    setItems(initialSchedule);
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newTime.trim()) return;

    const newItem: ScheduleItem = {
      id: Date.now().toString(),
      time: newTime,
      icon: newIcon || "📌",
      title: newTitle,
      completed: false,
    };

    setItems((prev) => [...prev, newItem]);
    setNewTitle("");
    setNewTime("");
    setNewIcon("📌");
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-10">
      <div className="card p-5 sm:p-6 rounded-(--radius-lg) border border-(--border) bg-(--surface) shadow-(--shadow-sm)">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-(--primary)">
            Daily Progress
          </span>
          <span className="text-2xl font-extrabold text-(--primary)">
            {progressPercentage}%
          </span>
        </div>
        <div className="w-full h-2.5 bg-(--surface-muted) rounded-full overflow-hidden">
          <div
            className="h-full bg-(--primary) transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      <div className="card p-5 sm:p-6 rounded-(--radius-lg) border border-(--border) bg-(--surface) shadow-(--shadow-sm)">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-(--primary)">
            Daily Timetable
          </h3>
          <div className="flex items-center gap-2">
            <button
              onClick={handleResetSchedule}
              className="btn text-xs py-1.5 px-3 flex items-center gap-1.5 text-(--muted-foreground) hover:text-(--foreground)"
              title="Reset to default tasks"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="btn btn-primary text-xs py-1.5 px-3 flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add Task</span>
            </button>
          </div>
        </div>

        <div className="space-y-2">
          {items.map((item) => (
            <div
              key={item.id}
              onClick={() => toggleComplete(item.id)}
              className={`group flex items-center justify-between p-3.5 rounded-(--radius) transition-all cursor-pointer border ${
                item.completed
                  ? "bg-(--secondary) border-(--primary) text-(--foreground)"
                  : "border-transparent hover:bg-(--surface-muted) text-(--foreground)"
              }`}
            >
              <div className="flex items-center gap-4 min-w-0">
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                    item.completed
                      ? "bg-(--primary) border-(--primary) text-(--primary-foreground)"
                      : "border-(--muted-foreground) group-hover:border-(--primary)"
                  }`}
                >
                  {item.completed && (
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  )}
                </div>

                <span className="text-xs font-mono text-(--muted-foreground) w-24 shrink-0">
                  {item.time}
                </span>

                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="text-base shrink-0">{item.icon}</span>
                  <span
                    className={`text-sm font-medium transition-all truncate ${
                      item.completed
                        ? "line-through text-(--muted-foreground)"
                        : "text-(--foreground)"
                    }`}
                  >
                    {item.title}
                  </span>
                </div>
              </div>

              {/* زر حذف المهمة */}
              <button
                onClick={(e) => handleDeleteTask(item.id, e)}
                className="p-1.5 rounded-(--radius) text-(--muted-foreground) hover:text-red-500 hover:bg-(--surface) transition-colors opacity-60 group-hover:opacity-100"
                title="Delete task"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="card w-full max-w-md p-6 bg-(--surface) border border-(--border) shadow-xl rounded-(--radius-lg)">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-(--foreground)">
                Add New Task
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-(--radius) text-(--muted-foreground) hover:text-(--foreground)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddTask} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-(--muted-foreground) mb-1">
                  Time Range (e.g. 05:00–05:30)
                </label>
                <input
                  type="text"
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  placeholder="05:00–05:30"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-(--muted-foreground) mb-1">
                  Emoji Icon (Press Win + . to choose)
                </label>
                <input
                  type="text"
                  value={newIcon}
                  onChange={(e) => setNewIcon(e.target.value)}
                  placeholder="📌"
                  maxLength={4}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-(--muted-foreground) mb-1">
                  Task Title
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Task description..."
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default DailySchedule;
