---
paths:
  - '**/*.svelte'
---

# Accessibility — Svelte

Svelte-specific residue on top of `accessibility.md`, which this guide assumes.

## Rule — follow without deliberation

- **Treat an `a11y_` compiler warning as an error.** Svelte's compiler checks accessibility
  at build time, and no other major framework does. A warning that ships is a bug that
  shipped.
- **Suppress a warning with `<!-- svelte-ignore -->` only with a comment stating why.** "It
  was noisy" is not a why. Fix the markup first.
- **Replace an `onclick` on a non-interactive element with a `<button>` instead of
  suppressing the warning.** The suppression is the fix developers reach for most, and it is
  almost never the right one.
- **A global `<svelte:window onkeydown={...}>` Escape handler still needs the dialog to
  manage its own focus.** The window listener can close the dialog, but only the dialog
  knows where focus should land next.
- **Pair `transition:` and `animate:` directives with a `prefers-reduced-motion` check in
  script, not only in CSS.** A CSS media query does not stop a JS-driven transition, since
  Svelte drives the animation directly.
- **Do focus management in an `$effect`, never in component body.** The body runs before the
  node is in the document, so the focus call is a no-op. `bind:this` needs a `$state`
  binding for the effect to re-run when the node arrives.
- **A snippet renders no element of its own, so `{@render children()}` cannot carry a role
  or a landmark.** Put the role or landmark on a wrapper element around the render tag, or
  on the element the caller passes in.
- **Treat `{@html ...}` as unchecked markup.** It bypasses the compiler's own accessibility
  checking along with everything else `accessibility.md` requires.
- **Key `{#each}` blocks with a stable id.** Reordering a keyed block moves the underlying
  DOM nodes, and focus follows the node, not the list position.
- **Run `svelte-check` in CI.** It surfaces `a11y_` warnings outside the dev server, where
  they are easy to miss. It does not catch contrast, focus order, or whether alt text is
  meaningful, all of which still need the checks in `accessibility.md`.

## Examples

**Bad — suppressing the warning instead of fixing the element:**

```svelte
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div onclick={select}>{item.name}</div>
```

**Good — a real button, no suppression needed:**

```svelte
<button type="button" onclick={select}>{item.name}</button>
```

**Bad — focusing a node before it exists in the document:**

```svelte
<script lang="ts">
  let input: HTMLInputElement | undefined = $state();
  input?.focus();
</script>

<input bind:this={input} />
```

**Good — focus from an effect, once the node is bound:**

```svelte
<script lang="ts">
  let input: HTMLInputElement | undefined = $state();
  $effect(() => {
    input?.focus();
  });
</script>

<input bind:this={input} />
```
