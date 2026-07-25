import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#1C1F22",
        }}
      >
        <div
          style={{
            fontSize: 28,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#FFC72C",
            marginBottom: 20,
            display: "flex",
          }}
        >
          The Digital Toolbox
        </div>
        <div
          style={{
            fontSize: 120,
            fontWeight: 700,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#FFFFFF",
            display: "flex",
          }}
        >
          ToolRack
        </div>
        <div
          style={{
            fontSize: 30,
            color: "#C9C7C1",
            marginTop: 24,
            display: "flex",
          }}
        >
          Fast, reliable calculators — built for the job site
        </div>
      </div>
    ),
    { ...size }
  );
}
