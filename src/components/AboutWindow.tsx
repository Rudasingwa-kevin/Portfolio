"use client";

import { motion } from "framer-motion";

const milestones = [
  {
    year: "2022",
    title: "Started University",
    desc: "Began BSc in Software Engineering at Kigali Independent University (ULK).",
  },
  {
    year: "2023",
    title: "Genzura Launch",
    desc: "Designed and developed Genzura, a legal technology platform for lawyers and law firms with auth, RBAC, and case management.",
  },
  {
    year: "2024",
    title: "Gisenyi.top Launch",
    desc: "Built a tourism and events platform promoting destinations around Lake Kivu and Gisenyi. Deployed to production.",
  },
  {
    year: "2025",
    title: "AI & Full-Stack Growth",
    desc: "Expanding expertise in AI, ASP.NET, and building production-ready applications across legal tech and tourism sectors.",
  },
];

export default function AboutWindow() {
  return (
    <div className="p-1 space-y-7">
      <motion.div
        className="flex items-start gap-5 p-4 rounded-xl bg-kevin-card/50 border border-kevin-border/50"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-kevin-accent to-kevin-accent2 flex items-center justify-center text-3xl flex-shrink-0 shadow-lg shadow-kevin-accent/20">
          👨‍💻
        </div>
        <div className="min-w-0">
          <h2 className="text-xl font-bold text-gradient">Ishimwe Kevin</h2>
          <p className="text-kevin-text2 text-sm mt-1">
            Software Engineer & Full-Stack Developer
          </p>
          <p className="text-kevin-text/80 text-[13px] mt-3 leading-relaxed">
            Year 3 Software Engineering student and Full-Stack Developer with practical
            experience building and deploying production-ready web applications. Passionate
            about solving real-world problems through technology and creating impactful
            digital products. Specializing in legal technology and tourism platforms.
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <h3 className="text-xs font-bold text-kevin-accent mb-4 font-mono tracking-wider">
          // EDUCATION
        </h3>
        <div className="flex items-start gap-3 p-3 rounded-lg bg-kevin-accent/5 border border-kevin-accent/10">
          <div className="w-2.5 h-2.5 rounded-full bg-kevin-accent flex-shrink-0 mt-1.5 shadow-sm shadow-kevin-accent/50" />
          <div>
            <h4 className="text-sm font-bold text-kevin-text">BSc in Software Engineering</h4>
            <p className="text-xs text-kevin-text2 mt-1">Kigali Independent University (ULK)</p>
            <p className="text-[11px] text-kevin-accent2 font-mono mt-1.5">Expected Graduation: 2027</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <h3 className="text-xs font-bold text-kevin-accent mb-4 font-mono tracking-wider">
          // MILESTONES
        </h3>
        <div className="space-y-0">
          {milestones.map((m, i) => (
            <motion.div
              key={m.year}
              className="flex gap-4 group"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.35 }}
            >
              <div className="flex flex-col items-center">
                <div className="w-2.5 h-2.5 rounded-full bg-kevin-accent flex-shrink-0 mt-1.5 shadow-sm shadow-kevin-accent/50 transition-shadow group-hover:shadow-md group-hover:shadow-kevin-accent/40" />
                {i < milestones.length - 1 && (
                  <div className="w-px flex-1 bg-gradient-to-b from-kevin-accent/30 to-kevin-border/30 mt-1" />
                )}
              </div>
              <div className="pb-5">
                <span className="text-[11px] font-mono text-kevin-accent2 bg-kevin-accent/10 px-2 py-0.5 rounded-md">{m.year}</span>
                <h4 className="text-sm font-bold text-kevin-text mt-1.5">{m.title}</h4>
                <p className="text-[12px] mt-1 text-kevin-text2/80 leading-relaxed">
                  {m.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
