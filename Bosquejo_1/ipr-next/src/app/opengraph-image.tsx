import { ImageResponse } from "next/og";
import { loadIprLogoDataUri, socialImageSize } from "./social-image";

export const runtime = "nodejs";
export const alt = "IPR Constructora | Constructora en Santiago";
export const size = socialImageSize;
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const logo = await loadIprLogoDataUri();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
        }}
      >
        <img
          src={logo}
          alt="IPR Constructora"
          style={{ width: "82%", height: "82%", objectFit: "contain" }}
        />
      </div>
    ),
    { ...size },
  );
}