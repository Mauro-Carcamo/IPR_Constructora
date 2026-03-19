(() => {
  const ASSETS = {
    full: "../../Logo/processed/logo_full.png",
    parts: [
      { href: "../../Logo/processed/logo_1.png", w: 71, h: 227, ox: 14, oy: 2, s: 0.326, d: 0.0 },
      { href: "../../Logo/processed/logo_2.png", w: 283, h: 206, ox: 53, oy: 15, s: 0.347, d: 0.12 },
      { href: "../../Logo/processed/logo_3.png", w: 262, h: 283, ox: 14, oy: 16, s: 0.262, d: 0.22 },
    ],
    viewBox: { w: 151, h: 114 },
  };

  const surface = document.querySelector(".logo-surface");
  const svg = document.getElementById("logoSvg");
  const replay = document.getElementById("replay");
  const debug = document.getElementById("debug");

  if (!surface || !svg) return;

  const createSvgEl = (tag) => document.createElementNS("http://www.w3.org/2000/svg", tag);
  const setAttrs = (el, attrs) => {
    Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, String(v)));
  };

  const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

  function build() {
    svg.replaceChildren();
    setAttrs(svg, {
      viewBox: `0 0 ${ASSETS.viewBox.w} ${ASSETS.viewBox.h}`,
      "aria-hidden": "false",
    });

    const ref = createSvgEl("image");
    ref.classList.add("ref");
    setAttrs(ref, {
      href: ASSETS.full,
      x: 0,
      y: 0,
      width: ASSETS.viewBox.w,
      height: ASSETS.viewBox.h,
      preserveAspectRatio: "none",
    });
    svg.appendChild(ref);

    ASSETS.parts.forEach((p, idx) => {
      const g = createSvgEl("g");
      g.classList.add("piece");
      g.style.setProperty("--ox", String(p.ox));
      g.style.setProperty("--oy", String(p.oy));
      g.style.setProperty("--s", String(p.s));
      g.style.setProperty("--delay", `${p.d}s`);

      // offsets iniciales (más "moderno" tipo landing 2026)
      const sign = idx % 2 === 0 ? -1 : 1;
      g.style.setProperty("--fromx", String(28 * sign + idx * 8));
      g.style.setProperty("--fromy", String(-26 + idx * 14));
      g.style.setProperty("--fromr", `${-14 * sign}deg`);

      const img = createSvgEl("image");
      setAttrs(img, {
        href: p.href,
        x: 0,
        y: 0,
        width: p.w,
        height: p.h,
        preserveAspectRatio: "none",
      });

      g.appendChild(img);
      svg.appendChild(g);
    });
  }

  function play() {
    surface.classList.remove("is-on", "is-idle");
    // reflow
    // eslint-disable-next-line no-unused-expressions
    surface.offsetHeight;
    surface.classList.add("is-on");
    if (!reduceMotion) {
      window.setTimeout(() => surface.classList.add("is-idle"), 1400);
    } else {
      surface.classList.add("is-idle");
    }
  }

  function bind() {
    if (debug) {
      debug.addEventListener("change", () => surface.classList.toggle("debug", debug.checked));
    }
    if (replay) replay.addEventListener("click", play);

    if (reduceMotion) return;

    let raf = 0;
    const onMove = (e) => {
      const rect = surface.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / Math.max(1, rect.width)) * 2 - 1;
      const ny = ((e.clientY - rect.top) / Math.max(1, rect.height)) * 2 - 1;
      surface.style.setProperty("--mx", (nx * 6).toFixed(2));
      surface.style.setProperty("--my", (ny * 6).toFixed(2));
    };

    const onLeave = () => {
      surface.style.setProperty("--mx", "0");
      surface.style.setProperty("--my", "0");
    };

    surface.addEventListener("mousemove", onMove);
    surface.addEventListener("mouseleave", onLeave);

    const tickScroll = () => {
      const y = window.scrollY || 0;
      surface.style.setProperty("--sy", (Math.sin(y / 380) * 3).toFixed(2));
      raf = window.requestAnimationFrame(tickScroll);
    };
    raf = window.requestAnimationFrame(tickScroll);

    window.addEventListener(
      "beforeunload",
      () => {
        surface.removeEventListener("mousemove", onMove);
        surface.removeEventListener("mouseleave", onLeave);
        window.cancelAnimationFrame(raf);
      },
      { once: true }
    );
  }

  build();
  bind();
  play();
})();

