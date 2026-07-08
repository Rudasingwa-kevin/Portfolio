"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { GitBranch, Star, Users, Activity, RefreshCw } from "lucide-react";
import { fetchGitHubUser, fetchGitHubRepos, getTotalStars, GitHubUser, GitHubRepo } from "@/lib/github";

export default function GitHubStats() {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [userData, reposData] = await Promise.all([
        fetchGitHubUser(),
        fetchGitHubRepos(),
      ]);
      setUser(userData);
      setRepos(reposData);
    } catch {
      setError("Failed to load GitHub data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const stats = user
    ? [
        { label: "Repos", value: user.public_repos, icon: GitBranch, color: "text-blue-400" },
        { label: "Stars", value: getTotalStars(repos), icon: Star, color: "text-yellow-400" },
        { label: "Followers", value: user.followers, icon: Users, color: "text-purple-400" },
        { label: "Following", value: user.following, icon: Activity, color: "text-green-400" },
      ]
    : [];

  if (loading) {
    return (
      <div className="space-y-3 sm:space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-kevin-accent/10 flex items-center justify-center animate-pulse">
            <Activity className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-kevin-accent" />
          </div>
          <span className="text-[10px] sm:text-[11px] font-bold text-kevin-accent font-mono tracking-wider">
            // LOADING GITHUB...
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-16 sm:h-20 rounded-xl bg-kevin-card/30 border border-kevin-border/30 animate-pulse" />
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
          <Activity className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-kevin-accent" />
        </div>
        <h2 className="text-[10px] sm:text-[11px] font-bold text-kevin-accent font-mono tracking-wider">
          // GITHUB STATS
        </h2>
      </motion.div>

      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            className="rounded-xl border border-kevin-border/40 bg-kevin-card/30 p-2.5 sm:p-3 hover:border-kevin-accent/30 transition-all duration-300"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 + i * 0.1 }}
          >
            <div className="flex items-center gap-1.5 sm:gap-2 mb-0.5 sm:mb-1">
              <stat.icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${stat.color}`} />
              <span className="text-[9px] sm:text-[10px] text-kevin-text2 font-medium">{stat.label}</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-kevin-text">{stat.value}</div>
          </motion.div>
        ))}
      </div>

      {user && (
        <motion.div
          className="rounded-xl border border-kevin-border/40 bg-kevin-card/30 p-3 sm:p-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center gap-2.5 sm:gap-3">
            <img
              src={user.avatar_url}
              alt={user.name}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl border-2 border-kevin-accent/30"
            />
            <div className="flex-1 min-w-0">
              <h3 className="text-xs sm:text-sm font-bold text-kevin-text truncate">{user.name || user.login}</h3>
              <p className="text-[10px] sm:text-[11px] text-kevin-text2">GitHub Profile</p>
            </div>
            <a
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[9px] sm:text-[10px] px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-kevin-accent/10 text-kevin-accent border border-kevin-accent/20 hover:bg-kevin-accent/20 transition-colors font-medium flex-shrink-0"
            >
              View
            </a>
          </div>
        </motion.div>
      )}
    </div>
  );
}
