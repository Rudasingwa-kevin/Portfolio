"use client";

import { motion } from "framer-motion";
import { Trophy, Scale, Globe, Rocket, Bot, BookOpen, Lightbulb, Smartphone, GraduationCap, Check, Bug, Coffee, Code } from "lucide-react";

const badges = [
  {
    icon: Scale,
    title: "Genzura Creator",
    desc: "Designed and developed a legal technology platform for lawyers and law firms",
    unlocked: true,
    date: "2025",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Globe,
    title: "Tourism Pioneer",
    desc: "Built Gisenyi.top, promoting tourism around Lake Kivu and Gisenyi",
    unlocked: true,
    date: "2026",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Rocket,
    title: "Production Deployer",
    desc: "Successfully launched and deployed live websites to production without breaking everything",
    unlocked: true,
    date: "2026",
    color: "from-orange-500 to-amber-500",
  },
  {
    icon: Bot,
    title: "AI Enthusiast",
    desc: "Exploring artificial intelligence and teaching machines to think... slightly better than some humans",
    unlocked: true,
    date: "2026",
    color: "from-purple-500 to-violet-500",
  },
  {
    icon: GraduationCap,
    title: "SE Scholar",
    desc: "Pursuing BSc in Software Engineering at Kigali Independent University",
    unlocked: true,
    date: "2022",
    color: "from-indigo-500 to-blue-500",
  },
  {
    icon: Bug,
    title: "Bug Whisperer",
    desc: "Successfully found and fixed bugs that have been hiding since 2024. The bugs were scared.",
    unlocked: true,
    date: "2025",
    color: "from-red-500 to-pink-500",
  },
  {
    icon: Coffee,
    title: "Coffee-to-Code Converter",
    desc: "Turned 500+ cups of coffee into 50,000+ lines of code. Still runs on caffeine.",
    unlocked: true,
    date: "2024",
    color: "from-amber-500 to-yellow-500",
  },
  {
    icon: Code,
    title: "Stack Overflow Survivor",
    desc: "Googled 'how to center a div' 1,000 times. Still haven't figured it out.",
    unlocked: true,
    date: "2023",
    color: "from-teal-500 to-cyan-500",
  },
];

export default function AchievementsWindow() {
  return (
    <div className="space-y-6">
      <motion.div
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-kevin-accent/10 flex items-center justify-center">
            <Trophy className="w-5 h-5 text-kevin-accent" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-kevin-text font-mono">// ACHIEVEMENTS</h2>
            <p className="text-[11px] text-kevin-text2 mt-0.5">
              {badges.filter((b) => b.unlocked).length} unlocked — yes, I'm proud of all of them
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          {badges.map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-kevin-accent"
              style={{ opacity: 0.3 + (i / badges.length) * 0.7 }}
            />
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {badges.map((badge, i) => (
          <motion.div
            key={badge.title}
            className="relative overflow-hidden rounded-2xl border border-kevin-border/40 bg-kevin-card/30 hover:border-kevin-accent/30 transition-all duration-300 group"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: badge.unlocked ? 1 : 0.5, y: 0 }}
            transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
            whileHover={{ y: -2 }}
          >
            <div className={`h-1.5 bg-gradient-to-r ${badge.color}`} />
            <div className="p-4">
              <div className="flex items-start gap-3.5">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${badge.color} flex items-center justify-center flex-shrink-0 shadow-lg opacity-90`}>
                  <badge.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0 pt-0.5">
                  <div className="flex items-center gap-2">
                    <h3 className="text-[13px] font-bold text-kevin-text">
                      {badge.title}
                    </h3>
                    {badge.unlocked && (
                      <span className="w-5 h-5 rounded-full bg-kevin-success/15 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-kevin-success" />
                      </span>
                    )}
                  </div>
                  <p className="text-[12px] mt-1.5 text-kevin-text2/70 leading-relaxed">
                    {badge.desc}
                  </p>
                  <span className="text-[10px] text-kevin-accent2 font-mono mt-2 inline-block bg-kevin-accent2/8 px-2.5 py-1 rounded-md">
                    {badge.date}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
