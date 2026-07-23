---
paths:
  - "**/*.ts"
  - "**/*.tsx"
  - "**/*.js"
  - "**/*.jsx"
  - "**/*.mjs"
  - "**/*.cjs"
  - "**/*.svelte"
  - "**/*.svelte.ts"
  - "**/*.svelte.js"
  - "**/*.go"
  - "**/*.py"
  - "**/*.rs"
---

# Code Comments

These principles are language-agnostic — they hold for every language in the repo (TypeScript, Svelte, Go, Python, and so on). The examples below are illustrative, not language-specific.

## Rule — follow without deliberation

- **Default to no comment.** Self-explanatory code does not need narration. If a reader can understand the intent by reading the code, do not add a comment.
- **Only comment for two reasons:**
  1. **Divergence from convention** — the code intentionally departs from the repo's normal patterns, a language idiom, or an obvious implementation. Explain _why_ the divergence is necessary (e.g. a bug workaround, a perf constraint, an external API quirk, a reactivity requirement).
  2. **Non-obvious domain logic** — the code encodes a business rule, invariant, or domain concept that a new reader would not infer from the code itself. Briefly catalog the rule so future readers can find and trust it.
- **Hard cap: 200 characters per comment.** If you cannot explain it in 200 characters, the comment is probably documenting too much; split it, link to a doc/ticket, or rewrite the code to be clearer.
- **Never narrate the code.** No `// increment counter`, `// loop over users`, `// return result`, `// import the package`, `// handle error`. These are noise.
- **Never explain the change you just made.** Comments describe the code as it exists, not its diff history. Put rationale for a change in the commit message or PR description, not in the source.
- **Prefer naming over commenting.** If a comment is needed to explain what a variable, function, or block does, first try renaming it or extracting a function with a descriptive name.

## Examples

**Bad — narrating obvious code:**

```ts
// Get the user from the store
const user = userStore.get();
if (!user) {
  // Return early
  return;
}

// Loop over the parts
for (const part of parts) {
  // Add it to the result
  result.push(part);
}
```

**Bad — explaining the change instead of the code:**

```ts
// Switched to structuredClone because the old spread didn't deep-copy
const copy = structuredClone(config);
```

**Bad — comment longer than 200 chars restating what the code shows:**

```ts
// This function takes the list of robot parts, filters out the ones that are not currently active, then maps each remaining part to its config object and returns the resulting array of configs to the caller for rendering.
function activePartConfigs(robot: Robot): PartConfig[] { ... }
```

**Good — divergence from convention, with the reason (frontend):**

```ts
// $state.raw: this buffer is replaced wholesale each frame; deep reactivity would tank render perf.
let points = $state.raw(new Float32Array());
```

**Good — divergence from convention, with the reason (backend):**

```go
// 5s buffer absorbs clock skew between app servers and the DB primary — see APP-8026.
startTime = startTime.Add(-5 * time.Second)
```

**Good — cataloging non-obvious domain logic:**

```ts
// Viam resource names are case-insensitive but must round-trip with their original
// casing, so we key by the original and compare lowercased.
const key = name.toLowerCase();
```

**Good — no comment needed, the name carries the meaning:**

```ts
const activeParts = filterActiveParts(robot.parts);
```
