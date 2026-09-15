---
paths:
  - '**/*.md'
  # `**` does not reliably descend into dot-directories, so name the ones that
  # hold agent-authored prose.
  - '.changeset/*.md'
  - '.claude/**/*.md'
  - '.github/**/*.md'
  # Source extensions mirror `code-comments.md`, because a code comment is prose
  # this rule governs. Without these the comment rule points at a rule that is
  # not loaded whenever the file in play is source rather than markdown.
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

# Prose Voice

How to write the prose you author: changesets, plans, backlog entries, docs, READMEs,
commit and PR bodies, review comments, and the sentences inside code comments. Whether a
code comment should exist at all is a separate question. See `code-comments.md` if that
rule is installed.

This governs prose you write. It does not govern prose you are quoting, or text you are
editing on the user's behalf in their voice.

## Rule — follow without deliberation

- **Write plain sentences.** Subject, verb, object. A sentence that needs to be re-read to
  parse should be split into two.
- **One idea per sentence.** Two ideas are two sentences.
- **Avoid em dashes.** An em dash is almost always a comma, a period, or a sentence that
  reads better rewritten. Rewrite first. Keep one only when the aside genuinely interrupts
  and no other punctuation carries it, and never more than one per paragraph. Whether a
  surviving em dash is genuinely unreplaceable is still a judgment call. Only the count is
  checked.
- **No semicolons.** Enforced by the checker below, not a judgment call.
- **One aside per sentence, or none.** Do not stack parentheses, dashes, and subordinate
  clauses in the same sentence.
- **Cut filler.** Delete "essentially", "in order to", "it's worth noting", "it should be
  noted that", "simply", "just", "actually", "basically". Reread the sentence. It means the
  same thing.
- **Say it once.** If a rule lives somewhere already, link to it. Do not restate it in your
  own words, because the two copies drift.
- **Prefer the concrete.** Name the file, the command, the count. "Fails on empty input"
  beats "does not handle certain edge cases well".
- **Never reword exact content.** Code, commands, file paths, URLs, identifiers, error
  messages, and version numbers are copied byte for byte.
- **American English.** `color`, `gray`, `center`, `behavior`, `analyze`, `labeled`,
  `license`, `-ize`. British spellings already in the tree are debt, not a convention to
  match. A third party's identifier is exact content and keeps its spelling.

## Checked mechanically

`prose-lint.mjs` enforces the semicolon clause, counts em dashes per paragraph, and flags
British spellings from a fixed word list, each with its American form. Run it over a file
before you call it done. It never rules on whether a surviving em dash earns its keep, on
filler, asides, or concreteness, or on a spelling the list does not name. Those stay a
human read.

## Prose that instructs an agent

Rules, skills, agent prompts, and briefs are prose that shapes behavior, and the form does
the shaping. Classify the failure you are writing against before choosing a form:

- **The reader knows the rule and skips it under pressure.** Write a prohibition, and pair
  it with the observed excuses and their answers. Soft guidance reads as optional exactly
  when it is needed most.
- **The reader complies, but the output has the wrong shape.** Write a recipe that states
  what the output IS, its parts in order. A prohibition list invites negotiating with each
  item, and the negotiation usually wins.
- **A real exception exists.** Write it as its own conditional on an observable predicate,
  "if the brief exists, reference it". A nuance clause, "unless it matters", reopens the
  negotiation the rule was meant to close.

This split comes from external wording tests, not from measurements in this repo. Treat it
as the default form choice, not a law.

## Precision outranks brevity

Cutting words is not the goal. Clarity is. If removing a qualifier changes what the
sentence claims, keep the qualifier. If a reader needs the reason behind a rule to
follow it, give the reason in a sentence. A rule with no stated reason gets argued with.

## Examples

**Punctuation doing work that sentences should do:**

> The plan lives on disk, not in the transcript — that is what makes resuming a grep;
> re-deriving scope from scrollback (which is expensive, and often wrong) is the failure
> this replaces.

Rewritten:

> The plan lives on disk, not in the transcript. Resuming is a grep instead of a
> re-derivation from scrollback, which is expensive and often wrong.

**Filler and hedging:**

> It's worth noting that this will essentially just fail in certain cases.

Rewritten:

> This fails when the config file is missing.

**Two ideas fused into one sentence:**

> Mark the slice `DISPATCHED` before you send — a table that lags the truth is worse than
> no table at all.

Rewritten:

> Mark the slice `DISPATCHED` before you send. A table that lags the truth is worse than no
> table.
