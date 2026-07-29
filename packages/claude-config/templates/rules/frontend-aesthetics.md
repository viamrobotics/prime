---
paths:
  - "**/*.svelte"
  - "**/*.css"
---

# Frontend Aesthetics

Every UI change should look intentional and high-craft. The failure mode is "AI slop": hardcoded hex instead of tokens, inconsistent spacing and density, hand-rolled versions of components that already exist, missing interaction states, weak hierarchy. Never introduce new fonts, color schemes, gradients, or creative layouts.

Tokens and utilities come from `@viamrobotics/tailwind-config`, the tweakpane theme from `@viamrobotics/tweakpane-config`, both implementing https://design.viam.com. `svelte.md` owns Svelte conventions, ARIA, and semantics. `three.md` owns Three.js rendering.

## Components

- Check the design system for an existing pattern before adding a parallel one, and extend rather than duplicate. That cuts both ways: in an app, reach for the library component instead of hand-rolling a control. In the library, extend an existing primitive instead of shipping a second one that overlaps it.
- Control panels (sliders, points, color, rotation) go through `svelte-tweakpane-ui`, themed globally with `primeTheme` via `ThemeUtils.setGlobalDefaultTheme(primeTheme)`, set once on the client. Never restyle tweakpane ad hoc, fix the theme.

## Color and tokens

Use the semantic tokens. **Never hardcode hex for UI chrome.**

- Text: `text-heading`, `text-default`, `text-subtle-1`, `text-subtle-2`, `text-disabled`, `text-link`.
- Surfaces: `bg-extralight`, `bg-light`, `bg-medium`, `bg-dark`. Hover fills: `ghost-light`, `ghost-medium`.
- Borders: `border-light`, `border-medium`, `border-dark`.
- Grayscale `gray-1` (lightest) through `gray-9` (darkest) when a raw step is genuinely needed.
- Status: `danger`, `warning`, `success`, `info`, each with `-bright`, `-dark`, `-medium`, and `-light` steps. Use them for meaning, never decoration.
- `shadow-sm` for elevation, `z-max` for top-layer overlays.
- Not `style="color:#4e4f52"` or `class="text-[#7a7c80]"`. Use `class="text-subtle-1"`.
- Brand and illustration colors (`power-button`, `power-wire`, `cyberpunk`, `mars-rover`, `solar-power`, `hologram`, `raspberry`, `pcb`, `yoshimi`, `pixel-*`) belong to illustration, 3D, and brand art. Never to UI chrome.
- Raw hex is legitimate where Tailwind cannot reach: shader and WebGL code, `<canvas>` fills, gradient stops in a slider track. Do not flag those.

## Typography

- `font-space-grotesk` for display and headings.
- `font-public-sans` for body and UI text.
- `font-roboto-mono` for numbers and data: poses, coordinates, IDs, table cells.
- A repo's global `body` font is often plain `system-ui`, so the prime families are not inherited everywhere. Set the family explicitly where it matters.
- Build hierarchy from weight, size, and color tokens, never an invented type scale.

## Spacing, layout, density

- Stay on the Tailwind spacing scale. Do not sprinkle arbitrary pixel values where a scale step fits.
- Match the density of neighboring panels. Viam tooling UI is dense, not a marketing page.
- Reuse the layout idioms already in the app instead of inventing one.
- Hierarchy comes from `text-heading` and `text-default` against `text-subtle-1` and `text-subtle-2`, not from size alone.

## States

A control is not done until every state is handled. Missing states is the most common slop tell.

- hover, focus-visible, active, and disabled on every interactive element.
- loading and empty states for anything async or list-shaped. A placeholder or skeleton, not a blank box.
- Disabled must read as disabled: `text-disabled` and reduced affordance. Prefer `aria-disabled` when the element has to stay focusable, see `svelte.md`.

## Motion

- Restrained and purposeful. CSS transitions on hover, focus, and expand.
- Prefer the config's `animate-wiggle` (nudge or error), `animate-blink` (attention), and `animate-popup-enter` over bespoke keyframes.
- Respect `prefers-reduced-motion`.

## Visual accessibility

- Pair text tokens with surfaces that hold contrast. Never `text-subtle-2` on `bg-medium`.
- Keep a visible `focus-visible` ring. Never remove a focus outline without replacing it.
- Hit targets large enough to use comfortably.

## Before finishing a UI change

- [ ] Reused an existing design-system pattern instead of adding a parallel one.
- [ ] Semantic tokens only. No hardcoded hex for chrome, no brand colors as chrome.
- [ ] Correct font role, family set explicitly where it does not inherit.
- [ ] Spacing and density match neighbors, hierarchy is clear.
- [ ] hover, focus-visible, active, and disabled handled. loading and empty for async or lists.
- [ ] Motion restrained, `prefers-reduced-motion` respected.
- [ ] Contrast holds, focus stays visible, hit targets are adequate.
- [ ] Matches design.viam.com and looks intentional.
