"use client";

import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  User,
  FolderOpen,
  Puzzle,
  Terminal,
  Trophy,
  Mail,
  FileDown,
} from "lucide-react";
import BootScreen from "@/components/BootScreen";
import Window from "@/components/Window";
import DesktopIcon from "@/components/DesktopIcon";
import AboutWindow from "@/components/AboutWindow";
import ProjectsWindow from "@/components/ProjectsWindow";
import SkillsWindow from "@/components/SkillsWindow";
import TerminalWindow from "@/components/TerminalWindow";
import AchievementsWindow from "@/components/AchievementsWindow";
import ContactWindow from "@/components/ContactWindow";
import DesktopWidget from "@/components/DesktopWidget";
import ParticleBackground from "@/components/ParticleBackground";

type WindowId =
  | "about"
  | "projects"
  | "skills"
  | "terminal"
  | "achievements"
  | "contact";

interface WindowState {
  id: WindowId;
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
  icon: React.ReactNode;
  title: string;
}

const initialWindows: WindowState[] = [
  { id: "about", isOpen: false, isMinimized: false, zIndex: 10, icon: <User size={18} />, title: "About Me" },
  { id: "projects", isOpen: false, isMinimized: false, zIndex: 11, icon: <FolderOpen size={18} />, title: "Projects" },
  { id: "skills", isOpen: false, isMinimized: false, zIndex: 12, icon: <Puzzle size={18} />, title: "Skills" },
  { id: "terminal", isOpen: false, isMinimized: false, zIndex: 13, icon: <Terminal size={18} />, title: "Terminal" },
  { id: "achievements", isOpen: false, isMinimized: false, zIndex: 14, icon: <Trophy size={18} />, title: "Achievements" },
  { id: "contact", isOpen: false, isMinimized: false, zIndex: 15, icon: <Mail size={18} />, title: "Contact" },
];

const desktopIcons: { id: WindowId | "cv"; icon: React.ReactNode; label: string }[] = [
  { id: "about", icon: <User size={26} />, label: "About Me" },
  { id: "projects", icon: <FolderOpen size={26} />, label: "Projects" },
  { id: "skills", icon: <Puzzle size={26} />, label: "Skills" },
  { id: "terminal", icon: <Terminal size={26} />, label: "Terminal" },
  { id: "achievements", icon: <Trophy size={26} />, label: "Achievements" },
  { id: "contact", icon: <Mail size={26} />, label: "Contact" },
  { id: "cv", icon: <FileDown size={26} />, label: "Download CV" },
];

