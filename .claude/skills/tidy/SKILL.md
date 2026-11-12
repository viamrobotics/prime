---
name: tidy
description: 'Tidy, clean up, or polish the working diff against the code-cleanliness rule: naming, function size, magic values, dead code. Use after writing or changing code. Reuse and architecture go to `/review-change`.'
allowed-tools: Read, Edit, Grep, Glob, Bash, Agent
---

Audit the current working diff against houserules' installed `code-cleanliness` rule.
This is rule-driven, not judgment-driven: run its checkers over the diff, then fix what
they find and apply judgment to the rest. Every finding cites the clause it violates. It
is narrower than a general cleanup pass: reuse, efficiency, and altitude are not its job.

The audit runs in a subagent and the fixes run here. Checker output and hunk reads are most of
what a tidy pass adds to a context, and a session already carries a large prefix on every
request. A subagent starts small, so it pays that cost on its own context and hands back only a
list of findings.

## 1. Scope

```
git diff --name-only
```

Reviewing a branch rather than just the working tree? Use `git diff --name-only <base>...HEAD`.
Limit the audit to the changed files and the changed hunks inside them. Never sweep the whole
repo. A repo-wide mechanical pass is `/sweep` where it is installed, not this skill.

## 2. Check the rule is installed

Look for `.claude/rules/code-cleanliness.md`. If it is not installed, say so and stop. Do not
fall back to a general cleanliness pass on your own judgment, because that is a
judgment-driven cleanup wearing this skill's name. This skill has no opinion of its own, only
the rule's. Do not read the rule here, because the subagent reads it.

## 3. Dispatch the audit

Send one `Agent` call with `subagent_type: "general-purpose"`, `model: "sonnet"`, and
`effort: "medium"`, in the foreground, because the fixes wait on its answer. The brief carries the
changed-file list from step 1 and the rule path, and tells the subagent to do the following in
order. It must not edit any file.

1. Read `.claude/rules/code-cleanliness.md`.
2. Run these over just the changed files, never the whole repo:
   - **ESLint** over the changed `.ts`/`.mts` files: `node_modules/.bin/eslint <files>`, or
     `npx eslint <files>` if that binary is not there. Where the flat config has them on, it
     reports `no-unreachable` branches, `PascalCase` type names, `T`-prefixed generics, and
     nesting past `max-depth` as errors, one clause each from Naming, Function size, and Dead
     code.
   - **`.claude/scripts/catch-all-filename.mjs`**, if installed:
     `node .claude/scripts/catch-all-filename.mjs <files>`. It flags a `types.ts`,
     `constants.ts`, `utils.ts`, `shared.ts`, or `helpers.ts` basename outright, the Catch-all
     files clause.
   - **Function length, as a candidate list and not a gate.** If the flat config keeps a
     diff-scoped ruleset behind a named export, ESLint's `--config` CLI flag reads only the
     default export and silently misses it. Load that export through the Node API instead, with
     its real name in place of `changedFilesConfig`. With no such export, cover length in step
     4's read instead of running this:

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

     Every `max-lines-per-function` warning is a candidate, never a finding on its own. Judge
     each one against the rule's own test, "past 20 to 30 lines, look again", meaning does it
     mix abstraction, or is it one task a split would only fragment.
3. If there is no ESLint config, or `catch-all-filename.mjs` is not installed, say which checker
   was missing and cover what it would have covered by reading.
4. Walk each changed hunk for what the checkers cannot see: a boolean not read as a predicate, an
   unexplained magic value, an unspelled abbreviation, an acronym written in all caps, an unused
   export, a speculative branch for a case the product does not have, a function doing two
   things a line count alone would not catch, an optional-flags parameter that is really two
   functions, and a name that needs a comment to explain it. Skip anything the rule scopes
   elsewhere, such as formatting, import order, comments, or design-level duplication. Those
   belong to the repo's linter, `code-comments.md`, and `design-principles.md`.
5. Return a `TIDY FINDINGS` list and nothing else, with no diff and no file contents. Each line
   is the file, the line, the rule clause, and a one-line fix. Mark a finding that renames an
   exported symbol as `EXPORT RENAME`, with the old name and the new name. A finding with no
   matching clause is not a finding, it is an opinion, and the subagent does not report
   opinions. After the list, name each checker warning it judged not worth acting on, with the
   reason.

## 4. Apply

Apply the fixes from the `TIDY FINDINGS` list. Open a file only to make an edit, and do not
re-walk the hunks. Fix the mechanical findings directly: local renames, extracted constants,
deleted dead code, and early returns. Do not touch anything outside the Naming, Function size,
Magic values, and Dead code sections. Performance, architecture, and reuse findings are out of
scope here. Leave those for `/review-change` where it is installed, and otherwise list them in
the step 5 report.

The one correctness risk is renaming an exported symbol. A textual rename can miss a caller and
silently break it. Check for `.claude/scripts/rename.mjs`:

- If it is installed, run each `EXPORT RENAME` through it rather than editing text by hand.
- If it is not installed, do not perform the rename. Propose it in the report instead, with the
  old name, the new name, and the file.

Local variable and parameter renames carry no such risk. Apply those directly.

## 5. Report

List what was fixed, each with the clause it violated and whether a checker or the subagent's
read found it. Then list what was deliberately left alone, each with the reason, such as a
40-line function that genuinely needs the length, or a checker warning judged not worth
splitting. Silent non-action reads as clean, so name it instead. Finally list any proposed
exported-symbol renames that need the `rename` module, or ran through it if installed.

Keep the report to findings and dispositions, not a restated diff. A reader wants to know what
changed and why, not to re-derive it from a wall of before-and-after code.
