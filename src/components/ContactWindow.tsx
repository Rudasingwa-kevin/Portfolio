"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, GitBranch, Phone, Send } from "lucide-react";

export default function ContactWindow() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setFormState({ name: "", email: "", message: "" });
    }, 3000);
  };

  return (
    <div className="space-y-5">
      <motion.div
        className="flex items-center gap-2.5"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div className="w-8 h-8 rounded-lg bg-kevin-accent/10 flex items-center justify-center">
          <Mail className="w-4 h-4 text-kevin-accent" />
        </div>
        <h2 className="text-[11px] font-bold text-kevin-accent font-mono tracking-wider">
          // MESSAGE CONSOLE
        </h2>
      </motion.div>

      {/* Contact Links */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-3 gap-2"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        {[
          {
            icon: GitBranch,
            label: "GitHub",
            value: "Rudasingwa-kevin",
            href: "https://github.com/Rudasingwa-kevin",
          },
          {
            icon: Mail,
            label: "Email",
            value: "kevincracker02@gmail.com",
            href: "mailto:kevincracker02@gmail.com",
          },
          {
            icon: Phone,
            label: "Phone",
            value: "+250 782 028 955",
            href: "tel:+250782028955",
          },
        ].map((link, i) => (
          <motion.a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2 p-4 rounded-2xl border border-kevin-border/40 bg-kevin-card/30 hover:border-kevin-accent/30 hover:bg-kevin-accent/5 transition-all duration-200 group text-center"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.05, duration: 0.3 }}
          >
            <div className="w-10 h-10 rounded-xl bg-kevin-card/60 border border-kevin-border/40 flex items-center justify-center shadow-sm group-hover:border-kevin-accent/30 transition-colors">
              <link.icon className="w-5 h-5 text-kevin-text2 group-hover:text-kevin-accent transition-colors" />
            </div>
            <div>
              <span className="text-[12px] font-bold text-kevin-text block">{link.label}</span>
              <span className="text-[10px] text-kevin-text2 group-hover:text-kevin-accent transition-colors">
                {link.value}
              </span>
            </div>
          </motion.a>
        ))}
      </motion.div>

      {/* Contact Form */}
      <motion.div
        className="rounded-2xl border border-kevin-border/40 bg-kevin-card/30 overflow-hidden"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <div className="px-4 py-3 border-b border-kevin-border/30 bg-kevin-accent/5">
          <h3 className="text-[11px] font-bold text-kevin-accent font-mono tracking-wider">
            // COMPOSE MESSAGE
          </h3>
        </div>
        <form onSubmit={handleSubmit} className="p-4 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] text-kevin-text2 font-mono mb-1.5 block">
                &gt; name:
              </label>
              <input
                type="text"
                value={formState.name}
                onChange={(e) =>
                  setFormState((s) => ({ ...s, name: e.target.value }))
                }
                className="w-full px-3.5 py-2.5 rounded-xl border text-[13px] font-mono outline-none transition-all duration-200 bg-kevin-bg/50 border-kevin-border/40 text-kevin-text focus:border-kevin-accent/50 focus:bg-kevin-bg/80"
                placeholder="Your name"
                required
              />
            </div>
            <div>
              <label className="text-[11px] text-kevin-text2 font-mono mb-1.5 block">
                &gt; email:
              </label>
              <input
                type="email"
                value={formState.email}
                onChange={(e) =>
                  setFormState((s) => ({ ...s, email: e.target.value }))
                }
                className="w-full px-3.5 py-2.5 rounded-xl border text-[13px] font-mono outline-none transition-all duration-200 bg-kevin-bg/50 border-kevin-border/40 text-kevin-text focus:border-kevin-accent/50 focus:bg-kevin-bg/80"
                placeholder="your@email.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] text-kevin-text2 font-mono mb-1.5 block">
              &gt; message:
            </label>
            <textarea
              value={formState.message}
              onChange={(e) =>
                setFormState((s) => ({ ...s, message: e.target.value }))
              }
              rows={4}
              className="w-full px-3.5 py-2.5 rounded-xl border text-[13px] font-mono outline-none resize-none transition-all duration-200 bg-kevin-bg/50 border-kevin-border/40 text-kevin-text focus:border-kevin-accent/50 focus:bg-kevin-bg/80"
              placeholder="Type your message here..."
              required
            />
          </div>

          <motion.button
            type="submit"
            className={`w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl font-mono text-[13px] font-bold transition-all duration-300 ${
              sent
                ? "bg-kevin-success text-white shadow-lg shadow-kevin-success/20"
                : "bg-kevin-accent text-white hover:bg-kevin-accent/85 shadow-sm shadow-kevin-accent/20 hover:shadow-md hover:shadow-kevin-accent/25"
            }`}
            whileTap={{ scale: 0.98 }}
          >
            <Send className="w-3.5 h-3.5" />
            {sent ? "Message Sent!" : "send_message"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
