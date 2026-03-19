class InfiniteSlider {
  constructor(shell, track) {
    this.shell = shell;
    this.track = track;

    this.originalSlides = Array.from(track.children);
    this.slides = Array.from(track.children);

    this.slideStride = 0;
    this.totalWidth = 0;

    this.isDragging = false;
    this.startX = 0;
    this.currentTranslate = 0;
    this.prevTranslate = 0;

    this.velocity = 0;
    this.lastX = 0;
    this.lastTime = Date.now();

    this.animationID = null;
    this.momentumID = null;

    this.isPaused = false;
    this.autoScrollSpeed = 0.55;

    this.reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    this.slideStates = [];
    this.lastEffectTime = 0;

    this.init();
  }

  init() {
    this.createLoadingOverlay();
    this.cloneSlides(2);
    this.updateMetrics();
    this.setInitialPosition();
    this.addEventListeners();
    this.animateLoadingOut();

    this.buildSlideStates();

    if (!this.reduceMotion) this.startAutoScroll();
    this.updateSlideEffects(performance.now());

    window.addEventListener("resize", () => this.handleResize());
  }

  buildSlideStates() {
    this.slideStates = this.slides.map((slide) => {
      const imgs = Array.from(slide.querySelectorAll(".project-img"));
      return {
        slide,
        imgs,
        activeIndex: 0,
        cycleAt: 0,
      };
    });
  }

  createLoadingOverlay() {
    this.originalSlides.forEach((slide) => {
      const overlay = document.createElement("div");
      overlay.className = "slide-loading-overlay";
      slide.appendChild(overlay);
    });
  }

  animateLoadingOut() {
    setTimeout(() => {
      const overlays = this.track.querySelectorAll(".slide-loading-overlay");
      overlays.forEach((overlay, idx) => {
        setTimeout(() => {
          overlay.style.transition = "transform 0.85s cubic-bezier(0.65, 0, 0.35, 1)";
          overlay.style.transform = "translateX(100%)";
          setTimeout(() => overlay.remove(), 900);
        }, idx * 90);
      });
    }, 120);
  }

  cloneSlides(times) {
    const originals = [...this.originalSlides];
    for (let t = 0; t < times; t++) {
      originals.forEach((slide) => {
        const clone = slide.cloneNode(true);
        clone.querySelectorAll("img,video").forEach((m) => m.setAttribute("draggable", "false"));
        this.track.appendChild(clone);
      });
    }
    this.slides = Array.from(this.track.children);
  }

  updateMetrics() {
    const first = this.slides[0];
    if (!first) return;

    const style = window.getComputedStyle(this.track);
    const gap = parseFloat(style.columnGap || style.gap || "0") || 0;

    this.slideStride = first.getBoundingClientRect().width + gap;
    this.totalWidth = this.slideStride * this.originalSlides.length;
  }

  setInitialPosition() {
    this.currentTranslate = -this.totalWidth;
    this.prevTranslate = this.currentTranslate;
    this.setSliderPosition();
  }

  addEventListeners() {
    // drag start
    this.shell.addEventListener("mousedown", (e) => this.dragStart(e));
    this.shell.addEventListener("touchstart", (e) => this.dragStart(e), { passive: false });

    // drag move/end on window
    window.addEventListener("mousemove", (e) => this.drag(e));
    window.addEventListener("touchmove", (e) => this.drag(e), { passive: false });
    window.addEventListener("mouseup", () => this.dragEnd());
    window.addEventListener("touchend", () => this.dragEnd());

    // prevent context menu
    this.shell.addEventListener("contextmenu", (e) => e.preventDefault());

    // pause toggle
    const toggleBtn = document.querySelector("[data-slider-toggle]");
    if (toggleBtn) {
      toggleBtn.addEventListener("click", () => {
        this.isPaused = !this.isPaused;
        toggleBtn.textContent = this.isPaused ? "Reanudar movimiento" : "Pausar movimiento";
        if (this.isPaused) this.cancelAutoScroll();
        else if (!this.reduceMotion) this.startAutoScroll();
        this.updateSlideEffects(performance.now());
      });
    }

    // keep effects in sync on vertical scroll
    window.addEventListener(
      "scroll",
      () => this.updateSlideEffects(performance.now()),
      { passive: true }
    );
  }

  dragStart(e) {
    if (this.reduceMotion) return;
    this.isDragging = true;
    this.shell.classList.add("is-grabbing");
    this.startX = this.getPositionX(e);
    this.lastX = this.startX;
    this.lastTime = Date.now();
    this.velocity = 0;

    this.cancelMomentum();
    this.cancelAutoScroll();
    e.preventDefault();
  }

  drag(e) {
    if (!this.isDragging) return;
    e.preventDefault();

    const currentX = this.getPositionX(e);
    const now = Date.now();
    const diff = currentX - this.startX;
    const timeDiff = now - this.lastTime;
    if (timeDiff > 0) this.velocity = (currentX - this.lastX) / timeDiff;

    this.lastX = currentX;
    this.lastTime = now;

    this.currentTranslate = this.prevTranslate + diff;
    this.setSliderPosition();
    this.updateSlideEffects(performance.now());
  }

  dragEnd() {
    if (!this.isDragging) return;
    this.isDragging = false;
    this.shell.classList.remove("is-grabbing");
    this.prevTranslate = this.currentTranslate;

    this.applyMomentum();
  }

  applyMomentum() {
    if (this.isPaused) return;

    const friction = 0.95;
    const minVelocity = 0.08;

    const momentum = () => {
      if (Math.abs(this.velocity) > minVelocity) {
        this.currentTranslate += this.velocity * 16;
        this.prevTranslate = this.currentTranslate;
        this.velocity *= friction;
        this.checkPosition();
        this.setSliderPosition();
        this.momentumID = requestAnimationFrame(momentum);
      } else {
        this.velocity = 0;
        this.checkPosition();
        this.startAutoScroll();
      }
    };

    if (Math.abs(this.velocity) > minVelocity) this.momentumID = requestAnimationFrame(momentum);
    else this.startAutoScroll();
  }

  cancelMomentum() {
    if (!this.momentumID) return;
    cancelAnimationFrame(this.momentumID);
    this.momentumID = null;
  }

  getPositionX(e) {
    return e.type.includes("mouse") ? e.pageX : e.touches[0].clientX;
  }

  setSliderPosition() {
    this.track.style.transform = `translate3d(${this.currentTranslate}px,0,0)`;
  }

  checkPosition() {
    // Keep translation in the middle “band” where we have clones.
    if (this.currentTranslate > -this.totalWidth / 2) {
      this.currentTranslate -= this.totalWidth;
      this.prevTranslate = this.currentTranslate;
    }
    if (this.currentTranslate < -this.totalWidth * 1.5) {
      this.currentTranslate += this.totalWidth;
      this.prevTranslate = this.currentTranslate;
    }
  }

  startAutoScroll() {
    if (this.isPaused || this.reduceMotion) return;
    this.cancelAutoScroll();

    const animate = () => {
      if (!this.isDragging && !this.isPaused) {
        this.currentTranslate -= this.autoScrollSpeed;
        this.prevTranslate = this.currentTranslate;
        this.checkPosition();
        this.setSliderPosition();
        this.updateSlideEffects(performance.now());
      }
      this.animationID = requestAnimationFrame(animate);
    };

    this.animationID = requestAnimationFrame(animate);
  }

  cancelAutoScroll() {
    if (!this.animationID) return;
    cancelAnimationFrame(this.animationID);
    this.animationID = null;
  }

  handleResize() {
    this.updateMetrics();
    this.checkPosition();
    this.setSliderPosition();
    this.updateSlideEffects(performance.now());
  }

  updateSlideEffects(now) {
    if (this.reduceMotion) return;
    if (!this.slideStates.length) return;

    // Throttle DOM reads slightly to keep things smooth on low-end devices.
    if (now - this.lastEffectTime < 16) return;
    this.lastEffectTime = now;

    const viewportCenter = window.innerWidth / 2 || 1;
    const t = now / 1000;

    for (let i = 0; i < this.slideStates.length; i++) {
      const state = this.slideStates[i];
      const rect = state.slide.getBoundingClientRect();
      const center = rect.left + rect.width / 2;

      let p = (center - viewportCenter) / viewportCenter; // -1..1 (aprox)
      p = Math.max(-1, Math.min(1, p));
      const pa = Math.min(1, Math.abs(p));
      const focus = Math.max(0, 1 - pa);

      const floatY = Math.sin(t * 1.15 + i * 0.7) * 6 * (0.35 + focus * 0.65);

      state.slide.style.setProperty("--p", p.toFixed(3));
      state.slide.style.setProperty("--pa", pa.toFixed(3));
      state.slide.style.setProperty("--focus", focus.toFixed(3));
      state.slide.style.setProperty("--float", `${floatY.toFixed(2)}px`);

      this.maybeCycleImages(state, now, focus);
    }
  }

  maybeCycleImages(state, now, focus) {
    if (!state.imgs || state.imgs.length < 2) return;

    const shouldCycle = focus > 0.72 && !this.isDragging && !this.isPaused;
    if (!shouldCycle) {
      if (state.activeIndex !== 0) this.setActiveImage(state, 0);
      state.cycleAt = 0;
      return;
    }

    if (!state.cycleAt) state.cycleAt = now + 2400;
    if (now < state.cycleAt) return;

    const next = (state.activeIndex + 1) % state.imgs.length;
    this.setActiveImage(state, next);
    state.cycleAt = now + 2400;
  }

  setActiveImage(state, index) {
    state.imgs.forEach((img, i) => img.classList.toggle("is-active", i === index));
    state.activeIndex = index;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const shell = document.querySelector("[data-infinite-slider]");
  const track = document.querySelector(".slider-track");
  if (!shell || !track) return;
  new InfiniteSlider(shell, track);
});
