"use client";

import { motion } from "framer-motion";

interface ThemeToggleProps {
  isLight: boolean;
  onToggle: () => void;
}

export default function ThemeToggle({ isLight, onToggle }: ThemeToggleProps) {
  return (
    <motion.button
      onClick={onToggle}
      className={`fixed top-3 right-3 z-[100] w-10 h-10 rounded-xl border flex items-center justify-center text-lg transition-colors ${
        isLight
          ? "bg-light-card border-light-border hover:border-kevin-accent"
          : "bg-kevin-card border-kevin-border hover:border-kevin-accent"
      }`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Toggle theme"
    >
      {isLight ? "🌙" : "☀️"}
    </motion.button>
  );
}
