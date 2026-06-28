"use client";

import { motion } from "framer-motion";

interface AchievementsWindowProps {
  isLight: boolean;
}

const badges = [
  {
    icon: "🏆",
    title: "Full-Stack Mastery",
    desc: "Built 10+ complete web applications from front to back",
    unlocked: true,
    date: "2024",
  },
  {
    icon: "⚖️",
    title: "Genzura Creator",
    desc: "Architected a legal practice management system used by real firms",
    unlocked: true,
    date: "2023",
  },
  {
    icon: "🌍",
    title: "Tourism Pioneer",
    desc: "Built Gisenyi.top, promoting tourism through technology",
    unlocked: true,
    date: "2024",
  },
  {
    icon: "🔓",
    title: "Open Source Hero",
    desc: "Contributed to multiple open source projects",
    unlocked: true,
    date: "2022",
  },
  {
    icon: "☁️",
    title: "Cloud Architect",
    desc: "Deployed and managed applications on AWS and Vercel",
    unlocked: true,
    date: "2024",
  },
  {
    icon: "🐳",
    title: "Docker Captain",
    desc: "Containerized applications with Docker and orchestrated deployments",
    unlocked: true,
    date: "2024",
  },
  {
    icon: "🤖",
    title: "AI Explorer",
    desc: "Integrated AI/ML features into web applications",
    unlocked: true,
    date: "2025",
  },
  {
    icon: "📱",
    title: "Mobile Ready",
    desc: "Built responsive applications that work on any device",
    unlocked: true,
    date: "2023",
  },
  {
    icon: "🔒",
    title: "Security Mind",
    desc: "Implemented authentication, authorization, and security best practices",
    unlocked: true,
    date: "2024",
  },
  {
    icon: "🎓",
    title: "CS Scholar",
    desc: "Pursuing Computer Science with focus on software engineering",
    unlocked: true,
    date: "2022",
  },
  {
    icon: "⚡",
    title: "Performance Guru",
    desc: "Optimized applications for speed and efficiency",
    unlocked: true,
    date: "2025",
  },
  {
    icon: "🧩",
    title: "Problem Solver",
    desc: "Solved 500+ coding challenges across multiple platforms",
    unlocked: true,
    date: "2023",
  },
];

export default function AchievementsWindow({ isLight }: AchievementsWindowProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg">🏅</span>
          <h2 className="text-sm font-bold text-kevin-accent font-mono">
            // ACHIEVEMENTS
          </h2>
        </div>
        <span className="text-xs text-kevin-text2 font-mono">
          {badges.filter((b) => b.unlocked).length}/{badges.length} Unlocked
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {badges.map((badge, i) => (
          <motion.div
            key={badge.title}
            className={`rounded-xl border p-3 ${
              badge.unlocked
                ? isLight
                  ? "border-kevin-accent/30 bg-kevin-accent/5"
                  : "border-kevin-accent/30 bg-kevin-accent/5"
                : isLight
                ? "border-light-border bg-light-card opacity-50"
                : "border-kevin-border bg-kevin-card opacity-50"
            }`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: badge.unlocked ? 1 : 0.5, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            whileHover={badge.unlocked ? { scale: 1.02 } : undefined}
          >
            <div className="flex items-start gap-3">
              <div className="text-2xl">{badge.icon}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-kevin-text truncate">
                    {badge.title}
                  </h3>
                  {badge.unlocked && (
                    <span className="text-[9px] text-kevin-success font-mono">✓</span>
                  )}
                </div>
                <p className={`text-xs mt-0.5 ${isLight ? "text-light-text2" : "text-kevin-text2"}`}>
                  {badge.desc}
                </p>
                <span className="text-[10px] text-kevin-accent2 font-mono mt-1 inline-block">
                  {badge.date}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
