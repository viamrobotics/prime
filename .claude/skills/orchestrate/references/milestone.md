# Running a milestone step

A milestone is a directory under `.claude/plans/` that holds `MILESTONE.md` and member plans. A
step names member phases, its items, that run together and close on one check over the whole
tree. This file is what a step adds to the nested layer. Read `references/nested.md` first,
because every rule there holds per item, and this file states only where a step extends it.

## When this applies

`/orchestrate <milestone>` runs the step marked `IN PROGRESS`, or opens the first `TODO` step in
file order when none is. `/orchestrate <milestone>/<member> <phase>` runs one member phase the
ordinary way, as a plan with no step barrier, and needs nothing from this file. The milestone
session is the main conversation. No agent type is added for it, because the barrier's writes are
the ones the subagent guard refuses.

## The step

Run these in order, one step at a time:

1. **Lint.** Run `node .claude/scripts/plan-lint.mjs`. Stop on any error and show it.
2. **Gates.** Run `node .claude/scripts/plan-lint.mjs --gates .claude/plans/<milestone> <step>`
   and print its output. It is one line per gate blocking the step, as
   `G<n> · <state> · blocks <step>`, or `no gates block <step>`. Then stop on any `OPEN` gate and
   name it. The owner closes or waives it, and you write the line. Print the lines before the
   seam, because they are the owner's only sign that the step checked the gates it was told about.
   A line such as "running the step's preflight" names no gate and does not count.

3. **Seam.** Write what the step's `Seam` line names: each contract at its new version, and the
   held-path edits the items need before they start.
4. **Spawn.** Set the step `IN PROGRESS`. Do the pre-spawn pass for each item, then spawn one
   phase-orchestrator per item, all in one message, each with the brief below. An `owner` item
   runs flat here instead.
5. **Per report.** Relay each report per nested.md "The main conversation", and flip that member's
   `ROADMAP.md` line.
6. **Barrier.** When every item's `ROADMAP.md` line reads `DONE` or `DROPPED`, run the barrier
   below.
7. **Held writes.** Write the held paths the step owes.
8. **Flip and stop.** Set the step `Status: DONE (<date>)` and stop.

A step with no `Items` line is a scope line. Opening one stops before step 1 and asks the owner to
write its items. After the last step flips, set the `MILESTONE.md` header `DONE` and run
`/pr-description` if installed.

## Writes and when

nested.md "Ownership" holds per member: the `ROADMAP.md` line and the sub-plan header set
`IN PROGRESS` before that item's spawn, the `ROADMAP.md` `DONE` flip on its report, each with its
`## Log` line, `**Updated:**` bump, and lint run. A step adds three points:

- **Before any spawn:** the seam, meaning contract changes and held-path edits, then the step's
  `IN PROGRESS`. Lint rejects a member phase `IN PROGRESS` under a `TODO` step, so the step flips
  first.
- **Per report:** the member's `ROADMAP.md` line only.
- **At the barrier:** held paths, then the step's `DONE` with a `## Log` line in `MILESTONE.md`.

Held paths are the `## Held paths` list, plus `.changeset` and the ledgers in every milestone.

When the lockfile is held, member manifest dependency fields belong to the step's seam. The item
owns the rest of the file and lists a needed dependency under `Requests`.

**No phase-orchestrator writes a held path, and no worker under one does.** The excuse is "it is
one line in the lockfile, and my acceptance needs it". The answer is that a sibling in another
member reads that file mid-step, so the edit changes their build under them, and only the barrier
write is proven by the step's `Close`. An orchestrator whose slice needs a held path lists the
need under `Requests`, and you write it at the barrier. If its acceptance cannot pass without the
write, it returns `NEEDS_RULING` naming the path, and nested.md "The ruling round trip" carries
the owner's answer.

## The brief per item

nested.md "The brief, going down", with these lines set per item:

- `Plan: <milestone>/<member>`.
- `Phase:` the `N` of that member's `phase-N-<slug>.md`.
- `Domain:` copied from that phase file's `**Domain:**` header.
- `Siblings:` every other item in the step, whatever member it belongs to, in the labeled form
  nested.md "The ready set" defines. An `owner` item is listed too, since you edit its domain.
- `Seam:` the paths step 3 wrote.
- Constraint: with the lockfile held, the item edits no dependency field in a member manifest. It
  lists the need under `Requests`.

For an item `web/signup-form` in a step with `backend/signup-api`, the brief reads
`Plan: <milestone>/web` and `Siblings: backend/signup-api (<its Domain roots>)`.

## Workers

Run `wave-ceiling.mjs` once at the spawn and divide the figure across the step's items, as
nested.md "Workers" divides it across a ready set. An `owner` item counts as zero, so the nested
items split the whole figure. Its flat waves dispatch one worker at a time.

