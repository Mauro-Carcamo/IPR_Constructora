const PATHS = {
  full: new URL("../../Logo/Logo_completo.jpeg", import.meta.url).href,
  parts: [
    new URL("../../Logo/Logo_1.jpeg", import.meta.url).href,
    new URL("../../Logo/Logo_2.jpeg", import.meta.url).href,
    new URL("../../Logo/Logo_3.jpeg", import.meta.url).href,
  ],
};

const easeOutExpo = "cubic-bezier(0.16, 1, 0.3, 1)";

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.decoding = "async";
    img.loading = "eager";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function toTransparentPng(img, { whiteThreshold = 248 } = {}) {
  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth || img.width;
  canvas.height = img.naturalHeight || img.height;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("Canvas 2D no disponible");

  ctx.drawImage(img, 0, 0);
  const { data, width, height } = ctx.getImageData(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    if (r >= whiteThreshold && g >= whiteThreshold && b >= whiteThreshold) data[i + 3] = 0;
  }

  ctx.putImageData(new ImageData(data, width, height), 0, 0);
  return canvas.toDataURL("image/png");
}

function buildMask(img, { alphaMin = 10, redMin = 60 } = {}) {
  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth || img.width;
  canvas.height = img.naturalHeight || img.height;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("Canvas 2D no disponible");
  ctx.drawImage(img, 0, 0);
  const id = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const w = canvas.width;
  const h = canvas.height;
  const mask = new Uint8Array(w * h);

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      const r = id.data[i];
      const g = id.data[i + 1];
      const b = id.data[i + 2];
      const a = id.data[i + 3];
      // rojo-ish (evitar ruido de borde)
      const isRed = a > alphaMin && r > redMin && r > g + 18 && r > b + 18;
      mask[y * w + x] = isRed ? 1 : 0;
    }
  }

  return { mask, w, h };
}

function bboxFromMask(maskObj) {
  const { mask, w, h } = maskObj;
  let minX = w,
    minY = h,
    maxX = -1,
    maxY = -1;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (!mask[y * w + x]) continue;
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    }
  }
  if (maxX < 0) return null;
  return { minX, minY, maxX, maxY, w: maxX - minX + 1, h: maxY - minY + 1 };
}

function redCoords(maskObj, bbox, { sampleEvery = 2 } = {}) {
  const coords = [];
  const { mask, w } = maskObj;
  for (let y = bbox.minY; y <= bbox.maxY; y += sampleEvery) {
    for (let x = bbox.minX; x <= bbox.maxX; x += sampleEvery) {
      if (mask[y * w + x]) coords.push([x - bbox.minX, y - bbox.minY]);
    }
  }
  return coords;
}

function cropToTransparentPng(img, bbox, { whiteThreshold = 248 } = {}) {
  const canvas = document.createElement("canvas");
  canvas.width = bbox.w;
  canvas.height = bbox.h;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("Canvas 2D no disponible");

  ctx.drawImage(img, bbox.minX, bbox.minY, bbox.w, bbox.h, 0, 0, bbox.w, bbox.h);
  const id = ctx.getImageData(0, 0, bbox.w, bbox.h);
  for (let i = 0; i < id.data.length; i += 4) {
    const r = id.data[i];
    const g = id.data[i + 1];
    const b = id.data[i + 2];
    if (r >= whiteThreshold && g >= whiteThreshold && b >= whiteThreshold) id.data[i + 3] = 0;
  }
  ctx.putImageData(id, 0, 0);
  return canvas;
}

function canvasToDataUrl(canvas) {
  return canvas.toDataURL("image/png");
}

function resizeCanvas(srcCanvas, scale) {
  const dst = document.createElement("canvas");
  dst.width = Math.max(1, Math.round(srcCanvas.width * scale));
  dst.height = Math.max(1, Math.round(srcCanvas.height * scale));
  const ctx = dst.getContext("2d");
  if (!ctx) throw new Error("Canvas 2D no disponible");
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(srcCanvas, 0, 0, dst.width, dst.height);
  return dst;
}

