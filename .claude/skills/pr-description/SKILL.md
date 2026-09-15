---
name: pr-description
description: Write the pull request description for a change as a pasteable markdown body. Use before opening or updating a PR, or when asked for a PR body, PR summary, or gh pr create text.
argument-hint: [base-branch]
allowed-tools: Bash(git diff:*), Bash(git log:*), Bash(git status:*), Bash(node .claude/scripts/pr-description-lint.mjs:*), Read, Glob, Grep
---

Write the pull request description for the current change. Base branch, if given: $ARGUMENTS

A PR description is a technical document for a reviewer who already knows this codebase. Be
precise, not verbose. They have the Files tab, so never restate what the diff already shows.

## 1. Read the change first

Do not write from memory of the session. Read what is actually on the branch.

```
git diff --name-only <base>...HEAD
git log --oneline <base>...HEAD
```

Default `<base>` to the repo's main branch when the argument is absent. Then read the hunks
that matter with `git diff <base>...HEAD -- <path>`, narrowing to the files whose change you
cannot describe from the name alone. A description written from the session transcript
describes what you meant to do. The diff is what you did.

## 2. Output format

Return the finished description as raw markdown inside a fenced code block, so it pastes
straight into the GitHub PR body. When the description itself contains fenced code, use four
or more backticks for the outer fence.

Create or update the PR yourself **only when asked**, for example "open the PR". Then pass the
markdown as the body instead of printing it.

## 3. The sections

### Opening paragraph

One or two sentences on **what** the PR changes and **why** it matters. Name the user-facing
capability, not the implementation. It stands on its own, with no `## Summary` or
`## Description` wrapper heading.

```
Adds a `ghost` variant to Button so consumers can use a tertiary button style that matches
the design system's low-emphasis treatment.
```

If the PR stacks on another, note the base branch and link the parent PR here.

### One section per layer the PR touches

Use the architecture layers **this repo actually has**, and omit any layer the PR does not
touch. Read the layout section of `CLAUDE.md`, or the `targets` in `.claude/houserules.config.json`,
to find out what those layers are called here. Do not import a layer vocabulary from another
repo, and do not invent a section to look thorough.

Each bullet opens with the changed symbol in backticks or bold, then says what changed in one
or two sentences. Name the export, the prop, or the type. Never "updated the package".

The headings below are one repo's answer, shown for shape only:

```markdown
### Components

- `Button` adds a `variant="ghost"` value and updates focus styles for it.
- `IconButton` re-exports the new variant through its `variant` prop.

### Types

- `ButtonVariant` gains `'ghost'`.
```

### Why?

Include this **only** when the PR makes a decision a reviewer would question. Each decision is
a bold question followed by a short paragraph.

```markdown
### Why?

**Why a new variant instead of a `subtle` prop?**

The design system treats variant as a single closed enum so visual treatments stay consistent
across the library. A second axis would let the two drift.
```

Skip the section entirely when every decision is obvious. An empty rationale section trains
reviewers to skip the real ones.

### Testing

Always last. Name the exact commands you ran and any tests you added. "Tests pass" is not
enough, because it does not say what ran.

Use this repo's own verify commands. If the `verify-changed` module is installed, they are the
`verifyCommands` in `.claude/houserules.config.json`. Otherwise read the scripts in `package.json`.

```markdown
### Testing

Ran `pnpm --filter @scope/button test` and `pnpm lint`. Added a spec for the ghost variant's
focus state.
```

## 4. Style

- `###` for every section heading. GitHub-flavored markdown: fenced code, bullets, bold.
- Present tense for behavior (`Button` adds…). First person for rationale (I tested this with…).
- Name both the old and the new name when renaming or deprecating.
- No auto-generated changelogs, file lists, or diff stats.
- For sentence-level voice, follow `.claude/rules/prose-voice.md` if that rule is installed.

## 5. Check it

Before returning the fenced body, pipe it through the checker:

```
node .claude/scripts/pr-description-lint.mjs <<'EOF'
<the fenced markdown you drafted>
EOF
```

It catches the structural clauses above: the fenced wrapper, banned phrases, changelog-shaped
dumps, whether Testing quotes this repo's own verify commands, and headings that name no
configured layer. Fix any error finding and redraft before returning the body. A warn finding
is worth a second look but is not a redraft on its own. It does not read intent, tense, or
whether a decision was worth a Why section. Those stay yours to judge.
