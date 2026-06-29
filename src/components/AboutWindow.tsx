"use client";

import { motion } from "framer-motion";

const milestones = [
  {
    year: "2020",
    title: "First Line of Code",
    desc: "Wrote my first Python script. The spark of curiosity ignited a passion for building with code.",
  },
  {
    year: "2021",
    title: "Web Development Journey",
    desc: "Dived deep into HTML, CSS, JavaScript, and React. Built my first full-stack application.",
  },
  {
    year: "2022",
    title: "University & Open Source",
    desc: "Started Computer Science studies. Contributed to open source projects and led dev communities.",
  },
  {
    year: "2023",
    title: "Genzura Launch",
    desc: "Architected and launched Genzura, a comprehensive Legal Practice Management System.",
  },
  {
    year: "2024",
    title: "Gisenyi.top & Growth",
    desc: "Built Gisenyi.top tourism platform. Expanded expertise in cloud architecture and DevOps.",
  },
  {
    year: "2025",
    title: "Full-Stack Mastery",
    desc: "Mastering distributed systems, microservices, and leading engineering teams.",
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
            Software Engineer & Digital Architect
          </p>
          <p className="text-kevin-text text-sm mt-3 leading-relaxed">
            I&apos;m a software engineer who believes in building software that feels alive.
            From writing my first line of code to architecting full-stack systems,
            I&apos;ve been driven by the desire to create technology that makes a real difference.
            I specialize in building scalable web applications, crafting intuitive user experiences,
            and designing systems that solve complex problems. When I&apos;m not coding,
            I&apos;m exploring new technologies, contributing to open source, or mentoring aspiring developers.
          </p>
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
