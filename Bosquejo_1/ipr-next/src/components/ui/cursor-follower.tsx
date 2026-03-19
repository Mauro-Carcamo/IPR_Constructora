"use client";

import { useEffect, useRef, useState } from "react";

type Mode = "drag" | "see" | null;

const COPY: Record<Exclude<Mode, null>, string> = {
  drag: "Drag me",
  see: "See more",
};

export function CursorFollower() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [mode, setMode] = useState<Mode>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    const finePointer = window.matchMedia?.("(hover: hover) and (pointer: fine)")?.matches;
    if (reduceMotion || !finePointer) return;

    let raf = 0;
    let targetX = -9999;
    let targetY = -9999;
    let x = targetX;
    let y = targetY;

    const tick = () => {
      x += (targetX - x) * 0.18;
      y += (targetY - y) * 0.18;
      wrap.style.setProperty("--x", `${x}px`);
      wrap.style.setProperty("--y", `${y}px`);
      raf = window.requestAnimationFrame(tick);
    };
    raf = window.requestAnimationFrame(tick);

    const onMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const readMode = (el: Element | null): Mode => {
      if (!el) return null;
      const host = el.closest?.("[data-cursor]") as HTMLElement | null;
      const v = host?.getAttribute?.("data-cursor");
      if (v === "drag" || v === "see") return v;
      return null;
    };

    const onOver = (e: PointerEvent) => setMode(readMode(e.target as Element));
    const onOut = (e: PointerEvent) => {
      const next = e.relatedTarget as Element | null;
      setMode(readMode(next));
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerout", onOut, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerout", onOut);
      window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className={`cursor-follow${mode ? " is-on" : ""}`}
      aria-hidden="true"
      data-mode={mode ?? ""}
    >
      <div className="cursor-follow__inner">
        <span className="cursor-follow__text">{mode ? COPY[mode] : ""}</span>
        {mode === "see" ? (
          <svg
            className="cursor-follow__icon"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M7 17L17 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M10 7H17V14"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : null}
      </div>
    </div>
  );
}
