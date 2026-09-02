"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Trophy,
  Scale,
  Globe,
  Rocket,
  Bot,
  GraduationCap,
  Check,
  Bug,
  Coffee,
  Code,
  Sparkles,
  Crown,
  Flame,
  Zap,
} from "lucide-react";
import { useState } from "react";

type Rarity = "legendary" | "epic" | "rare" | "common";

interface Badge {
  icon: React.ElementType;
  title: string;
  desc: string;
  unlocked: boolean;
  date: string;
  color: string;
  glowColor: string;
  rarity: Rarity;
}

const badges: Badge[] = [
  {
    icon: Scale,
    title: "Genzura Creator",
    desc: "Designed and developed a legal technology platform for lawyers and law firms",
    unlocked: true,
    date: "2025",
    color: "from-blue-500 to-cyan-500",
    glowColor: "rgba(59, 130, 246, 0.4)",
    rarity: "legendary",
  },
  {
    icon: Globe,
    title: "Tourism Pioneer",
    desc: "Built Gisenyi.top, promoting tourism around Lake Kivu and Gisenyi",
    unlocked: true,
    date: "2026",
    color: "from-green-500 to-emerald-500",
    glowColor: "rgba(34, 197, 94, 0.4)",
    rarity: "epic",
  },
  {
    icon: Rocket,
    title: "Production Deployer",
    desc: "Successfully launched and deployed live websites to production without breaking everything",
    unlocked: true,
    date: "2026",
    color: "from-orange-500 to-amber-500",
    glowColor: "rgba(249, 115, 22, 0.4)",
    rarity: "epic",
  },
  {
    icon: Bot,
    title: "AI Enthusiast",
    desc: "Exploring artificial intelligence and teaching machines to think... slightly better than some humans",
    unlocked: true,
    date: "2026",
    color: "from-purple-500 to-violet-500",
    glowColor: "rgba(139, 92, 246, 0.4)",
    rarity: "rare",
  },
  {
    icon: GraduationCap,
    title: "SE Scholar",
    desc: "Pursuing BSc in Software Engineering at Kigali Independent University",
    unlocked: true,
    date: "2022",
    color: "from-indigo-500 to-blue-500",
    glowColor: "rgba(99, 102, 241, 0.4)",
    rarity: "legendary",
  },
  {
    icon: Bug,
    title: "Bug Whisperer",
    desc: "Successfully found and fixed bugs that have been hiding since 2024. The bugs were scared.",
    unlocked: true,
    date: "2025",
    color: "from-red-500 to-pink-500",
    glowColor: "rgba(239, 68, 68, 0.4)",
    rarity: "rare",
  },
  {
    icon: Coffee,
    title: "Coffee-to-Code Converter",
    desc: "Turned 500+ cups of coffee into 50,000+ lines of code. Still runs on caffeine.",
    unlocked: true,
    date: "2024",
    color: "from-amber-500 to-yellow-500",
    glowColor: "rgba(245, 158, 11, 0.4)",
    rarity: "common",
  },
  {
    icon: Code,
    title: "Stack Overflow Survivor",
    desc: "Googled 'how to center a div' 1,000 times. Still haven't figured it out.",
    unlocked: true,
    date: "2023",
    color: "from-teal-500 to-cyan-500",
    glowColor: "rgba(20, 184, 166, 0.4)",
    rarity: "common",
  },
];

const rarityConfig: Record<
  Rarity,
  { label: string; color: string; icon: React.ElementType; gradient: string }
