"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Flame, TrendingUp, Calendar, RefreshCw } from "lucide-react";

interface ContributionDay {
  date: string;
  contributionCount: number;
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

interface ContributionCalendar {
  totalContributions: number;
  weeks: ContributionWeek[];
}

interface Stats {
  total: number;
  currentStreak: number;
  longestStreak: number;
  mostActiveDay: string;
  contributionsByDay: Record<string, number>;
}

function processCalendar(calendar: ContributionCalendar): Stats {
  const contributionsByDay: Record<string, number> = {};
  const total = calendar.totalContributions;

  for (const week of calendar.weeks) {
    for (const day of week.contributionDays) {
      contributionsByDay[day.date] = day.contributionCount;
    }
  }

  const sortedDays = Object.keys(contributionsByDay).sort();
  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;

  const now = new Date();
  const today = now.toISOString().split("T")[0];
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayKey = yesterday.toISOString().split("T")[0];

  if (contributionsByDay[today] || contributionsByDay[yesterdayKey]) {
    const checkDate = contributionsByDay[today] ? new Date(now) : new Date(yesterday);
    let streakEnd = contributionsByDay[today] ? today : yesterdayKey;
    
    while (contributionsByDay[streakEnd] && contributionsByDay[streakEnd] > 0) {
      currentStreak++;
      checkDate.setDate(checkDate.getDate() - 1);
      streakEnd = checkDate.toISOString().split("T")[0];
    }
  }

  for (const day of sortedDays) {
    if (tempStreak === 0 || !contributionsByDay[day] || contributionsByDay[day] === 0) {
      tempStreak = contributionsByDay[day] && contributionsByDay[day] > 0 ? 1 : 0;
    } else {
      tempStreak++;
    }
    longestStreak = Math.max(longestStreak, tempStreak);
  }

  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const dayTotals: Record<string, number> = {};
  for (const day of sortedDays) {
    if (contributionsByDay[day] > 0) {
      const dayName = dayNames[new Date(day + "T12:00:00").getDay()];
      dayTotals[dayName] = (dayTotals[dayName] || 0) + contributionsByDay[day];
    }
  }
  const mostActiveDay = Object.entries(dayTotals).sort(([, a], [, b]) => b - a)[0]?.[0] || "N/A";

  return {
    total,
    currentStreak,
    longestStreak,
    mostActiveDay,
    contributionsByDay,
  };
}

function getContributionLevel(count: number): string {
  if (count === 0) return "bg-[#161b22]";
  if (count <= 2) return "bg-[#0e4429]";
  if (count <= 5) return "bg-[#006d32]";
  if (count <= 10) return "bg-[#26a641]";
  return "bg-[#39d353]";
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];

export default function ContributionStats() {
  const [calendar, setCalendar] = useState<ContributionCalendar | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/contributions");
      const data = await res.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      if (!data || !Array.isArray(data.weeks)) {
        throw new Error("Invalid data format");
      }
      
      setCalendar(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load contribution data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const stats = calendar ? processCalendar(calendar) : null;

  const heatmapWeeks: { date: string; count: number }[][] = [];
  if (calendar) {
    for (const week of calendar.weeks) {
      heatmapWeeks.push(
        week.contributionDays.map((day) => ({
          date: day.date,
          count: day.contributionCount,
        }))
      );
    }
  }

  const monthPositions: { label: string; weekIndex: number }[] = [];
  let lastMonth = -1;
  heatmapWeeks.forEach((week, idx) => {
    if (week.length > 0) {
      const firstDay = new Date(week[0].date + "T12:00:00");
      const month = firstDay.getMonth();
      if (month !== lastMonth) {
        monthPositions.push({ label: MONTHS[month], weekIndex: idx });
        lastMonth = month;
      }
    }
  });

  if (loading) {
    return (
      <div className="space-y-3 sm:space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-kevin-accent/10 flex items-center justify-center animate-pulse">
            <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-kevin-accent" />
          </div>
          <span className="text-[10px] sm:text-[11px] font-bold text-kevin-accent font-mono tracking-wider">
            // LOADING...
          </span>
        </div>
        <div className="h-32 sm:h-48 rounded-xl bg-kevin-card/30 border border-kevin-border/30 animate-pulse" />
      </div>
    );
  }

  if (error || !stats || !calendar) {
    return (
      <div className="text-center py-4 sm:py-6">
        <p className="text-kevin-text2 text-xs sm:text-sm">{error || "No data"}</p>
        <button
          onClick={fetchData}
          className="mt-2 sm:mt-3 text-kevin-accent text-[10px] sm:text-xs hover:underline flex items-center gap-1 mx-auto"
        >
          <RefreshCw className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-3 sm:space-y-4">
      <motion.div
        className="flex items-center gap-2 sm:gap-2.5"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-kevin-accent/10 flex items-center justify-center">
          <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-kevin-accent" />
        </div>
        <h2 className="text-[10px] sm:text-[11px] font-bold text-kevin-accent font-mono tracking-wider">
          // CONTRIBUTION STATS
        </h2>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        <motion.div
          className="rounded-xl border border-kevin-border/40 bg-kevin-card/30 p-2.5 sm:p-3"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-1.5 sm:gap-2 mb-0.5 sm:mb-1">
            <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-400" />
            <span className="text-[9px] sm:text-[10px] text-kevin-text2 font-medium">Total</span>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-kevin-text">{stats.total}</div>
          <div className="text-[8px] sm:text-[9px] text-kevin-text2">last 12 months</div>
        </motion.div>

        <motion.div
          className="rounded-xl border border-kevin-border/40 bg-kevin-card/30 p-2.5 sm:p-3"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-1.5 sm:gap-2 mb-0.5 sm:mb-1">
            <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-400" />
            <span className="text-[9px] sm:text-[10px] text-kevin-text2 font-medium">Streak</span>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-kevin-text">{stats.currentStreak}</div>
          <div className="text-[8px] sm:text-[9px] text-kevin-text2">days current</div>
        </motion.div>

        <motion.div
          className="rounded-xl border border-kevin-border/40 bg-kevin-card/30 p-2.5 sm:p-3"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-1.5 sm:gap-2 mb-0.5 sm:mb-1">
            <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-400" />
            <span className="text-[9px] sm:text-[10px] text-kevin-text2 font-medium">Best</span>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-kevin-text">{stats.longestStreak}</div>
          <div className="text-[8px] sm:text-[9px] text-kevin-text2">days longest</div>
        </motion.div>

        <motion.div
          className="rounded-xl border border-kevin-border/40 bg-kevin-card/30 p-2.5 sm:p-3"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center gap-1.5 sm:gap-2 mb-0.5 sm:mb-1">
            <span className="text-xs sm:text-sm">📅</span>
            <span className="text-[9px] sm:text-[10px] text-kevin-text2 font-medium">Peak</span>
          </div>
          <div className="text-base sm:text-lg font-bold text-kevin-text">{stats.mostActiveDay}</div>
          <div className="text-[8px] sm:text-[9px] text-kevin-text2">most active day</div>
        </motion.div>
      </div>

      {/* Contribution Heatmap */}
      <motion.div
        className="rounded-xl border border-kevin-border/40 bg-[#0d1117] p-3 sm:p-4 overflow-hidden"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="mb-2 sm:mb-3">
          <span className="text-xs sm:text-sm font-medium text-[#e6edf3]">
            {stats.total} contributions in the last year
          </span>
        </div>

        <div className="w-full overflow-x-auto">
          <div className="min-w-[300px]">
            {/* Month labels */}
            <div className="relative mb-1 h-4 sm:h-5 ml-[24px] sm:ml-[30px]">
              {monthPositions.map((month, i) => (
                <div
                  key={i}
                  className="text-[8px] sm:text-[9px] text-[#8b949e] absolute"
                  style={{ left: `${(month.weekIndex / heatmapWeeks.length) * 100}%` }}
                >
                  {month.label}
                </div>
              ))}
            </div>

            <div className="flex w-full">
              {/* Day labels */}
              <div className="flex flex-col gap-[2px] sm:gap-[3px] mr-1.5 sm:mr-2 justify-between h-[88px] sm:h-[110px]">
                {DAY_LABELS.map((label, i) => (
                  <div key={i} className="text-[8px] sm:text-[9px] text-[#8b949e] flex items-center h-[8px] sm:h-[10px]">
                    {label}
                  </div>
                ))}
              </div>

              {/* Heatmap grid */}
              <div className="flex flex-1 gap-[2px] sm:gap-[3px]">
                {heatmapWeeks.map((week, weekIdx) => (
                  <div key={weekIdx} className="flex flex-col gap-[2px] sm:gap-[3px] flex-1 justify-between h-[88px] sm:h-[110px]">
                    {week.map((day) => {
                      const isFuture = new Date(day.date + "T12:00:00") > new Date();
                      return (
                        <div
                          key={day.date}
                          className={`w-full aspect-square max-w-[10px] sm:max-w-[13px] rounded-[2px] ${isFuture ? "bg-transparent" : getContributionLevel(day.count)} border border-[#1b1f23]`}
                          title={`${day.date}: ${day.count} contribution${day.count !== 1 ? 's' : ''}`}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-end gap-1 mt-2 sm:mt-3">
          <span className="text-[8px] sm:text-[9px] text-[#8b949e]">Less</span>
          <div className="w-[8px] h-[8px] sm:w-[10px] sm:h-[10px] rounded-[2px] bg-[#161b22] border border-[#1b1f23]" />
          <div className="w-[8px] h-[8px] sm:w-[10px] sm:h-[10px] rounded-[2px] bg-[#0e4429] border border-[#1b1f23]" />
          <div className="w-[8px] h-[8px] sm:w-[10px] sm:h-[10px] rounded-[2px] bg-[#006d32] border border-[#1b1f23]" />
          <div className="w-[8px] h-[8px] sm:w-[10px] sm:h-[10px] rounded-[2px] bg-[#26a641] border border-[#1b1f23]" />
          <div className="w-[8px] h-[8px] sm:w-[10px] sm:h-[10px] rounded-[2px] bg-[#39d353] border border-[#1b1f23]" />
          <span className="text-[8px] sm:text-[9px] text-[#8b949e]">More</span>
        </div>
      </motion.div>
    </div>
  );
}
