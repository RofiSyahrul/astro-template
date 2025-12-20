# AGENTS.md (for projects created from this template)

This file is meant to live in **your downstream project** (the repo created from this template). It tells both **AI coding agents** and **human contributors** how to work in this codebase safely and consistently.

## AI agent instructions (read this first)

### Project orientation (where things live)

- **Routes**: `src/pages/*`
  - Route entries should stay thin and delegate to colocated page modules under `src/lib/pages/*` where possible.
- **Colocated page modules**: `src/lib/pages/<module>/*`
  - Typical shape: `home.astro` (UI), `_script.server.ts` (route-level server logic), `components/*` (page-local components).
- **Shared UI components**: `src/lib/components/*` (Svelte + Astro)
- **Global document wrapper**: `src/lib/_document.astro` (SEO, PWA tags, canonical URL, critical font preloads)
- **Global client behavior**: `src/lib/_script.client.ts` (Astro transitions loader/progress handling)
- **Global styles**: `src/lib/styles/*`
  - `index.scss`: CSS variables, base styles, shared UI primitives
  - `tailwind.css`: Tailwind v4 entrypoint
- **Middleware**: `src/middleware/*`
  - Sets `Astro.locals.isMobile` and applies a middleware chain.
- **Astro config + integrations**:
  - `astro.config.ts`: adapters, server config, integration wiring
  - `integrations/*`: custom integrations used by `astro.config.ts`

### “Magic” behaviors you must account for

- **Global styles and global client script are injected automatically** (via the template’s `globalInjector()` integration). You usually should not add per-page global imports.
- **App metadata env vars are defined by the template’s env injector** (schema defaults derived from `package.json` and the default icon). Expect `APP_NAME`, `APP_DESC`, etc. to exist.
- **Service worker is optional**, enabled by environment flags for builds (see commands below).
- **Output is server** (SSR) and adapter can switch based on `DEPLOYMENT_PLATFORM`.

### Safe change workflow (do this)

- Keep route entries in `src/pages/` thin; put page logic in `src/lib/pages/<module>/`.
- Prefer small diffs and avoid “drive-by refactors”.
- Preserve `$lib/*` import paths (configured in `tsconfig.json`).
- Do not edit build outputs: `dist/`, `.astro/`, or `public/` generated artifacts.
- If you change env-dependent behavior, update docs/comments and ensure fallback defaults exist.

### Commands to run (use these as your validation gates)

Run from the repo root:

```sh
pnpm install
pnpm sync-and-check
pnpm lint
pnpm build
```

Common variants:

- Service worker build:

```sh
pnpm build:sw
```

- Vercel adapter build:

```sh
pnpm build:vercel
```

### Definition of done (agent checklist)

- `pnpm sync-and-check` passes (runs `astro sync` + `astro check`)
- `pnpm lint` passes (`lint:code` + `lint:style`)
- `pnpm build` passes
- Any new behavior is documented (README/inline docs) and follows the colocation pattern

### Svelte 5 conventions used in this codebase

This template uses Svelte 5 “runes” patterns (examples you will see):

- `$state(...)` for state
- `$props()` for props destructuring
- `$derived(...)` for derived values
- `$effect(() => { ... })` for reactive effects

When editing Svelte components, keep the component API minimal and prefer typed props (`<script lang="ts">`).

## Human contributor workflow

### Prerequisites

- Node: `>=18` (recommended Node LTS via `.nvmrc` if your tooling supports it)
- Package manager: `pnpm`

### Local development

```sh
pnpm install
pnpm dev
```

Other useful commands:

```sh
pnpm dev:no-toolbar
pnpm preview
pnpm lint
pnpm sync-and-check
```

### Code style and linting

- Formatting: Prettier (Astro + Svelte plugins)
- JS/TS lint: ESLint (Astro + Svelte + TS rules)
- Styles lint: Stylelint (SCSS/CSS + Astro + Svelte)

Before opening a PR, run:

```sh
pnpm sync-and-check
pnpm lint
pnpm build
```

### Branching and commits

This template is set up for **Conventional Commits** (commit message linting is enforced via `commitlint`).

Examples:

- `feat: add settings page`
- `fix: avoid double fetch on navigation`
- `docs: update deployment notes`
- `refactor: extract popup into shared component`

### Releases (optional)

If your downstream project uses it, the template includes `standard-version`:

```sh
pnpm release
```

This generates changelogs and bumps versions based on Conventional Commits.
