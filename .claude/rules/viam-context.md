---
paths:
  - '**/*.svelte'
  - '**/*.svelte.ts'
  - '**/*.css'
  - '**/*.astro'
  - '**/*.mdx'
---

# Viam Design System Context

prime implements the Viam design system as a Svelte component library. Before writing or reviewing a component, verify its visual treatment, behavior, and naming against the authoritative source rather than guessing.

The design system lives at **https://design.viam.com/guides/intro/**. Start there. It documents tokens (color, spacing, typography), interaction patterns, and the canonical components that prime is expected to mirror.

## Tokens and `design.mjs`

The tokens are the `@theme` blocks in `packages/tailwind-config`. This repo has no `.claude/design/tokens.json`. houserules' `design.mjs` reads the tokens through a stylesheet that imports Tailwind. Several files in this workspace do, so `design.themeEntry` in `.claude/houserules.config.json` names the entry point, `packages/prime-ui/tailwind.css`:

```
node .claude/scripts/design.mjs <query>
```

Five entry points compile under standalone Tailwind: `packages/prime-ui/tailwind.css`, a tooling-only file also used by prettier-plugin-tailwindcss, and the `test/tailwind.css` fixture stylesheet in `prime-panes`, `prime-tree`, `prime-controls`, and `prime-editor`. `docs/src/tailwind.css` imports the `@viamrobotics/tailwind-config/dark` export subpath and `starlight-theme-nova/tailwind.css`, paths that Vite and Astro resolve and standalone Tailwind does not, so it exits 1. Pass `--theme <path>` to read a different entry point. `packages/prime-ui/styles.css` is not a candidate. See "Styling" in `packages/prime-ui/CLAUDE.md`.

## When to look things up

- Adding a new component or variant: confirm the design system documents an existing pattern before inventing one.
- Naming a prop, variant, or component: match the design system's vocabulary so consumers don't have to learn two names for the same thing.
- A review comment needs to describe expected visual or interaction behavior: quote the design system rather than approximating.

## How to look things up

Use `WebFetch` on `https://design.viam.com/guides/intro/` (or deeper pages under `https://design.viam.com/`) to retrieve the relevant guidance. Limit lookups to 2–3 per session to avoid wasting turns.
