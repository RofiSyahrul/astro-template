# Astro + Svelte Starter (Template)

This is an opinionated **Astro 5** starter with **Svelte 5**, **Tailwind CSS v4**, **SCSS**, and a complete baseline for **SEO + PWA + linting**.

This README is **hybrid**:

- If you are **using this repository as a template**: follow “Quickstart (create a project)”.
- If you are working on a **project created from this template**: jump to “Downstream project guide”.

## Quickstart (create a project)

Create a new project from this template:

```sh
pnpm create astro@latest -- --template Rofisyahrul/astro-template
```

Then:

```sh
pnpm install
pnpm dev
```

- Node requirement: `>=18` (see `package.json`). This repo also ships an `.nvmrc` for a recommended Node LTS.
- Local dev server: `http://localhost:4321` (unless `PORT` is set).

## What you get

- **Astro SSR output** with adapter switching:
  - `@astrojs/node` by default
  - `@astrojs/vercel/serverless` when `DEPLOYMENT_PLATFORM=vercel`
- **Svelte 5** components (runes like `$state`, `$props`) with Astro islands (`client:*`)
- **Tailwind v4** + **SCSS**, automatically injected on every page
- **SEO + PWA baseline**:
  - Centralized document wrapper (`src/lib/_document.astro`)
  - `manifest.json` and `browserconfig.xml` routes (prerendered)
  - `og.png` route (generated with `@vercel/og`)
- **Optional service worker** (Workbox via `astrojs-service-worker`)
- **Linting**:
  - ESLint (Astro + Svelte + TS)
  - Stylelint (SCSS/CSS + Astro + Svelte)
  - Prettier (Astro + Svelte)

## Commands

All commands are run from the project root:

| Command               | Action                                         |
| --------------------- | ---------------------------------------------- |
| `pnpm dev`            | Start dev server (also runs `astro sync`)      |
| `pnpm dev:no-toolbar` | Dev server without Astro Dev Toolbar           |
| `pnpm sync-and-check` | `astro sync && astro check`                    |
| `pnpm build`          | Production build (runs `sync-and-check` first) |
| `pnpm build:sw`       | Build with service worker enabled              |
| `pnpm build:vercel`   | Build with Vercel adapter enabled              |
| `pnpm preview`        | Preview build                                  |
| `pnpm lint`           | Run all lint tasks                             |
| `pnpm lint:code`      | ESLint                                         |
| `pnpm lint:style`     | Stylelint                                      |

## Downstream project guide (for projects created from this template)

### Project structure (colocation pattern)

This starter is designed around a “route delegates to a colocated page module” pattern:

```text
src/
  pages/
    index.astro              # route entry (thin)
    og.png.ts                # OG image endpoint
    manifest.json.ts         # PWA manifest endpoint
    browserconfig.xml.ts     # Windows tile config endpoint
  lib/
    pages/
      home/
        home.astro           # actual page UI
        _script.server.ts    # route-level server logic
        components/          # page-local components (Svelte/Astro)
    components/              # shared UI components
    styles/                  # global SCSS + tailwind entry
    _document.astro          # shared document wrapper (SEO + PWA tags)
    _script.client.ts        # global client-side behavior (transitions/progress)
  middleware/
    index.ts                 # middleware chain
```

The default `src/pages/index.astro` calls the page module’s server script and then renders the page module component.

### Global styles and global client script

You do **not** need to import global CSS/JS per-page. The template uses a custom integration that injects:

- `$lib/styles/index.scss`
- `$lib/styles/tailwind.css`
- `$lib/_script.client.ts`

### Environment defaults (app metadata)

This template auto-defines public env vars used across SEO/PWA, with defaults derived from `package.json` and the default app icon:

- `APP_NAME`, `APP_NAME_SHORT`, `APP_DESC`, `APP_VERSION`
- `OG_LOGO_BASE_64_SRC`

To customize: update `package.json` (`name`, `description`, `version`) and/or override via environment (if you choose to add overrides).

### PWA + SEO endpoints

- **Manifest**: `GET /manifest.json` (prerendered)
- **Browser config**: `GET /browserconfig.xml` (prerendered)
- **OG image**: `GET /og.png` (generated at request time, accepts query params `t` and `d`)

### Service worker

Service worker is enabled when:

- `SW_ENABLED=true`, or
- `DEPLOYMENT_PLATFORM=vercel` (enabled by default for Vercel builds)

Use `pnpm build:sw` to enable it locally for builds. Previewing SW builds is typically done with `pnpm preview:sw` (binds to port 9999 and host).

### Middleware and device hints

Middleware sets `Astro.locals.isMobile` (based on the request user-agent). The document wrapper uses this to apply `mobile`/`desktop` body classes.

## Contributing

For detailed “how to work in a downstream project built from this template” instructions (AI agents + humans), see `AGENTS.md`.