function bestTransform(fullMaskObj, fullBbox, partMaskObj, partBbox) {
  const fullMask = fullMaskObj.mask;
  const fw = fullBbox.w;
  const fh = fullBbox.h;

  // coords de la pieza (relativas a bbox)
  const baseCoords = redCoords(partMaskObj, partBbox, { sampleEvery: 2 });

  // escala candidata: como las piezas están en mayor resolución, buscamos hacia abajo
  const target = Math.min(
    fw / Math.max(partBbox.w, 1),
    fh / Math.max(partBbox.h, 1)
  );
  const minS = Math.max(0.25, target * 0.65);
  const maxS = Math.min(0.95, target * 1.25);

  let best = { ox: 0, oy: 0, s: target, score: -Infinity };

  const scoreAt = (ox, oy, coords, pw, ph) => {
    // sample: coords ya están en escala final
    let hits = 0;
    let misses = 0;
    for (let i = 0; i < coords.length; i++) {
      const [x, y] = coords[i];
      const fx = ox + x;
      const fy = oy + y;
      if (fx < 0 || fy < 0 || fx >= fw || fy >= fh) {
        misses++;
        continue;
      }
      const fi = (fullBbox.minY + fy) * fullMaskObj.w + (fullBbox.minX + fx);
      if (fullMask[fi]) hits++;
      else misses++;
    }
    return hits - misses * 0.35;
  };

  const tryScale = (s) => {
    const coords = baseCoords.map(([x, y]) => [Math.round(x * s), Math.round(y * s)]);
    const pw = Math.max(1, Math.round(partBbox.w * s));
    const ph = Math.max(1, Math.round(partBbox.h * s));
    const maxX = fw - pw;
    const maxY = fh - ph;
    if (maxX < 0 || maxY < 0) return;

    // búsqueda gruesa
    const step = 2;
    let localBest = { ox: 0, oy: 0, score: -Infinity };
    for (let oy = 0; oy <= maxY; oy += step) {
      for (let ox = 0; ox <= maxX; ox += step) {
        const score = scoreAt(ox, oy, coords, pw, ph);
        if (score > localBest.score) localBest = { ox, oy, score };
      }
    }
    // refinamiento alrededor del mejor
    for (let oy = Math.max(0, localBest.oy - 3); oy <= Math.min(maxY, localBest.oy + 3); oy++) {
      for (let ox = Math.max(0, localBest.ox - 3); ox <= Math.min(maxX, localBest.ox + 3); ox++) {
        const score = scoreAt(ox, oy, coords, pw, ph);
        if (score > localBest.score) localBest = { ox, oy, score };
      }
    }

    if (localBest.score > best.score) best = { ox: localBest.ox, oy: localBest.oy, s, score: localBest.score };
  };

  for (let s = minS; s <= maxS; s += 0.015) tryScale(Number(s.toFixed(3)));

  return best;
}

function createSvgEl(tag) {
  return document.createElementNS("http://www.w3.org/2000/svg", tag);
}

function setAttrs(el, attrs) {
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, String(v)));
}

function addPiece(svg, { href, x, y, w, h, className }) {
  const g = createSvgEl("g");
  g.classList.add("piece");
  if (className) g.classList.add(className);

  // Guardamos transform base en variables CSS para combinar con idle/parallax
  g.style.setProperty("--tx", `${x}px`);
  g.style.setProperty("--ty", `${y}px`);
  g.style.setProperty("--rot", `0deg`);

  const img = createSvgEl("image");
  setAttrs(img, {
    href,
    x: 0,
    y: 0,
    width: w,
    height: h,
    preserveAspectRatio: "none",
  });

  // transform base: translate a su posición final
  g.setAttribute("transform", `translate(${x} ${y})`);
  g.appendChild(img);
  svg.appendChild(g);
  return g;
}

function addReference(svg, { href, w, h }) {
  const img = createSvgEl("image");
  img.classList.add("ref");
  setAttrs(img, { href, x: 0, y: 0, width: w, height: h, preserveAspectRatio: "none" });
  svg.appendChild(img);
}

function animateAssemble(pieces) {
  const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  if (reduceMotion) {
    pieces.forEach((p) => p.classList.add("is-idle"));
    return;
  }

  pieces.forEach((p, idx) => {
    const delay = idx * 90;
    const baseTx = parseFloat(p.style.getPropertyValue("--tx") || "0");
    const baseTy = parseFloat(p.style.getPropertyValue("--ty") || "0");

    // entrada desde distintos lados
    const fromX = baseTx + (idx === 0 ? -36 : idx === 1 ? 42 : 18);
    const fromY = baseTy + (idx === 0 ? 42 : idx === 1 ? -34 : 28);
    const fromR = idx === 1 ? 10 : idx === 2 ? -8 : 6;

    p.animate(
      [
        {
          transform: `translate(${fromX}px, ${fromY}px) rotate(${fromR}deg) scale(0.94)`,
          opacity: 0,
        },
        {
          transform: `translate(${baseTx}px, ${baseTy}px) rotate(0deg) scale(1)`,
          opacity: 1,
        },
      ],
      { duration: 900, delay, easing: easeOutExpo, fill: "forwards" }
    );

    window.setTimeout(() => p.classList.add("is-idle"), 1000 + delay);
  });
}

