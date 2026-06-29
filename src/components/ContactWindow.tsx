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
    <div className="space-y-5">
      <div className="flex items-center gap-2">
        <span className="text-lg">📬</span>
        <h2 className="text-sm font-bold text-kevin-accent font-mono">
          // MESSAGE CONSOLE
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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
            className="flex items-center gap-2 p-3 rounded-xl border border-kevin-border bg-kevin-card hover:border-kevin-accent transition-colors group"
          >
            <span className="text-xl">{link.icon}</span>
            <div>
              <span className="text-xs font-bold text-kevin-text block">{link.label}</span>
              <span className="text-[10px] text-kevin-text2 group-hover:text-kevin-accent transition-colors">
                {link.value}
              </span>
            </div>
          </a>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-kevin-text2 font-mono mb-1 block">
              &gt; name:
            </label>
            <input
              type="text"
              value={formState.name}
              onChange={(e) =>
                setFormState((s) => ({ ...s, name: e.target.value }))
              }
              className="w-full px-3 py-2 rounded-lg border text-sm font-mono outline-none transition-colors bg-kevin-bg border-kevin-border text-kevin-text focus:border-kevin-accent"
              placeholder="Your name"
              required
            />
          </div>
          <div>
            <label className="text-xs text-kevin-text2 font-mono mb-1 block">
              &gt; email:
            </label>
            <input
              type="email"
              value={formState.email}
              onChange={(e) =>
                setFormState((s) => ({ ...s, email: e.target.value }))
              }
              className="w-full px-3 py-2 rounded-lg border text-sm font-mono outline-none transition-colors bg-kevin-bg border-kevin-border text-kevin-text focus:border-kevin-accent"
              placeholder="your@email.com"
              required
            />
          </div>
        </div>

        <div>
          <label className="text-xs text-kevin-text2 font-mono mb-1 block">
            &gt; message:
          </label>
          <textarea
            value={formState.message}
            onChange={(e) =>
              setFormState((s) => ({ ...s, message: e.target.value }))
            }
            rows={4}
            className="w-full px-3 py-2 rounded-lg border text-sm font-mono outline-none resize-none transition-colors bg-kevin-bg border-kevin-border text-kevin-text focus:border-kevin-accent"
            placeholder="Type your message here..."
            required
          />
        </div>

        <motion.button
          type="submit"
          className={`w-full py-2.5 rounded-lg font-mono text-sm font-bold transition-all ${
            sent
              ? "bg-kevin-success text-white"
              : "bg-kevin-accent text-white hover:bg-kevin-accent/80"
          }`}
          whileTap={{ scale: 0.98 }}
        >
          {sent ? "✓ Message Sent!" : "> send_message"}
        </motion.button>
      </form>
    </div>
  );
}
