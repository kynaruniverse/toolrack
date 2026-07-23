import { MetadataRoute } from "next";
import { racks, getAllTools } from "@/lib/racks";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const toolUrls: MetadataRoute.Sitemap = getAllTools().map((tool) => ({
    url: `${SITE_URL}/${tool.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const departmentUrls: MetadataRoute.Sitemap = racks
    .filter((rack) => !rack.comingSoon)
    .map((rack) => ({
      url: `${SITE_URL}/departments/${rack.slug}`,
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  return [
    {
      url: SITE_URL,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...departmentUrls,
    ...toolUrls,
  ];
}
