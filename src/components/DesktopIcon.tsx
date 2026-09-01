"use client";

import { motion } from "framer-motion";

interface DesktopIconProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  index: number;
}

export default function DesktopIcon({
  icon,
  label,
  onClick,
  index,
}: DesktopIconProps) {
  return (
    <motion.button
      className="group flex flex-col items-center gap-1.5 sm:gap-2 p-2 sm:p-3 rounded-xl hover:bg-white/[0.02] transition-all duration-200 w-[70px] h-[75px] sm:w-[90px] sm:h-[95px] justify-center"
      onClick={onClick}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4, ease: "easeOut" }}
      whileHover={{ scale: 1.08, x: 4 }}
      whileTap={{ scale: 0.92 }}
    >
      <div className="relative w-10 h-10 sm:w-14 sm:h-14 rounded-xl bg-kevin-card/80 border border-kevin-border/50 flex items-center justify-center transition-all duration-300 group-hover:border-kevin-accent/40 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.12)] group-hover:bg-kevin-card">
        <span className="text-kevin-text2 group-hover:text-kevin-accent transition-colors duration-300">{icon}</span>
        <div className="absolute inset-0 rounded-xl bg-kevin-accent/0 group-hover:bg-kevin-accent/[0.04] transition-colors duration-300" />
      </div>
      <span className="text-[10px] sm:text-[12px] text-kevin-text2/80 text-center leading-tight font-medium group-hover:text-kevin-text transition-colors duration-300">
        {label}
      </span>
    </motion.button>
  );
}
