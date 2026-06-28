"use client";

import { motion, type PanInfo } from "framer-motion";
import { useState, useRef, useCallback, useEffect } from "react";

interface WindowProps {
  title: string;
  icon: string;
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
  const constraintsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setPosition(initialPosition);
    }
  }, [isOpen, initialPosition]);

  const handleDrag = useCallback(
    (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      setPosition((prev) => ({
        x: prev.x + info.delta.x,
        y: prev.y + info.delta.y,
      }));
    },
    []
  );

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

  const w = isMaximized ? window.innerWidth : width;
  const h = isMaximized ? window.innerHeight - 48 : height;

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
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      onMouseDown={onFocus}
      onClick={onFocus}
    >
      <div className="glass-panel glow-blue w-full h-full flex flex-col overflow-hidden">
        <div
          className="window-titlebar"
          onMouseDown={(e) => {
            if (isMaximized) return;
            const startX = e.clientX - position.x;
            const startY = e.clientY - position.y;

            const onMove = (ev: MouseEvent) => {
              setPosition({ x: ev.clientX - startX, y: ev.clientY - startY });
            };
            const onUp = () => {
              window.removeEventListener("mousemove", onMove);
              window.removeEventListener("mouseup", onUp);
            };
            window.addEventListener("mousemove", onMove);
            window.addEventListener("mouseup", onUp);
          }}
        >
          <div className="flex items-center gap-2 flex-1">
            <span className="text-base">{icon}</span>
            <span className="text-sm font-medium text-kevin-text">{title}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="window-btn btn-close"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              aria-label="Close"
            />
            <button
              className="window-btn btn-minimize"
              onClick={(e) => {
                e.stopPropagation();
                onMinimize();
              }}
              aria-label="Minimize"
            />
            <button
              className="window-btn btn-maximize"
              onClick={(e) => {
                e.stopPropagation();
                toggleMaximize();
              }}
              aria-label="Maximize"
            />
          </div>
        </div>

        <div className="flex-1 overflow-auto p-5">{children}</div>
      </div>
    </motion.div>
  );
}
