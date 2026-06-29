"use client";

import { motion } from "framer-motion";

const engines = [
  {
    name: "Languages & Frameworks",
    icon: "🎨",
    version: "",
    status: "active",
    color: "text-blue-400",
    skills: [
      { name: "JavaScript", level: 90 },
      { name: "React.js / Next.js", level: 90 },
      { name: "Node.js / Express.js", level: 88 },
      { name: "Tailwind CSS", level: 90 },
      { name: "C# / ASP.NET", level: 75 },
      { name: "SQL", level: 80 },
    ],
  },
  {
    name: "Databases",
    icon: "🗄️",
    version: "",
    status: "active",
    color: "text-purple-400",
    skills: [
      { name: "PostgreSQL", level: 85 },
      { name: "MongoDB", level: 80 },
      { name: "MySQL", level: 75 },
    ],
  },
  {
    name: "Tools & Deployment",
    icon: "🚀",
    version: "",
    status: "active",
    color: "text-cyan-400",
    skills: [
      { name: "Git / GitHub", level: 88 },
      { name: "Linux", level: 80 },
      { name: "Vercel", level: 85 },
      { name: "Railway", level: 75 },
      { name: "Render", level: 75 },
    ],
  },
];

export default function SkillsWindow() {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2">
        <span className="text-lg">🧩</span>
        <h2 className="text-sm font-bold text-kevin-accent font-mono">
          // SYSTEM MODULES
        </h2>
      </div>

      <div className="grid gap-4">
        {engines.map((engine, i) => (
          <motion.div
            key={engine.name}
            className="rounded-xl border border-kevin-border bg-kevin-card p-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">{engine.icon}</span>
                <div>
                  <h3 className="text-sm font-bold text-kevin-text">{engine.name}</h3>
                  <span className="text-[10px] font-mono text-kevin-text2">
                    {engine.version}
                  </span>
                </div>
              </div>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${engine.color} border-current/20`}>
                ● {engine.status}
              </span>
            </div>

            <div className="space-y-2.5">
              {engine.skills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-kevin-text">
                      {skill.name}
                    </span>
                    <span className="text-kevin-text2 font-mono">{skill.level}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-kevin-border">
                    <motion.div
                      className={`h-full rounded-full bg-gradient-to-r ${engine.color.replace("text-", "from-")}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ delay: i * 0.1 + 0.3, duration: 0.8, ease: "easeOut" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
