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
  let total = calendar.totalContributions;

  for (const week of calendar.weeks) {
    for (const day of week.contributionDays) {
      contributionsByDay[day.date] = day.contributionCount;
    }
  }

  // Calculate streaks
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

  // Find most active day
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

  // Generate heatmap weeks from calendar data
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

  // Calculate month positions
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
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-kevin-accent/10 flex items-center justify-center animate-pulse">
            <Flame className="w-4 h-4 text-kevin-accent" />
          </div>
          <span className="text-[11px] font-bold text-kevin-accent font-mono tracking-wider">
            // LOADING CONTRIBUTIONS...
          </span>
        </div>
        <div className="h-48 rounded-xl bg-kevin-card/30 border border-kevin-border/30 animate-pulse" />
      </div>
    );
  }

  if (error || !stats || !calendar) {
    return (
      <div className="text-center py-6">
        <p className="text-kevin-text2 text-sm">{error || "No data"}</p>
        <button
          onClick={fetchData}
          className="mt-3 text-kevin-accent text-xs hover:underline flex items-center gap-1 mx-auto"
        >
          <RefreshCw className="w-3 h-3" /> Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <motion.div
        className="flex items-center gap-2.5"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div className="w-8 h-8 rounded-lg bg-kevin-accent/10 flex items-center justify-center">
          <Flame className="w-4 h-4 text-kevin-accent" />
        </div>
        <h2 className="text-[11px] font-bold text-kevin-accent font-mono tracking-wider">
          // CONTRIBUTION STATS
        </h2>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-3">
        <motion.div
          className="rounded-xl border border-kevin-border/40 bg-kevin-card/30 p-3"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-[10px] text-kevin-text2 font-medium">Total</span>
          </div>
          <div className="text-2xl font-bold text-kevin-text">{stats.total}</div>
          <div className="text-[9px] text-kevin-text2">last 12 months</div>
        </motion.div>

        <motion.div
          className="rounded-xl border border-kevin-border/40 bg-kevin-card/30 p-3"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-2 mb-1">
            <Flame className="w-4 h-4 text-orange-400" />
            <span className="text-[10px] text-kevin-text2 font-medium">Streak</span>
          </div>
          <div className="text-2xl font-bold text-kevin-text">{stats.currentStreak}</div>
          <div className="text-[9px] text-kevin-text2">days current</div>
        </motion.div>

        <motion.div
          className="rounded-xl border border-kevin-border/40 bg-kevin-card/30 p-3"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-2 mb-1">
            <Calendar className="w-4 h-4 text-purple-400" />
            <span className="text-[10px] text-kevin-text2 font-medium">Best</span>
          </div>
          <div className="text-2xl font-bold text-kevin-text">{stats.longestStreak}</div>
          <div className="text-[9px] text-kevin-text2">days longest</div>
        </motion.div>

        <motion.div
          className="rounded-xl border border-kevin-border/40 bg-kevin-card/30 p-3"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm">📅</span>
            <span className="text-[10px] text-kevin-text2 font-medium">Peak</span>
          </div>
          <div className="text-lg font-bold text-kevin-text">{stats.mostActiveDay}</div>
          <div className="text-[9px] text-kevin-text2">most active day</div>
        </motion.div>
      </div>

      {/* Contribution Heatmap - GitHub Style */}
      <motion.div
        className="rounded-xl border border-kevin-border/40 bg-[#0d1117] p-4 overflow-hidden"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="mb-3">
          <span className="text-sm font-medium text-[#e6edf3]">
            {stats.total} contributions in the last year
          </span>
        </div>

        <div className="flex gap-0 overflow-x-auto pb-2">
          {/* Day labels */}
          <div className="flex flex-col gap-[3px] mr-2 mt-6">
            {DAY_LABELS.map((label, i) => (
              <div key={i} className="h-[10px] text-[9px] text-[#8b949e] flex items-center">
                {label}
              </div>
            ))}
          </div>

          <div className="flex-1">
            {/* Month labels */}
            <div className="relative mb-1 h-5">
              {monthPositions.map((month, i) => (
                <div
                  key={i}
                  className="text-[9px] text-[#8b949e] absolute"
                  style={{ left: `${month.weekIndex * 13}px` }}
                >
                  {month.label}
                </div>
              ))}
            </div>

            {/* Heatmap grid */}
            <div className="flex gap-[3px]">
              {heatmapWeeks.map((week, weekIdx) => (
                <div key={weekIdx} className="flex flex-col gap-[3px]">
                  {week.map((day) => {
                    const isFuture = new Date(day.date + "T12:00:00") > new Date();
                    return (
                      <div
                        key={day.date}
                        className={`w-[10px] h-[10px] rounded-[2px] ${isFuture ? "bg-transparent" : getContributionLevel(day.count)} border border-[#1b1f23]`}
                        title={`${day.date}: ${day.count} contribution${day.count !== 1 ? 's' : ''}`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-end gap-1 mt-3">
          <span className="text-[9px] text-[#8b949e]">Less</span>
          <div className="w-[10px] h-[10px] rounded-[2px] bg-[#161b22] border border-[#1b1f23]" />
          <div className="w-[10px] h-[10px] rounded-[2px] bg-[#0e4429] border border-[#1b1f23]" />
          <div className="w-[10px] h-[10px] rounded-[2px] bg-[#006d32] border border-[#1b1f23]" />
          <div className="w-[10px] h-[10px] rounded-[2px] bg-[#26a641] border border-[#1b1f23]" />
          <div className="w-[10px] h-[10px] rounded-[2px] bg-[#39d353] border border-[#1b1f23]" />
          <span className="text-[9px] text-[#8b949e]">More</span>
        </div>
      </motion.div>
    </div>
  );
}
