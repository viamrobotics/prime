# Design Tailwind Theming

How to extend Tailwind's own theme into a design system, and how to build a theme that
switches at runtime. `.claude/templates/tailwind-theme.css.template` is a starter that
covers every move described here. Copy it into your entry stylesheet and edit the values.

## Adding tokens without forking Tailwind

A `@theme` block adds to Tailwind's own theme rather than replacing it. Declare a custom
property inside one and Tailwind generates a utility for it the same way it does for its
own palette:

```css
@theme {
  --color-brand-500: oklch(0.55 0.2 265);
}
```

`bg-brand-500` now compiles to `background-color: var(--color-brand-500);`, sitting beside
every other Tailwind utility. No fork, no config file to maintain against Tailwind's own.

`@theme` also compiles the same regardless of where it sits. Nested inside a selector or a
media query it produces byte-identical output to a top-level block, with no error and no
warning. Tailwind hoists it. That is not a way to scope a theme value to one selector,
though. Nesting a `@theme` block does not make its declarations conditional on that
selector matching, so a runtime theme still is not a second `@theme` block. See "Building a
second theme that switches at runtime" below for the actual mechanism.

## When `@theme inline` is required rather than optional

Plain `@theme` and `@theme inline` both compile a value that references another custom
property, and reading the compiled CSS alone makes them look interchangeable. Running the
result in a browser shows they are not.

Take a semantic alias built on a runtime-themeable base value:

```css
@import 'tailwindcss';
:root {
  --brand-accent: oklch(0.5 0.1 200);
}
@theme {
  --color-accent: var(--brand-accent);
}
[data-theme='midnight'] {
  --brand-accent: oklch(0.2 0.05 260);
}
```

Plain `@theme` declares `--color-accent: var(--brand-accent)` on `:root`, and that
declaration's value is substituted against the cascade at `:root`, where `--brand-accent`
is still the light value. An element with `bg-accent` reads `--color-accent`, which is
already frozen at the light color, even inside `[data-theme="midnight"]`. Measured in
Chrome with `:root` at `rgb(10, 20, 30)` and the override at `rgb(200, 100, 50)`: the
element under the override still computed `rgb(10, 20, 30)`.

Write `@theme inline` instead and Tailwind emits no `--color-accent` indirection variable
at all. The `bg-accent` utility compiles straight to
`background-color: var(--brand-accent);`, so it resolves against whatever custom property
is active on the element's own cascade. Under the same override, that element computed
`rgb(200, 100, 50)`.

**Use `@theme inline` for any alias built on a value a runtime theme can override.** Use
plain `@theme` only for a value nothing ever overrides after the page loads, since inline
adds no benefit there.

## Closing the default palette off

Tailwind's default palette generates a utility for every color it ships, in oklch. Nothing
about adding your own palette removes that, so `bg-red-500` keeps compiling right alongside
`bg-brand-500` unless you close the system off.

`--color-*: initial` removes every key in the color namespace that exists at that point,
including Tailwind's own defaults, and any value you redeclare after it in the same block
survives:

```css
@theme {
  --color-*: initial;
  --color-brand-500: oklch(0.55 0.2 265);
}
```

After this, `bg-red-500` compiles to nothing and `bg-brand-500` still compiles. The color
namespace on the loaded theme holds only the key you redeclared.

`--*: initial` is the wider form. It clears the entire default theme, not only colors,
which also removes `--spacing`, the variable every spacing utility multiplies against.
`p-4` stops compiling until `--spacing` is redeclared in the same block:

```css
@theme {
  --*: initial;
  --color-brand-500: oklch(0.55 0.2 265);
  --spacing: 0.25rem;
}
```

Reach for `--color-*: initial` when the goal is one closed palette on top of Tailwind's
other defaults, and `--*: initial` only when you intend to redeclare the rest of the
namespaces the repo actually uses, spacing included.

A closed system also composes with `@theme static`, which forces the variables written
inside that specific block into the compiled `:root` output even when nothing in the
project currently uses them, so a design tool reading the built CSS can always find them.
It only forces what is written in that block, not the rest of Tailwind's default theme, and
it can be applied to a semantic layer alone while the rest of the theme stays lazily
emitted.

## Building a second theme that switches at runtime

A runtime theme is not a second `@theme` block. It is an override of the generated custom
properties under a selector, applied after the theme itself has been declared:

```css
@theme {
  --color-brand-500: oklch(0.55 0.2 265);
}

[data-theme='midnight'] {
  --color-brand-500: oklch(0.2 0.05 260);
}
```

`.bg-brand-500` still compiles to `background-color: var(--color-brand-500);`. Wrapping a
subtree in `[data-theme="midnight"]` changes what that variable resolves to, everywhere
inside it. Follow the `@theme inline` guidance above for any token the theme override needs
to reach: a value declared with plain `@theme` freezes against `:root`, the same failure
described there, so a value meant to switch at runtime needs to be an alias over a plain
custom property, aliased with `inline`, not a direct `@theme` declaration overridden
in place.

Pair the override with `@custom-variant` when a utility needs to vary only under that theme
rather than replacing a token everywhere:

```css
@custom-variant theme-midnight (&:where([data-theme="midnight"] *));
```

`theme-midnight:bg-brand-500` then compiles to a rule scoped to
`:where([data-theme="midnight"] *)`, letting a class apply conditionally on the active
theme instead of only through the token it reads.

## Repeated patterns as utilities

A style repeated across components, rather than a color or a spacing step, is a candidate
for `@utility` instead of a class copy-pasted in each place:

```css
@utility card {
  border-radius: var(--radius-lg);
  padding: calc(var(--spacing) * 6);
}
```

`card` then resolves through the same theme as every other utility, so a check that reads
compiled CSS can verify it the same way it verifies `bg-brand-500`.

## Recommendation: a semantic layer over the raw palette

This is a design opinion, not a Tailwind behavior. Tailwind does not require it and will
compile a theme without one.

Name the raw palette by its own scale, `--color-brand-500`, `--color-neutral-950`, and then
alias each role a component actually needs to a semantic name: `--color-surface`,
`--color-accent`, `--color-danger`. The reason is what a name can and cannot survive. A
utility built on `--color-blue-500` cannot be rethemed, because the name is the value. A
utility built on `--color-surface` can, because the name never changes and only the value
behind it does. The alias layer is what makes "switch the theme" a matter of changing what
a handful of names point at, instead of a find-and-replace across every component that used
a numbered color directly.
