"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect, useCallback } from "react";
import { APP_VERSION } from "@/lib/version";

interface TerminalWindowProps {
  onNavigate?: (section: string) => void;
  onOpenProject?: (name: string) => void;
}

const WELCOME = `
KevinOS Terminal v${APP_VERSION}
Type "help" for available commands.
`;

const COMMANDS: Record<string, { output: string; action?: string }> = {
  help: {
    output: `
Available commands:
  help       - Show this help message
  about      - Open About window
  projects   - Open Projects window
  skills     - Open Skills window
  contact    - Open Contact window
  github     - Open GitHub stats window
  github-profile - Open GitHub profile
  resume     - Download CV
  achievements - Show achievements
  clear      - Clear terminal
  whoami     - Display user info
  date       - Show current date
  echo       - Echo a message
  genzura    - Open Genzura project
  gisenyi    - Open Gisenyi.top project
  exit       - Close terminal
`,
  },
  about: { output: "Opening About window...", action: "about" },
  projects: { output: "Opening Projects window...", action: "projects" },
  skills: { output: "Opening Skills window...", action: "skills" },
  contact: { output: "Opening Contact window...", action: "contact" },
  achievements: { output: "Opening Achievements window...", action: "achievements" },
  github: {
    output: "Opening GitHub stats window...",
    action: "github",
  },
  "github-profile": {
    output: "Opening GitHub profile...",
    action: "github-profile",
  },
  resume: {
    output: "Preparing CV download...",
    action: "resume",
  },
  clear: { output: "__CLEAR__" },
  whoami: {
    output: "Ishimwe Kevin - Software Engineer | Full-Stack Developer | AI Enthusiast",
  },
  date: { output: "" },
  genzura: { output: "Opening Genzura - Legal Practice Management System...", action: "genzura" },
  gisenyi: { output: "Opening Gisenyi.top - Tourism & Events Platform...", action: "gisenyi" },
  exit: { output: "Closing terminal...", action: "exit" },
};

export default function TerminalWindow({
  onNavigate,
  onOpenProject,
}: TerminalWindowProps) {
  const [history, setHistory] = useState<string[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [history, scrollToBottom]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const processCommand = useCallback(
    (cmd: string) => {
      const trimmed = cmd.trim().toLowerCase();
      const newHistory = [...history, `kevin@kevinos:~$ ${cmd}`];

      if (!trimmed) {
        setHistory(newHistory);
        return;
      }

      setCmdHistory((prev) => [...prev, trimmed]);
      setHistoryIndex(-1);

      if (trimmed === "clear") {
        setHistory([]);
        return;
      }

      const command = COMMANDS[trimmed];
      if (command) {
        if (trimmed === "date") {
          newHistory.push(new Date().toString());
        } else if (trimmed === "echo") {
          newHistory.push(cmd.slice(5));
        } else {
          newHistory.push(command.output);
        }

        if (command.action === "github-profile") {
          window.open("https://github.com/Rudasingwa-kevin", "_blank");
        } else if (command.action === "resume") {
          window.open("/KevinCV.pdf", "_blank");
        } else if (command.action === "exit") {
          setTimeout(() => {
            setHistory([]);
          }, 1000);
        } else if (command.action && onNavigate) {
          setTimeout(() => {
            onNavigate(command.action!);
          }, 500);
        }

        if (command.action && onOpenProject && ["genzura", "gisenyi"].includes(command.action)) {
          setTimeout(() => {
            onOpenProject(command.action!);
          }, 500);
        }
      } else {
        newHistory.push(
          `bash: ${trimmed}: command not found. Type "help" for available commands.`
        );
      }

      setHistory(newHistory);
    },
    [history, onNavigate, onOpenProject]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      processCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length > 0) {
        const newIndex = historyIndex < cmdHistory.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(newIndex);
        setInput(cmdHistory[cmdHistory.length - 1 - newIndex] || "");
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(cmdHistory[cmdHistory.length - 1 - newIndex] || "");
      } else {
        setHistoryIndex(-1);
        setInput("");
      }
    }
  };

  return (
    <div
      className="h-full flex flex-col font-mono text-sm cursor-text"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex-1 overflow-auto p-1 space-y-0.5">
        {history.map((line, i) => (
          <div key={i} className={line.startsWith("kevin@kevinos") ? "text-kevin-accent" : "text-kevin-text"}>
            {line}
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <div className="flex items-center gap-2 border-t border-kevin-border pt-2 mt-2">
        <span className="text-kevin-accent whitespace-nowrap font-bold">
          kevin@kevinos:~$
        </span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent outline-none text-kevin-text font-mono text-sm caret-kevin-accent"
          autoFocus
          spellCheck={false}
          autoComplete="off"
        />
      </div>
    </div>
  );
}