export default function HomePage() {
  const [booted, setBooted] = useState(false);
  const [windows, setWindows] = useState<WindowState[]>(initialWindows);
  const [highestZ, setHighestZ] = useState(20);
  const [time, setTime] = useState("");
  const [konamiProgress, setKonamiProgress] = useState(0);
  const [showSecret, setShowSecret] = useState(false);

  const konamiCode = [
    "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
    "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
    "b", "a",
  ];

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === konamiCode[konamiProgress]) {
        const next = konamiProgress + 1;
        if (next === konamiCode.length) {
          setShowSecret(true);
          setKonamiProgress(0);
        } else {
          setKonamiProgress(next);
        }
      } else {
        setKonamiProgress(0);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [konamiProgress]);

  const openWindow = useCallback(
    (id: WindowId) => {
      setHighestZ((z) => z + 1);
      setWindows((prev) =>
        prev.map((w) =>
          w.id === id
            ? { ...w, isOpen: true, isMinimized: false, zIndex: highestZ }
            : w
        )
      );
    },
    [highestZ]
  );

  const closeWindow = useCallback((id: WindowId) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isOpen: false } : w))
    );
  }, []);

  const minimizeWindow = useCallback((id: WindowId) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w))
    );
  }, []);

  const focusWindow = useCallback(
    (id: WindowId) => {
      setHighestZ((z) => z + 1);
      setWindows((prev) =>
        prev.map((w) =>
          w.id === id ? { ...w, zIndex: highestZ } : w
        )
      );
    },
    [highestZ]
  );

  const handleDesktopIcon = useCallback(
    (id: WindowId | "cv") => {
      if (id === "cv") {
        // Trigger CV download
        const link = document.createElement("a");
        link.href = "#";
        link.download = "Ishimwe_Kevin_CV.pdf";
        link.click();
        return;
      }
      const win = windows.find((w) => w.id === id);
      if (win?.isOpen && !win.isMinimized) {
        minimizeWindow(id);
      } else {
        openWindow(id);
      }
    },
    [windows, openWindow, minimizeWindow]
  );

  const handleTerminalNavigate = useCallback(
    (section: string) => {
      if (section === "exit") {
        closeWindow("terminal");
      } else if (section === "about" || section === "projects" || section === "skills" || section === "contact" || section === "achievements") {
        openWindow(section as WindowId);
      } else if (section === "github") {
        window.open("https://github.com/Rudasingwa-kevin", "_blank");
      }
    },
    [openWindow, closeWindow]
  );

  const handleOpenProject = useCallback(
    (name: string) => {
      openWindow("projects");
    },
    [openWindow]
  );

  const getPositions = (index: number) => {
    const baseX = 60 + (index % 3) * 250;
    const baseY = 40 + Math.floor(index / 3) * 220;
    return { x: baseX, y: baseY };
  };

  return (
    <>
      <AnimatePresence>
        {!booted && <BootScreen onComplete={() => setBooted(true)} />}
      </AnimatePresence>

      {booted && (
        <motion.div
          className="w-full h-screen relative overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Desktop Background */}
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse at 20% 50%, rgba(59,130,246,0.08) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(139,92,246,0.06) 0%, transparent 50%), #0a0a0f",
            }}
          />
          {/* Grid pattern overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(59,130,246,0.07) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
          {/* Corner accent glows */}
          <div
            className="absolute top-0 left-0 w-96 h-96 pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute bottom-12 right-0 w-80 h-80 pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)",
            }}
          />

          {/* Taskbar */}
          <div
            className="absolute bottom-0 left-0 right-0 h-14 flex items-center px-3 sm:px-5 gap-3 z-[50] border-t bg-kevin-glass border-kevin-border"
            style={{ backdropFilter: "blur(24px)" }}
          >
            {/* Left: KevinOS logo */}
            <motion.button
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-white/5 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-kevin-accent to-kevin-accent2 flex items-center justify-center text-white text-xs font-bold">
                K
              </div>
              <span className="text-xs font-bold text-kevin-accent font-mono hidden sm:inline">
                KevinOS
              </span>
            </motion.button>

            {/* Separator */}
            <div
              className="w-px h-6 hidden sm:block"
              style={{
                background: "rgba(59,130,246,0.2)",
              }}
            />

            {/* Center: Open windows */}
            <div className="flex-1 flex items-center justify-center gap-1.5 overflow-x-auto px-2">
              {windows
                .filter((w) => w.isOpen)
                .map((w) => (
                  <motion.button
                    key={w.id}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs transition-all ${
                      !w.isMinimized
                        ? "bg-kevin-accent/15 border border-kevin-accent/30 text-kevin-accent shadow-[0_0_10px_rgba(59,130,246,0.1)]"
                        : "bg-kevin-card/50 border border-kevin-border text-kevin-text2 hover:border-kevin-accent/50 hover:text-kevin-accent"
                    }`}
                    onClick={() => {
                      if (w.isMinimized) {
                        openWindow(w.id);
                      } else {
                        focusWindow(w.id);
                      }
                    }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -1 }}
                  >
                    <span className="flex items-center justify-center text-sm">{w.icon}</span>
                    <span className="hidden sm:inline font-medium">{w.title}</span>
                  </motion.button>
                ))}
              {windows.filter((w) => w.isOpen).length === 0 && (
                <span className="text-[11px] font-mono text-kevin-text2/30">
                  Click an icon to open an application
                </span>
              )}
            </div>

            {/* Separator */}
            <div
              className="w-px h-6 hidden sm:block"
              style={{
                background: "rgba(59,130,246,0.2)",
              }}
            />

            {/* Right: Status + Clock */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-kevin-success animate-pulse" />
                <span className="text-[10px] font-mono text-kevin-success">
                  ONLINE
                </span>
              </div>
              <div className="text-right">
                <div className="text-xs font-mono text-kevin-text font-medium">
                  {time}
                </div>
                <div className="text-[9px] font-mono text-kevin-text2 hidden sm:block">
                  {new Date().toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Particle Background */}
          <ParticleBackground />

          {/* Desktop Icons */}
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
            <div className="grid grid-cols-2 gap-2">
              {desktopIcons.map((icon, index) => (
                <DesktopIcon
                  key={icon.id}
                  icon={icon.icon}
                  label={icon.label}
                  onClick={() => handleDesktopIcon(icon.id)}
                  index={index}
                />
              ))}
            </div>
          </div>

          {/* Center Widget */}
          <DesktopWidget />

          {/* Windows */}
          <AnimatePresence>
            {windows.map((win, index) => (
              <Window
                key={win.id}
                title={win.title}
                icon={win.icon}
                isOpen={win.isOpen && !win.isMinimized}
                onClose={() => closeWindow(win.id)}
                onMinimize={() => minimizeWindow(win.id)}
                initialPosition={getPositions(index)}
                width={win.id === "terminal" ? 650 : 700}
                height={win.id === "terminal" ? 450 : 520}
                zIndex={win.zIndex}
                onFocus={() => focusWindow(win.id)}
              >
                {win.id === "about" && <AboutWindow />}
                {win.id === "projects" && (
                  <ProjectsWindow onOpenProject={handleOpenProject} />
                )}
                {win.id === "skills" && <SkillsWindow />}
                {win.id === "terminal" && (
                  <TerminalWindow
                    onNavigate={handleTerminalNavigate}
                    onOpenProject={handleOpenProject}
                  />
                )}
                {win.id === "achievements" && <AchievementsWindow />}
                {win.id === "contact" && <ContactWindow />}
              </Window>
            ))}
          </AnimatePresence>

          {/* Secret Easter Egg */}
          <AnimatePresence>
            {showSecret && (
              <motion.div
                className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowSecret(false)}
              >
                <motion.div
                  className="glass-panel glow-purple p-8 max-w-md text-center"
                  initial={{ scale: 0.5, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0.5, rotate: 10 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="text-6xl mb-4">🎮</div>
                  <h2 className="text-xl font-bold text-gradient mb-2">
                    Konami Code Activated!
                  </h2>
                  <p className="text-sm text-kevin-text2">
                    You found the secret! You&apos;re a true explorer of KevinOS.
                    This Easter egg was placed for those who know the classic code:
                    ↑↑↓↓←→←→BA
                  </p>
                  <button
                    className="mt-4 px-4 py-2 rounded-lg bg-kevin-accent text-white text-sm font-bold hover:bg-kevin-accent/80 transition-colors"
                    onClick={() => setShowSecret(false)}
                  >
                    Close
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="scanline" />
        </motion.div>
      )}
    </>
  );
}