function wireParallax(svgRoot, pieces) {
  const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  if (reduceMotion) return;

  let mx = 0;
  let my = 0;
  let sy = 0;

  const onMove = (e) => {
    const r = svgRoot.getBoundingClientRect();
    const px = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
    const py = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
    mx = Math.max(-1, Math.min(1, px));
    my = Math.max(-1, Math.min(1, py));
  };

  const onScroll = () => {
    const doc = document.documentElement;
    const scroll = doc.scrollTop || window.scrollY || 0;
    sy = (scroll / (doc.scrollHeight - doc.clientHeight + 1)) * 2 - 1;
  };

  window.addEventListener("mousemove", onMove, { passive: true });
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  let raf = 0;
  const loop = () => {
    pieces.forEach((p, idx) => {
      const baseTx = parseFloat(p.style.getPropertyValue("--tx") || "0");
      const baseTy = parseFloat(p.style.getPropertyValue("--ty") || "0");
      const depth = idx === 0 ? 10 : idx === 1 ? 14 : 12;
      const dx = mx * depth;
      const dy = my * depth + sy * (idx === 1 ? -6 : 6);
      p.style.transform = `translate(${baseTx + dx}px, ${baseTy + dy}px)`;
    });
    raf = window.requestAnimationFrame(loop);
  };
  raf = window.requestAnimationFrame(loop);

  return () => {
    window.removeEventListener("mousemove", onMove);
    window.removeEventListener("scroll", onScroll);
    window.cancelAnimationFrame(raf);
  };
}

async function boot() {
  const svg = document.getElementById("logoSvg");
  const replay = document.getElementById("replay");
  const debug = document.getElementById("debug");
  const surface = document.querySelector(".logo-surface");

  const hint = document.querySelector(".hint");
  if (hint) hint.textContent = "Cargando y alineando logo…";

  const [fullImg, ...partImgs] = await Promise.all([loadImage(PATHS.full), ...PATHS.parts.map(loadImage)]);

  // máscaras + bbox (recorte real)
  const fullMaskObj = buildMask(fullImg);
  const partMaskObjs = partImgs.map(buildMask);

  const fullBbox = bboxFromMask(fullMaskObj);
  const partBboxes = partMaskObjs.map(bboxFromMask);
  if (!fullBbox || partBboxes.some((b) => !b)) throw new Error("No se detectaron píxeles rojos en el logo.");

  const fullCanvas = cropToTransparentPng(fullImg, fullBbox);
  const fullPng = canvasToDataUrl(fullCanvas);

  // encontrar transform (offset + escala) de cada pieza dentro del bbox del full
  const transforms = partMaskObjs.map((pm, idx) => bestTransform(fullMaskObj, fullBbox, pm, partBboxes[idx]));

  // preparar canvases de piezas recortadas + escaladas
  const partCanvases = partImgs.map((im, idx) => cropToTransparentPng(im, partBboxes[idx]));
  const partScaled = partCanvases.map((c, idx) => resizeCanvas(c, transforms[idx].s));
  const partPngs = partScaled.map(canvasToDataUrl);

  // configurar viewBox como el bbox del logo completo
  svg.setAttribute("viewBox", `0 0 ${fullBbox.w} ${fullBbox.h}`);

  // limpiar svg
  while (svg.firstChild) svg.removeChild(svg.firstChild);

  // referencia opcional
  addReference(svg, { href: fullPng, w: fullBbox.w, h: fullBbox.h });

  // piezas
  const pieces = transforms.map((t, idx) =>
    addPiece(svg, {
      href: partPngs[idx],
      x: t.ox,
      y: t.oy,
      w: partScaled[idx].width,
      h: partScaled[idx].height,
      className: `piece--${idx + 1}`,
    })
  );

  const run = () => {
    pieces.forEach((p) => {
      p.classList.remove("is-idle");
      p.getAnimations().forEach((a) => a.cancel());
      // reset base transform (parallax loop lo ajusta después)
      const baseTx = parseFloat(p.style.getPropertyValue("--tx") || "0");
      const baseTy = parseFloat(p.style.getPropertyValue("--ty") || "0");
      p.style.transform = `translate(${baseTx}px, ${baseTy}px)`;
      p.style.opacity = "1";
    });
    animateAssemble(pieces);
  };

  run();
  const cleanup = wireParallax(svg, pieces);

  replay?.addEventListener("click", () => run());
  debug?.addEventListener("change", () => surface?.classList.toggle("debug", Boolean(debug.checked)));

  window.addEventListener("beforeunload", () => cleanup?.(), { once: true });
  if (hint) hint.textContent = "Listo. Repite la animación cuando quieras.";
}

boot().catch((err) => {
  console.error(err);
  const top = document.querySelector(".hint");
  if (top) top.textContent = "No se pudo cargar/animar el logo. Revisa la consola.";
});
