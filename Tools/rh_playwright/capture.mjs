import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const url = process.argv[2] || "https://www.rh.design/";

function ts() {
  const d = new Date();
  const p = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}-${p(d.getHours())}${p(d.getMinutes())}${p(
    d.getSeconds()
  )}`;
}

const outDir = path.resolve(__dirname, "..", "..", "Docs", "_scrapes", "rh.design", "playwright", ts());
fs.mkdirSync(outDir, { recursive: true });

const harPath = path.join(outDir, "network.har");
const tracePath = path.join(outDir, "trace.zip");
const screenshotPath = path.join(outDir, "full.png");
const domPath = path.join(outDir, "dom.html");
const resourcesPath = path.join(outDir, "resources.json");
const computedPath = path.join(outDir, "computed.json");

console.log(`Capturing ${url}`);
console.log(`Out: ${outDir}`);

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  recordHar: { path: harPath, content: "embed" },
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
});

await context.tracing.start({ screenshots: true, snapshots: true, sources: false });

const page = await context.newPage();
page.setDefaultTimeout(60_000);

await page.goto(url, { waitUntil: "networkidle" });
await page.waitForTimeout(1500);

// Scroll to trigger lazy-load/interactions
await page.evaluate(async () => {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const max = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
  const step = Math.max(320, Math.floor(window.innerHeight * 0.75));
  for (let y = 0; y < max; y += step) {
    window.scrollTo(0, y);
    await sleep(140);
  }
  window.scrollTo(0, 0);
});

await page.waitForTimeout(800);

const dom = await page.content();
fs.writeFileSync(domPath, dom, "utf8");

await page.screenshot({ path: screenshotPath, fullPage: true });

const resources = await page.evaluate(() => {
  const entries = performance.getEntriesByType("resource");
  return entries.map((e) => ({
    name: e.name,
    initiatorType: e.initiatorType,
    duration: e.duration,
    transferSize: "transferSize" in e ? e.transferSize : undefined,
    encodedBodySize: "encodedBodySize" in e ? e.encodedBodySize : undefined,
    decodedBodySize: "decodedBodySize" in e ? e.decodedBodySize : undefined,
  }));
});
fs.writeFileSync(resourcesPath, JSON.stringify(resources, null, 2), "utf8");

const computed = await page.evaluate(() => {
  const pick = (sel) => document.querySelector(sel);
  const cs = (el) => {
    if (!el) return null;
    const s = getComputedStyle(el);
    const keys = [
      "fontFamily",
      "fontSize",
      "fontWeight",
      "lineHeight",
      "letterSpacing",
      "color",
      "backgroundColor",
      "background",
      "borderColor",
      "borderRadius",
      "borderWidth",
      "borderStyle",
      "boxShadow",
      "padding",
      "margin",
      "width",
      "height",
      "maxWidth",
      "transform",
      "opacity",
    ];
    const out = {};
    for (const k of keys) out[k] = s[k];
    return out;
  };

  const bySelector = (selectors) => {
    const out = {};
    for (const sel of selectors) {
      const el = pick(sel);
      out[sel] = {
        exists: Boolean(el),
        tag: el ? el.tagName.toLowerCase() : null,
        className: el ? el.className : null,
        style: cs(el),
      };
    }
    return out;
  };

  const wids = Array.from(document.querySelectorAll("[data-w-id]")).slice(0, 120).map((el) => ({
    tag: el.tagName.toLowerCase(),
    cls: el.className,
    wId: el.getAttribute("data-w-id"),
    style: { transform: getComputedStyle(el).transform, opacity: getComputedStyle(el).opacity },
  }));

  const keySelectors = [
    "body",
    ".page-wrapper",
    ".navbar.w-nav",
    ".container-1130",
    ".wrapper-navbar",
    ".btn-book.btn-nav",
    ".button-base-medium",
    ".circle-yellow",
    ".section-hero",
    ".wrapper-hero",
    ".body-base-book._000000-40",
    ".h1-hero",
    "a.button.w-inline-block",
    ".overflow",
    ".inner-text-btn",
    "img.img-33",
    ".section-slider",
    ".bottom-test",
    ".container-slide",
    ".wrapper-slider",
    ".slide",
    ".mouse-wrapper",
    ".mouse",
    ".mouse-wrapper-project",
    ".mouse-project",
    ".mouse .button-base-book",
    ".mouse-project .button-base-book",
    ".mouse-project .icon-20",
    ".section-services",
    ".line-yellow",
    ".title-display",
    ".title-display-000",
    ".text-lable",
    ".text-block._939393",
    ".text-block._0000",
    ".move-div",
    ".section-founder",
    ".wrapper-founder",
    ".left-founder",
    ".right-founder",
    ".link-x",
    ".wrapper-footer",
    ".link-ft",
    ".logo-footer",
    ".img-footer",
    ".section-clients",
    ".wrapper-clients",
    ".top-clietns",
    ".bottom-clients",
    ".card-clients",
    ".main-hover-card",
    ".card-hover",
    ".logo-clients",
    ".tint-div",
  ];

  const rootVars = (() => {
    const root = document.documentElement;
    const s = getComputedStyle(root);
    const vars = {};
    for (let i = 0; i < root.style.length; i++) {
      const k = root.style[i];
      if (k && k.startsWith("--")) vars[k] = s.getPropertyValue(k).trim();
    }
    return vars;
  })();

  return {
    at: new Date().toISOString(),
    body: cs(document.body),
    h1: cs(pick("h1")),
    nav: cs(pick("nav")),
    selectors: bySelector(keySelectors),
    rootVars,
    wIdSamples: wids,
  };
});
fs.writeFileSync(computedPath, JSON.stringify(computed, null, 2), "utf8");

await context.tracing.stop({ path: tracePath });
await context.close();
await browser.close();

console.log("Done:");
console.log(`- ${domPath}`);
console.log(`- ${resourcesPath}`);
console.log(`- ${computedPath}`);
console.log(`- ${harPath}`);
console.log(`- ${tracePath}`);
console.log(`- ${screenshotPath}`);
