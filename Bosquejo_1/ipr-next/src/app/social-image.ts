import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const socialImageSize = { width: 1200, height: 630 } as const;

export async function loadIprLogoDataUri() {
  const logoPath = join(process.cwd(), "public", "Logo", "logo-ipr-sin-fondo.png");
  const logoBuffer = await readFile(logoPath);
  return `data:image/png;base64,${logoBuffer.toString("base64")}`;
}
