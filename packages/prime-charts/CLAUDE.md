# @viamrobotics/prime-charts

Svelte 5 charts built on LayerCake, themed with Viam's design tokens.

## Layout

- `src/lib/Chart/`: the compound `Chart` root and its parts, `Chart.Line`, `Chart.XAxis`, `Chart.YAxis`, `Chart.Grid`, `Chart.Tooltip` and `Chart.Legend`.
- `src/lib/index.ts`: the public exports.
- `src/lib/Chart/chart.ts`: assembles the compound from `Chart.svelte` (the root) and `Line.svelte`.
- `src/lib/Chart/point.ts` and `src/lib/Chart/scale.ts`: the public `ChartPoint`, `ChartXValue` and `ChartScale` types.
- `src/lib/Chart/series.svelte.ts`: the internal context through which each part registers its points with the root.
- `src/lib/Chart/domain.ts`: turns x values into scale input and computes a domain from the registered points.
- `src/lib/Chart/__tests__/`: the browser specs and their wrapper components.
- `src/lib/__tests__/exports.spec.ts`: guards the public exports and checks that no published declaration names LayerCake.
- `test/`: shared test infrastructure, never published. `tailwind.css` is the stylesheet the specs import.
- `styles.css`: the consumer's Tailwind entry. It imports the tokens and points Tailwind at `dist`.
- The demos live on the package's page in [docs](../../docs/), under `src/content/docs/packages/prime-charts/`.

## Commands

```bash
pnpm --filter @viamrobotics/prime-docs dev          # docs site; this package resolves to its source and hot-reloads
pnpm --filter @viamrobotics/prime-charts build      # svelte-package + publint
pnpm --filter @viamrobotics/prime-charts check      # svelte-check
pnpm --filter @viamrobotics/prime-charts test       # vitest
pnpm --filter @viamrobotics/prime-charts lint       # eslint
pnpm --filter @viamrobotics/prime-charts format     # prettier --check
```

Tests named `*.svelte.spec.ts` run in Chromium through `@vitest/browser-playwright`.

## Conventions

- Svelte 5 runes only. See [.claude/rules/svelte.md](../../.claude/rules/svelte.md).
- `Chart` is a compound component for cartesian charts, with an x and a y axis. The root owns the container size and the scales, and the parts read them from the root and draw into it.
- A point is a `ChartPoint`, with an `x` and a `y`. `x` is a `ChartXValue`: a `Date`, a `number`, or a category `string`. `y` is a `number`.
- The x scale kind is the root's `x` prop, a `ChartScale`. `'time'` is the only kind. A kind joins the union only together with the scale and the parts that draw on it.
- Each part registers its points with the root through the internal series context and drops them when it unmounts. The root computes its x and y domains from every registered point, and an empty chart falls back to a fixed domain so no scale yields `NaN`.
- The root fills its container. A consumer sizes the chart by sizing the element around it, and the root measures that size.
- The root has the `figure` role. A consumer names it with `aria-label` or `aria-labelledby`.
- LayerCake is an implementation detail. No LayerCake name or type appears in the public API or the published declarations, and a consumer never places a LayerCake layer directly.
- Colors come from `@viamrobotics/tailwind-config` tokens only, never a literal.
