"use client";

import { motion } from "framer-motion";

const engines = [
  {
    name: "Languages & Frameworks",
    icon: "🎨",
    version: "",
    status: "active",
    color: "text-blue-400",
    barFrom: "from-blue-500",
    barTo: "to-cyan-400",
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
    barFrom: "from-purple-500",
    barTo: "to-violet-400",
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
    barFrom: "from-cyan-500",
    barTo: "to-teal-400",
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
    <div className="p-1 space-y-5">
      <motion.div
        className="flex items-center gap-2.5"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div className="w-8 h-8 rounded-lg bg-kevin-accent/10 flex items-center justify-center text-lg">
          🧩
        </div>
        <h2 className="text-xs font-bold text-kevin-accent font-mono tracking-wider">
          // SYSTEM MODULES
        </h2>
      </motion.div>

      <div className="space-y-4">
        {engines.map((engine, i) => (
          <motion.div
            key={engine.name}
            className="rounded-xl border border-kevin-border/60 bg-kevin-card/40 p-4 hover:border-kevin-accent/30 transition-all duration-300"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.1, duration: 0.4 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-kevin-card border border-kevin-border/50 flex items-center justify-center text-lg shadow-sm">
                  {engine.icon}
                </div>
                <div>
                  <h3 className="text-[13px] font-bold text-kevin-text">{engine.name}</h3>
                  <span className="text-[10px] font-mono text-kevin-text2">
                    {engine.version}
                  </span>
                </div>
              </div>
              <span className={`text-[10px] font-mono px-2.5 py-1 rounded-md border ${engine.color} border-current/15 bg-current/5`}>
                ● {engine.status}
              </span>
            </div>

            <div className="space-y-3">
              {engine.skills.map((skill, j) => (
                <div key={skill.name}>
                  <div className="flex justify-between text-[12px] mb-1.5">
                    <span className="text-kevin-text font-medium">
                      {skill.name}
                    </span>
                    <span className="text-kevin-text2 font-mono text-[11px]">{skill.level}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-kevin-border/50 overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full bg-gradient-to-r ${engine.barFrom} ${engine.barTo}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ delay: 0.3 + i * 0.1 + j * 0.05, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
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
