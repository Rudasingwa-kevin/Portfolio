"use client";

import { motion } from "framer-motion";

const badges = [
  {
    icon: "⚖️",
    title: "Genzura Creator",
    desc: "Designed and developed a legal technology platform for lawyers and law firms",
    unlocked: true,
    date: "2023",
  },
  {
    icon: "🌍",
    title: "Tourism Pioneer",
    desc: "Built Gisenyi.top, promoting tourism around Lake Kivu and Gisenyi",
    unlocked: true,
    date: "2024",
  },
  {
    icon: "🚀",
    title: "Production Deployer",
    desc: "Successfully launched and deployed two live websites to production",
    unlocked: true,
    date: "2024",
  },
  {
    icon: "🤖",
    title: "AI Enthusiast",
    desc: "Exploring artificial intelligence and integrating AI features into web apps",
    unlocked: true,
    date: "2025",
  },
  {
    icon: "📚",
    title: "Lifelong Learner",
    desc: "Self-driven developer continuously learning new technologies",
    unlocked: true,
    date: "2025",
  },
  {
    icon: "💡",
    title: "Innovator",
    desc: "Strong interest in innovation and entrepreneurship in tech",
    unlocked: true,
    date: "2025",
  },
  {
    icon: "📱",
    title: "Full-Stack Builder",
    desc: "Built production-ready web apps across legal tech and tourism sectors",
    unlocked: true,
    date: "2024",
  },
  {
    icon: "🎓",
    title: "SE Scholar",
    desc: "Pursuing BSc in Software Engineering at Kigali Independent University",
    unlocked: true,
    date: "2022",
  },
];

export default function AchievementsWindow() {
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
                ? "border-kevin-accent/30 bg-kevin-accent/5"
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
                <p className="text-xs mt-0.5 text-kevin-text2">
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
