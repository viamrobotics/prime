# @viamrobotics/prime-controls

Compact realtime controls for Svelte 5 tool panels: number fields, vectors, and sliders that step by keyboard and scrub by dragging, a text field, a file field, a compact `Select` and `ToggleButtons`, plus panels, folders, and tabs to group them. The controls build on `NumberInput`, `FileInput`, `Collapsible`, `Tabs`, and `Select` from `@viamrobotics/prime-ui`.

## Layout

- `src/lib/NumberField/NumberField.svelte`: one number with an optional visible `label`. It takes `bind:value`, `min`, `max`, `step`, `labelPlacement` (`'outside'` by default, or `'inset'` to draw the label inside the input's left edge), `suffix`, `state`, and the native input attributes. The label is the scrub handle, a drag of 4 pixels or more moves the value by `step` per pixel, and ArrowUp and ArrowDown step by `step`. Shift multiplies by 10 and Alt by 0.1.
- `src/lib/NumberField/number-step.ts`: the pure arithmetic: `stepMultiplier`, `clamp`, `settle` (rounds to the step's decimal places so fractional steps carry no float residue), `startingValue`, and `longestValueLength` (the character count of `min` or `max` at the step's decimal places, which sizes the `Slider` readout).
- `src/lib/TextField/TextField.svelte`: one string with an optional visible `label`, in the `NumberField` row layout at `input-compact` and without scrub. It wraps prime-ui's `Input` and takes `bind:value` (an empty field is `''`), `placeholder`, `hint`, `state`, and the native input attributes. It has no `suffix` or `labelPlacement`. The label is a plain `<label>`. It copies `NumberField`'s `AccessibleName` union and merges its hint into `aria-describedby` with `joinDescribedBy`.
- `src/lib/FileField/FileField.svelte`: a file chooser with an optional visible `label`, in the `TextField` row layout at `input-compact`. It wraps prime-ui's `FileInput`, whose native `<input type="file">` covers the control, and takes `bind:value` (a `File[]`, where a cleared field is `[]`), `placeholder`, `clearLabel`, `hint`, `state`, `children` to replace the prompt, and the native input attributes such as `accept` and `multiple`. It copies `TextField`'s `AccessibleName` union and merges its hint into `aria-describedby` with `joinDescribedBy`.
- `src/lib/Point/Point.svelte`: a 2D, 3D, or 4D vector. It takes `suffix` and one `state` and gives both to every axis. `axes` lets single axes set `min`, `max`, `step`, `suffix`, `state`, and `describedBy` in place of the control's, typed as `PointAxisOptions` in `point.ts`, and the `details` snippet draws content under one axis field and receives the axis. The axes are equal grid columns, so `details` content never changes a field's width. It renders one `NumberField` per defined axis through a function binding that writes a new object with that axis changed. It insets its axis labels with `labelPlacement="inset"`.
- `src/lib/Point/point.ts`: `PointValue`, `PointAxis`, and `PointAxisOptions`. Type only.
- `src/lib/Slider/Slider.svelte`: a native `<input type="range">` with a `NumberField` readout beside it. `suffix` and `state` go to the readout, and an `error` state also sets `aria-invalid` on the range. The readout is at least 64 px wide and grows to the longest value in the range, from `longestValueLength` in `number-step.ts`. A drag writes `value` on every pointer move. The visible `label` names both, or `aria-label` or `aria-labelledby` does.
- `src/lib/Panel/Panel.svelte`: a dense `role="group"` container. A visible `title` names it, or `aria-label` or `aria-labelledby` does.
- `src/lib/Folder/Folder.svelte`: a collapsible group built on prime-ui's `Collapsible`. `title` is the button text and `bind:open` defaults to open.
- `src/lib/Tabs/`: the compound `Tabs` with `Tabs.List`, `Tabs.Trigger`, and `Tabs.Content`, assembled in `tabs.ts`. Each part wraps prime-ui's at panel scale and takes prime-ui's props.
- `src/lib/Select/`: the compound `Select` with every prime-ui `Select` part, assembled in `select.ts`. Each part wraps prime-ui's at panel scale. `Select.Items` renders the package's own compact item from a context in `select-items.ts`. A root with no children renders that default tree from `items`.
- `src/lib/ToggleButtons/`: the compound `ToggleButtons` with `ToggleButtons.Item`, assembled in `toggle-buttons.ts`. The root wraps prime-ui's `ToggleButtons` and renders the package's own compact item for each entry of `items`. A visible `label` names the group, or `aria-label` or `aria-labelledby` does.
- `src/lib/Hint/Hint.svelte`: the info button and tooltip behind every `hint` prop, built on prime-ui's `Tooltip` and `Icon`. It also renders the hint as hidden text under a `descriptionId`, which the control lists in `aria-describedby`, because a tooltip's content is not in the page while it is closed. It is internal and not exported.
- `src/lib/Hint/described-by.ts`: `joinDescribedBy`, which joins the ids it is given into one `aria-describedby` value, or `undefined` when none is set. The ids are the consumer's, the hint's, and on `NumberField` the suffix's. `NumberField`, `TextField`, and `FileField` use it.
- `src/lib/control-label.ts`: `CONTROL_LABEL_CLASS` and `CONTROL_ROW_CLASS`, the classes the labeled controls share.
- `src/lib/index.ts`: the public exports.
- `src/lib/**/__tests__/`: the specs, excluded from the published package. The wrapper components and spec-only helpers sit in `__tests__/fixtures/` beside them.
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
- The label is the scrub handle. A field without a visible `label` does not scrub and needs an `aria-label` or `aria-labelledby`. `Point`, `NumberField`, `TextField`, `FileField`, `Panel`, `Slider`, and `ToggleButtons` type each naming prop as optional and annotate `$props()` with `Props & AccessibleName`, a union that makes one of them required.
- `hint` takes a visible `label` on `NumberField`, `TextField`, `FileField`, `Point`, `Slider`, and `ToggleButtons`, because `AccessibleName` allows `hint` only in its `label` branch. A childless `Select` has no visible label, so its `hint` needs an `aria-label` and the button is named `About <aria-label>`. The button sits between the label and the control, outside the `<label>`, which is the scrub handle. An inset `NumberField` puts it after the input.
- `suffix` wraps the input in prime-ui's `Input.Group`, which wears the frame, and the input inside goes borderless. The suffix text has an id listed in `aria-describedby` after the consumer's and the hint's. `state` goes to prime-ui's `NumberInput` (`Input` on `TextField`), whose `data-field-state` and `aria-invalid` attributes the `input` utility reads on the input or on its group. `info` has no border upstream and this package adds none.
- `CONTROL_ROW_CLASS` in `src/lib/control-label.ts` is the row that holds a label, its hint button, and the control, on `NumberField`, `TextField`, `FileField`, `Slider`, and `ToggleButtons`. Its gap is 8 px, because the `focus-ring` utility reaches 4 px past a control's border and must not touch the label. The five rows share the class so stacked fields keep their inputs aligned. `Point` is the exception. Its root is `flex flex-col gap-1`, because it stacks the group label above the axis grid and has no single control to sit beside the label.
- Tailwind classes reference `@viamrobotics/tailwind-config` tokens only.
