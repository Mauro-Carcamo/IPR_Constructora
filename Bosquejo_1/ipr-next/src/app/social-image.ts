import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const socialImageSize = { width: 1200, height: 630 } as const;

export async function loadIprLogoDataUri() {
  const logoPath = join(process.cwd(), "public", "Logo", "Logo_completo.jpeg");
  const logoBuffer = await readFile(logoPath);
  return `data:image/jpeg;base64,${logoBuffer.toString("base64")}`;
}
