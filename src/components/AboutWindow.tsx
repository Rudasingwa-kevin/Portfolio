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
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-kevin-accent to-kevin-accent2 flex items-center justify-center text-3xl flex-shrink-0">
          👨‍💻
        </div>
        <div>
          <h2 className="text-xl font-bold text-gradient">Ishimwe Kevin</h2>
          <p className="text-kevin-text2 text-sm mt-1">
            Software Engineer & Full-Stack Developer
          </p>
          <p className="text-kevin-text text-sm mt-3 leading-relaxed">
            Year 3 Software Engineering student and Full-Stack Developer with practical
            experience building and deploying production-ready web applications. Passionate
            about solving real-world problems through technology and creating impactful
            digital products. Specializing in legal technology and tourism platforms.
          </p>
        </div>
      </div>

      <div className="border-t border-kevin-border pt-4">
        <h3 className="text-sm font-bold text-kevin-accent mb-4 font-mono">
          // EDUCATION
        </h3>
        <div className="flex items-start gap-3">
          <div className="w-3 h-3 rounded-full bg-kevin-accent border-2 border-kevin-accent2 flex-shrink-0 mt-1" />
          <div>
            <h4 className="text-sm font-bold text-kevin-text">BSc in Software Engineering</h4>
            <p className="text-xs text-kevin-text2 mt-0.5">Kigali Independent University (ULK)</p>
            <p className="text-[10px] text-kevin-accent2 font-mono mt-0.5">Expected Graduation: 2027</p>
          </div>
        </div>
      </div>

      <div className="border-t border-kevin-border pt-4">
        <h3 className="text-sm font-bold text-kevin-accent mb-4 font-mono">
          // MILESTONES
        </h3>
        <div className="space-y-4">
          {milestones.map((m, i) => (
            <motion.div
              key={m.year}
              className="flex gap-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-kevin-accent border-2 border-kevin-accent2 flex-shrink-0 mt-1" />
                {i < milestones.length - 1 && (
                  <div className="w-px flex-1 bg-kevin-border mt-1" />
                )}
              </div>
              <div className="pb-4">
                <span className="text-xs font-mono text-kevin-accent2">{m.year}</span>
                <h4 className="text-sm font-bold text-kevin-text mt-0.5">{m.title}</h4>
                <p className="text-xs mt-1 text-kevin-text2 leading-relaxed">
                  {m.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
