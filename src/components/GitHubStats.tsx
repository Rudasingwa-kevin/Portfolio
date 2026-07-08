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
    } catch (err) {
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
        { label: "Repositories", value: user.public_repos, icon: GitBranch, color: "text-blue-400" },
        { label: "Total Stars", value: getTotalStars(repos), icon: Star, color: "text-yellow-400" },
        { label: "Followers", value: user.followers, icon: Users, color: "text-purple-400" },
        { label: "Following", value: user.following, icon: Activity, color: "text-green-400" },
      ]
    : [];

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-kevin-accent/10 flex items-center justify-center animate-pulse">
            <Activity className="w-4 h-4 text-kevin-accent" />
          </div>
          <span className="text-[11px] font-bold text-kevin-accent font-mono tracking-wider">
            // LOADING GITHUB STATS...
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-20 rounded-xl bg-kevin-card/30 border border-kevin-border/30 animate-pulse" />
          ))}
        </div>
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
          <Activity className="w-4 h-4 text-kevin-accent" />
        </div>
        <h2 className="text-[11px] font-bold text-kevin-accent font-mono tracking-wider">
          // GITHUB STATS
        </h2>
      </motion.div>

      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            className="rounded-xl border border-kevin-border/40 bg-kevin-card/30 p-3 hover:border-kevin-accent/30 transition-all duration-300"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 + i * 0.1 }}
          >
            <div className="flex items-center gap-2 mb-1">
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
              <span className="text-[10px] text-kevin-text2 font-medium">{stat.label}</span>
            </div>
            <div className="text-2xl font-bold text-kevin-text">{stat.value}</div>
          </motion.div>
        ))}
      </div>

      {user && (
        <motion.div
          className="rounded-xl border border-kevin-border/40 bg-kevin-card/30 p-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center gap-3">
            <img
              src={user.avatar_url}
              alt={user.name}
              className="w-12 h-12 rounded-xl border-2 border-kevin-accent/30"
            />
            <div>
              <h3 className="text-sm font-bold text-kevin-text">{user.name || user.login}</h3>
              <p className="text-[11px] text-kevin-text2">GitHub Profile</p>
            </div>
            <a
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto text-[10px] px-3 py-1.5 rounded-lg bg-kevin-accent/10 text-kevin-accent border border-kevin-accent/20 hover:bg-kevin-accent/20 transition-colors font-medium"
            >
              View Profile
            </a>
          </div>
        </motion.div>
      )}
    </div>
  );
}
