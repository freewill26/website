# Freewill — Web

Marketing site for **Freewill**, built with **Next.js (App Router)**, **TypeScript** and **Tailwind CSS**. This repo implements the *Product Type* detail page from the Freewill design system.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The root route redirects to the default product type (`/products/TFX-01`).

## Routes

| Route                | Purpose                                          |
| -------------------- | ------------------------------------------------ |
| `/`                  | Redirects to the default product type            |
| `/products`          | Index of every Taraflex® product type            |
| `/products/[code]`   | **Product Type detail page** (TFX-01 … TFX-06)   |

Each product type is statically generated (`generateStaticParams`).

## Project structure

```
app/
  layout.tsx              Root layout: fonts, <Header>, <Footer>, metadata
  globals.css             Tailwind layers + reveal/animation utilities
  page.tsx                Home → redirect to default product
  not-found.tsx           404 page
  products/
    page.tsx              Product index
    [code]/page.tsx       Product Type detail (composes the sections)

components/
  layout/                 Site chrome: Header, MarqueeRibbon, MobileMenu, Footer
  sections/               One component per page section (Hero, Specs, …)
  ui/                     Reusable primitives: Section, Container, Reveal,
                          MaskedLines, SectionLabel, CourtImage, ParallaxTile…

lib/
  products.ts             Typed product catalogue + lookup helpers
  navigation.ts           Nav model and route helpers

types/
  product.ts              Shared TypeScript interfaces
```

### Conventions

- **Sections** (`components/sections`) are page-specific compositions; **ui**
  primitives are generic and reused across sections.
- The dark theme lives in `tailwind.config.ts` as named tokens
  (`ink`, `brand`, `cream`, …) — prefer those over raw hex values.
- Scroll-in animations use a small `IntersectionObserver` wrapper
  (`Reveal` / `MaskedLines`) instead of a heavy animation library, and respect
  `prefers-reduced-motion`.

## Imagery

Court visuals are rendered by `components/ui/CourtImage.tsx` — a themed gradient
placeholder, so the project runs with no binary assets. To use real photography,
drop files into `public/assets/` and swap `CourtImage` for `next/image`.
