# Rowdro Mrong — Portfolio

Personal portfolio of **Rowdro Mrong** — Web Developer & Shopify Developer from Bangladesh.
A dark, motion-rich single-page experience: 3D hero, featured projects, skills,
experience timeline, process and a working contact flow (mailto).

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS 4 + shadcn/ui
- Framer Motion · Three.js (React Three Fiber) · Lenis smooth scroll

## Editing content

All text, links, projects, skills, SEO and contact details live in **one file**:

```
src/data/portfolio.ts
```

Edit it and the whole site updates — no component knowledge needed.

## Run locally

```bash
bun install
bun run dev
```

## Deploy to Vercel

1. Push this folder to a GitHub repository
2. Go to [vercel.com](https://vercel.com) → **Add New… → Project** → import the repo
3. Framework preset is auto-detected (Next.js) → click **Deploy**

No environment variables needed — the site is fully static.

## Production build

```bash
bun run build
bun run start
```
