# @viamrobotics/prime-charts

Svelte 5 charts built on LayerCake, themed with Viam's design tokens.

## Layout

- `src/lib/Chart/`: the compound `Chart` root and its parts, `Chart.Plot`, `Chart.Line`, `Chart.XAxis`, `Chart.YAxis`, `Chart.Grid`, `Chart.Tooltip`, `Chart.Legend` and `Chart.Table`.
- `src/lib/index.ts`: the public exports.
- `src/lib/Chart/chart.ts`: assembles the compound from `Chart.svelte` (the root) and one file per part. `Plot.svelte` measures the plot and owns the drawing.
- `src/lib/Chart/point.ts` and `src/lib/Chart/scale.ts`: the public `ChartPoint`, `ChartXValue` and `ChartScale` types.
- `src/lib/Chart/x-scales.ts`: the scale table, which pairs each kind with its d3 scale and the converter that places an x on it.
- `src/lib/Chart/context.svelte.ts`: the internal context. Lines register their series, and axes their formats, on the chart's context. Drawing parts register their layers, and the tooltip the plot's attributes, on the plot's context.
- `src/lib/Chart/domain.ts`: computes a domain from the registered points, placing each x with the scale kind's converter.
- `src/lib/Chart/summary.ts`: builds the summary text from the series and the x window.
- `src/lib/Chart/table.ts`: merges the visible series into table rows on x, inside the x window.
- `src/lib/Chart/formats.ts`: the default time and value formats and the series label, shared by the tooltip, the legend and the table.
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
- Every other attribute goes to the root element, the figure. `Chart` has no layout of its own.

### `Chart.Plot`

- `class?: ClassValue` and `children`. Owns the drawing, the scales, the tab stop and the loading and empty overlays, which cover the drawing box.
- `Chart.Plot` takes and measures the size the consumer gives it and carries none of its own. A plot with no height draws nothing. Typical sizing is `class="h-64"`, or `class="min-h-0 flex-1"` inside a `flex flex-col` chart.
- The plot draws inside its content box, so padding in its `class` insets the drawing.
- `Chart.Line`, `Chart.XAxis`, `Chart.YAxis`, `Chart.Grid` and `Chart.Tooltip` go inside it. Outside it, including with no `Chart` at all, they throw `<Part> must be placed inside Chart.Plot.`
- A second `Chart.Plot` in one `Chart` throws `A Chart takes one Chart.Plot.` Swapping a single plot with `{#key}` or `{#if}` is fine.

### `Chart.Line`

One series.

- `name: string`: labels the series in the legend and the tooltip.
- `points: ChartPoint[]`, in x order.
- `unit?: string`: shown after the series name in the legend, as `cell-01 (°)`, and after its value in the tooltip.
- `` color?: `--${string}` ``: a CSS variable, such as `'--color-chart-series-4'`, drawn as `var(...)`. The type refuses a raw color value. Without it, a series takes `--color-chart-series-1` to `--color-chart-series-7` by the order its line mounts, wrapping after seven. That matches source order on first render, and a line that mounts later in an `{#if}` takes the next color and the last legend position.
- `loading?: boolean`: shows the series' loading mark in the legend.
- `hidden?: boolean`, bindable: the legend toggles it. Unbound, the line keeps the state itself. A hidden series keeps its color and its position.
- `class?: ClassValue`.

### Points and gaps

- A `null` `y` is a gap. A line breaks at a gap and never joins across it.
- A point with no neighbor on either side draws as a dot, so a one-point series stays visible.
- On the time scale `x` is a `Date` or epoch milliseconds. An x the scale kind cannot place, such as a string or an invalid `Date`, drops like a gap. It draws nothing, counts toward neither the empty state nor the y domain, and navigation skips it.

### Axes, grid and formatters

- `Chart.XAxis` takes `format?: (value: Date) => string` for its tick labels. Without it, the ticks use the time scale's own format.
- `Chart.YAxis` takes `format?: (value: number) => string`.
- `Chart.Grid` draws the grid lines.
- Each axis keeps its line and tick marks in SVG and draws its tick labels as HTML. No gutter is a fixed number.
- The y labels sit in one column. Its border box width, to the next whole pixel, plus a 10px gap after the ticks, is what the y axis reserves on the left. The y axis also reserves half a label height at the top and bottom.
- The x labels sit in one row below the plot. Its border box height, to the next whole pixel, plus a 6px gap after the ticks, is what the x axis reserves at the bottom. The x axis also reserves the overhang of its first and last labels on the left and right, which is half of each edge label's width past the drawing, capped at half the room the other parts leave.
- Each side's padding is the larger of what the parts reserve on it, never their sum. The left is the larger of the y column and the x overhang, and the bottom is the larger of the x row and half a y label.
- An axis's `class` lands on a plain grid that holds the tick labels, and it styles the labels only. The axis line and tick marks carry no class or `data-part` and take their color from the `--color-chart-axis` token. The labels default to `text-xs` in the axis label color.
- On `Chart.YAxis`, a font size changes the look and the column width. A color changes the look and no gutter. A `min-w-*` bounds the column's border box from below, and the 10px gap sits outside it. A border or padding counts toward the gutter. A margin does not, so a margin pushes the labels out of the plot's box.
- On `Chart.XAxis`, a font size changes the look and the row height. A color changes no gutter. A `min-h-*`, border or padding counts toward the gutter, and a margin does not. A `min-w-*` has no effect, since the row's width is never measured and the labels are placed from its left edge.
- Charts stacked in a column align their plots by giving each `Chart.YAxis` the same `min-w-*` in its `class`, at least as wide as the widest label, such as `min-w-24` for `15,000 req/h` at `text-xs`, which measures 72px. A consumer padding or border on the column counts toward its width, so add it to the label width.
- One y axis serves every series. Series with different units share it, and the axis shows no unit of its own. A consumer whose series share a unit adds it in the y `format`.

