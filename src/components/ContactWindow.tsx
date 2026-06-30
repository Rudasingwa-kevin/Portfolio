"use client";

import { motion } from "framer-motion";
import { useState } from "react";

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
    <div className="p-1 space-y-5">
      <motion.div
        className="flex items-center gap-2.5"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div className="w-8 h-8 rounded-lg bg-kevin-accent/10 flex items-center justify-center text-lg">
          📬
        </div>
        <h2 className="text-xs font-bold text-kevin-accent font-mono tracking-wider">
          // MESSAGE CONSOLE
        </h2>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-3 gap-2.5"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        {[
          {
            icon: "🐙",
            label: "GitHub",
            value: "github.com/Rudasingwa-kevin",
            href: "https://github.com/Rudasingwa-kevin",
          },
          {
            icon: "📧",
            label: "Email",
            value: "kevincracker02@gmail.com",
            href: "mailto:kevincracker02@gmail.com",
          },
          {
            icon: "📞",
            label: "Phone",
            value: "+250 782 028 955",
            href: "tel:+250782028955",
          },
        ].map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 p-3 rounded-xl border border-kevin-border/50 bg-kevin-card/30 hover:border-kevin-accent/40 hover:bg-kevin-accent/5 transition-all duration-200 group"
          >
            <div className="w-9 h-9 rounded-lg bg-kevin-card border border-kevin-border/40 flex items-center justify-center text-lg shadow-sm group-hover:border-kevin-accent/30 transition-colors">
              {link.icon}
            </div>
            <div className="min-w-0">
              <span className="text-[12px] font-bold text-kevin-text block">{link.label}</span>
              <span className="text-[10px] text-kevin-text2 group-hover:text-kevin-accent transition-colors truncate block">
                {link.value}
              </span>
            </div>
          </a>
        ))}
      </motion.div>

      <motion.form
        onSubmit={handleSubmit}
        className="space-y-3"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
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
              className="w-full px-3.5 py-2.5 rounded-xl border text-[13px] font-mono outline-none transition-all duration-200 bg-kevin-card/30 border-kevin-border/50 text-kevin-text focus:border-kevin-accent/60 focus:bg-kevin-card/50 focus:shadow-sm focus:shadow-kevin-accent/5"
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
              className="w-full px-3.5 py-2.5 rounded-xl border text-[13px] font-mono outline-none transition-all duration-200 bg-kevin-card/30 border-kevin-border/50 text-kevin-text focus:border-kevin-accent/60 focus:bg-kevin-card/50 focus:shadow-sm focus:shadow-kevin-accent/5"
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
            className="w-full px-3.5 py-2.5 rounded-xl border text-[13px] font-mono outline-none resize-none transition-all duration-200 bg-kevin-card/30 border-kevin-border/50 text-kevin-text focus:border-kevin-accent/60 focus:bg-kevin-card/50 focus:shadow-sm focus:shadow-kevin-accent/5"
            placeholder="Type your message here..."
            required
          />
        </div>

        <motion.button
          type="submit"
          className={`w-full py-2.5 rounded-xl font-mono text-[13px] font-bold transition-all duration-300 ${
            sent
              ? "bg-kevin-success text-white shadow-lg shadow-kevin-success/20"
              : "bg-kevin-accent text-white hover:bg-kevin-accent/85 shadow-sm shadow-kevin-accent/20 hover:shadow-md hover:shadow-kevin-accent/25"
          }`}
          whileTap={{ scale: 0.98 }}
        >
          {sent ? "✓ Message Sent!" : "> send_message"}
        </motion.button>
      </motion.form>
    </div>
  );
}
