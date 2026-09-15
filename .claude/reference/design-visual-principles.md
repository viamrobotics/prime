# Design Visual Principles

The claims here hold across any design system, which is why they live separately from
`design.md`. Everything below is checkable: a threshold, a formula, or a count. Cut
anything that reads as taste instead.

This is the visual layer. `design-principles.md`, shipped by the CLI's `code-cleanliness`
module, is a different document about software structure.

## Contrast

WCAG 2.2 sets two thresholds for the contrast ratio between text (or a UI component) and
its background:

- **4.5:1** for body text.
- **3:1** for large text (24px and up, or 19px and up when bold) and for UI components and
  graphical objects such as icons, borders on inputs, and focus indicators.

The ratio is `(L1 + 0.05) / (L2 + 0.05)`, where `L1` is the relative luminance of the
lighter color and `L2` is the relative luminance of the darker one. Relative luminance for
an sRGB color is:

```
L = 0.2126 * R + 0.7152 * G + 0.0722 * B
```

where `R`, `G`, and `B` are each channel linearized from its 0 to 1 sRGB value:

```
C = c / 12.92                          if c <= 0.03928
C = ((c + 0.055) / 1.055) ^ 2.4        otherwise
```

`c` is the sRGB channel value (0 to 1) and `C` is the linearized channel used in the
luminance formula. A pairing that fails its threshold is a finding regardless of how the
colors were chosen.

## Hit targets

WCAG 2.2's Target Size (Minimum) criterion (SC 2.5.8) sets one rule: an interactive target
of at least **24 by 24 CSS pixels** passes. That holds regardless of what is next to it.

Four exceptions let a target pass even when it does not meet the rule:

- **Spacing.** A target under 24 by 24 still passes if a 24px-diameter circle centered on
  its bounding box does not intersect the same circle centered on any adjacent target. This
  is the one exception that depends on neighboring targets. It exists to let small,
  well-spaced targets pass, not to fail targets that already meet the 24px minimum.
- **Inline.** The target sits inline in a sentence or block of text.
- **Equivalent.** The same function is available through another control on the same page
  that does meet the minimum.
- **Essential.** The small size is essential to the information being conveyed, such as a
  map pin at a specific coordinate.

Two targets that each meet 24 by 24 pass no matter how close together they sit. Placing
them edge to edge can still be uncomfortable to tap given normal finger imprecision. Treat
that as practical advice beyond the criterion, not as a conformance failure.

## Type scale

A bounded set of font sizes reads as intentional because every size on the page can be
traced back to one of a small number of choices. An unbounded set, where each new component
picks its own value, has no way to look intentional to a reader: there is no way to tell a
deliberate size from a typo or a copy-paste that was never adjusted. The number of steps in
the scale is a system-specific choice. What the argument depends on is a fixed set, of any
size, not this particular one.

## Spacing rhythm

A single spacing scale beats ad-hoc values for the same reason: it turns "is this gap
correct" into "is this value on the scale," a check any reader can run by eye once they
know the scale. "Off the scale" means the pixel or rem value used does not match any step
in the scale, not that it is merely unusual. A value that is off the scale is a strict
statement about that one number, not a judgment about whether the layout looks right.

## Token coverage

A token-coverage number, such as "80% of colors in this file come from the token set,"
counts literal values against token-backed ones. Treat it as a trend to watch across
commits, not a gate to block a change on. A single component can legitimately need a
one-off value (a brand mark's exact color, a third-party embed's fixed size), so a lower
number on one file is not by itself evidence of a problem. A number falling over time
across the codebase is.

## Visual hierarchy

Most of what gets called "visual hierarchy" is aesthetic judgment with no fixed answer.
Three claims are checkable rather than a matter of taste:

- **One primary action per view.** If two buttons both claim the primary treatment, neither
  one functions as the primary action, because the visual signal that was supposed to mean
  "do this one" no longer picks a single element.
- **Alignment and proximity are grouping signals.** Elements placed close together or on a
  shared edge are read as related, and elements spaced apart or misaligned are read as
  unrelated, independent of any color or size difference between them.
- **Contrast is the emphasis lever.** Of the properties available (size, weight, color,
  spacing), contrast against the surrounding content is what a reader's eye is drawn to
  first. Everything else on a page competing for that same contrast flattens the hierarchy
  back to nothing standing out.
