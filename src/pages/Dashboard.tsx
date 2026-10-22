import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import {
  Calendar,
  Target,
  FileText,
  Moon,
  CheckCircle2,
  ArrowRight,
  Sun,
  Clock,
} from "lucide-react";
import { translations } from "@/lib/utlis/translation";

export function Dashboard() {
  const currentLang = (localStorage.getItem("life_os_language") as "en" | "ar") || "en";
  const t = translations[currentLang];

  const [greeting, setGreeting] = useState("");
  const [todayStr, setTodayStr] = useState("");

  const [scheduleStats, setScheduleStats] = useState({
    total: 0,
    completed: 0,
    percentage: 0,
    recentTasks: [] as any[],
  });

  const [goalsStats, setGoalsStats] = useState({
    total: 0,
    completed: 0,
  });

  const [notesCount, setNotesCount] = useState(0);
  const [sleepHours, setSleepHours] = useState<string | null>(null);
  const [checkinScore, setCheckinScore] = useState<string | null>(null);

  useEffect(() => {
    const now = new Date();
    const hour = now.getHours();
    if (hour < 12) setGreeting(t.goodMorning);
    else if (hour < 18) setGreeting(t.goodAfternoon);
    else setGreeting(t.goodEvening);

    setTodayStr(
      now.toLocaleDateString(currentLang === "ar" ? "ar-SA" : "en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    );

    const savedSchedule = localStorage.getItem("daily_schedule_items");
    if (savedSchedule) {
      try {
        const items = JSON.parse(savedSchedule);
        if (Array.isArray(items)) {
          const total = items.length;
          const completed = items.filter((i: any) => i.completed).length;
          const percentage =
            total > 0 ? Math.round((completed / total) * 100) : 0;
          setScheduleStats({
            total,
            completed,
            percentage,
            recentTasks: items.slice(0, 3),
          });
        }
      } catch (e) {
        console.error(e);
      }
    }

    const savedGoals = localStorage.getItem("weekly_goals_items");
    if (savedGoals) {
      try {
        const goals = JSON.parse(savedGoals);
        if (Array.isArray(goals)) {
          const completed = goals.filter((g: any) => g.completed).length;
          setGoalsStats({ total: goals.length, completed });
        }
      } catch (e) {
        console.error(e);
      }
    }

    const savedNotes = localStorage.getItem("app_notes_categories");
    if (savedNotes) {
      try {
        const categories = JSON.parse(savedNotes);
        if (Array.isArray(categories)) {
          let totalNotes = 0;
          categories.forEach((cat: any) => {
            if (cat.notes && Array.isArray(cat.notes)) {
              totalNotes += cat.notes.length;
            } else if (cat.content) {
              totalNotes += 1;
            }
          });
          setNotesCount(totalNotes || categories.length);
        }
      } catch (e) {
        console.error(e);
      }
    }

    const savedSleep = localStorage.getItem("life_os_sleep_records");
    if (savedSleep) {
      try {
        const sleepRecords = JSON.parse(savedSleep);
        if (Array.isArray(sleepRecords) && sleepRecords.length > 0) {
          const latest = sleepRecords[sleepRecords.length - 1];
          if (latest && (latest.hours || latest.duration)) {
            setSleepHours(latest.hours || latest.duration);
          }
        }
      } catch (e) {
        console.error(e);
      }
    }

    const savedCheckins = localStorage.getItem("life_os_endofday_checkins");
    if (savedCheckins) {
      try {
        const checkins = JSON.parse(savedCheckins);
        if (Array.isArray(checkins)) {
          const completed = checkins.filter((c: any) => c.completed).length;
          setCheckinScore(`${completed}/${checkins.length}`);
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, [currentLang]);

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10 px-2 sm:px-0">
      <Card className="bg-(--surface) border-(--border) p-6 sm:p-8 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sun className="w-6 h-6 text-amber-300" />
              <h1 className="text-2xl sm:text-3xl font-bold text-(--foreground) tracking-tight">
                {greeting}!
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-(--muted-foreground)">
              {todayStr}
            </p>
          </div>

          <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-(--border)">
            <div className="text-right">
              <span className="text-2xl font-extrabold text-(--primary)">
                {scheduleStats.percentage}%
              </span>
              <p className="text-[11px] text-(--muted-foreground)">
                {t.todaysProgress}
              </p>
            </div>
            <Link
              to="/schedule"
              className="btn btn-primary text-xs py-2.5 px-4 flex items-center gap-2 rounded-xl"
            >
              <span>{t.viewSchedule}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Link>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-(--surface) border-(--border) p-5 hover:border-(--primary) transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-(--muted-foreground) uppercase">
              {t.schedule}
            </span>
            <Calendar className="w-5 h-5 text-(--primary)" />
          </div>
          <div className="space-y-1">
            <p className="text-xl font-bold text-(--foreground)">
              {scheduleStats.completed}/{scheduleStats.total}
            </p>
            <p className="text-xs text-(--muted-foreground)">
              {t.tasksCompletedToday}
            </p>
          </div>
        </Card>

        <Card className="bg-(--surface) border-(--border) p-5 hover:border-(--primary) transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-(--muted-foreground) uppercase">
              {t.goals}
            </span>
            <Target className="w-5 h-5 text-(--primary)" />
          </div>
          <div className="space-y-1">
            <p className="text-xl font-bold text-(--foreground)">
              {goalsStats.completed}/{goalsStats.total}
            </p>
            <p className="text-xs text-(--muted-foreground)">
              {t.activeGoalsAchieved}
            </p>
          </div>
        </Card>

        <Card className="bg-(--surface) border-(--border) p-5 hover:border-(--primary) transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-(--muted-foreground) uppercase">
              {t.notes}
            </span>
            <FileText className="w-5 h-5 text-(--primary)" />
          </div>
          <div className="space-y-1">
            <p className="text-xl font-bold text-(--foreground)">
              {notesCount}
            </p>
            <p className="text-xs text-(--muted-foreground)">
              {t.categoriesAndNotes}
            </p>
          </div>
        </Card>

        <Card className="bg-(--surface) border-(--border) p-5 hover:border-(--primary) transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-(--muted-foreground) uppercase">
              {t.sleepAndReview}
            </span>
            <Moon className="w-5 h-5 text-(--primary)" />
          </div>
          <div className="space-y-1">
            <p className="text-xl font-bold text-(--foreground)">
              {sleepHours ? `${sleepHours} hrs` : t.notSet}
            </p>
            <p className="text-xs text-(--muted-foreground)">
              {t.checkIn}: {checkinScore || t.pending}
            </p>
          </div>
        </Card>
      </div>

      <Card className="bg-(--surface) border-(--border)">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-(--primary)" />
              <span className="text-xs font-bold uppercase tracking-wider text-(--primary)">
                {t.schedulePreview}
              </span>
            </div>
            <Link
              to="/schedule"
              className="text-xs font-semibold text-(--primary) hover:underline flex items-center gap-1"
            >
              <span>{t.viewAll}</span>
              <ArrowRight className="w-3 h-3 rtl:rotate-180" />
            </Link>
          </div>

          <div className="space-y-2.5">
            {scheduleStats.recentTasks.length === 0 ? (
              <p className="text-xs text-(--muted-foreground) py-4 text-center">
                {t.noTasksFound}
              </p>
            ) : (
              scheduleStats.recentTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-3 rounded-xl border border-(--border) bg-(--background)/40"
                >
                  <div className="flex items-center gap-3">
                    {task.completed ? (
                      <CheckCircle2 className="w-4 h-4 text-(--primary)" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-(--muted-foreground)" />
                    )}
                    <span className="text-xs font-mono text-(--muted-foreground)">
                      {task.time}
                    </span>
                    {task.icon && <span className="text-xs">{task.icon}</span>}
                    <span
                      className={`text-xs font-medium ${
                        task.completed
                          ? "line-through text-(--muted-foreground)"
                          : "text-(--foreground)"
                      }`}
                    >
                      {task.title || task.label}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Dashboard;
