---
paths:
  - ".changeset/**"
---

# PR Description Format

Follow the structure and tone used in this repository. PR descriptions are technical documents aimed at reviewers who already know the codebase — be precise, not verbose. Do not use em dashes. Use American English.

## Opening Paragraph

One to two sentences summarizing **what** the PR adds or changes and **why** it matters. Mention the user-facing capability, not implementation details.

```
Adds a `ghost` variant to Button so consumers can use a tertiary button style
that matches the design system's low-emphasis treatment.
```

## Layer-by-Layer Breakdown

Break changes into sections that match the architecture layers they touch. Use headings that match the actual layers in the affected package(s); common ones below. Omit any section with no changes.

| Heading        | What it covers                                           |
| -------------- | -------------------------------------------------------- |
| **Components** | Changes to `.svelte` components in `packages/<pkg>/src/` |
| **Primitives** | Changes to headless primitives or shared building blocks |
| **Types**      | New or changed exported types in a package's public API  |
| **Tests**      | New or changed test files                                |

Within each section:

- Use a bulleted list.
- Each bullet starts with the symbol being changed (component, primitive, prop, type) in backticks or bold, then describes **what** changed.
- Be specific: name the new component, the new export, the changed prop — don't just say "updated the package".
- Keep bullets to one or two sentences.

```markdown
### Components

- `Button` adds a `variant="ghost"` value and updates focus styles for it.
- `IconButton` re-exports the new variant through its `variant` prop.
```

## Why?

Include a **Why?** section when the PR involves non-obvious design decisions. Format each decision as a bold question followed by a paragraph answer.

```markdown
### Why?

**Why a new variant instead of a `subtle` prop?**

The design system treats variant as a single closed enum so that visual treatments stay consistent across the library. ...
```

Skip this section for straightforward PRs where the "what" is self-explanatory.

## Testing

End with a **Testing** section listing which test suites were run and any new tests added.

```markdown
### Testing

Ran `pnpm --filter @viamrobotics/<pkg> test` and `pnpm lint`. Added a new spec for the ghost variant focus state.
```

Name the specific test commands — don't just say "tests pass".

## Style Rules

- Use `###` (h3) for each section heading.
- Use GitHub-flavoured Markdown — backtick-fenced code, bullet lists, bold.
- Do **not** add a `## Summary` or `## Description` wrapper heading; the opening paragraph stands on its own.
- Do **not** include auto-generated changelogs, file lists, or diff stats — reviewers can see those in the Files tab.
- Keep the tone direct and technical. Write in first person when explaining rationale ("I tested this with..."). Use present tense for describing behaviour ("`Button` adds...").
- When renaming or deprecating something, call out both the old and new names explicitly.
- If the PR depends on or stacks on another PR, note the base branch and link the parent PR in the opening paragraph.
