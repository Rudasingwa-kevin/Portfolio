"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface ProjectsWindowProps {
  onOpenProject?: (name: string) => void;
}

const projects = [
  {
    id: "genzura",
    name: "Genzura",
    icon: "⚖️",
    tagline: "Legal Practice Management System",
    description:
      "Designed and developed a legal technology platform for lawyers and law firms. Implemented authentication, role-based access control, and modules for case and workflow management.",
    tech: ["React", "Node.js", "PostgreSQL", "Express.js"],
    color: "from-blue-500 to-cyan-500",
    live: "https://genzura-six.vercel.app/",
    github: "#",
  },
  {
    id: "gisenyi",
    name: "Gisenyi.top",
    icon: "🌍",
    tagline: "Tourism & Events Platform",
    description:
      "Built a tourism and events platform promoting destinations around Lake Kivu and Gisenyi. Implemented responsive design and SEO optimization. Deployed and maintained for public use.",
    tech: ["React", "Tailwind CSS", "Vercel"],
    color: "from-green-500 to-emerald-500",
    live: "https://gisenyi.top/",
    github: "#",
  },
];

export default function ProjectsWindow({ }: ProjectsWindowProps) {
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  return (
    <div className="p-1 space-y-5">
      <motion.div
        className="flex items-center gap-2.5"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div className="w-8 h-8 rounded-lg bg-kevin-accent/10 flex items-center justify-center text-lg">
          📦
        </div>
        <h2 className="text-xs font-bold text-kevin-accent font-mono tracking-wider">
          // INSTALLED APPLICATIONS
        </h2>
      </motion.div>

      <div className="space-y-4">
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            className="rounded-xl border border-kevin-border/60 bg-kevin-card/40 overflow-hidden hover:border-kevin-accent/40 transition-all duration-300 hover:shadow-lg hover:shadow-kevin-accent/5"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.12, duration: 0.4 }}
          >
            <div className={`h-1 bg-gradient-to-r ${project.color}`} />

            <div className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-kevin-card border border-kevin-border/50 flex items-center justify-center text-2xl shadow-sm">
                    {project.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-kevin-text text-[15px]">{project.name}</h3>
                    <p className="text-[12px] text-kevin-text2 mt-0.5">
                      {project.tagline}
                    </p>
                  </div>
                </div>
                <button
                  className="text-[11px] px-2.5 py-1.5 rounded-lg border border-kevin-border/60 text-kevin-text2 hover:border-kevin-accent/50 hover:text-kevin-accent hover:bg-kevin-accent/5 transition-all duration-200 flex-shrink-0 font-medium"
                  onClick={() =>
                    setExpandedProject(
                      expandedProject === project.id ? null : project.id
                    )
                  }
                >
                  {expandedProject === project.id ? "Less" : "Details"}
                </button>
              </div>

              {expandedProject === project.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-4 space-y-3.5 pt-4 border-t border-kevin-border/40"
                >
                  <p className="text-[13px] text-kevin-text/80 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] px-2.5 py-1 rounded-md bg-kevin-accent/8 text-kevin-accent border border-kevin-accent/15 font-mono font-medium"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2 pt-1">
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[12px] px-3.5 py-2 rounded-lg bg-kevin-accent text-white hover:bg-kevin-accent/85 transition-all duration-200 font-medium shadow-sm shadow-kevin-accent/20"
                    >
                      ▶ Live Demo
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[12px] px-3.5 py-2 rounded-lg border border-kevin-border/60 text-kevin-text hover:border-kevin-accent/50 hover:text-kevin-accent hover:bg-kevin-accent/5 transition-all duration-200 font-medium"
                    >
                      ⟁ GitHub
                    </a>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