### `Chart.Tooltip`

- Shows the active point: the series color, its name, the time, and the value followed by the unit.
- `xFormat?: (value: Date) => string` and `yFormat?: (value: number) => string`. Each defaults to its axis's `format`. Without one, the time shows as a full date and time with seconds, and the value through `Intl.NumberFormat`.
- The pointer picks the nearest point of a visible series. The pointer and the keyboard share one active point.

### `Chart.Legend`

- One native `<button aria-pressed>` per series, with its color, name, unit and loading mark. Space and Enter toggle the series' `hidden`.
- Renders where it is placed inside `Chart`, before or after the plot, in the layout the consumer writes. It throws `Chart.Legend must be placed outside Chart.Plot.` inside the plot. It adds no outer margin or padding, and its own items keep their spacing.

### `Chart.Table`

- Opt-in. Renders the visible series as a `<table>` with a Time column and one column per series, labeled like the legend. Place it inside `Chart`, outside the plot. Inside `Chart.Plot` it throws `Chart.Table must be placed outside Chart.Plot.`
- `caption?: string` and `class?: ClassValue`. `class` lands on a wrapper `div` around the `<table>`, and neither has a layout utility of its own. The table is visible by default, and `class="sr-only"` hides it visually and keeps it for screen readers. A table treats `width` and `height` as minimums, so the wrapper, not the table, takes `sr-only`, and a long hidden table never grows the page.
- The table's name is `caption`, else the chart's `aria-label`, rendered as a `<caption>`. With only `aria-labelledby` on the chart, the table takes that name through `aria-labelledby` and renders no caption.
- Rows merge the visible series on x inside the x window. A series with no value at a row's x leaves an empty cell.
- Time and values format with the axis formats, then the tooltip defaults.

### Domains, empty and loading

- The axis domains come from the visible series. With every series hidden they come from all series, so the axes stay put.
- Empty means no series, or no series with a point. A chart whose series are all hidden is not empty and keeps its axes.

## Keyboard

The arrow keys follow the default series navigation of the Highcharts accessibility module: left and right move between points in a series, and up and down move between series.

- Tab order follows DOM order. A legend placed before `Chart.Plot` puts its buttons ahead of the plot.
- The plot is a tab stop only when a `Chart.Tooltip` is placed and a visible series has a point inside the x window. When it stops being a tab stop while the tooltip shows, the tooltip hides.
- Focusing the plot shows the tooltip on the active point. On first focus that is the first point inside the x window of the first visible series that has one. After that it is the point focus left.
- `ArrowLeft` and `ArrowRight` move to the previous or next point. `Home` and `End` move to the first or last point of the series. `PageUp` and `PageDown` move by a tenth of the series.
- `ArrowUp` and `ArrowDown` move to the previous or next visible series, at its point nearest in time.
- Hidden series, gaps and points outside the x window are skipped. Navigation stays inside the x window for first focus, every key and the pointer, and a point exactly on a bound is inside.
- `Escape` hides the tooltip and keeps focus on the plot.
- A visually hidden polite live region announces the active point as the tooltip reads it, for example "cell-01, Nov 19 18:03:21, 12.3 °". The visible tooltip is `aria-hidden`.
- The plot has `role="application"`, with its instructions linked through `aria-describedby`. NVDA and JAWS pass arrow keys to an application, but keep them for their own reading mode inside a group.

## Conventions

- Svelte 5 runes only. See [.claude/rules/svelte.md](../../.claude/rules/svelte.md).
- `Chart` is a compound component for cartesian charts, with an x and a y axis. `Chart.Plot` owns the scales, and the drawing parts read them from it.
- Parts that draw SVG, the lines, the grid and the axis lines and ticks, hand their drawing to the plot, which paints it in the order the parts mount, with the first mounted at the bottom. That matches source order on first render, and a part mounted later by `{#if}` paints on top. The legend, the tooltip and the axis tick labels are HTML.
- The plot clips each line to the plot area, so data a bound cuts off never draws past the axes. The axes and the grid are not clipped, since the tick labels are HTML, which a clip on the SVG never reaches, and the tick marks reach 6px past the plot area, where a clip would cut them.
- A point is a `ChartPoint`, with an `x` and a `y`. `x` is a `ChartXValue`: a `Date`, a `number`, or a category `string`. `y` is a `number`, or `null` for a gap.
- The x scale kind is the root's `x` prop, a `ChartScale`. `'time'` is the only kind. A kind joins the union only together with the scale and the parts that draw on it.
- Each line registers its series with the root through the internal context and drops it when it unmounts. An empty chart falls back to a fixed domain so no scale yields `NaN`.
- The root has the `figure` role. Its first child is a visually hidden `<p data-part="summary">`, linked by `aria-describedby`. The text is `No data.`, `Every series is hidden.`, or `Series: <labels>. Time: <a> to <b>. Values: <c> to <d>.` A consumer `aria-describedby` on `Chart` replaces it, and no summary renders.
- LayerCake is an implementation detail. No LayerCake name or type appears in the public API or the published declarations, and a consumer never places a LayerCake layer directly.
- Colors come from `@viamrobotics/tailwind-config` tokens only, never a literal.
