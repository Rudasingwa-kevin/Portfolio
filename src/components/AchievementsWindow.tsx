"use client";

import { motion } from "framer-motion";
import { Trophy, Scale, Globe, Rocket, Bot, BookOpen, Lightbulb, Smartphone, GraduationCap, Check } from "lucide-react";

const badges = [
  {
    icon: Scale,
    title: "Genzura Creator",
    desc: "Designed and developed a legal technology platform for lawyers and law firms",
    unlocked: true,
    date: "2023",
  },
  {
    icon: Globe,
    title: "Tourism Pioneer",
    desc: "Built Gisenyi.top, promoting tourism around Lake Kivu and Gisenyi",
    unlocked: true,
    date: "2024",
  },
  {
    icon: Rocket,
    title: "Production Deployer",
    desc: "Successfully launched and deployed two live websites to production",
    unlocked: true,
    date: "2024",
  },
  {
    icon: Bot,
    title: "AI Enthusiast",
    desc: "Exploring artificial intelligence and integrating AI features into web apps",
    unlocked: true,
    date: "2025",
  },
  {
    icon: BookOpen,
    title: "Lifelong Learner",
    desc: "Self-driven developer continuously learning new technologies",
    unlocked: true,
    date: "2025",
  },
  {
    icon: Lightbulb,
    title: "Innovator",
    desc: "Strong interest in innovation and entrepreneurship in tech",
    unlocked: true,
    date: "2025",
  },
  {
    icon: Smartphone,
    title: "Full-Stack Builder",
    desc: "Built production-ready web apps across legal tech and tourism sectors",
    unlocked: true,
    date: "2024",
  },
  {
    icon: GraduationCap,
    title: "SE Scholar",
    desc: "Pursuing BSc in Software Engineering at Kigali Independent University",
    unlocked: true,
    date: "2022",
  },
];

export default function AchievementsWindow() {
  return (
    <div className="space-y-5">
      <motion.div
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-kevin-accent/10 flex items-center justify-center">
            <Trophy className="w-4 h-4 text-kevin-accent" />
          </div>
          <h2 className="text-[11px] font-bold text-kevin-accent font-mono tracking-wider">
            // ACHIEVEMENTS
          </h2>
        </div>
        <span className="text-[11px] text-kevin-text2 font-mono bg-kevin-card/60 px-2.5 py-1 rounded-lg border border-kevin-border/30">
          {badges.filter((b) => b.unlocked).length}/{badges.length}
        </span>
      </motion.div>

      <div className="rounded-2xl border border-kevin-border/40 bg-kevin-card/30 overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2">
          {badges.map((badge, i) => (
            <motion.div
              key={badge.title}
              className={`p-3.5 transition-all duration-300 ${
                i < badges.length - 2 ? "border-b border-kevin-border/20" : ""
              } ${i % 2 === 0 ? "sm:border-r sm:border-kevin-border/20" : ""} ${
                badge.unlocked
                  ? "hover:bg-kevin-accent/[0.03]"
                  : "opacity-50"
              }`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: badge.unlocked ? 1 : 0.5, scale: 1 }}
              transition={{ delay: 0.08 + i * 0.04, duration: 0.3 }}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-kevin-card/60 border border-kevin-border/40 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <badge.icon className="w-5 h-5 text-kevin-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-[12px] font-bold text-kevin-text truncate">
                      {badge.title}
                    </h3>
                    {badge.unlocked && (
                      <span className="text-[9px] text-kevin-success font-mono bg-kevin-success/10 px-1.5 py-0.5 rounded-md flex-shrink-0">
                        <Check className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] mt-1 text-kevin-text2/70 leading-relaxed line-clamp-2">
                    {badge.desc}
                  </p>
                  <span className="text-[10px] text-kevin-accent2 font-mono mt-1.5 inline-block bg-kevin-accent2/8 px-2 py-0.5 rounded-md">
                    {badge.date}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
