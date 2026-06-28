"use client";

import { motion } from "framer-motion";

interface SkillsWindowProps {
  isLight: boolean;
}

const engines = [
  {
    name: "Frontend Engine",
    icon: "🎨",
    version: "v4.2.0",
    status: "active",
    color: "text-blue-400",
    skills: [
      { name: "React / Next.js", level: 95 },
      { name: "TypeScript", level: 92 },
      { name: "Tailwind CSS", level: 95 },
      { name: "Framer Motion", level: 85 },
      { name: "HTML / CSS / JS", level: 98 },
    ],
  },
  {
    name: "Backend Engine",
    icon: "⚙️",
    version: "v3.8.1",
    status: "active",
    color: "text-green-400",
    skills: [
      { name: "Node.js / Express", level: 90 },
      { name: "Python / Django", level: 85 },
      { name: "REST & GraphQL APIs", level: 88 },
      { name: "Authentication / JWT", level: 90 },
      { name: "Microservices", level: 80 },
    ],
  },
  {
    name: "Database Engine",
    icon: "🗄️",
    version: "v3.1.0",
    status: "active",
    color: "text-purple-400",
    skills: [
      { name: "PostgreSQL", level: 90 },
      { name: "MongoDB", level: 88 },
      { name: "Redis", level: 82 },
      { name: "Prisma ORM", level: 90 },
      { name: "Database Design", level: 85 },
    ],
  },
  {
    name: "DevOps Engine",
    icon: "🚀",
    version: "v2.5.0",
    status: "active",
    color: "text-cyan-400",
    skills: [
      { name: "Docker", level: 85 },
      { name: "AWS / Cloud Services", level: 80 },
      { name: "CI/CD Pipelines", level: 82 },
      { name: "Git / GitHub Actions", level: 90 },
      { name: "Linux / Shell", level: 85 },
    ],
  },
];

export default function SkillsWindow({ isLight }: SkillsWindowProps) {
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
            className={`rounded-xl border ${
              isLight ? "border-light-border bg-light-card" : "border-kevin-border bg-kevin-card"
            } p-4`}
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
                    <span className={`${isLight ? "text-light-text" : "text-kevin-text"}`}>
                      {skill.name}
                    </span>
                    <span className="text-kevin-text2 font-mono">{skill.level}%</span>
                  </div>
                  <div className={`w-full h-1.5 rounded-full ${isLight ? "bg-light-border" : "bg-kevin-border"}`}>
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
