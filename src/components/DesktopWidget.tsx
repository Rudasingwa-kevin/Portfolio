"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Monitor } from "lucide-react";

export default function DesktopWidget() {
  const [time, setTime] = useState({ hours: "", minutes: "", seconds: "" });
  const [date, setDate] = useState("");
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime({
        hours: now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          hour12: false,
        }),
        minutes: now.toLocaleTimeString("en-US", {
          minute: "2-digit",
          hour12: false,
        }),
        seconds: now.toLocaleTimeString("en-US", {
          second: "2-digit",
          hour12: false,
        }),
      });
      setDate(
        now.toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
        })
      );
      const hour = now.getHours();
      if (hour < 12) setGreeting("Good Morning");
      else if (hour < 17) setGreeting("Good Afternoon");
      else setGreeting("Good Evening");
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Center: Clock + Date */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1] pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <div className="text-center select-none">
          {/* Time */}
          <motion.div
            className="flex items-baseline justify-center gap-1 sm:gap-2"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          >
            <span
              className="text-7xl sm:text-8xl md:text-9xl font-extralight tracking-tighter tabular-nums"
              style={{
                background: "linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.55) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {time.hours}
            </span>
            <motion.span
              className="text-5xl sm:text-6xl md:text-7xl font-extralight text-kevin-accent/50 -mx-1"
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              :
            </motion.span>
            <span
              className="text-7xl sm:text-8xl md:text-9xl font-extralight tracking-tighter tabular-nums"
              style={{
                background: "linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.55) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {time.minutes}
            </span>
            <motion.span
              className="text-5xl sm:text-6xl md:text-7xl font-extralight text-kevin-accent/50 -mx-1"
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              :
            </motion.span>
            <span className="text-2xl sm:text-3xl md:text-4xl font-extralight tracking-tighter tabular-nums text-kevin-text2/40">
              {time.seconds}
            </span>
          </motion.div>

          {/* Date */}
          <motion.p
            className="text-xs sm:text-sm mt-4 font-mono tracking-wider text-kevin-text2/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            {date}
          </motion.p>

          {/* Stats */}
          <motion.div
            className="flex items-center justify-center gap-8 sm:gap-12 mt-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
          >
            {[
              { label: "UPTIME", value: "3+ yrs" },
              { label: "PROJECTS", value: "10+" },
              { label: "STATUS", value: "ACTIVE" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 + i * 0.1, duration: 0.5 }}
              >
                <div className="text-[9px] sm:text-[10px] font-mono tracking-[0.2em] text-kevin-accent/60 mb-1">
                  {stat.label}
                </div>
                <div className="text-sm sm:text-base font-semibold text-kevin-text/80 tabular-nums">
                  {stat.value}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom-Right: Greeting + Welcome */}
      <motion.div
        className="absolute bottom-20 right-4 sm:right-6 z-[2] pointer-events-none"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
      >
        <div className="flex items-center gap-3 select-none">
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-2">
              <span className="text-kevin-text2/50 text-xs font-mono tracking-wide">
                {greeting}, Visitor
              </span>
              <Monitor size={14} className="text-kevin-accent/50" />
            </div>
            <p className="text-sm sm:text-base mt-0.5">
              <span className="text-kevin-text2/40 font-light">Welcome to </span>
              <span className="text-gradient font-bold">KevinOS</span>
            </p>
          </div>
        </div>
      </motion.div>
    </>
  );
}
