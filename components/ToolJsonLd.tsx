import { ToolMeta } from "@/lib/types";
import { SITE_URL } from "@/lib/site";

export default function ToolJsonLd({ tool }: { tool: ToolMeta }) {
  const json = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    url: `${SITE_URL}/${tool.slug}`,
    description: tool.pageDescription,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "GBP",
    },
    provider: {
      "@type": "Organization",
      name: "ToolRack",
      url: SITE_URL,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
