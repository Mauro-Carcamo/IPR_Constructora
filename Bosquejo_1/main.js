function initClientCards() {
  const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  if (reduceMotion) {
    document.querySelectorAll("[data-client-card]").forEach((card) => card.classList.add("is-ready"));
    return;
  }

  const cards = document.querySelectorAll("[data-client-card]");
  cards.forEach((card) => {
    card.style.pointerEvents = "none";

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          setTimeout(() => {
            card.style.pointerEvents = "auto";
            card.classList.add("is-ready");
          }, 900);
          observer.unobserve(card);
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(card);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initClientCards();
  initLogoAssembleParallax();
  initServicesHover();
  initSignature();
  initFooterYear();
  initScrollParallax();
});

function initLogoAssembleParallax() {
  const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  if (reduceMotion) return;

  const wrap = document.querySelector(".logo-assemble");
  if (!wrap) return;

  const onMove = (e) => {
    const rect = wrap.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / Math.max(1, rect.width)) * 2 - 1;
    const ny = ((e.clientY - rect.top) / Math.max(1, rect.height)) * 2 - 1;
    wrap.style.setProperty("--mx", (nx * 5.5).toFixed(2));
    wrap.style.setProperty("--my", (ny * 5.5).toFixed(2));
  };

  const onLeave = () => {
    wrap.style.setProperty("--mx", "0");
    wrap.style.setProperty("--my", "0");
  };

  wrap.addEventListener("pointermove", onMove);
  wrap.addEventListener("pointerleave", onLeave);
}

function initServicesHover() {
  const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  if (reduceMotion) return;

  const isDesktop = () => window.innerWidth > 977;
  const servicesView = document.querySelector(".services-view");
  if (!servicesView) return;

  const lines = document.querySelectorAll("[data-service-line]");

  let activeImages = [];
  let occupiedPositions = [];
  let animationTimeouts = [];

  const clearAllTimeouts = () => {
    animationTimeouts.forEach((t) => clearTimeout(t));
    animationTimeouts = [];
  };

  const getMaxWidth = () => {
    const vw = window.innerWidth;
    if (vw > 1440) return 480;
    if (vw > 1200) return 420;
    if (vw > 977) return 360;
    return 320;
  };

  const isOverlapping = (newPos) => {
    const maxWidth = getMaxWidth();
    const minDistance = maxWidth * 0.7;

    for (const pos of occupiedPositions) {
      const newLeftPx = (newPos.left / 100) * window.innerWidth;
      const newTopPx = (newPos.top / 100) * window.innerHeight;
      const existingLeftPx = (pos.left / 100) * window.innerWidth;
      const existingTopPx = (pos.top / 100) * window.innerHeight;

      const distance = Math.sqrt(
        Math.pow(newLeftPx - existingLeftPx, 2) + Math.pow(newTopPx - existingTopPx, 2)
      );
      if (distance < minDistance) return true;
    }
    return false;
  };

  const getRandomPosition = () => {
    const maxWidth = getMaxWidth();
    let attempts = 0;
    let position;

    do {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const padding = 20;

      const randomLeftPx =
        padding + Math.random() * (viewportWidth - maxWidth - padding * 2);
      const randomTopPx = padding + Math.random() * (viewportHeight - 300 - padding * 2);

      position = {
        left: (randomLeftPx / viewportWidth) * 100,
        top: (randomTopPx / viewportHeight) * 100,
      };

      attempts++;
      if (attempts > 150) break;
    } while (isOverlapping(position));

    return position;
  };

  const clearImages = () => {
    activeImages.forEach((img) => {
      img.classList.remove("is-in");
      setTimeout(() => img.remove(), 520);
    });
    activeImages = [];
    occupiedPositions = [];
  };

  const showImages = (line) => {
    if (!isDesktop()) return;

    clearAllTimeouts();
    clearImages();

    const raw = line.getAttribute("data-images") || "";
    const sources = raw
      .split("|")
      .map((s) => s.trim())
      .filter(Boolean);
    if (sources.length === 0) return;

    const maxWidth = getMaxWidth();

    sources.forEach((src, index) => {
      const timeoutId = setTimeout(() => {
        if (!isDesktop()) return;

        const img = document.createElement("img");
        img.src = src;
        img.alt = "";
        img.loading = "lazy";
        img.className = "services-float";

        const position = getRandomPosition();
        occupiedPositions.push(position);

        img.style.left = `${position.left}vw`;
        img.style.top = `${position.top}vh`;
        img.style.maxWidth = `${maxWidth}px`;

        servicesView.appendChild(img);
        activeImages.push(img);

        const showTimeoutId = setTimeout(() => img.classList.add("is-in"), 50);
        animationTimeouts.push(showTimeoutId);
      }, index * 900);

      animationTimeouts.push(timeoutId);
    });
  };

  lines.forEach((line) => {
    line.addEventListener("mouseenter", () => showImages(line));
    line.addEventListener("mouseleave", () => {
      clearAllTimeouts();
      clearImages();
    });
    line.addEventListener("click", (e) => e.preventDefault());
  });

  servicesView.addEventListener("mouseleave", () => {
    clearAllTimeouts();
    clearImages();
  });

  window.addEventListener("resize", () => {
    if (!isDesktop()) {
      clearAllTimeouts();
      clearImages();
    }
  });
}

function initSignature() {
  const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  const signature = document.querySelector("[data-signature]");
  if (!signature) return;

  if (reduceMotion) {
    signature.classList.add("is-on");
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        signature.classList.add("is-on");
        observer.disconnect();
        break;
      }
    },
    { threshold: 0.25 }
  );

  observer.observe(signature);
}

function initFooterYear() {
  const yearEl = document.querySelector("[data-year]");
  if (!yearEl) return;
  yearEl.textContent = String(new Date().getFullYear());
}

function initScrollParallax() {
  const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  if (reduceMotion) return;

  const items = Array.from(document.querySelectorAll("[data-parallax]"));
  if (!items.length) return;

  const clamp = (min, v, max) => Math.min(max, Math.max(min, v));

  const tick = () => {
    const vh = window.innerHeight || 1;
    for (const el of items) {
      const speed = Number(el.getAttribute("data-parallax") || 0.2);
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const progress = (center - vh / 2) / (vh / 2); // -1..1 aprox
      const y = clamp(-90, progress * speed * -140, 90);
      el.style.setProperty("--py", `${y}px`);
    }
    requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
}
