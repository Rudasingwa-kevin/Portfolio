"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { version } from "../../package.json";

const bootLines = [
  { text: `> Loading KevinOS v${version}...`, delay: 0 },
  { text: "> Initializing kernel modules...", delay: 400 },
  { text: "> Mounting project drivers...", delay: 800 },
  { text: "> Loading skill engines...", delay: 1200 },
  { text: "> Calibrating neural interfaces...", delay: 1600 },
  { text: "> Initializing Projects...", delay: 2000 },
  { text: "> Verifying achievement badges...", delay: 2400 },
  { text: "> System ready.", delay: 2800 },
  { text: "", delay: 3000 },
  { text: "  Welcome to Ishimwe Kevin's Digital Workspace.", delay: 3200 },
  { text: "  -----------------------------------------------", delay: 3400 },
  { text: '  Type "help" in the terminal for available commands.', delay: 3600 },
];

interface BootScreenProps {
  onComplete: () => void;
}

export default function BootScreen({ onComplete }: BootScreenProps) {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const lineTimers = bootLines.map((line, index) =>
      setTimeout(() => {
        setVisibleLines(index + 1);
      }, line.delay)
    );

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 70);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 4200);

    return () => {
      lineTimers.forEach(clearTimeout);
      clearInterval(progressInterval);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "#0a0a0f" }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full max-w-2xl px-6">
        <div className="glass-panel p-8 glow-blue">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="ml-4 text-kevin-text2 text-sm font-mono">
              kevinos-boot
            </span>
          </div>

          <div className="font-mono text-sm space-y-1 min-h-[280px]">
            {bootLines.slice(0, visibleLines).map((line, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className={
                  index === bootLines.length - 1 || index === bootLines.length - 2
                    ? "text-kevin-accent font-bold text-base"
                    : index === bootLines.length - 3
                    ? "text-kevin-accent2"
                    : "text-kevin-text2"
                }
              >
                {line.text}
                {index === visibleLines - 1 && index < bootLines.length - 1 && (
                  <span className="cursor-blink inline-block w-2 h-4 bg-kevin-accent ml-1 align-middle" />
                )}
              </motion.div>
            ))}
          </div>

          <div className="mt-6">
            <div className="flex justify-between text-xs text-kevin-text2 mb-2 font-mono">
              <span>System Boot</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full h-1.5 bg-kevin-border rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, var(--color-kevin-accent), var(--color-kevin-accent2))",
                }}
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="scanline" />
    </motion.div>
  );
}
