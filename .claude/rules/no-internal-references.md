# No internal references in committed text

Committed text is read by people who have none of this session's context: package consumers, future contributors, and the design-system port. It covers READMEs, docs pages, CLAUDE.md files, code comments, changesets, test names, and playground copy.

## Rule, follow without deliberation

- **Never name a plan, phase, wave, slice, or ruling.** `.claude/plans/` is gitignored. A sentence like "phase 3 switches prime-ui onto these classes" means nothing to anyone outside this session and goes stale the day the plan closes.
- **Never name a pull request, branch, or commit as a future or pending event.** "#668 lands", "on branch `add-initial-prime-ui-components`", and "after the merge" describe the author's calendar, not the code. A PR number is acceptable only in a CHANGELOG line that `changesets` writes.
- **Never name a path outside this repository.** `~/Projects/app/prime`, a sibling checkout, or a home directory belongs to one machine. Name the published package or the public repository instead, such as `@viamrobotics/prime-core` or `viamrobotics/prime` on GitHub.
- **Never name the user, a teammate, or an internal handoff.** "Devin asked", "the Workbench handoff", and "the user's call" are transcript facts.
- **Never use process vocabulary.** "orchestrate", "worker", "subagent", "barrier", "seam", and "acceptance" describe how the change was made, not what the code does.
- **Describe what the code does today.** A forward-looking sentence about another package adopting this one is a plan, not documentation. Delete it, or write it as a present-tense fact once it is true.

## Why

The author has the plan open and the sentence reads fine. Everyone else sees a dangling reference to a file that does not exist in the repository. The one person who can decode it is the one person who does not need the docs.

## Check before calling committed text done

```
grep -rnIE '\.claude/plans|[Pp]hase [0-9]|\bwave\b|\bslice|#[0-9]{3}\b|~/Projects|Projects/app|handoff|/orchestrate|subagent' <changed files>
```

A hit outside `.claude/` and `CHANGELOG.md` is a defect to fix before reporting done.
