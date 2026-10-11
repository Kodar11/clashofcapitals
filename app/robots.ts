import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/** Production is crawlable; previews and builds without a configured domain are not. */
export default function robots(): MetadataRoute.Robots {
  if (!site.indexable) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
