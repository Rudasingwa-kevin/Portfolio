"use client";

import { motion } from "framer-motion";
import { User, GraduationCap, Calendar, Rocket, Briefcase, Users, Activity } from "lucide-react";

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

const stats = [
  { label: "Years", value: "3+", icon: Calendar },
  { label: "Projects", value: "10+", icon: Rocket },
  { label: "Clients", value: "5+", icon: Users },
  { label: "Status", value: "Active", icon: Activity },
];

export default function AboutWindow() {
  return (
    <div className="space-y-5">
      {/* Profile Card */}
      <motion.div
        className="relative overflow-hidden rounded-2xl border border-kevin-border/40"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-kevin-accent/8 via-transparent to-kevin-accent2/5" />
        <div className="relative p-5">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-kevin-accent to-kevin-accent2 flex items-center justify-center flex-shrink-0 shadow-lg shadow-kevin-accent/25 ring-2 ring-kevin-accent/20">
              <User className="w-7 h-7 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-xl font-bold text-gradient">Ishimwe Kevin</h2>
              <p className="text-kevin-accent text-[13px] font-medium mt-0.5">
                Software Engineer & Full-Stack Developer
              </p>
              <p className="text-kevin-text/70 text-[13px] mt-3 leading-relaxed">
                Year 3 Software Engineering student and Full-Stack Developer with practical
                experience building and deploying production-ready web applications. Passionate
                about solving real-world problems through technology and creating impactful
                digital products.
              </p>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-4 gap-2 mt-5">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="text-center py-2.5 rounded-xl bg-kevin-card/60 border border-kevin-border/30"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + i * 0.05, duration: 0.3 }}
              >
                <stat.icon className="w-4 h-4 text-kevin-accent mx-auto" />
                <div className="text-sm font-bold text-kevin-text mt-1">{stat.value}</div>
                <div className="text-[10px] text-kevin-text2 mt-0.5">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Education */}
      <motion.div
        className="rounded-2xl border border-kevin-border/40 bg-kevin-card/30 overflow-hidden"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <div className="px-4 py-3 border-b border-kevin-border/30 bg-kevin-accent/5">
          <h3 className="text-[11px] font-bold text-kevin-accent font-mono tracking-wider">
            // EDUCATION
          </h3>
        </div>
        <div className="p-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-kevin-accent/10 border border-kevin-accent/15 flex items-center justify-center flex-shrink-0">
              <GraduationCap className="w-5 h-5 text-kevin-accent" />
            </div>
            <div>
              <h4 className="text-[13px] font-bold text-kevin-text">BSc in Software Engineering</h4>
              <p className="text-[12px] text-kevin-text2 mt-0.5">Kigali Independent University (ULK)</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[10px] font-mono text-kevin-accent2 bg-kevin-accent2/10 px-2 py-0.5 rounded-md">
                  2023 - 2027
                </span>
                <span className="text-[10px] font-mono text-kevin-success bg-kevin-success/10 px-2 py-0.5 rounded-md">
                  ● In Progress
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Milestones */}
      <motion.div
        className="rounded-2xl border border-kevin-border/40 bg-kevin-card/30 overflow-hidden"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <div className="px-4 py-3 border-b border-kevin-border/30 bg-kevin-accent/5">
          <h3 className="text-[11px] font-bold text-kevin-accent font-mono tracking-wider">
            // MILESTONES
          </h3>
        </div>
        <div className="p-4 space-y-0">
          {milestones.map((m, i) => (
            <motion.div
              key={m.year}
              className="flex gap-3 group"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.08, duration: 0.3 }}
            >
              <div className="flex flex-col items-center pt-1">
                <div className="w-2 h-2 rounded-full bg-kevin-accent flex-shrink-0 shadow-sm shadow-kevin-accent/40" />
                {i < milestones.length - 1 && (
                  <div className="w-px flex-1 bg-kevin-border/40 mt-1" />
                )}
              </div>
              <div className={`flex-1 ${i < milestones.length - 1 ? "pb-4" : ""}`}>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold text-kevin-accent2 bg-kevin-accent2/10 px-2 py-0.5 rounded-md">
                    {m.year}
                  </span>
                  <h4 className="text-[13px] font-bold text-kevin-text">{m.title}</h4>
                </div>
                <p className="text-[12px] mt-1 text-kevin-text2/70 leading-relaxed pl-0">
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
