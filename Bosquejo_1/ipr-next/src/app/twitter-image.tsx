import { ImageResponse } from "next/og";
import { loadIprLogoDataUri, socialImageSize } from "./social-image";

export const runtime = "nodejs";
export const alt = "IPR Constructora | Constructora en Santiago";
export const size = socialImageSize;
export const contentType = "image/png";

export default async function TwitterImage() {
  const logo = await loadIprLogoDataUri();

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "stretch",
          justifyContent: "center",
          background:
            "radial-gradient(circle at 22% 18%, rgba(248, 64, 64, 0.24), transparent 30%), linear-gradient(135deg, #0b0b0b 0%, #111111 50%, #060606 100%)",
          color: "#f2f2f2",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(120deg, rgba(255,255,255,0.05) 0%, transparent 35%, transparent 100%)",
          }}
        />
        <div
          style={{
            position: "relative",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "56px 64px",
            gap: 44,
          }}
        >
          <div
            style={{
              width: 230,
              minWidth: 230,
              height: 230,
              borderRadius: 38,
              background: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 24px 60px rgba(0,0,0,0.22)",
            }}
          >
            <img src={logo} alt="IPR Constructora" style={{ width: 176, height: 176, objectFit: "contain" }} />
          </div>

          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 16,
              paddingLeft: 8,
            }}
          >
            <div
              style={{
                display: "flex",
                padding: "9px 14px",
                borderRadius: 999,
                background: "rgba(248, 64, 64, 0.18)",
                border: "1px solid rgba(248, 64, 64, 0.35)",
                color: "#f84040",
                fontSize: 20,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                fontWeight: 700,
              }}
            >
              IPR Constructora
            </div>

            <div style={{ fontSize: 58, lineHeight: 1.02, fontWeight: 700, letterSpacing: "-0.05em", maxWidth: 680 }}>
              Constructora en Santiago
            </div>

            <div style={{ fontSize: 26, lineHeight: 1.35, color: "rgba(242,242,242,0.86)", maxWidth: 700 }}>
              Obras civiles, industriales, comerciales y habitacionales con orden, cumplimiento y calidad.
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}



