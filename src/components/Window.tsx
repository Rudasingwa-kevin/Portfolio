"use client";

import { motion } from "framer-motion";
import { useState, useCallback, useEffect, useRef } from "react";

interface WindowProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  onMinimize: () => void;
  initialPosition?: { x: number; y: number };
  width?: number;
  height?: number;
  zIndex?: number;
  onFocus?: () => void;
}

export default function Window({
  title,
  icon,
  children,
  isOpen,
  onClose,
  onMinimize,
  initialPosition = { x: 100, y: 60 },
  width = 700,
  height = 500,
  zIndex = 10,
  onFocus,
}: WindowProps) {
  const [position, setPosition] = useState(initialPosition);
  const [isMaximized, setIsMaximized] = useState(false);
  const [prevBounds, setPrevBounds] = useState<{
    x: number;
    y: number;
    w: number;
    h: number;
  } | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const prevOpenRef = useRef(isOpen);
  useEffect(() => {
    if (isOpen && !prevOpenRef.current) {
      if (isMobile) {
        setPosition({ x: 0, y: 0 });
      } else {
        setPosition(initialPosition);
      }
    }
    prevOpenRef.current = isOpen;
  }, [isOpen, initialPosition, isMobile]);

  const toggleMaximize = useCallback(() => {
    if (isMaximized) {
      if (prevBounds) {
        setPosition({ x: prevBounds.x, y: prevBounds.y });
      }
      setIsMaximized(false);
    } else {
      setPrevBounds({ x: position.x, y: position.y, w: width, h: height });
      setPosition({ x: 0, y: 0 });
      setIsMaximized(true);
    }
  }, [isMaximized, position, width, height, prevBounds]);

  if (!isOpen) return null;

  const TASKBAR_HEIGHT = 56;
  const w = isMobile ? window.innerWidth : isMaximized ? window.innerWidth : width;
  const h = isMobile ? window.innerHeight - TASKBAR_HEIGHT : isMaximized ? window.innerHeight - TASKBAR_HEIGHT : height;

  return (
    <motion.div
      className="absolute"
      style={{
        zIndex,
        width: w,
        height: h,
        top: isMaximized ? 0 : position.y,
        left: isMaximized ? 0 : position.x,
      }}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      onMouseDown={onFocus}
      onClick={onFocus}
    >
      <div className="window-glass w-full h-full flex flex-col overflow-hidden">
        <div
          className="window-titlebar"
          onMouseDown={(e) => {
            if (isMaximized || isMobile) return;
            const startX = e.clientX - position.x;
            const startY = e.clientY - position.y;
            const minVisible = 100;

            const onMove = (ev: MouseEvent) => {
              const maxX = window.innerWidth - minVisible;
              const maxY = window.innerHeight - TASKBAR_HEIGHT - minVisible;
              setPosition({
                x: Math.min(Math.max(ev.clientX - startX, -width + minVisible), maxX),
                y: Math.min(Math.max(ev.clientY - startY, -height + minVisible), maxY),
              });
            };
            const onUp = () => {
              window.removeEventListener("mousemove", onMove);
              window.removeEventListener("mouseup", onUp);
            };
            window.addEventListener("mousemove", onMove);
            window.addEventListener("mouseup", onUp);
          }}
          onTouchStart={(e) => {
            if (isMaximized || isMobile) return;
            const touch = e.touches[0];
            const startX = touch.clientX - position.x;
            const startY = touch.clientY - position.y;
            const minVisible = 100;

            const onMove = (ev: TouchEvent) => {
              const t = ev.touches[0];
              const maxX = window.innerWidth - minVisible;
              const maxY = window.innerHeight - TASKBAR_HEIGHT - minVisible;
              setPosition({
                x: Math.min(Math.max(t.clientX - startX, -width + minVisible), maxX),
                y: Math.min(Math.max(t.clientY - startY, -height + minVisible), maxY),
              });
            };
            const onEnd = () => {
              window.removeEventListener("touchmove", onMove);
              window.removeEventListener("touchend", onEnd);
            };
            window.addEventListener("touchmove", onMove);
            window.addEventListener("touchend", onEnd);
          }}
        >
          <div className="flex items-center gap-2.5 flex-1 min-w-0">
            <div className="flex items-center justify-center w-6 h-6 rounded-md bg-kevin-accent/10 text-kevin-accent flex-shrink-0">
              {icon}
            </div>
            <span className="text-[13px] font-semibold text-kevin-text truncate">{title}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="window-control-btn control-close"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              aria-label="Close"
            >
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                <path d="M1 1L7 7M7 1L1 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
            <button
              className="window-control-btn control-minimize"
              onClick={(e) => {
                e.stopPropagation();
                onMinimize();
              }}
              aria-label="Minimize"
            >
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                <path d="M1 4H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
            <button
              className="window-control-btn control-maximize"
              onClick={(e) => {
                e.stopPropagation();
                toggleMaximize();
              }}
              aria-label="Maximize"
            >
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                <rect x="1" y="1" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-auto window-content-area p-5">{children}</div>
      </div>
    </motion.div>
  );
}
