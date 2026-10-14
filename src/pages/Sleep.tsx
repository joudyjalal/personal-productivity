import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Lightbulb } from "lucide-react";

type SleepRecord ={
  date: string;
  hours: number;
  quality: "Poor" | "Good" | "Great";
  bedtime: string;
  waketime: string;
}

export default function Sleep() {
  const [records, setRecords] = useState<SleepRecord[]>(() => {
    const saved = localStorage.getItem("life_os_sleep_records");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    
    return [
      { date: "2026-10-09", hours: 7.0, quality: "Good", bedtime: "23:00", waketime: "06:00" },
      { date: "2026-10-10", hours: 6.5, quality: "Good", bedtime: "23:30", waketime: "06:00" },
      { date: "2026-10-11", hours: 5.5, quality: "Poor", bedtime: "01:00", waketime: "06:30" },
      { date: "2026-10-12", hours: 8.0, quality: "Great", bedtime: "22:30", waketime: "06:30" },
      { date: "2026-10-13", hours: 7.5, quality: "Good", bedtime: "23:00", waketime: "06:30" },
      { date: "2026-10-14", hours: 7.5, quality: "Good", bedtime: "23:00", waketime: "06:30" },
    ];
  });

  const [bedtime, setBedtime] = useState("");
  const [waketime, setWaketime] = useState("");
  const [quality, setQuality] = useState<"Poor" | "Good" | "Great" | "">("");
  const [hoursInput, setHoursInput] = useState("0");
  const [qualityError, setQualityError] = useState(false);

  const calculateSleepDuration = (start: string, end: string) => {
    if (!start || !end) return;

    const [startH, startM] = start.split(":").map(Number);
    const [endH, endM] = end.split(":").map(Number);

    let startMinutes = startH * 60 + startM;
    let endMinutes = endH * 60 + endM;

    if (endMinutes <= startMinutes) {
      endMinutes += 24 * 60;
    }

    const diffMinutes = endMinutes - startMinutes;
    const rawHours = diffMinutes / 60;
    const roundedHours = Math.round(rawHours * 2) / 2;

    setHoursInput(roundedHours.toString());
  };

  const handleBedtimeChange = (value: string) => {
    setBedtime(value);
    calculateSleepDuration(value, waketime);
  };

  const handleWaketimeChange = (value: string) => {
    setWaketime(value);
    calculateSleepDuration(bedtime, value);
  };

  useEffect(() => {
    localStorage.setItem("life_os_sleep_records", JSON.stringify(records));
  }, [records]);

  const lastNight = records[records.length - 1] || { hours: 7.5, quality: "Good" };
  
  const last7Days = records.slice(-7);
  const avg7Days = last7Days.length > 0 
    ? (last7Days.reduce((acc, curr) => acc + curr.hours, 0) / last7Days.length).toFixed(1) 
    : "0";

  const avg30Days = records.length > 0 
    ? (records.reduce((acc, curr) => acc + curr.hours, 0) / records.length).toFixed(1) 
    : "0";


  const currentStreak = records.filter(r => r.hours >= 7).length;

  const handleSaveEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quality) {
      setQualityError(true);
      return;
    }
    setQualityError(false);

    const todayStr = new Date().toISOString().split("T")[0];
    
    
    const newRecord: SleepRecord = {
      date: todayStr,
      hours: parseFloat(hoursInput) || 0,
      quality,
      bedtime,
      waketime,
    };

    setRecords((prev) => {
      const filtered = prev.filter(r => r.date !== todayStr);
      return [...filtered, newRecord];
    });

    setHoursInput("0");
    setBedtime("");
    setWaketime("");
    setQuality("");
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10 px-2 sm:px-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-xl font-bold text-(--foreground)">Sleep</h2>
          <p className="text-xs text-(--muted-foreground)">
            Good afternoon, Developer
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-(--surface) border-(--border)">
          <CardContent className="p-5 space-y-2">
            <span className="text-xs text-(--muted-foreground) uppercase tracking-wider font-semibold">LAST NIGHT</span>
            <div className="text-2xl font-bold text-(--foreground)">
              {Math.floor(lastNight.hours)}h {Math.round((lastNight.hours % 1) * 60)}m
            </div>
            <p className="text-xs text-(--muted-foreground)">
              Quality: <span className="text-(--primary) font-medium">{lastNight.quality}</span> - Goal: 8h
            </p>
          </CardContent>
        </Card>

        <Card className="bg-(--surface) border-(--border)">
          <CardContent className="p-5 space-y-2">
            <span className="text-xs text-(--muted-foreground) uppercase tracking-wider font-semibold">7-day average</span>
            <div className="text-2xl font-bold text-(--foreground)">{avg7Days}h</div>
            <p className="text-xs text-(--primary) font-medium flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> On target
            </p>
          </CardContent>
        </Card>

        <Card className="bg-(--surface) border-(--border)">
          <CardContent className="p-5 space-y-2">
            <span className="text-xs text-(--muted-foreground) uppercase tracking-wider font-semibold">30-day average</span>
            <div className="text-2xl font-bold text-(--foreground)">{avg30Days}h</div>
            <p className="text-xs text-(--muted-foreground)">Consistent routine</p>
          </CardContent>
        </Card>

        <Card className="bg-(--surface) border-(--border)">
          <CardContent className="p-5 space-y-2">
            <span className="text-xs text-(--muted-foreground) uppercase tracking-wider font-semibold">Best streak (7h+)</span>
            <div className="text-2xl font-bold text-(--foreground)">{currentStreak}d</div>
            <p className="text-xs text-(--muted-foreground)">Keep it going!</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 bg-(--surface) border-(--border)">
          <CardContent className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-(--foreground)">Recent Nights Overview</h3>
              <span className="text-xs text-(--muted-foreground)">Last {records.length} entries</span>
            </div>

            <div className="h-48 flex items-end gap-3 pt-8 px-2 border-b border-(--border)">
              {records.slice(-14).map((rec, idx) => {
                const heightPercent = Math.min(Math.max((rec.hours / 10) * 100, 20), 100);
                const barColor = rec.hours >= 7.5 ? "bg-(--primary)" : rec.hours >= 6 ? "bg-amber-300" : "bg-rose-500";

                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group relative cursor-pointer">
                   
                    <div className="absolute -top-10 bg-(--background) border border-(--border) px-2.5 py-1 rounded-md text-[11px] font-semibold text-(--foreground) opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md z-20 pointer-events-none">
                      {rec.hours}h ({rec.quality}) - {rec.date}
                    </div>
                    <div 
                      style={{ height: `${heightPercent}%` }} 
                      className={`w-full rounded-t-md transition-all duration-300 ${barColor}`}
                    ></div>
                    <span className="text-[10px] text-(--muted-foreground) truncate">{rec.date.slice(5)}</span>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center gap-4 text-xs text-(--muted-foreground)">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-(--primary) inline-block"></span> 7h+ (Optimal)
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-amber-300 inline-block"></span> 6-7h (Fair)
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-rose-500 inline-block"></span> Under 6h (Low)
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-(--surface) border-(--border)">
          <CardContent className="p-6">
            <form onSubmit={handleSaveEntry} className="space-y-5">
              <h3 className="text-sm font-bold text-(--foreground)">Quick Log</h3>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-(--muted-foreground)">Bedtime</label>
                  <input
                    type="time"
                    value={bedtime}
                    onChange={(e) => handleBedtimeChange(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-(--border) bg-(--background) text-(--foreground) text-xs focus:outline-none"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-(--muted-foreground)">Wake time</label>
                  <input
                    type="time"
                    value={waketime}
                    onChange={(e) => handleWaketimeChange(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-(--border) bg-(--background) text-(--foreground) text-xs focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-(--muted-foreground)">Hours Slept (Auto)</label>
                <input
                  type="number"
                  step="0.5"
                  min="0.5"
                  max="24"
                  value={hoursInput}
                  onChange={(e) => setHoursInput(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-(--border) bg-(--background) text-(--foreground) text-sm focus:outline-none focus:ring-1 focus:ring-(--ring)"
                  required
                />
              </div>

              <div className="space-y-2 pt-1">
                <label className="text-xs font-medium text-(--foreground) block">Quality</label>
                <div className="grid grid-cols-3 gap-2">
                  {(["Poor", "Good", "Great"] as const).map((q) => (
                    <Button
                      key={q}
                      type="button"
                      variant={quality === q ? "default" : "outline"}
                      onClick={() => {
                        setQuality(q);
                        setQualityError(false);
                      }}
                      className="text-xs h-10 rounded-xl font-medium"
                    >
                      {q}
                    </Button>
                  ))}
                </div>
                {qualityError && (
                  <p className="text-xs text-rose-500 font-medium pt-1">Please select sleep quality</p>
                )}
              </div>

              <Button type="submit" className="w-full mt-3 rounded-xl text-xs font-semibold h-10">
                Save Entry
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-(--surface) border-(--border)">
        <CardContent className="p-6 space-y-3">
          <h3 className="text-sm font-bold text-(--foreground) flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-amber-300" />
            Sleep Insights
          </h3>
          <div className="space-y-2 text-xs text-(--muted-foreground)">
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-(--background)/50 border border-(--border)">
              <span className="text-(--primary) font-medium">Pattern:</span> You maintain a stable sleep schedule during weekdays.
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-(--background)/50 border border-(--border)">
              <span className="text-amber-300 font-medium">Heads up:</span> Nights with under 6h sleep correlate with lower task completion rates.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}