import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ToolRack — The Digital Toolbox",
    short_name: "ToolRack",
    description:
      "Fast, reliable tools built for the job — whatever the job. No sign-up, no clutter.",
    start_url: "/",
    display: "standalone",
    background_color: "#1C1F22",
    theme_color: "#1C1F22",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512-maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
