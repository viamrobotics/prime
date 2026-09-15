---
name: tidy
description: Tidy and clean up the working diff against the installed code-cleanliness rule, covering naming, function size, magic values, and dead code. Use after writing or changing code, when the ask is to tidy, clean up, or polish what the diff touched. Reuse, efficiency, and architecture cleanups are out of scope here, so route those to `/review-change`.
allowed-tools: Read, Edit, Grep, Glob, Bash
---

Audit the current working diff against houserules' installed `code-cleanliness` rule.
This is rule-driven, not judgment-driven: run its checkers over the diff, then fix what
they find and apply judgment to the rest. Every finding cites the clause it violates. It
is narrower than a general cleanup pass: reuse, efficiency, and altitude are not its job.

## 1. Scope

```
git diff --name-only
```

Reviewing a branch rather than just the working tree? Use `git diff --name-only <base>...HEAD`.
Limit the audit to the changed files and the changed hunks inside them. Never sweep the whole
repo. A repo-wide mechanical pass is `/sweep`, not this skill.

## 2. Read the rule

Load `.claude/rules/code-cleanliness.md`. If it is not installed, say so and stop. Do not fall
back to a general cleanliness pass on your own judgment, because that is a judgment-driven
cleanup wearing this skill's name. This skill has no opinion of its own, only the rule's.

## 3. Run the checkers

Run these over just the files from step 1, never the whole repo:

- **ESLint**, over the changed `.ts`/`.mts` files: `node_modules/.bin/eslint <files>` (fall back
  to `npx eslint <files>` if that binary is not there). Where the repo's flat config has them on,
  this reports `no-unreachable` branches, `PascalCase` type names, `T`-prefixed generics, and
  nesting past `max-depth` as errors, one clause each from Naming, Function size, and Dead code.
- **`.claude/scripts/catch-all-filename.mjs`**, over the same file list, if installed:
  `node .claude/scripts/catch-all-filename.mjs <files>`. Flags a `types.ts`, `constants.ts`,
  `utils.ts`, `shared.ts`, or `helpers.ts` basename outright, the Catch-all files clause.
- **Function length, as a candidate list, not a gate.** If the flat config keeps a diff-scoped
  ruleset behind a named export, the way this repo's own `changedFilesConfig` in
  `eslint.config.mjs` does, ESLint's `--config` CLI flag reads only the file's default export and
  silently misses it. Load the named export through the Node API instead:

  ```
  node -e "
  import('eslint').then(async ({ ESLint }) => {
    const { changedFilesConfig } = await import('./eslint.config.mjs');
    const eslint = new ESLint({ overrideConfigFile: true, overrideConfig: changedFilesConfig });
    const results = await eslint.lintFiles(process.argv.slice(1));
    console.log((await eslint.loadFormatter('stylish')).format(results));
  });
  " -- <changed .ts/.mts files>
  ```

  Every `max-lines-per-function` warning it prints is a candidate, never a finding on its own:
  judge each one against the rule's own test, "past 20 to 30 lines, look again", meaning does it
  mix abstraction, or is it one task a split would only fragment, before deciding whether to
  split it.

No ESLint config in this repo, or `catch-all-filename.mjs` not installed? Say so and fall back to
step 4 for everything that checker would have covered.

## 4. Judge the rest by hand

The checkers above see only part of the rule. Walk each changed hunk for what they cannot: a
boolean not read as a predicate, an unexplained magic value, an unspelled abbreviation, an
acronym written in all caps, an unused export, a speculative branch for a case the product does
not have, a function doing two things a line count alone would not catch, an optional-flags
parameter that is really two functions, and a name that needs a comment to explain it. For each
finding, record the file, the line, the specific clause it violates, and the fix. A finding with
no matching clause is not a finding, it is an opinion, and this skill does not report opinions.

Skip anything the rule scopes elsewhere, such as formatting, import order, comments, or
design-level duplication. Those belong to the repo's linter, `code-comments.md`, and
`design-principles.md`, not this audit.

## 5. Apply

Fix the mechanical findings directly: local renames, extracted constants, deleted dead code, and
early returns. Do not touch anything outside the Naming, Function size, Magic values, and Dead
code sections. Performance, architecture, and reuse findings are out of scope here. Leave those
for `/review-change`.

The one correctness risk is renaming an exported symbol. A textual rename can miss a caller and
silently break it. Check for `.claude/scripts/rename.mjs`:

- If it is installed, run the exported-symbol rename through it rather than editing text by hand.
- If it is not installed, do not perform the rename. Propose it in the report instead, with the
  old name, the new name, and the file.

Local variable and parameter renames carry no such risk. Apply those directly.

## 6. Report

List what was fixed, each with the clause it violated and whether a checker or your own read
found it. Then list what was deliberately left alone, each with the reason, such as a 40-line
function that genuinely needs the length, or a checker warning judged not worth splitting. Silent
non-action reads as clean, so name it instead. Finally list any proposed exported-symbol renames
that need the `rename` module, or ran through it if installed.

Keep the report to findings and dispositions, not a restated diff. A reader wants to know what
changed and why, not to re-derive it from a wall of before-and-after code.
