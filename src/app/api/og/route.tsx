import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0f",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-100px",
            left: "-100px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-100px",
            right: "-100px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            width: "96px",
            height: "96px",
            borderRadius: "22px",
            background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "32px",
            boxShadow: "0 0 40px rgba(59,130,246,0.3)",
          }}
        >
          <span
            style={{
              fontSize: "52px",
              fontWeight: 900,
              color: "white",
              fontFamily: "sans-serif",
            }}
          >
            K
          </span>
        </div>
        <div
          style={{
            fontSize: "64px",
            fontWeight: 800,
            background: "linear-gradient(135deg, #3b82f6, #8b5cf6, #06b6d4)",
            backgroundClip: "text",
            color: "transparent",
            marginBottom: "16px",
            letterSpacing: "-2px",
          }}
        >
          KevinOS
        </div>
        <div
          style={{
            fontSize: "28px",
            color: "#94a3b8",
            marginBottom: "24px",
            fontWeight: 500,
          }}
        >
          Ishimwe Kevin — Software Engineer
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          {["Full-Stack", "React", "Node.js", "AI"].map((tag) => (
            <div
              key={tag}
              style={{
                padding: "8px 20px",
                borderRadius: "12px",
                border: "1px solid rgba(59,130,246,0.3)",
                background: "rgba(59,130,246,0.08)",
                color: "#60a5fa",
                fontSize: "18px",
                fontWeight: 600,
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}