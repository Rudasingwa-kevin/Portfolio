"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function DesktopWidget() {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
      setDate(
        now.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
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
    <motion.div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1] pointer-events-none"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
    >
      <div className="text-center select-none">
        {/* Time */}
        <motion.div
          className="text-7xl sm:text-8xl font-light tracking-tighter"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.5) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {time}
        </motion.div>

        {/* Date */}
        <div className="text-sm sm:text-base mt-2 tracking-wide text-kevin-text2">
          {date}
        </div>

        {/* Divider line */}
        <motion.div
          className="mx-auto mt-5 mb-4 h-px"
          style={{
            width: "120px",
            background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.4), transparent)",
          }}
          initial={{ width: 0 }}
          animate={{ width: 120 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        />

        {/* Greeting + Name */}
        <div className="text-xs sm:text-sm tracking-widest uppercase text-kevin-text2">
          {greeting}, Visitor
        </div>
        <div className="text-lg sm:text-xl font-semibold mt-1 text-gradient">
          Welcome to KevinOS
        </div>
        <div className="text-xs mt-2 font-mono text-kevin-text2">
          Ishimwe Kevin &mdash; Software Engineer
        </div>

        {/* System stats row */}
        <div className="flex items-center justify-center gap-6 mt-6">
          {[
            { label: "UPTIME", value: "3+ yrs" },
            { label: "PROJECTS", value: "10+" },
            { label: "STATUS", value: "ACTIVE" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + i * 0.15 }}
            >
              <div className="text-[10px] font-mono text-kevin-accent tracking-wider">
                {stat.label}
              </div>
              <div className="text-sm font-bold mt-0.5 text-kevin-text">
                {stat.value}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
