import { useState, useEffect } from "react";
import { Check, Plus, X, Trash2 } from "lucide-react";
import { translations } from "@/lib/utlis/translation";

type GoalItem = {
  id: string;
  title: string;
  completed: boolean;
};

const initialGoals: GoalItem[] = [
  { id: "1", title: "Finish Website Project", completed: true },
  { id: "2", title: "Learn 100 English Words", completed: true },
  { id: "3", title: "Complete SQL Module", completed: false },
];

export function Goals() {
  const currentLang =
    (localStorage.getItem("life_os_language") as "en" | "ar") || "en";
  const t = translations[currentLang];

  const [goals, setGoals] = useState<GoalItem[]>(() => {
    const saved = localStorage.getItem("weekly_goals_items");
    if (saved !== null) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return initialGoals;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  const currentDate = new Date().toLocaleDateString(
    currentLang === "ar" ? "ar-SA" : "en-US",
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );

  useEffect(() => {
    localStorage.setItem("weekly_goals_items", JSON.stringify(goals));
  }, [goals]);

  const completedCount = goals.filter((g) => g.completed).length;
  const progressPercentage =
    goals.length > 0 ? Math.round((completedCount / goals.length) * 100) : 0;

  const toggleComplete = (id: string) => {
    setGoals((prev) =>
      prev.map((g) => (g.id === id ? { ...g, completed: !g.completed } : g)),
    );
  };

  const handleDeleteGoal = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setGoals((prev) => prev.filter((g) => g.id !== id));
  };

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newGoal: GoalItem = {
      id: Date.now().toString(),
      title: newTitle,
      completed: false,
    };

    setGoals((prev) => [...prev, newGoal]);
    setNewTitle("");
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-4 sm:space-y-6 max-w-4xl mx-auto pb-10 px-2 sm:px-0">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-(--foreground)">
            {t.goalsTitle}
          </h2>
          <p className="text-xs text-(--muted-foreground)">{currentDate}</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn btn-primary text-xs py-2 px-3.5 flex items-center justify-center gap-1.5 w-full sm:w-auto"
        >
          <Plus className="w-4 h-4" />
          <span>{t.addGoal}</span>
        </button>
      </div>

      <div className="card p-4 sm:p-6 rounded-(--radius-lg) border border-(--border) bg-(--surface) shadow-(--shadow-sm)">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-(--primary)">
            {t.weeklyGoals}
          </span>
          <div className="text-right">
            <span className="text-xl sm:text-2xl font-extrabold text-(--primary)">
              {progressPercentage}%
            </span>
            <span className="block text-[10px] sm:text-xs text-(--muted-foreground)">
              {completedCount}/{goals.length} {t.done}
            </span>
          </div>
        </div>

        <div className="space-y-2.5 sm:space-y-3">
          {goals.length === 0 ? (
            <p className="text-center text-xs text-(--muted-foreground) py-6">
              {t.noGoalsFound}
            </p>
          ) : (
            goals.map((goal) => (
              <div
                key={goal.id}
                onClick={() => toggleComplete(goal.id)}
                className={`group flex items-center justify-between p-3.5 sm:p-4 rounded-(--radius-lg) transition-all cursor-pointer border gap-3 ${
                  goal.completed
                    ? "bg-(--secondary) border-(--primary) text-(--foreground)"
                    : "border-(--border) hover:bg-(--surface-muted) text-(--foreground)"
                }`}
              >
                <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                  <div
                    className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                      goal.completed
                        ? "bg-(--primary) border-(--primary) text-(--primary-foreground)"
                        : "border-(--muted-foreground) group-hover:border-(--primary)"
                    }`}
                  >
                    {goal.completed && (
                      <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[3]" />
                    )}
                  </div>

                  <span
                    className={`text-xs sm:text-sm font-medium transition-all truncate ${
                      goal.completed
                        ? "line-through text-(--muted-foreground)"
                        : "text-(--foreground)"
                    }`}
                  >
                    {goal.title}
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={(e) => handleDeleteGoal(goal.id, e)}
                    className="p-1.5 rounded-(--radius) text-(--muted-foreground) hover:text-red-500 hover:bg-(--surface) transition-colors opacity-80 sm:opacity-60 group-hover:opacity-100"
                    title={t.deleteGoal}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="w-full h-2 bg-(--surface-muted) rounded-full overflow-hidden mt-6">
          <div
            className="h-full bg-(--primary) transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-3 sm:p-4">
          <div className="card w-full max-w-md p-4 sm:p-6 bg-(--surface) border border-(--border) shadow-xl rounded-(--radius-lg)">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm sm:text-base font-bold text-(--foreground)">
                {t.addWeeklyGoal}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-(--radius) text-(--muted-foreground) hover:text-(--foreground)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddGoal} className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-xs font-semibold text-(--muted-foreground) mb-1">
                  {t.goalTitle}
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder={t.goalPlaceholder}
                  className="w-full text-sm"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn text-xs sm:text-sm py-2 px-3"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  className="btn btn-primary text-xs sm:text-sm py-2 px-3"
                >
                  {t.saveGoal}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Goals;
