"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { FolderOpen, ExternalLink, GitBranch, Scale, Globe } from "lucide-react";

interface ProjectsWindowProps {
  onOpenProject?: (name: string) => void;
}

const projects = [
  {
    id: "genzura",
    name: "Genzura",
    icon: Scale,
    tagline: "Legal Practice Management System",
    description:
      "Designed and developed a legal technology platform for lawyers and law firms. Implemented authentication, role-based access control, and modules for case and workflow management.",
    tech: ["React", "Node.js", "PostgreSQL", "Express.js"],
    color: "from-blue-500 to-cyan-500",
    status: "Live",
    live: "https://genzura-six.vercel.app/",
    github: "https://github.com/Rudasingwa-kevin/Genzura",
  },
  {
    id: "gisenyi",
    name: "Gisenyi.top",
    icon: Globe,
    tagline: "Tourism & Events Platform",
    description:
      "Built a tourism and events platform promoting destinations around Lake Kivu and Gisenyi. Implemented responsive design and SEO optimization. Deployed and maintained for public use.",
    tech: ["React", "Tailwind CSS", "Vercel"],
    color: "from-green-500 to-emerald-500",
    status: "Live",
    live: "https://gisenyi.top/",
    github: "https://github.com/Rudasingwa-kevin/Gisenyi",
  },
];

export default function ProjectsWindow({ }: ProjectsWindowProps) {
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  return (
    <div className="space-y-5">
      <motion.div
        className="flex items-center gap-2.5"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div className="w-8 h-8 rounded-lg bg-kevin-accent/10 flex items-center justify-center">
          <FolderOpen className="w-4 h-4 text-kevin-accent" />
        </div>
        <h2 className="text-[11px] font-bold text-kevin-accent font-mono tracking-wider">
          // INSTALLED APPLICATIONS
        </h2>
      </motion.div>

      <div className="space-y-3">
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            className="rounded-2xl border border-kevin-border/40 bg-kevin-card/30 overflow-hidden hover:border-kevin-accent/30 transition-all duration-300"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.1, duration: 0.4 }}
          >
            <div className={`h-1 bg-gradient-to-r ${project.color}`} />
            <div className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-kevin-card border border-kevin-border/40 flex items-center justify-center shadow-sm">
                    <project.icon className="w-5 h-5 text-kevin-accent" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-[14px] font-bold text-kevin-text">{project.name}</h3>
                      <span className="text-[9px] font-mono text-kevin-success bg-kevin-success/10 px-1.5 py-0.5 rounded-md font-bold">
                        ● {project.status}
                      </span>
                    </div>
                    <p className="text-[12px] text-kevin-text2 mt-0.5">
                      {project.tagline}
                    </p>
                  </div>
                </div>
                <button
                  className="text-[11px] px-3 py-1.5 rounded-lg border border-kevin-border/50 text-kevin-text2 hover:border-kevin-accent/40 hover:text-kevin-accent hover:bg-kevin-accent/5 transition-all duration-200 flex-shrink-0 font-medium"
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
                  className="mt-4 pt-4 border-t border-kevin-border/30 space-y-4"
                >
                  <p className="text-[13px] text-kevin-text/75 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] px-2.5 py-1 rounded-lg bg-kevin-accent/8 text-kevin-accent border border-kevin-accent/15 font-mono font-medium"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[12px] px-4 py-2 rounded-xl bg-kevin-accent text-white hover:bg-kevin-accent/85 transition-all duration-200 font-medium shadow-sm shadow-kevin-accent/20"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Live Demo
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[12px] px-4 py-2 rounded-xl border border-kevin-border/50 text-kevin-text hover:border-kevin-accent/40 hover:text-kevin-accent hover:bg-kevin-accent/5 transition-all duration-200 font-medium"
                    >
                      <GitBranch className="w-3.5 h-3.5" />
                      GitHub
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
