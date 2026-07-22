// Single source of truth for the site's absolute URL. Needed for
// metadataBase (so relative OG image paths resolve correctly), robots.ts,
// and sitemap.ts.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://toolrack.co.uk";
