# Design Performance

The performance consequences of design decisions, not a general web performance guide. Bundle
strategy, rendering architecture, and delivery infrastructure live elsewhere. What belongs
here is the choice a designer or an engineer implementing a design makes, where the rendering
cost is invisible at the moment the choice is made.

## Compositor versus layout

Two CSS properties, `transform` and `opacity`, are the only ones the browser's compositor can
animate on its own. `filter` and `clip-path` can also composite, but browser support for
compositing them is narrower.

The rendering pipeline runs in a fixed order: layout, then paint, then composite. Trigger
layout and the browser pays for all three stages. Trigger composite alone and layout and
paint never run at all.

The practical effect is that a `transform` or `opacity` animation stays smooth even while the
main thread is busy, because the compositor runs independently of it. Animating `width`,
`height`, `top`, `left`, or `box-shadow` forces layout on every frame, and that cost shows up
worst on low-end mobile, where the CPU itself is the constraint.

Make the swap at design time, not as a later optimization:

- Animate `transform: translateX()` instead of `left`.
- Animate `transform: scale()` instead of `width` or `height`.
- Animate `opacity` instead of `visibility`.

## The cost of the effects a design system reaches for

`backdrop-filter: blur()` costs the compositor per pixel, and the cost rises sharply as the
blur radius increases. That per-pixel cost then multiplies by the number of blurred elements
on screen at once. Real-world reports of the problem include a Mozilla bug on lag from many
blurred elements and a shadcn/ui performance issue.

Treat blur as a budget, not a ban. Keep radii modest, roughly under 20px, and expect mobile
devices to handle only about 3 to 5 simultaneous blurred surfaces before the frame rate drops.
Large or stacked box shadows and large translucent layers cost paint for the same underlying
reason: more pixels the browser has to recompute every frame.

The design-system framing matters here. If a card component's style includes a blur, that
decision is made once in the system and paid for everywhere the card appears.

## Fonts and layout shift

Family count is the wrong unit for measuring font cost. The real cost is per file. Each
weight and each style is its own download, so two families at four weights each cost eight
downloads, not two.

Layout shift from web fonts comes from a metric mismatch between the fallback font and the
webfont, not from how many families are loaded. The fix is `font-display` combined with font
metric overrides: `size-adjust`, `ascent-override`, `descent-override`, and
`line-gap-override`. These let the fallback font occupy the same space the webfont will use,
so nothing reflows when the swap happens.

Pages combining `font-display: swap` with metric overrides reportedly saw roughly 75% less
font-related layout shift than `swap` alone. That is a reported measurement, not a guaranteed
result for every page.

`font-display: optional` only swaps in the webfont if it is already cached or arrives within
roughly 100ms. Otherwise the visitor keeps the fallback font for the entire visit. That is a
design decision: whether the brand font is worth a layout shift to display it.

## Core Web Vitals as the outcome measure

The design-time choices above exist to move three numbers: LCP, CLS, and INP. These are the
current Core Web Vitals. INP replaced FID in 2024, so a guide or a checklist that still names
FID is measuring a retired metric.

- **LCP (Largest Contentful Paint)** measures how long the largest visible element, usually a
  hero image or a headline, takes to render.
- **CLS (Cumulative Layout Shift)** measures how much visible content moves after it has
  already rendered. The font-metric-override fix above is a direct CLS fix.
- **INP (Interaction to Next Paint)** measures the delay between a user's interaction, a
  click, a tap, a key press, and the next frame the browser paints in response.

Measure all three from **field data at the 75th percentile**, not from a single lab run. A
Lighthouse score is a lab measurement: one run, on one machine, on one network condition. Core
Web Vitals are a field measurement: real visitors, real devices, real networks, aggregated so
that the number reported is the value the 75th-percentile visitor experienced. A design can
pass a lab audit and still fail its Core Web Vitals in the field, because the lab run never
saw the low-end phone or the slow connection that the 75th-percentile visitor is on.

## Image format as a design-time choice

AVIF produces files roughly 20 to 30 percent smaller than WebP at equal quality. It also
encodes far slower, reported between 3x and roughly 47x slower than WebP depending on encoder
settings.

Ship both halves of that tradeoff or neither. The consequence is that AVIF fits build-time
encoding of known assets, not on-the-fly conversion of user uploads. A guide that gives the
compression number without the encode cost is giving advice that will break a pipeline doing
dynamic conversion.

Two smaller image choices carry design-time cost too. Use inline SVG for simple icons instead
of raster formats. Strip editor metadata from exported images, since it is often the majority
of the file size of an otherwise small export.
