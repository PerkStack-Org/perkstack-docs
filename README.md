# PerkStack Documentation

The complete documentation site for PerkStack — a Shopify loyalty and reviews platform.

**Live:** [docs.perk-stack.com](https://docs.perk-stack.com)

## Tech Stack

- **Next.js 15** — Static export (SSG)
- **Tailwind CSS 4** — PerkStack design system
- **Fuse.js** — Client-side full-text search (CMD+K / CTRL+K)
- **TypeScript** — Type-safe components
- **Lucide Icons** — Consistent iconography

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3100](http://localhost:3100).

## Build

```bash
npm run build
```

Static files are output to the `out/` directory.

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Framework preset: **Next.js**
4. Add custom domain: `docs.perk-stack.com`

DNS: Add a CNAME record pointing `docs.perk-stack.com` to `cname.vercel-dns.com`.

### Cloudflare Pages

1. Push to GitHub
2. Create a new Cloudflare Pages project
3. Build command: `npm run build`
4. Build output directory: `out`
5. Add custom domain: `docs.perk-stack.com`

### Railway

1. Push to GitHub
2. Create a new Railway service
3. Build: `npm run build`
4. Start: `npm run start`
5. Add custom domain: `docs.perk-stack.com`

### Netlify

1. Push to GitHub
2. Create a new Netlify site
3. Build command: `npm run build`
4. Publish directory: `out`
5. Add custom domain: `docs.perk-stack.com`

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout (header, sidebar, fonts)
│   ├── globals.css          # Design tokens & prose styles
│   ├── page.tsx             # Redirect to /docs/getting-started/introduction
│   └── docs/
│       ├── getting-started/ # Introduction, installation, setup
│       ├── dashboard/       # Dashboard, analytics, extension status
│       ├── loyalty/         # Earn rules, rewards, points, tiers, referrals
│       ├── reviews/         # Moderation, requests, photos, import, SEO
│       ├── widgets/         # All storefront widgets + checkout + account
│       ├── customers/       # Customer management, tiers, freeze
│       ├── settings/        # General, billing, email, review, widget
│       ├── advanced/        # Architecture, webhooks, statuses, extensions
│       └── troubleshooting/ # Common issues, FAQ
├── components/
│   ├── Header.tsx           # Top navigation bar
│   ├── Sidebar.tsx          # Left sidebar navigation
│   ├── SearchDialog.tsx     # CMD+K search modal
│   ├── SearchProvider.tsx   # Global search state
│   ├── Callout.tsx          # Info/warning/tip/danger callouts
│   └── PlanBadge.tsx        # Free/Growth/Pro plan badges
└── lib/
    ├── navigation.ts        # Sidebar navigation tree
    └── search-content.ts    # Search index entries
```

## Adding Documentation

1. Create a new directory under the appropriate section in `src/app/docs/`
2. Create a `page.tsx` file with a default export function
3. Wrap content in `<div className="docs-prose">`
4. Add the page to `src/lib/navigation.ts`
5. Optionally add search entries to `src/lib/search-content.ts`