> = {
  legendary: {
    label: "Legendary",
    color: "text-amber-400",
    icon: Crown,
    gradient: "from-amber-500/20 to-orange-500/20",
  },
  epic: {
    label: "Epic",
    color: "text-purple-400",
    icon: Flame,
    gradient: "from-purple-500/20 to-pink-500/20",
  },
  rare: {
    label: "Rare",
    color: "text-blue-400",
    icon: Zap,
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  common: {
    label: "Common",
    color: "text-gray-400",
    icon: Sparkles,
    gradient: "from-gray-500/20 to-slate-500/20",
  },
};

function AchievementCard({ badge, index }: { badge: Badge; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), {
    stiffness: 300,
    damping: 30,
  });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) / rect.width);
    y.set((e.clientY - centerY) / rect.height);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  }

  const rarity = rarityConfig[badge.rarity];
  const RarityIcon = rarity.icon;

  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay: 0.15 + index * 0.08,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 800,
      }}
    >
      <motion.div
        className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.03] to-white/[0.01] transition-all duration-500"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ scale: 1.02 }}
      >
        {/* Glow effect on hover */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(600px circle at ${isHovered ? "50%" : "50%"} 50%, ${badge.glowColor}, transparent 40%)`,
          }}
        />

        {/* Animated border gradient */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div
            className="absolute inset-[-1px] rounded-2xl"
            style={{
              background: `linear-gradient(135deg, ${badge.glowColor}, transparent 40%, ${badge.glowColor})`,
              opacity: 0.3,
              mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              maskComposite: "xor",
              WebkitMaskComposite: "xor",
              padding: "1px",
            }}
          />
        </div>

        {/* Top gradient bar */}
        <div className={`h-[2px] bg-gradient-to-r ${badge.color} opacity-80`} />

        {/* Rarity indicator strip */}
        <div
          className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl ${rarity.gradient} rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
        />

        <div className="relative p-4 sm:p-5">
          <div className="flex items-start gap-3.5">
            {/* Icon with glow */}
            <div className="relative flex-shrink-0">
              <motion.div
                className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${badge.color} flex items-center justify-center shadow-lg`}
                animate={
                  isHovered
                    ? {
                        boxShadow: [
                          `0 0 20px ${badge.glowColor}`,
                          `0 0 40px ${badge.glowColor}`,
                          `0 0 20px ${badge.glowColor}`,
                        ],
                      }
                    : { boxShadow: `0 4px 20px rgba(0,0,0,0.3)` }
                }
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <badge.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white drop-shadow-lg" />
              </motion.div>
              {/* Floating sparkle on legendary */}
              {badge.rarity === "legendary" && (
                <motion.div
                  className="absolute -top-1 -right-1"
                  animate={{ y: [-2, 2, -2], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                </motion.div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 pt-0.5">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-[13px] sm:text-[14px] font-bold text-white tracking-tight">
                  {badge.title}
                </h3>
                {badge.unlocked && (
                  <motion.span
                    className="w-5 h-5 rounded-full bg-emerald-500/15 flex items-center justify-center border border-emerald-500/20"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      delay: 0.4 + index * 0.08,
                      type: "spring",
                      stiffness: 400,
                    }}
                  >
                    <Check className="w-3 h-3 text-emerald-400" strokeWidth={3} />
                  </motion.span>
                )}
              </div>

              <p className="text-[11px] sm:text-[12px] mt-1.5 text-white/40 leading-relaxed line-clamp-2">
                {badge.desc}
              </p>

              <div className="flex items-center gap-2 mt-2.5">
                <span className="text-[9px] sm:text-[10px] text-white/25 font-mono bg-white/[0.04] px-2 py-0.5 rounded-md border border-white/[0.04]">
                  {badge.date}
                </span>
                <span
                  className={`flex items-center gap-1 text-[9px] sm:text-[10px] ${rarity.color} font-semibold tracking-wider uppercase`}
                >
                  <RarityIcon className="w-3 h-3" />
                  {rarity.label}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom shimmer line */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"
          animate={
            isHovered
              ? { opacity: [0, 0.5, 0], x: [-200, 200] }
              : { opacity: 0 }
          }
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>
    </motion.div>
  );
}

export default function AchievementsWindow() {
  const unlocked = badges.filter((b) => b.unlocked).length;
  const total = badges.length;
  const legendary = badges.filter((b) => b.rarity === "legendary").length;
  const epic = badges.filter((b) => b.rarity === "epic").length;

  return (
    <div className="space-y-5">
      {/* Header */}
      <motion.div
        className="relative"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center border border-amber-500/10"
              animate={{
                boxShadow: [
                  "0 0 20px rgba(245, 158, 11, 0.1)",
                  "0 0 30px rgba(245, 158, 11, 0.2)",
                  "0 0 20px rgba(245, 158, 11, 0.1)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />
            </motion.div>
            <div>
              <h2 className="text-sm sm:text-base font-bold tracking-tight">
                <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400 bg-clip-text text-transparent">
                  ACHIEVEMENTS
                </span>
              </h2>
              <p className="text-[11px] sm:text-[12px] text-white/30 mt-0.5 font-mono">
                {unlocked}/{total} unlocked
              </p>
            </div>
          </div>

          {/* Stats pills */}
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/10 rounded-lg px-2.5 py-1">
              <Crown className="w-3 h-3 text-amber-400" />
              <span className="text-[10px] sm:text-[11px] font-bold text-amber-400">{legendary}</span>
            </div>
            <div className="flex items-center gap-1 bg-purple-500/10 border border-purple-500/10 rounded-lg px-2.5 py-1">
              <Flame className="w-3 h-3 text-purple-400" />
              <span className="text-[10px] sm:text-[11px] font-bold text-purple-400">{epic}</span>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-3.5 relative">
          <div className="h-1 rounded-full bg-white/[0.04] overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500"
              initial={{ width: 0 }}
              animate={{ width: `${(unlocked / total) * 100}%` }}
              transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-[9px] text-white/20 font-mono">0%</span>
            <span className="text-[9px] text-amber-400/60 font-mono font-bold">
              {Math.round((unlocked / total) * 100)}%
            </span>
          </div>
        </div>
      </motion.div>

      {/* Achievement grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
        {badges.map((badge, i) => (
          <AchievementCard key={badge.title} badge={badge} index={i} />
        ))}
      </div>

      {/* Footer stats */}
      <motion.div
        className="flex items-center justify-center gap-4 pt-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] text-white/25 font-mono">All achievements unlocked</span>
        </div>
      </motion.div>
    </div>
  );
}
