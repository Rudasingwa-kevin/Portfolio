"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface ProjectsWindowProps {
  isLight: boolean;
  onOpenProject?: (name: string) => void;
}

const projects = [
  {
    id: "genzura",
    name: "Genzura",
    icon: "⚖️",
    tagline: "Legal Practice Management System",
    description:
      "A comprehensive platform for law firms to manage cases, clients, documents, and billing. Built with modern web technologies for efficiency and security.",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Tailwind CSS", "Stripe"],
    color: "from-blue-500 to-cyan-500",
    live: "https://genzura.com",
    github: "#",
  },
  {
    id: "gisenyi",
    name: "Gisenyi.top",
    icon: "🌍",
    tagline: "Tourism & Events Platform",
    description:
      "A tourism and events discovery platform showcasing the beauty of Gisenyi and surrounding areas. Features event listings, booking, and interactive maps.",
    tech: ["Next.js", "TypeScript", "MongoDB", "Mapbox", "Tailwind CSS", "Vercel"],
    color: "from-green-500 to-emerald-500",
    live: "https://gisenyi.top",
    github: "#",
  },
];

export default function ProjectsWindow({ isLight }: ProjectsWindowProps) {
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg">📦</span>
        <h2 className="text-sm font-bold text-kevin-accent font-mono">
          // INSTALLED APPLICATIONS
        </h2>
      </div>

      <div className="grid gap-4">
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            className={`rounded-xl border ${
              isLight ? "border-light-border bg-light-card" : "border-kevin-border bg-kevin-card"
            } overflow-hidden hover:border-kevin-accent/50 transition-colors`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className={`h-1.5 bg-gradient-to-r ${project.color}`} />

            <div className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{project.icon}</div>
                  <div>
                    <h3 className="font-bold text-kevin-text">{project.name}</h3>
                    <p className={`text-xs ${isLight ? "text-light-text2" : "text-kevin-text2"}`}>
                      {project.tagline}
                    </p>
                  </div>
                </div>
                <button
                  className={`text-xs px-2 py-1 rounded border ${
                    isLight
                      ? "border-light-border text-light-text2"
                      : "border-kevin-border text-kevin-text2"
                  } hover:border-kevin-accent hover:text-kevin-accent transition-colors`}
                  onClick={() =>
                    setExpandedProject(
                      expandedProject === project.id ? null : project.id
                    )
                  }
                >
                  {expandedProject === project.id ? "▲ Less" : "▼ More"}
                </button>
              </div>

              {expandedProject === project.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 space-y-3"
                >
                  <p className={`text-sm ${isLight ? "text-light-text" : "text-kevin-text"} leading-relaxed`}>
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] px-2 py-0.5 rounded-full bg-kevin-accent/10 text-kevin-accent border border-kevin-accent/20 font-mono"
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
                      className="text-xs px-3 py-1.5 rounded-lg bg-kevin-accent text-white hover:bg-kevin-accent/80 transition-colors font-medium"
                    >
                      ▶ Live Demo
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-xs px-3 py-1.5 rounded-lg border ${
                        isLight
                          ? "border-light-border text-light-text"
                          : "border-kevin-border text-kevin-text"
                      } hover:border-kevin-accent hover:text-kevin-accent transition-colors font-medium`}
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
