---
paths:
  - '**/*.html'
  - '**/*.jsx'
  - '**/*.tsx'
  - '**/*.svelte'
  - '**/*.vue'
  - '**/*.astro'
---

# Accessibility

This rule covers markup an agent authors. It targets WCAG 2.2 level A and AA. It is
guidance, not a linter, so the repo's own accessibility linter still does the mechanical
checking.

## Rule — follow without deliberation

### Semantics

- **Prefer the native element over ARIA.** A `<button>` gets keyboard and role behavior free.
  ARIA on a `<div>` only restates what the native element already does.
- **One role per element.** A screen reader can only announce one, so a second is either
  redundant or conflicting.
- **Use landmarks.** `<nav>`, `<main>`, `<header>`, `<footer>` let a screen reader user jump
  between regions instead of reading the page in order.

### Accessible names

- **Every control and image has a name decision.** A button, link, input, or image either
  gets an accessible name or is explicitly marked decorative. Silence is not a valid state.
- **`alt=""` is a decision, not an omission.** It tells a screen reader to skip a decorative
  image. Leaving `alt` off entirely makes the browser announce the file path instead.
- **The accessible name matches the visible label.** A mismatch breaks voice control, which
  matches spoken commands against what is visible.

### Keyboard

- **Anything clickable is focusable and activatable by Enter or Space.** A click handler on
  a non-interactive element with no keyboard path locks out anyone who cannot use a mouse.
- **No positive `tabindex`.** A positive value rewrites the tab order and reliably breaks it
  once another element is added. Use `0` or `-1`, or reorder the markup instead.
- **Focus order follows reading order.** A tab order that jumps around the page disorients a
  keyboard user more than a slow one.

### Focus

- **Never remove the visible focus indicator without a replacement.** Losing it means a
  keyboard user cannot tell where they are.
- **Move focus deliberately after a route change or dialog open.** Without it, focus stays on
  a control that just disappeared or scrolled offscreen.
- **Never trap focus outside a modal.** Tab and Shift+Tab must cycle inside an open modal.

### Forms

- **Every input has an associated label.** A placeholder is not a label. It disappears on
  input and is not reliably announced.
- **Errors are announced and identify the field.** A color change alone tells a screen reader
  user nothing happened.
- **Required and invalid state is programmatic, not just visual.** Use `required` and
  `aria-invalid` so the state survives past the stylesheet.

### Color and motion

- **Color is never the only signal.** Add an icon, text, or pattern alongside it for anyone
  who cannot distinguish the colors used.
- **Respect `prefers-reduced-motion`.** Some users get physically ill from motion this media
  query lets you turn off.
- **Do not autoplay.** Audio or video that starts on its own interrupts screen reader output
  and cannot be predicted or dismissed in time.

### Structure

- **One `h1` per page.** It is the page's single top-level heading.
- **Headings do not skip levels.** An `h2` followed by an `h4` erases a level a screen reader
  user relies on to build the page's outline.
- **Tables have headers, and lists are lists.** A `<th>` lets a screen reader announce which
  column a cell belongs to, and an indented paragraph is not a list until marked up as one.

## Which criteria apply to this change

All 87 WCAG 2.2 success criteria ship at [`../reference/wcag22.md`](../reference/wcag22.md).
That file is pull-only. Grep it for the criterion number or a keyword, then read that window.
Never read it whole, and never `@-import` it.

To find out which criteria a change is subject to, run the router over the files you touched:

```
node .claude/scripts/wcag.mjs applies path/to/Component.tsx
node .claude/scripts/wcag.mjs lookup 1.4.3
```

`applies` is deliberately over-inclusive. It names the criteria in play, it does not judge whether
your markup satisfies them. `node .claude/scripts/wcag.mjs patterns` prints the whole routing
table.

### Where other rules apply

- How the sentence inside any prose you write here reads: see `prose-voice.md`.
- Per-framework residue such as component-specific patterns: see `accessibility-react.md`,
  `accessibility-svelte.md`, `accessibility-vue.md`, or `accessibility-html.md`, each only if
  that guide is installed.
