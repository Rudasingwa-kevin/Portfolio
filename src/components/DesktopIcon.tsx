"use client";

import { motion } from "framer-motion";

interface DesktopIconProps {
  icon: string;
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
      className="group flex flex-col items-center gap-1.5 p-2.5 rounded-xl hover:bg-white/[0.03] transition-all duration-200 w-[82px] h-[92px] justify-center"
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4, ease: "easeOut" }}
      whileHover={{ scale: 1.08, y: -2 }}
      whileTap={{ scale: 0.92 }}
    >
      <div className="relative w-12 h-12 rounded-xl bg-kevin-card border border-kevin-border flex items-center justify-center text-2xl transition-all duration-200 group-hover:border-kevin-accent/50 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.15)]">
        {icon}
        <div className="absolute inset-0 rounded-xl bg-kevin-accent/0 group-hover:bg-kevin-accent/5 transition-colors duration-200" />
      </div>
      <span className="text-[11px] text-kevin-text2 text-center leading-tight font-medium group-hover:text-kevin-text transition-colors duration-200">
        {label}
      </span>
    </motion.button>
  );
}
