---
paths:
  - ".changeset/**"
---

# PR Description Format

PR descriptions are technical documents for reviewers who already know the codebase. Be precise, not verbose. American English, no em dashes.

## Output

Return the finished description as raw markdown wrapped in a fenced code block so it pastes straight into the GitHub PR body. If the description itself contains code fences, use four or more backticks for the outer fence.

Create or update the PR yourself only when the user asks (for example `gh pr create`). Then pass the markdown as the PR body instead of printing it.

## Opening Paragraph

One or two sentences on **what** the PR changes and **why** it matters. Name the user-facing capability, not the implementation. It stands on its own, with no `## Summary` or `## Description` wrapper heading.

```
Adds a `ghost` variant to Button so consumers can use a tertiary button style
that matches the design system's low-emphasis treatment.
```

## Layer Sections

One section per architecture layer the PR touches, using the layers that exist in the affected packages. Omit sections with no changes. Common headings:

| Heading        | What it covers                                           |
| -------------- | -------------------------------------------------------- |
| **Components** | Changes to `.svelte` components in `packages/<pkg>/src/` |
| **Primitives** | Changes to headless primitives or shared building blocks |
| **Types**      | New or changed exported types in a package's public API  |
| **Tests**      | New or changed test files                                |

Each bullet opens with the changed symbol (component, primitive, prop, type) in backticks or bold, then says what changed in one or two sentences. Name the export or prop, never just "updated the package".

```markdown
### Components

- `Button` adds a `variant="ghost"` value and updates focus styles for it.
- `IconButton` re-exports the new variant through its `variant` prop.
```

## Why?

Include this section only when the PR makes non-obvious design decisions. Each decision is a bold question followed by a paragraph.

```markdown
### Why?

**Why a new variant instead of a `subtle` prop?**

The design system treats variant as a single closed enum so that visual treatments stay consistent across the library. ...
```

## Testing

Always last. Name the exact commands run and any tests added. "Tests pass" is not enough.

```markdown
### Testing

Ran `pnpm --filter @viamrobotics/<pkg> test` and `pnpm lint`. Added a new spec for the ghost variant focus state.
```

## Style

- `###` (h3) for every section heading. GitHub-flavored Markdown: fenced code, bullets, bold.
- No auto-generated changelogs, file lists, or diff stats. Reviewers have the Files tab.
- Direct and technical. First person for rationale ("I tested this with..."), present tense for behavior ("`Button` adds...").
- Name both the old and the new name when renaming or deprecating.
- If the PR stacks on another, note the base branch and link the parent PR in the opening paragraph.
