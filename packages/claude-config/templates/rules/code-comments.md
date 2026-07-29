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

Applies to every language in the repo. This rule decides _whether_ to comment. When the answer is yes, the language rule (`typescript.md`, `go.md`, `svelte.md`) gives the shape.

- **Default to no comment.** If the code shows the intent, add nothing.
- **Comment for exactly two reasons:**
  1. **Divergence from convention.** The code departs from repo patterns, a language idiom, or the obvious implementation. Say why: bug workaround, perf constraint, external API quirk, reactivity requirement.
  2. **Non-obvious domain logic.** The code encodes a business rule, invariant, or domain concept a new reader cannot infer. Catalog it so future readers can find and trust it.
- **Hard cap of 200 characters per comment.** Past that it documents too much. Split it, link a doc or ticket, or make the code clearer.
- **Never narrate the code.** No `// increment counter`, `// loop over users`, `// return result`, `// import the package`, `// handle error`.
- **Never explain the change you just made.** Comments describe the code as it exists, not its diff history. Rationale for a change goes in the commit message or PR description.
- **Prefer naming over commenting.** If a comment explains what a variable, function, or block does, rename it or extract a well-named function instead.
- **Use doc-comment syntax for symbol docs.** Anything documenting a type, function, or member: `/** */` in TypeScript, JavaScript, and Svelte, `//` starting with the identifier name in Go. Line comments are for inline rationale next to the code they explain.

## Bad

```ts
// Get the user from the store
const user = userStore.get();

// Switched to structuredClone because the old spread didn't deep-copy
const copy = structuredClone(config);

// Throws when the part is offline.
export function readPose(part: Part): Pose { ... }
```

Narration, then diff history, then a line comment where a doc comment belongs.

## Good

```ts
/** Returns undefined when the part has no config. That is expected, not an error. */
export function partConfig(part: Part): PartConfig | undefined { ... }

// $state.raw: this buffer is replaced wholesale each frame, deep reactivity would tank render perf.
let points = $state.raw(new Float32Array());

// Viam resource names are case-insensitive but must round-trip with their original
// casing, so we key by the original and compare lowercased.
const key = name.toLowerCase();

const activeParts = filterActiveParts(robot.parts);
```

A doc comment carrying what the signature cannot, a divergence with its reason, non-obvious domain logic, and a name that needs no comment at all.

```go
// 5s buffer absorbs clock skew between app servers and the DB primary. See APP-8026.
startTime = startTime.Add(-5 * time.Second)
```
