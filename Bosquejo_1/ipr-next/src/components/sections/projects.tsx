"use client";

import { projects } from "@/lib/ipr-data";
import Image from "next/image";
import { useEffect, useMemo, useRef } from "react";

type SlideState = {
  slide: HTMLElement;
  imgs: HTMLElement[];
  activeIndex: number;
  cycleAt: number;
};

export function Projects() {
  const shellRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useMemo(
    () => (typeof window !== "undefined" ? window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches : false),
    []
  );

  const renderedSlides = useMemo(() => {
    const all = [...projects, ...projects, ...projects];
    return all.map((p, idx) => ({ p, key: `${p.id}-${idx}` }));
  }, []);

  useEffect(() => {
    const shell = shellRef.current;
    const track = trackRef.current;
    if (!shell || !track) return;
    if (reduceMotion) return;

    const originalCount = projects.length;

    let slideStride = 0;
    let totalWidth = 0;

    let isDragging = false;
    let touchActive = false;
    let touchAxis: "x" | "y" | null = null;
    let startX = 0;
    let startY = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let velocity = 0;
    let lastX = 0;
    let lastTime = Date.now();
    let animationID = 0;
    let momentumID = 0;
    let lastEffectTime = 0;

    const slideStates: SlideState[] = Array.from(track.children).map((slide) => {
      const imgs = Array.from(slide.querySelectorAll<HTMLElement>(".project-img"));
      return { slide: slide as HTMLElement, imgs, activeIndex: 0, cycleAt: 0 };
    });

    const updateMetrics = () => {
      const first = track.children.item(0) as HTMLElement | null;
      if (!first) return;
      const style = window.getComputedStyle(track);
      const gapValue = style.getPropertyValue("gap") || style.getPropertyValue("column-gap") || "0";
      const gap = parseFloat(gapValue) || 0;
      slideStride = first.getBoundingClientRect().width + gap;
      totalWidth = slideStride * originalCount;
    };

    const setSliderPosition = () => {
      track.style.transform = `translate3d(${currentTranslate}px,0,0)`;
    };

    const checkPosition = () => {
      if (currentTranslate > -totalWidth / 2) {
        currentTranslate -= totalWidth;
        prevTranslate = currentTranslate;
      }
      if (currentTranslate < -totalWidth * 1.5) {
        currentTranslate += totalWidth;
        prevTranslate = currentTranslate;
      }
    };

    const setActiveImage = (state: SlideState, index: number) => {
      state.imgs.forEach((img, i) => img.classList.toggle("is-active", i === index));
      state.activeIndex = index;
    };

    const maybeCycleImages = (state: SlideState, now: number, focus: number) => {
      if (state.imgs.length < 2) return;
      const shouldCycle = focus > 0.72 && !isDragging;
      if (!shouldCycle) {
        if (state.activeIndex !== 0) setActiveImage(state, 0);
        state.cycleAt = 0;
        return;
      }
      if (!state.cycleAt) state.cycleAt = now + 2400;
      if (now < state.cycleAt) return;
      const next = (state.activeIndex + 1) % state.imgs.length;
      setActiveImage(state, next);
      state.cycleAt = now + 2400;
    };

    const updateSlideEffects = (now: number) => {
      if (now - lastEffectTime < 16) return;
      lastEffectTime = now;

      const viewportCenter = window.innerWidth / 2 || 1;
      const t = now / 1000;
      for (let i = 0; i < slideStates.length; i++) {
        const state = slideStates[i];
        const rect = state.slide.getBoundingClientRect();
        const center = rect.left + rect.width / 2;
        let p = (center - viewportCenter) / viewportCenter;
        p = Math.max(-1, Math.min(1, p));
        const pa = Math.min(1, Math.abs(p));
        const focus = Math.max(0, 1 - pa);
        const floatY = Math.sin(t * 1.15 + i * 0.7) * 6 * (0.35 + focus * 0.65);

        state.slide.style.setProperty("--p", p.toFixed(3));
        state.slide.style.setProperty("--pa", pa.toFixed(3));
        state.slide.style.setProperty("--focus", focus.toFixed(3));
        state.slide.style.setProperty("--float", `${floatY.toFixed(2)}px`);

        maybeCycleImages(state, now, focus);
      }
    };

    const cancelMomentum = () => {
      if (!momentumID) return;
      window.cancelAnimationFrame(momentumID);
      momentumID = 0;
    };

    const cancelAutoScroll = () => {
      if (!animationID) return;
      window.cancelAnimationFrame(animationID);
      animationID = 0;
    };

    const beginDrag = (clientX: number) => {
      isDragging = true;
      shell.classList.add("is-grabbing");
      startX = clientX;
      lastX = clientX;
      lastTime = Date.now();
      velocity = 0;
      cancelMomentum();
      cancelAutoScroll();
    };

    const updateDrag = (clientX: number) => {
      if (!isDragging) return;
      const nowTime = Date.now();
      const diff = clientX - startX;
      const timeDiff = nowTime - lastTime;
      if (timeDiff > 0) velocity = (clientX - lastX) / timeDiff;
      lastX = clientX;
      lastTime = nowTime;
      currentTranslate = prevTranslate + diff;
      setSliderPosition();
      updateSlideEffects(performance.now());
    };

    const applyMomentum = () => {
      const friction = 0.95;
      const minVelocity = 0.08;

      const momentum = () => {
        if (Math.abs(velocity) > minVelocity) {
          currentTranslate += velocity * 16;
          prevTranslate = currentTranslate;
          velocity *= friction;
          checkPosition();
          setSliderPosition();
          updateSlideEffects(performance.now());
          momentumID = window.requestAnimationFrame(momentum);
        } else {
          velocity = 0;
          checkPosition();
          startAutoScroll();
        }
      };

      if (Math.abs(velocity) > minVelocity) momentumID = window.requestAnimationFrame(momentum);
      else startAutoScroll();
    };

    const dragEnd = () => {
      if (!isDragging) return;
      isDragging = false;
      shell.classList.remove("is-grabbing");
      prevTranslate = currentTranslate;
      applyMomentum();
    };

    const startAutoScroll = () => {
      cancelAutoScroll();
      const animate = () => {
        if (!isDragging) {
          currentTranslate -= 0.5;
          prevTranslate = currentTranslate;
          checkPosition();
          setSliderPosition();
          updateSlideEffects(performance.now());
        }
        animationID = window.requestAnimationFrame(animate);
      };
      animationID = window.requestAnimationFrame(animate);
    };

    const handleResize = () => {
      updateMetrics();
      checkPosition();
      setSliderPosition();
      updateSlideEffects(performance.now());
    };

    const touchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      touchActive = true;
      touchAxis = null;
      const touch = e.touches[0];
      startX = touch.clientX;
      startY = touch.clientY;
      lastX = touch.clientX;
      lastTime = Date.now();
      velocity = 0;
      cancelMomentum();
      cancelAutoScroll();
    };

    const touchMove = (e: TouchEvent) => {
      if (!touchActive || e.touches.length !== 1) return;
      const touch = e.touches[0];
      const dx = touch.clientX - startX;
      const dy = touch.clientY - startY;

      if (!touchAxis) {
        if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
        touchAxis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
        if (touchAxis === "y") {
          touchActive = false;
          shell.classList.remove("is-grabbing");
          startAutoScroll();
          return;
        }
        isDragging = true;
        shell.classList.add("is-grabbing");
        startX = touch.clientX;
        lastX = touch.clientX;
        lastTime = Date.now();
        prevTranslate = currentTranslate;
      }

      if (touchAxis === "y") return;
      e.preventDefault();
      updateDrag(touch.clientX);
    };

    const touchEnd = () => {
      if (!touchActive) return;
      if (touchAxis === "x" && isDragging) {
        isDragging = false;
        shell.classList.remove("is-grabbing");
        prevTranslate = currentTranslate;
        applyMomentum();
      } else {
        shell.classList.remove("is-grabbing");
        startAutoScroll();
      }
      touchActive = false;
      touchAxis = null;
    };

    // init
    updateMetrics();
    currentTranslate = -totalWidth;
    prevTranslate = currentTranslate;
    setSliderPosition();
    updateSlideEffects(performance.now());
    startAutoScroll();

    // listeners
    const onMouseDown = (e: MouseEvent) => {
      e.preventDefault();
      beginDrag(e.pageX);
    };
    const onMouseMove = (e: MouseEvent) => updateDrag(e.pageX);
    const onMouseUp = () => dragEnd();
    const onContextMenu = (e: MouseEvent) => e.preventDefault();

    shell.addEventListener("mousedown", onMouseDown);
    shell.addEventListener("touchstart", touchStart, { passive: false });
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", touchMove, { passive: false });
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("touchend", touchEnd);
    shell.addEventListener("contextmenu", onContextMenu);
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", () => updateSlideEffects(performance.now()), { passive: true });

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchend", touchEnd);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", touchMove);
      shell.removeEventListener("mousedown", onMouseDown);
      shell.removeEventListener("touchstart", touchStart);
      shell.removeEventListener("contextmenu", onContextMenu);
      cancelMomentum();
      cancelAutoScroll();
    };
  }, [reduceMotion, renderedSlides]);

  return (
    <section className="section section-slider" id="proyectos" aria-label="Proyectos">
      <div className="container" data-reveal-group>
        <div className="section-head">
        </div>
      </div>

      <div ref={shellRef} className="slider-shell" data-infinite-slider data-cursor="drag">
        <div ref={trackRef} className="slider-track" aria-live="off">
          {renderedSlides.map(({ p, key }, idx) => (
            <article
              key={key}
              className="slide"
              data-project-slide
              data-cursor="see"
              style={{ ["--i" as never]: String(idx % projects.length) } as React.CSSProperties}
            >
              <div className="project-media">
                {p.images.map((img, idx) => (
                  <Image
                    key={`${p.id}-img-${idx}`}
                    className={`project-img${idx === 0 ? " is-active" : ""}`}
                    src={img.src}
                    alt={idx === 0 ? img.alt : ""}
                    fill
                    sizes="(min-width: 980px) 420px, 70vw"
                    draggable={false}
                    priority={false}
                  />
                ))}
              </div>
              <div className="project-overlay">
                <div className="project-bottom">
                  <div className="project-kicker">{p.kicker}</div>
                  <h3 className="project-title">{p.title}</h3>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
