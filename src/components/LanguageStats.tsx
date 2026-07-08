"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Code2, RefreshCw } from "lucide-react";
import { fetchLanguageStats, LanguageStats } from "@/lib/github";

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "bg-blue-500",
  JavaScript: "bg-yellow-400",
  Python: "bg-green-500",
  Java: "bg-orange-500",
  "C++": "bg-pink-500",
  C: "bg-gray-400",
  Go: "bg-cyan-400",
  Rust: "bg-orange-600",
  Ruby: "bg-red-500",
  PHP: "bg-purple-500",
  Swift: "bg-orange-400",
  Kotlin: "bg-purple-600",
  Dart: "bg-cyan-500",
  HTML: "bg-orange-300",
  CSS: "bg-blue-300",
  Shell: "bg-green-400",
  Dockerfile: "bg-blue-600",
  Svelte: "bg-orange-500",
  Vue: "bg-green-400",
};

export default function LanguageStatsComponent() {
  const [languages, setLanguages] = useState<LanguageStats>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchLanguageStats();
      setLanguages(data);
    } catch {
      setError("Failed to load language stats");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const totalSize = Object.values(languages).reduce((a, b) => a + b, 0);
  const sortedLanguages = Object.entries(languages)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8);

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-kevin-accent/10 flex items-center justify-center animate-pulse">
            <Code2 className="w-4 h-4 text-kevin-accent" />
          </div>
          <span className="text-[11px] font-bold text-kevin-accent font-mono tracking-wider">
            // LOADING LANGUAGES...
          </span>
        </div>
        <div className="h-4 rounded-full bg-kevin-card/30 border border-kevin-border/30 animate-pulse" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-6">
        <p className="text-kevin-text2 text-sm">{error}</p>
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
          <Code2 className="w-4 h-4 text-kevin-accent" />
        </div>
        <h2 className="text-[11px] font-bold text-kevin-accent font-mono tracking-wider">
          // TOP LANGUAGES
        </h2>
      </motion.div>

      {/* Language Bar */}
      <motion.div
        className="h-4 rounded-full overflow-hidden bg-kevin-card/30 border border-kevin-border/30 flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {sortedLanguages.map(([lang, size], i) => {
          const percentage = (size / totalSize) * 100;
          return (
            <motion.div
              key={lang}
              className={`${LANGUAGE_COLORS[lang] || "bg-gray-500"} h-full`}
              style={{ width: `${percentage}%` }}
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ delay: 0.3 + i * 0.05, duration: 0.5 }}
              title={`${lang}: ${percentage.toFixed(1)}%`}
            />
          );
        })}
      </motion.div>

      {/* Language List */}
      <div className="space-y-2">
        {sortedLanguages.map(([lang, size], i) => {
          const percentage = (size / totalSize) * 100;
          return (
            <motion.div
              key={lang}
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.05 }}
            >
              <div className={`w-3 h-3 rounded-sm ${LANGUAGE_COLORS[lang] || "bg-gray-500"}`} />
              <span className="text-[12px] text-kevin-text flex-1">{lang}</span>
              <span className="text-[11px] text-kevin-text2 font-mono">{percentage.toFixed(1)}%</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
