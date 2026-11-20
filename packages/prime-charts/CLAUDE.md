# @viamrobotics/prime-charts

Svelte 5 charts built on LayerCake, themed with Viam's design tokens.

## Layout

- `src/lib/Chart/`: the compound `Chart` root and its parts, `Chart.Line`, `Chart.XAxis`, `Chart.YAxis`, `Chart.Grid`, `Chart.Tooltip` and `Chart.Legend`.
- `src/lib/index.ts`: the public exports.
- `src/lib/Chart/chart.ts`: assembles the compound from `Chart.svelte` (the root) and one file per part.
- `src/lib/Chart/point.ts` and `src/lib/Chart/scale.ts`: the public `ChartPoint`, `ChartXValue` and `ChartScale` types.
- `src/lib/Chart/context.svelte.ts`: the internal context. Lines register their series, parts register their drawing as layers, axes register their formats, and the tooltip registers the plot's attributes.
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

## API

### `Chart`

- `x?: ChartScale`: the x scale kind. Defaults to `'time'`.
- `xMin?` and `xMax?` (`Date | number`), `yMin?` and `yMax?` (`number`): bounds on each axis. A bound left out comes from the data. A y bound from the data is rounded out to the next tick. A given bound is used exactly.
- `loading?: boolean`: lays an overlay on the plot and keeps the last lines drawn underneath. Loading wins over the empty state.
- `empty?: Snippet`: rendered in place of the plot when no series has a point. Defaults to the text "No data".
- The type requires an accessible name, `{ 'aria-label': string } | { 'aria-labelledby': string }`.
- Every other attribute goes to the root element.

### `Chart.Line`

One series.

- `name: string`: labels the series in the legend and the tooltip.
- `points: ChartPoint[]`, in x order.
- `unit?: string`: shown after the series name in the legend, as `cell-01 (°)`, and after its value in the tooltip.
- `` color?: `--${string}` ``: a CSS variable, such as `'--color-chart-series-4'`, drawn as `var(...)`. The type refuses a raw color value. Without it, a series takes `--color-chart-series-1` to `--color-chart-series-7` by its position in source order, wrapping after seven.
- `loading?: boolean`: shows the series' loading mark in the legend.
- `hidden?: boolean`, bindable: the legend toggles it. Unbound, the line keeps the state itself. A hidden series keeps its color and its position.
- `class?: ClassValue`.

### Points and gaps

- A `null` `y` is a gap. A line breaks at a gap and never joins across it.
- A point with no neighbor on either side draws as a dot, so a one-point series stays visible.

### Axes, grid and formatters

- `Chart.XAxis` takes `format?: (value: Date) => string` for its tick labels. Without it, the ticks use the time scale's own format.
- `Chart.YAxis` takes `format?: (value: number) => string`.
- `Chart.Grid` draws the grid lines.
- One y axis serves every series. Series with different units share it, and the axis shows no unit of its own. A consumer whose series share a unit adds it in the y `format`.

### `Chart.Tooltip`

- Shows the active point: the series color, its name, the time, and the value followed by the unit.
- `xFormat?: (value: Date) => string` and `yFormat?: (value: number) => string`. Each defaults to its axis's `format`. Without one, the time shows as a full date and time with seconds, and the value through `Intl.NumberFormat`.
- The pointer picks the nearest point of a visible series. The pointer and the keyboard share one active point.

### `Chart.Legend`

- One native `<button aria-pressed>` per series, with its color, name, unit and loading mark. Space and Enter toggle the series' `hidden`.
- Renders below the plot wherever it is placed. The plot takes the height that is left.

### Domains, empty and loading

- The axis domains come from the visible series. With every series hidden they come from all series, so the axes stay put.
- Empty means no series, or no series with a point. A chart whose series are all hidden is not empty and keeps its axes.

## Keyboard

The arrow keys follow the default series navigation of the Highcharts accessibility module: left and right move between points in a series, and up and down move between series.

- The plot is one tab stop, followed by each legend button. The plot is a tab stop only when a `Chart.Tooltip` is placed and a visible series has a point.
- Focusing the plot shows the tooltip on the active point. On first focus that is the first point of the first visible series. After that it is the point focus left.
- `ArrowLeft` and `ArrowRight` move to the previous or next point. `Home` and `End` move to the first or last point of the series. `PageUp` and `PageDown` move by a tenth of the series.
- `ArrowUp` and `ArrowDown` move to the previous or next visible series, at its point nearest in time.
- Hidden series and gaps are skipped.
- `Escape` hides the tooltip and keeps focus on the plot.
- A visually hidden polite live region announces the active point as the tooltip reads it, for example "cell-01, Nov 19 18:03:21, 12.3 °". The visible tooltip is `aria-hidden`.
- The plot has `role="application"`, with its instructions linked through `aria-describedby`. NVDA and JAWS pass arrow keys to an application, but keep them for their own reading mode inside a group.

## Conventions

- Svelte 5 runes only. See [.claude/rules/svelte.md](../../.claude/rules/svelte.md).
- `Chart` is a compound component for cartesian charts, with an x and a y axis. The root owns the container size and the scales, and the parts read them from the root.
- Parts that draw SVG, the lines, axes and grid, hand their drawing to the root, which paints it in source order with the first part placed at the bottom. The legend and the tooltip are HTML.
- The root clips each line to the plot area, so data a bound cuts off never draws past the axes. The axes and the grid are not clipped, since their labels sit in the padding outside the plot.
- A point is a `ChartPoint`, with an `x` and a `y`. `x` is a `ChartXValue`: a `Date`, a `number`, or a category `string`. On the time scale it is a `Date` or epoch milliseconds. `y` is a `number`, or `null` for a gap.
- The x scale kind is the root's `x` prop, a `ChartScale`. `'time'` is the only kind. A kind joins the union only together with the scale and the parts that draw on it.
- Each line registers its series with the root through the internal context and drops it when it unmounts. An empty chart falls back to a fixed domain so no scale yields `NaN`.
- The root fills its container. A consumer sizes the chart by sizing the element around it, and the root measures that size.
- The root has the `figure` role.
- LayerCake is an implementation detail. No LayerCake name or type appears in the public API or the published declarations, and a consumer never places a LayerCake layer directly.
- Colors come from `@viamrobotics/tailwind-config` tokens only, never a literal.
