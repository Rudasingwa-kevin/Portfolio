"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FolderOpen, ExternalLink, GitBranch, Star, RefreshCw } from "lucide-react";
import { fetchGitHubRepos, GitHubRepo } from "@/lib/github";

const FEATURED_REPOS = ["Genzura", "Gisenyi"];

const LANGUAGE_ICONS: Record<string, string> = {
  TypeScript: "TS",
  JavaScript: "JS",
  Python: "PY",
  Java: "JV",
  "C++": "C+",
  Go: "GO",
  Rust: "RS",
  Ruby: "RB",
  PHP: "PH",
  Swift: "SW",
  Kotlin: "KT",
  Dart: "DA",
  HTML: "HT",
  CSS: "CS",
};

export default function ProjectsWindow() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  const fetchRepos = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchGitHubRepos();
      const filtered = data
        .filter((r) => !r.fork)
        .sort((a, b) => {
          const aFeatured = FEATURED_REPOS.includes(a.name) ? 0 : 1;
          const bFeatured = FEATURED_REPOS.includes(b.name) ? 0 : 1;
          if (aFeatured !== bFeatured) return aFeatured - bFeatured;
          return b.stargazers_count - a.stargazers_count;
        });
      setRepos(filtered);
    } catch {
      setError("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRepos();
  }, []);

  if (loading) {
    return (
      <div className="space-y-5">
        <motion.div
          className="flex items-center gap-2.5"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div className="w-8 h-8 rounded-lg bg-kevin-accent/10 flex items-center justify-center animate-pulse">
            <FolderOpen className="w-4 h-4 text-kevin-accent" />
          </div>
          <h2 className="text-[11px] font-bold text-kevin-accent font-mono tracking-wider">
            // LOADING PROJECTS...
          </h2>
        </motion.div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 rounded-2xl bg-kevin-card/30 border border-kevin-border/30 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-kevin-text2 text-sm">{error}</p>
        <button
          onClick={fetchRepos}
          className="mt-3 text-kevin-accent text-xs hover:underline flex items-center gap-1 mx-auto"
        >
          <RefreshCw className="w-3 h-3" /> Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <motion.div
        className="flex items-center gap-2.5"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div className="w-8 h-8 rounded-lg bg-kevin-accent/10 flex items-center justify-center">
          <FolderOpen className="w-4 h-4 text-kevin-accent" />
        </div>
        <h2 className="text-[11px] font-bold text-kevin-accent font-mono tracking-wider">
          // GITHUB PROJECTS
        </h2>
      </motion.div>

      <div className="space-y-3">
        {repos.map((repo, i) => (
          <motion.div
            key={repo.id}
            className="rounded-2xl border border-kevin-border/40 bg-kevin-card/30 overflow-hidden hover:border-kevin-accent/30 transition-all duration-300"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
          >
            <div className={`h-1 bg-gradient-to-r ${repo.language === "TypeScript" ? "from-blue-500 to-cyan-500" : repo.language === "JavaScript" ? "from-yellow-400 to-orange-500" : repo.language === "Python" ? "from-green-500 to-emerald-500" : "from-gray-500 to-gray-400"}`} />
            <div className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-kevin-card border border-kevin-border/40 flex items-center justify-center shadow-sm">
                    <span className="text-[10px] font-bold text-kevin-accent font-mono">
                      {repo.language ? LANGUAGE_ICONS[repo.language] || "Code" : "Code"}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-[14px] font-bold text-kevin-text">{repo.name}</h3>
                      {FEATURED_REPOS.includes(repo.name) && (
                        <span className="text-[9px] font-mono text-kevin-accent bg-kevin-accent/10 px-1.5 py-0.5 rounded-md font-bold">
                          FEATURED
                        </span>
                      )}
                    </div>
                    <p className="text-[12px] text-kevin-text2 mt-0.5">
                      {repo.description || "No description"}
                    </p>
                  </div>
                </div>
                <button
                  className="text-[11px] px-3 py-1.5 rounded-lg border border-kevin-border/50 text-kevin-text2 hover:border-kevin-accent/40 hover:text-kevin-accent hover:bg-kevin-accent/5 transition-all duration-200 flex-shrink-0 font-medium"
                  onClick={() =>
                    setExpandedProject(
                      expandedProject === repo.name ? null : repo.name
                    )
                  }
                >
                  {expandedProject === repo.name ? "Less" : "Details"}
                </button>
              </div>

              {expandedProject === repo.name && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-4 pt-4 border-t border-kevin-border/30 space-y-4"
                >
                  <div className="flex flex-wrap gap-2">
                    {repo.language && (
                      <span className="text-[10px] px-2.5 py-1 rounded-lg bg-kevin-accent/8 text-kevin-accent border border-kevin-accent/15 font-mono font-medium">
                        {repo.language}
                      </span>
                    )}
                    {repo.topics.slice(0, 5).map((topic) => (
                      <span
                        key={topic}
                        className="text-[10px] px-2.5 py-1 rounded-lg bg-purple-500/8 text-purple-400 border border-purple-500/15 font-mono font-medium"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 text-[11px] text-kevin-text2">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-400" />
                      <span>{repo.stargazers_count} stars</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <GitBranch className="w-3 h-3" />
                      <span>{repo.forks_count} forks</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {repo.homepage && (
                      <a
                        href={repo.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[12px] px-4 py-2 rounded-xl bg-kevin-accent text-white hover:bg-kevin-accent/85 transition-all duration-200 font-medium shadow-sm shadow-kevin-accent/20"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Live Demo
                      </a>
                    )}
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[12px] px-4 py-2 rounded-xl border border-kevin-border/50 text-kevin-text hover:border-kevin-accent/40 hover:text-kevin-accent hover:bg-kevin-accent/5 transition-all duration-200 font-medium"
                    >
                      <GitBranch className="w-3.5 h-3.5" />
                      GitHub
                    </a>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
