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
      className="flex flex-col items-center gap-1.5 p-2 rounded-lg hover:bg-white/5 transition-colors w-[80px] h-[90px] justify-center"
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="w-12 h-12 rounded-xl bg-kevin-card border border-kevin-border flex items-center justify-center text-2xl hover:border-kevin-accent transition-colors">
        {icon}
      </div>
      <span className="text-[11px] text-kevin-text2 text-center leading-tight font-medium">
        {label}
      </span>
    </motion.button>
  );
}
