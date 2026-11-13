# @viamrobotics/prime-controls

Compact realtime controls for Svelte 5 tool panels: number fields, vectors, and sliders that step by keyboard and scrub by dragging, plus panels, folders, and tabs to group them. The controls build on `NumberInput`, `Collapsible`, and `Tabs` from `@viamrobotics/prime-ui`.

## Layout

- `src/lib/NumberField/NumberField.svelte`: one number with an optional visible `label`. It takes `bind:value`, `min`, `max`, `step`, and the native input attributes. The label is the scrub handle, a drag past 4 pixels moves the value by `step` per pixel, and ArrowUp and ArrowDown step by `step`. Shift multiplies by 10 and Alt by 0.1.
- `src/lib/NumberField/number-step.ts`: the pure arithmetic: `stepMultiplier`, `clamp`, `settle` (rounds to the step's decimal places so fractional steps carry no float residue), and `startingValue`.
- `src/lib/Point/Point.svelte`: a 2D, 3D, or 4D vector. It renders one `NumberField` per defined axis through a function binding that writes a new object with that axis changed.
- `src/lib/Point/point.ts`: `PointValue` and `PointAxis`. Type only.
- `src/lib/Slider/Slider.svelte`: a native `<input type="range">` with a `NumberField` readout beside it. A drag writes `value` on every pointer move. The visible `label` names both, or `aria-label` or `aria-labelledby` does.
- `src/lib/Panel/Panel.svelte`: a dense `role="group"` container. A visible `title` names it, or `aria-label` or `aria-labelledby` does.
- `src/lib/Folder/Folder.svelte`: a collapsible group built on prime-ui's `Collapsible`. `title` is the button text and `bind:open` defaults to open.
- `src/lib/Tabs/`: the compound `Tabs` with `Tabs.List`, `Tabs.Trigger`, and `Tabs.Content`, assembled in `tabs.ts`. Each part wraps prime-ui's at panel scale and takes prime-ui's props.
- `src/lib/index.ts`: the public exports.
- `src/lib/**/__tests__/`: the specs and their wrapper components, excluded from the published package.
- `test/`: shared test infrastructure, never published. `tailwind.css` is the stylesheet the specs import. `input-commands.ts` registers the browser commands `mouseMove`, `mouseDown`, `mouseUp`, `keyDown`, and `keyUp`, which drive real pointer and modifier input through Playwright so a scrub spec presses the actual keys and moves the actual mouse.
- The demos live on the package's page in [docs](../../docs/), under `src/content/docs/packages/prime-controls/`. Run `pnpm --filter @viamrobotics/prime-docs dev` to see them against this package's source.
- `styles.css`: the consumer's Tailwind entry. It imports the tokens and points Tailwind at `dist`.

## Commands

```bash
pnpm --filter @viamrobotics/prime-docs dev        # docs site; this package resolves to its source and hot-reloads
pnpm --filter @viamrobotics/prime-controls build    # svelte-package + publint
pnpm --filter @viamrobotics/prime-controls check    # svelte-check
pnpm --filter @viamrobotics/prime-controls test     # vitest
pnpm --filter @viamrobotics/prime-controls lint     # eslint
pnpm --filter @viamrobotics/prime-controls format   # prettier --check
```

Tests named `*.svelte.spec.ts` run in Chromium through `@vitest/browser-playwright`. Pointer and modifier input goes through the commands in `test/input-commands.ts`.

## Conventions

- Svelte 5 runes only. See [.claude/rules/svelte.md](../../.claude/rules/svelte.md).
- State flows through `bind:value` only, never a change callback. A function binding can veto or throttle a write by not assigning.
- A scrub writes `value` on every pointer move, so a function binding sees every intermediate value.
- The label is the scrub handle. A field without a visible `label` does not scrub and needs an `aria-label` or `aria-labelledby`. `Point`, `NumberField`, `Panel`, and `Slider` type each naming prop as optional and annotate `$props()` with `Props & AccessibleName`, a union that makes one of them required.
- Tailwind classes reference `@viamrobotics/tailwind-config` tokens only.
