---
paths:
  - '**/*.css'
  - '**/*.jsx'
  - '**/*.tsx'
  - '**/*.svelte'
  - '**/*.vue'
  - '**/*.astro'
---

# Design

This rule covers using the repo's design system when writing or editing styled markup. The
system's values come from a seeded token file or from this repo's Tailwind theme, whichever
this install uses. It is guidance, not a linter, so a value that violates a rule below is a
finding to weigh, not an error to block on.

## Rule — follow without deliberation

### Tokens over literals

- **Use a token instead of a literal.** A hex color, a raw pixel or rem value, or a named
  font weight typed inline cannot be changed in one place later. Look up the token first.

### Spacing scale

- **Stay on the spacing scale.** A margin, padding, or gap value that is not one of the
  scale's steps reads as an accident to the next person who has to guess whether it was
  intentional.

### Type scale

- **Stay on the type scale.** An arbitrary font size next to the scale's sizes breaks the
  rhythm the scale exists to create.

### Contrast

- **Every foreground and background pairing needs a contrast decision.** Pick colors that
  pass the ratio for the text or component involved, or note why the pairing is decorative
  rather than legible content. See the reference doc for the thresholds and the formula.

### Hit targets

- **Interactive targets need an adequate hit size.** A button or link sized for a mouse
  cursor is often too small to tap reliably, and cramped spacing between two targets
  produces the same missed taps as an undersized target. See the reference doc for the
  minimum.

### Reuse before invention

- **Prefer an existing component over a new one.** A second implementation of a button or
  card drifts from the first the moment either one changes.
- **A new token is a design decision, not a convenience.** Adding a token because none of
  the existing ones fit is a choice about the system, not a shortcut around it. List what
  exists before adding one.

## Routing table

`design.mjs` answers these questions instead of the rule stating the values inline, so the
rule stays small and the values stay current with whatever the repo has seeded.

- **Resolve one value:** `node .claude/scripts/design.mjs token <name>`
- **Find out what exists before inventing a name:** `node .claude/scripts/design.mjs list [group]`
- **Check a literal against the spacing, type, and radius scales:** `node .claude/scripts/design.mjs scales`

Three pull-only references sit alongside the script. They are not loaded until you read them, so
read the one that answers the question in front of you.

- **Contrast ratios, hit-target rules, type scale, spacing rhythm:** `../reference/design-visual-principles.md`
- **Laying a screen out:** fluid grids, container queries, grouping related data, where to put the
  primary action. See `../reference/design-layout.md`.
- **A design decision that might cost rendering performance:** which properties animate cheaply,
  what a blur or a shadow costs, fonts and layout shift, image format. See
  `../reference/design-performance.md`.

## Where other rules apply

- Contrast is also a WCAG success criterion. If `accessibility.md` is installed, it owns the
  broader WCAG obligations for markup, and this rule's contrast guidance is the design-system
  half of the same requirement.
- How the sentence inside any prose you write here reads: see `prose-voice.md`.

## Also installed in this repo

- **Extending Tailwind into a design system, or building a theme that switches at runtime:** `../reference/design-tailwind-theming.md`
