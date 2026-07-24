import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Renders a branded OG card for a single tool. Kept as one shared function
// so all per-tool opengraph-image.tsx files stay visually identical and
// only differ by which tool name they pass in.
export function toolOgImage(toolName: string) {
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
          padding: "0 80px",
        }}
      >
        <div
          style={{
            fontSize: 26,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#FFC72C",
            marginBottom: 28,
            display: "flex",
          }}
        >
          ToolRack
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: "#FFFFFF",
            textAlign: "center",
            lineHeight: 1.15,
            display: "flex",
          }}
        >
          {toolName}
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#C9C7C1",
            marginTop: 28,
            display: "flex",
          }}
        >
          Fast, reliable, no sign-up
        </div>
      </div>
    ),
    { ...size }
  );
}
