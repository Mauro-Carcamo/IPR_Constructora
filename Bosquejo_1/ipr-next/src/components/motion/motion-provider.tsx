"use client";

import Lenis from "lenis";
import { useEffect } from "react";

export function MotionProvider() {
  useEffect(() => {
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reduceMotion) return;

    const lenis = new Lenis({
      lerp: 0.2,
      wheelMultiplier: 1.0,
      gestureOrientation: "vertical",
      normalizeWheel: false,
      smoothTouch: false,
    } as unknown as ConstructorParameters<typeof Lenis>[0]);

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = window.requestAnimationFrame(loop);
    };
    raf = window.requestAnimationFrame(loop);

    return () => {
      window.cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
