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
      className="group flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-white/[0.03] transition-all duration-200 w-[90px] h-[95px] justify-center"
      onClick={onClick}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4, ease: "easeOut" }}
      whileHover={{ scale: 1.08, x: 4 }}
      whileTap={{ scale: 0.92 }}
    >
      <div className="relative w-14 h-14 rounded-xl bg-kevin-card border border-kevin-border flex items-center justify-center transition-all duration-200 group-hover:border-kevin-accent/50 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.15)]">
        <span className="text-kevin-text2 group-hover:text-kevin-accent transition-colors duration-200">{icon}</span>
        <div className="absolute inset-0 rounded-xl bg-kevin-accent/0 group-hover:bg-kevin-accent/5 transition-colors duration-200" />
      </div>
      <span className="text-[12px] text-kevin-text2 text-center leading-tight font-medium group-hover:text-kevin-text transition-colors duration-200">
        {label}
      </span>
    </motion.button>
  );
}
