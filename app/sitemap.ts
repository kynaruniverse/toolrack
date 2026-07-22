import { MetadataRoute } from "next";
import { getAllTools } from "@/lib/racks";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const toolUrls: MetadataRoute.Sitemap = getAllTools().map((tool) => ({
    url: `${SITE_URL}/${tool.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    {
      url: SITE_URL,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...toolUrls,
  ];
}
