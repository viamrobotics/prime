---
paths:
  - '**/*.ts'
  - '**/*.tsx'
  - '**/*.mts'
  - '**/*.js'
  - '**/*.jsx'
  - '**/*.mjs'
  - '**/*.cjs'
  - '**/*.svelte'
  - '**/*.svelte.ts'
  - '**/*.svelte.js'
---

# Code Comments

This rule decides **whether** a comment should exist and **what form** it takes. For how the
sentence inside it should read, see `prose-voice.md` if that rule is installed.

The principles are language-agnostic. The examples are TypeScript, and "TSDoc" below means
whatever doc-comment form the language uses. TSDoc or JSDoc here, docstrings in Python,
rustdoc in Rust.

## Rule — follow without deliberation

### Whether to comment

- **Default to no comment.** Self-explanatory code does not need narration. If a reader can
  understand the intent by reading the code, do not add a comment.
- **Only comment for three reasons:**
  1. **Public API contract.** A caller has to know something the signature does not say. See
     the form section below.
  2. **Divergence from convention.** The code intentionally departs from the repo's normal
     patterns, a language idiom, or the obvious implementation. Explain _why_ the divergence is
     necessary, such as a bug workaround, a perf constraint, an external API quirk, or a
     reactivity requirement.
  3. **Non-obvious domain logic.** The code encodes a business rule, invariant, or domain
     concept that a new reader would not infer from the code itself.
- **Prefer naming over commenting.** See `code-cleanliness.md`'s Naming section if that rule
  is installed.
- **Never narrate the code.** No `// increment counter`, no `// loop over users`, no
  `// handle error`. These are noise.
- **Never explain the change you just made.** Comments describe the code as it exists, not its
  diff history. Rationale for a change belongs in the commit message or the PR description.

### What form

- **TSDoc is for the reader USING the code. `//` is for the reader READING it.** That is the
  whole test, and it decides every case below. Ask where the information is needed. If a caller
  needs it at the call site, it is TSDoc, because editors surface TSDoc on hover and a `//`
  comment is invisible there. If it only makes sense to someone inside the implementation, it is
  `//`.
- **In practice that means TSDoc on most top-level definitions**, exported or not. Anything a
  module exports is API for someone else, so it is the clearest case. A non-exported helper
  called from a dozen places in a long module has call sites too, and its callers benefit from
  hover exactly as much.
- **Keep TSDoc to what the signature cannot say.** A one-sentence summary, then `@param`,
  `@returns`, or `@throws` only where they carry information the types do not. Never
  `@param name The name`. Skip the block entirely when the signature is the whole story, such
  as a getter, a re-export, or a predicate whose name says it all.
- **`//` for context inside an implementation.** Lines inside a function body, and a definition
  whose explanation would mean nothing at a call site. Put the comment directly above the line it
  explains, not at the top of the block it lives in.
- **Hard cap: 200 characters per `//` comment.** If you cannot explain it in 200 characters,
  the comment is documenting too much. Split it, link to a doc or a ticket, or rewrite the code
  to be clearer. TSDoc may run longer when the contract genuinely needs it, but three sentences
  is already a lot.

### Never

- **No file header comments.** A block at the top of a file summarizing what the file is for
  goes stale, restates the module's own doc comments, and gets read by nobody. The filename and
  the exports are the header. A module-wide invariant belongs in the TSDoc of the export that
  enforces it. One that spans modules belongs in the repo's docs.
  - The one exception is an executable entry point, the file whose first line is a shebang.
    Its contract spans the whole invocation, so no single export can carry it, and that
    stays true when the file also exports functions for tests to import. Write the block as
    TSDoc, the same as any other documentation, and keep it to the invocation contract:
    what the command does, its options, its exit codes, and the limits it declares. Never a
    summary of the design or a history of the file.
  - **Test files are not covered by that exception.** A suite's `describe` names carry the
    contract. See `testing.md` if that rule is installed.
- **No landmark comments.** No `// ---- parsing ----`, no banner dividers, no
  `// === helpers ===`. Needing signposts to navigate a file means the file should be several
  files. Split it and name each one after the section it replaced.
- **No commented-out code.** Delete it. Version control remembers it, and nobody left reading
  it knows whether it still works.
- **No bare `TODO`.** A TODO that names no tracker is permanent. Reference the ticket or issue
  where the work is tracked, or do not leave the marker. Never reference a ledger id. Committed
  text is public, and the id resolves only against the local ledger.

## Examples

**Bad — file header and landmark dividers:**

```ts
// user-store.ts
// Holds the current user and keeps it in sync with the session cookie.
// Used by the header, the settings page, and the admin routes.

// ------------------------------- state -------------------------------
let user: User | null = null;

// ------------------------------ helpers ------------------------------
function readCookie(): string | null {}
```

**Bad — narrating obvious code:**

```ts
// Get the user from the store
const user = userStore.get();
if (!user) {
  // Return early
  return;
}
```

**Bad — explaining the change instead of the code:**

```ts
// Switched to structuredClone because the old spread didn't deep-copy
const copy = structuredClone(config);
```

**Bad — a doc comment in `//` clothing above an export:**

```ts
// Splices the body into the marker block, leaving every byte outside the markers
// untouched. Returns the new content and whether the block was created or replaced.
export function upsertRegion(content: string, body: string) {}
```

**Good — the same contract as TSDoc, so it reaches the caller on hover:**

```ts
/**
 * Splices `body` into the marker block. Bytes outside the markers are never modified,
 * which is the invariant the whole managed-region feature rests on.
 *
 * @returns The new content, and whether the block was created or replaced.
 */
export function upsertRegion(content: string, body: string) {}
```

**Good — divergence from convention, inline, with the reason:**

```ts
// $state.raw: this buffer is replaced wholesale each frame. Deep reactivity would tank render perf.
let points = $state.raw(new Float32Array());
```

**Good — cataloging non-obvious domain logic:**

```ts
// Resource names are case-insensitive but must round-trip with their original
// casing, so we key by the original and compare lowercased.
const key = name.toLowerCase();
```

**Good — no comment needed, the name carries the meaning:**

```ts
const activeParts = filterActiveParts(robot.parts);
```
