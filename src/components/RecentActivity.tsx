"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Clock, RefreshCw } from "lucide-react";
import { fetchGitHubEvents, formatEvent, getEventIcon, GitHubEvent } from "@/lib/github";

function timeAgo(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function RecentActivity() {
  const [events, setEvents] = useState<GitHubEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchGitHubEvents();
      setEvents(data.slice(0, 6));
    } catch {
      setError("Failed to load activity");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="space-y-3 sm:space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-kevin-accent/10 flex items-center justify-center animate-pulse">
            <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-kevin-accent" />
          </div>
          <span className="text-[10px] sm:text-[11px] font-bold text-kevin-accent font-mono tracking-wider">
            // LOADING...
          </span>
        </div>
        <div className="space-y-1.5 sm:space-y-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-10 sm:h-12 rounded-lg bg-kevin-card/30 border border-kevin-border/30 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-4 sm:py-6">
        <p className="text-kevin-text2 text-xs sm:text-sm">{error}</p>
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
          <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-kevin-accent" />
        </div>
        <h2 className="text-[10px] sm:text-[11px] font-bold text-kevin-accent font-mono tracking-wider">
          // RECENT ACTIVITY
        </h2>
      </motion.div>

      <div className="space-y-1 sm:space-y-2">
        {events.map((event, i) => (
          <motion.div
            key={event.id}
            className="flex items-center gap-2 sm:gap-3 p-2 sm:p-2.5 rounded-lg hover:bg-kevin-accent/5 transition-colors"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.05 }}
          >
            <span className="text-sm sm:text-base flex-shrink-0">{getEventIcon(event.type)}</span>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] sm:text-[12px] text-kevin-text truncate">{formatEvent(event)}</p>
              <p className="text-[9px] sm:text-[10px] text-kevin-text2">{timeAgo(event.created_at)}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
