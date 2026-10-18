import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Moon, Star, CheckCircle2, Circle } from "lucide-react";

interface CheckItem {
  id: string;
  label: string;
  completed: boolean;
}

export default function EndOfDay() {
  const todayStr = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const [checkItems, setCheckItems] = useState<CheckItem[]>(() => {
    const saved = localStorage.getItem("life_os_endofday_checkins");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return [
      { id: "study", label: "Did I study something new?", completed: false },
      { id: "earn", label: "Did I work on earning money?", completed: false },
      { id: "help", label: "Did I help someone today?", completed: false },
    ];
  });

  const [reflection, setReflection] = useState(() => {
    return localStorage.getItem("life_os_endofday_reflection") || "";
  });

  const [taskStats, setTaskStats] = useState({
    completed: 0,
    remaining: 0,
    percentage: 0,
  });

  useEffect(() => {
    const savedItems = localStorage.getItem("daily_schedule_items");
    if (savedItems) {
      try {
        const items = JSON.parse(savedItems);
        if (Array.isArray(items) && items.length > 0) {
          const total = items.length;
          const completed = items.filter(
            (item: any) => item.completed === true,
          ).length;
          const remaining = total - completed;
          const percentage = Math.round((completed / total) * 100);

          setTaskStats({ completed, remaining, percentage });
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "life_os_endofday_checkins",
      JSON.stringify(checkItems),
    );
  }, [checkItems]);

  useEffect(() => {
    localStorage.setItem("life_os_endofday_reflection", reflection);
  }, [reflection]);

  const toggleCheck = (id: string) => {
    setCheckItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item,
      ),
    );
  };

  const completedCount = checkItems.filter((i) => i.completed).length;

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10 px-2 sm:px-0">
      <Card className="bg-(--surface) border-(--border) p-8 relative overflow-hidden">
        <div className="space-y-2">
          <Moon className="w-8 h-8 text-amber-300 mb-2" />
          <h1 className="text-3xl font-bold text-(--foreground) tracking-tight">
            End of Day Review
          </h1>
          <p className="text-sm text-(--muted-foreground)">{todayStr}</p>
        </div>
      </Card>

      <Card className="bg-(--surface) border-(--border)">
        <CardContent className="p-6 space-y-4">
          <span className="text-xs uppercase tracking-wider font-semibold text-(--primary) block">
            DAILY CHECK-IN
          </span>

          <div className="space-y-3">
            {checkItems.map((item) => (
              <div
                key={item.id}
                onClick={() => toggleCheck(item.id)}
                className="flex items-center gap-3 p-3.5 rounded-xl border border-(--border) bg-(--background)/40 hover:bg-(--background) cursor-pointer transition-all"
              >
                {item.completed ? (
                  <CheckCircle2 className="w-5 h-5 text-(--primary) shrink-0" />
                ) : (
                  <Circle className="w-5 h-5 text-(--muted-foreground) shrink-0" />
                )}
                <span
                  className={`text-sm ${
                    item.completed
                      ? "line-through text-(--muted-foreground)"
                      : "text-(--foreground)"
                  }`}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center pt-2 text-xs text-(--muted-foreground)">
            <span>Check-in score</span>
            <span className="font-bold text-(--primary)">
              {completedCount}/{checkItems.length}
            </span>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-(--surface) border-(--border)">
        <CardContent className="p-6 space-y-3">
          <span className="text-xs uppercase tracking-wider font-semibold text-(--primary) block">
            TASK PROGRESS SUMMARY
          </span>

          <div className="flex items-baseline gap-4 pt-1">
            <span className="text-4xl font-extrabold text-(--primary)">
              {taskStats.percentage}%
            </span>
            <div>
              <p className="text-sm font-semibold text-(--foreground)">
                {taskStats.completed} tasks completed
              </p>
              <p className="text-xs text-(--muted-foreground)">
                {taskStats.remaining} remaining
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-(--surface) border-(--border)">
        <CardContent className="p-6 space-y-3">
          <span className="text-xs uppercase tracking-wider font-semibold text-(--primary) block">
            WHAT CAN I IMPROVE TOMORROW?
          </span>

          <textarea
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            placeholder="Reflect on today... What would you do differently tomorrow? What worked well?"
            className="w-full h-32 p-4 rounded-xl border border-(--border) bg-(--background)/50 text-(--foreground) text-sm focus:outline-none resize-none"
          />
        </CardContent>
      </Card>

      <Card className="bg-(--surface) border-(--border) text-center p-8">
        <CardContent className="space-y-3 flex flex-col items-center">
          <Star className="w-6 h-6 text-amber-300 fill-amber-300" />
          <blockquote className="text-lg font-bold text-(--foreground) max-w-xl">
            "Well done. Rest today and rise stronger tomorrow."
          </blockquote>
        </CardContent>
      </Card>
    </div>
  );
}
