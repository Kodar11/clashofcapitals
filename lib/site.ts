/**
 * Central site configuration: brand, contact, external URLs and navigation.
 * Everything that changes at launch lives here or in the environment (.env.example).
 */

const PLAY_STORE_PREFIX = "https://play.google.com/store/apps/details";

/**
 * The official Google Play listing. Set NEXT_PUBLIC_PLAY_STORE_URL once the app is published.
 * Until then this is null and every download CTA shows a "coming soon" state instead of a link.
 */
function resolvePlayStoreUrl(): string | null {
  const value = process.env.NEXT_PUBLIC_PLAY_STORE_URL?.trim();
  return value && value.startsWith(PLAY_STORE_PREFIX) ? value : null;
}

/**
 * The production origin, used for canonical URLs, Open Graph, robots and the sitemap (server only).
 * Set NEXT_PUBLIC_SITE_URL to the real domain before launch. On Vercel it falls back to the
 * project's production domain; locally to localhost.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/+$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

/** Only the production deployment is indexed: never a preview, and never a build with no domain set. */
function resolveIndexable(): boolean {
  const vercelEnv = process.env.VERCEL_ENV;
  if (vercelEnv) return vercelEnv === "production";
  return Boolean(process.env.NEXT_PUBLIC_SITE_URL);
}

export const site = {
  name: "Clash of Capitals",
  tagline: "Build Your Empire, Play Together",
  description:
    "Roll the dice, own properties, trade with friends, and compete in Clash of Capitals, a multiplayer property-trading board game.",
  shortDescription:
    "A multiplayer property-trading board game set across Indian cities. Roll, buy, build, trade and outplay your friends.",
  supportEmail: "tanmaychavan13@gmail.com",
  url: resolveSiteUrl(),
  indexable: resolveIndexable(),
  playStoreUrl: resolvePlayStoreUrl(),
  copyrightYear: 2026,
  /** Shown on the legal pages. Update whenever a policy changes. */
  legalEffectiveDate: "11 October 2026",
} as const;

export function mailto(subject?: string, body?: string): string {
  const params = [subject ? `subject=${encodeURIComponent(subject)}` : null, body ? `body=${encodeURIComponent(body)}` : null].filter(Boolean);
  return `mailto:${site.supportEmail}${params.length ? `?${params.join("&")}` : ""}`;
}

export const routes = {
  home: "/",
  howToPlay: "/#how-to-play",
  modes: "/#modes",
  features: "/#features",
  get: "/#get",
  about: "/about",
  privacy: "/privacy",
  terms: "/terms",
  deleteAccount: "/delete-account",
  contact: "/contact",
} as const;

export const headerNav = [
  { label: "How to Play", href: routes.howToPlay },
  { label: "Game Modes", href: routes.modes },
  { label: "About", href: routes.about },
] as const;

export const footerNav = {
  game: [
    { label: "How to Play", href: routes.howToPlay },
    { label: "Game Modes", href: routes.modes },
    { label: "Features", href: routes.features },
    { label: "About", href: routes.about },
  ],
  support: [
    { label: "Contact & Support", href: routes.contact },
    { label: "Privacy Policy", href: routes.privacy },
    { label: "Terms & Conditions", href: routes.terms },
    { label: "Delete Account", href: routes.deleteAccount },
  ],
} as const;

/** Pages listed in the sitemap. */
export const sitemapPaths = ["/", "/about", "/privacy", "/terms", "/delete-account", "/contact"] as const;
