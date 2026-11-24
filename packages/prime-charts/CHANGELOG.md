# @viamrobotics/prime-charts

## 0.3.0
### Minor Changes

- 49ad89d: Render `Chart` as a native `<figure>` and pass rest attributes to `Chart.Plot`, `Chart.Legend`, and `Chart.Table`.

### Patch Changes

- 49ad89d: Fix accessibility, behavior, and documentation defects across components.
- Updated dependencies [49ad89d]
- Updated dependencies [49ad89d]
- Updated dependencies [49ad89d]
  - @viamrobotics/tailwind-config@1.12.0

## 0.2.0
### Minor Changes

- dad6235: Chart axes size their gutters to their measured tick labels, and each axis `class` styles the HTML label row or column.
- dad6235: Add `Chart.Plot`, which holds the drawing parts, so the consumer sizes the plot and places the legend.
- dad6235: Add a screen reader summary to every chart and a `Chart.Table` part that lists its data.

### Patch Changes

- dad6235: The tooltip stays inside the x bounds, and the time scale drops a string x instead of parsing it.

## 0.1.0
### Minor Changes

- c47256b: Add prime-charts with a time-series line chart

### Patch Changes

- Updated dependencies [c47256b]
  - @viamrobotics/tailwind-config@1.11.0
