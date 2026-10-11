# Clash of Capitals — website

The official website for **Clash of Capitals**, a multiplayer property-trading board game.
Next.js (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · Lucide.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Marketing homepage |
| `/about` | About the game |
| `/privacy` | Privacy policy (linked from the Play listing and the app) |
| `/terms` | Terms & conditions |
| `/delete-account` | Account deletion instructions and email request route |
| `/contact` | Support |
| `/robots.txt`, `/sitemap.xml` | Generated from `app/robots.ts` and `app/sitemap.ts` |

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npx tsc --noEmit
npm run build
```

## Configuration

Everything that changes at launch is in [`lib/site.ts`](lib/site.ts) or the environment
(see [`.env.example`](.env.example)).

| Setting | Where | Notes |
| --- | --- | --- |
| Production domain | `NEXT_PUBLIC_SITE_URL` | Canonical URLs, Open Graph, robots, sitemap. On Vercel it falls back to the project's production domain. |
| Google Play listing | `NEXT_PUBLIC_PLAY_STORE_URL` | Must start with `https://play.google.com/store/apps/details`. While unset, download buttons lead to a "Coming soon to Google Play" state. |
| Support email, brand name | `lib/site.ts` | Used by every page. |
| Legal effective date | `lib/site.ts` → `legalEffectiveDate` | Update whenever a policy changes. |

Search engines are told not to index the site unless it is a Vercel **production** deployment
or `NEXT_PUBLIC_SITE_URL` is set, so previews stay out of search results.

## Structure

```
app/                 Routes, metadata, robots, sitemap, global styles (design tokens)
components/          Shared UI: header, footer, buttons, page layouts, motion helpers
components/home/     Homepage visuals: the interactive board and the feature demos
lib/site.ts          Brand, contact, URLs and navigation
public/              Brand assets from the mobile app, and the social sharing image
```

Design tokens (colours, radii, shadows, motion, widths) are CSS variables at the top of
`app/globals.css`, mapped to Tailwind names in the `@theme` block below them.

## Keeping the site truthful

The rules, prices and board on the homepage, and every statement in the privacy policy and on the
delete-account page, were written from the mobile app's source. When the app changes its data
practices, account flow, game modes or voice chat, update the matching page here.
