# Lasitha Wijenayake • Futuristic Portfolio (Next.js + TS)

A cyberpunk/neo‑futuristic single‑page portfolio for Lasitha Wijenayake (SDET • Cypress Automation Expert), built with:
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS (glassmorphism, neon glow, glitch + custom animations)
- Framer Motion / GSAP (lightweight use)
- SWR (client caching with 30‑minute TTL)
- API routes for live data from Medium, GitHub, and NPM

Live sections include: Hero (typing + terminal sim), About, Skills, GitHub showcase, Projects (3D tilt), Blog (Medium), Achievements (NPM), Experience, and a themed layout with dark/light toggle.

## Quick Start (Windows-friendly)

Requirements
- Node.js 18.17+ or 20+ (LTS recommended)
- npm 9/10

Clone & setup env
```powershell
# from PowerShell
cd C:\RnD\Profile\lasitha_me
Copy-Item .env.example .env.local
# Optional: edit .env.local to adjust usernames/tokens
```

Install dependencies (Windows cache workaround)
```powershell
# If you previously saw EPERM/ENOENT cache errors, use a local cache folder
npm install --cache .\.npm-cache
```

Run in development
```powershell
npm run dev
# App will be on http://localhost:3000
```

Build for production
```powershell
npm run build
```

Start production server
```powershell
npm run start
# App will be on http://localhost:3000
```

Notes on Windows npm cache errors
- If you hit EPERM/ENOENT while installing, prefer a project-local cache: `npm install --cache .\.npm-cache`
- You can also set a persistent cache location for your user:
  ```powershell
  npm config set cache "$env:USERPROFILE\AppData\Local\npm-cache" --location=user
  ```

## Environment Variables
Create `.env.local` (we ship `.env.example`):
```
NEXT_PUBLIC_GITHUB_USERNAME=lasithdilshan20
NEXT_PUBLIC_MEDIUM_USERNAME=lasithdilshan20
NEXT_PUBLIC_NPM_USERNAME=lasithdilshan20
# Optional for higher GitHub API rate limits
# GITHUB_TOKEN=ghp_your_token_here
```

- Public vars are used client- and server-side for API route queries.
- `GITHUB_TOKEN` (server-side only) raises GitHub API rate limits.

## What’s Implemented
- Theme & Aesthetic: Dark cyberpunk theme, glass panels, neon borders, custom animations, reduced‑motion support.
- Hero: Typing intro + terminal simulator showing Cypress run output.
- About & Experience: Vertical timelines with glowing connectors.
- Skills: Animated progress bars on scroll with neon gradient.
- Projects: 3D tilt effect cards with neon hover.
- Blog (Medium): Fetches latest 4 via RSS2JSON; thumbnails, dates, read‑time, skeleton loaders, error retry.
- GitHub: Profile stats (followers, repos, total stars) + top starred repos with topics/badges.
- Achievements (NPM): Featured package (cypress-intercept-search) with animated download counter + other packages with live downloads.
- Accessibility & Perf: Keyboard‑friendly, alt texts, high contrast var hook, lazy images, SWR 30‑min cache, ISR via Next revalidate on server routes.

## Tech Notes
- App Router with `src/app`.
- Client-only SWR provider (ClientProviders) to avoid passing functions from server to client. This fixed a Next build error about functions in Client Components.
- API Routes
  - `GET /api/medium` → Medium RSS via rss2json
  - `GET /api/github` → GitHub profile + repos
  - `GET /api/npm/[pkg]` → Last-month downloads
  - `GET /api/npm/user` → Packages by maintainer
- Image domains configured in `next.config.mjs` for Medium and GitHub.

## Common Troubleshooting
- Build complains: “Functions cannot be passed directly to Client Components…”
  - Ensure `src/app/layout.tsx` wraps content in `ClientProviders` (provided) instead of passing SWR `fetcher` from server.
- Medium thumbnails sometimes missing
  - RSS content may omit images. We gracefully show a color block.
- GitHub rate limiting
  - Add `GITHUB_TOKEN` to `.env.local` (don’t prefix with NEXT_PUBLIC) and rebuild.

## Deployment
- Vercel: zero‑config. Add env vars in Project Settings → Environment Variables. Then `vercel` or connect repo.
- Netlify/Other: Build command `npm run build`, publish dir `.next`. Use Next.js adapter if needed.

## Scripts
- `npm run dev` → start dev server
- `npm run build` → production build
- `npm run start` → start production server
- `npm run lint` → lint

## License
MIT (see LICENSE)