## An `owner` item

An item whose phase carries the `owner` signal needs the owner's input after it starts. It runs
flat here, §1 to §8, while the other items run nested. Spawn the nested items first, then start
its §1. Before each `AskUserQuestion` it raises, send every message owed to a nested
orchestrator, per nested.md "The ruling round trip".

Its §7 is the split barrier from nested.md "The barrier, split": the fixer and `/tidy` on its
`Domain` paths, then each slice's acceptance, and no package-wide verify. Siblings in other
members are mid-edit, so a package-wide run tests their half-finished work. You write its
`ROADMAP.md` line and sub-plan header as the flat layer does.

An item that cannot nest, per nested.md "A phase that cannot nest", runs flat after every other
item has returned, before the barrier. That covers an item whose phase carries `flat`. It counts
zero in the "Workers" division, as an `owner` item does.

## The barrier

Run it when every item is `DONE` or `DROPPED`, in this order:

1. Run the repo-wide fixer once, per nested.md "The barrier, split". When an item requested a held
   write that the barrier's own checks need, such as a root `lint:fix` script, write it before this
   first check and log it as requested. Then run the barrier in full. All other held writes stay
   after `Close`. Snapshot the barrier per `closing.md`, which sets the path and label.
2. Run each member's `Verify` command from the `## Members` table, one member at a time. These
   stand in for nested.md's `/verify-changed` run.
3. Run the step's `Close` alone. Alone means no phase-orchestrator is live, none owes a report
   after a residue message, and no background task of this session is running.
4. Write the held paths: the lockfile and other listed paths the step's `Requests` named, the
   changeset, and the ledger entries.
5. Set the step `DONE (<date>)` with its `## Log` line and lint.
6. Stop, as "Step boundary and `--auto`" says.

After any fix, rerun the barrier from its first check, because a fix in one member can break
another member's `Verify`.

## Failure at the barrier

Route by one test: did this session spawn the orchestrator whose `Domain` holds the failing file,
in this step, and does it still hold that agent id?

- **Yes.** Send the residue to that id by `SendMessage`, per nested.md "The barrier, split" and
  "Waiting for `finished`". Wait for its report, then rerun the barrier.
- **No.** Fix it here. This covers a file in a held path, a file in no item's `Domain`, a member
  whose phase is in another step, and an id lost to `/clear`. Then write one line in
  `MILESTONE.md` `## Log`, in this shape:

  ```
  - <date>: <step-slug> barrier fixed `<path>` in <milestone>/<member holding the file>, caused by <milestone>/<member>/<phase-slug>: <what changed>
  ```

  For example, a test in `apps/web` that the `backend/signup-api` contract change broke reads
  `fixed ... in <milestone>/web, caused by <milestone>/backend/signup-api`.

## Changesets and ledgers

Skip the changeset when `.claude/scripts/changeset-write.mjs` is absent, which means the
`changesets` plugin is not installed. Otherwise the milestone has one changeset, written through
`/changeset`. The first barrier creates it, naming every package any member touched so far, and
records its id in that barrier's `## Log` line. Each later barrier amends it:

```
node .claude/scripts/changeset-write.mjs --amend <id> --summary "<rewritten summary>" [--pkg <name>:<level> ...]
```

The summary describes the milestone as it now stands, and `--pkg` adds each package touched since
the last barrier.

Ledger entries wait for the barrier too, since the ledgers are held. Copy each report's
`Backlogged` and `Decide candidates` into the `## Log` line of its `DONE` flip, then run
`/backlog-add` and `/decide` for each at the barrier. When `/backlog-add`, `/decide`, or `/changeset` is
not installed, those items go in the step's `DONE` log line in `MILESTONE.md` and the report, never
into a member's sub-plan.

## Step boundary and `--auto`

Check-in mode stops after the flip for the owner's commit, and that commit is the resume point.
`--auto` opens the next step instead. It still stops at a next step with an `OPEN` gate, at a next
step with no `Items` line, and after the flip of any step whose barrier failed a check, so the
owner reads the fix before committing.

## Resume after `/clear`

Read `MILESTONE.md`'s `IN PROGRESS` step, then the `ROADMAP.md` of each member it names. Never
re-derive state from the transcript.

- Respawn only the items whose line is not `DONE` or `DROPPED`, each with the same brief, rebuilt
  from the step's `Items` and `Seam` lines and each phase's `Domain` header. A respawned
  orchestrator resumes from its sub-plan.
- When every item is `DONE` or `DROPPED`, run the barrier from its first check. The changeset id
  is in `## Log`, so a rerun amends instead of creating a second file.
- No agent id survives `/clear`, so every barrier failure after a resume takes the "No" branch.
