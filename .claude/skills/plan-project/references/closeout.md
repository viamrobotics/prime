# Writing a closeout phase

A closeout phase is the last phase of a plan. It turns the plan's finished work into the artifacts
a person needs to merge it: an acceptance checklist, the `Closes` lines, a pull request
description, and the plan's report when the plan has one. One agent does it as one ordered job.

The failure this recipe answers is a closeout written fresh each time, with hand-typed issue lists
and a gate run inside the worker. Produce these parts, in this order:

1. the sub-plan header,
2. the Objective,
3. the steps.

## The header

Set `**Signals:** flat`, so `/orchestrate` runs the phase in the dispatcher's own context and hands
the one slice to the `closeout-worker` agent where installed. Set the Domain to the workspace's
closeout paths: `.claude/plans/<slug>/closeout/`, plus `<workspace>/draft.md` when the plan has a
report. Name `closeout-worker` as the slice's agent.

## The Objective

One done clause the checklist can carry. Name the artifacts that exist at the end: the checklist,
the Closes file, the pull request description, and the report when there is one.

## The steps

The dispatcher runs the whole-tree gates into `closeout/gates.txt` before it dispatches the
worker. The worker reads that file and never runs a gate or the fixer. Write these steps, each with
the `Acceptance:` text given here:

1. Read `closeout/gates.txt`. Report any failing gate and stop short of claiming a pass.
   Acceptance: the return names every gate in the file and its result.
2. Run `node .claude/scripts/closeout.mjs checklist <workspace>` and write its output to
   `closeout/acceptance-checklist.md`.
   Acceptance: `closeout/acceptance-checklist.md` has one `## Phase` section per ROADMAP phase.
3. Run `node .claude/scripts/closeout.mjs closes <workspace>` and write its stdout to
   `closeout/closes.md`. The command exits 1 on a malformed `**Closes:**` line. Report that
   line and fix nothing.
   Acceptance: `closeout.mjs closes` exits 0 and `closeout/closes.md` holds its stdout.
4. Draft `closeout/pr-description.md`, ending in the lines from `closeout/closes.md`. When
   `.claude/skills/pr-description/SKILL.md` exists, read it as a file and follow it, because the
   worker has no `Skill` tool. Otherwise write a short summary and the checklist.
   Acceptance: the file's last lines are the lines of `closeout/closes.md`, unchanged.
5. Draft any issue comment the `Closes` lines cannot carry, such as a duplicate note, into
   `closeout/close-comments.md`. Skip the file when there is none.
   Acceptance: each comment names its issue number, or the file is absent.
6. When the plan has a report, write its draft to `<workspace>/draft.md`, beside where the report
   will be installed, and run `node .claude/scripts/closeout.mjs sources <workspace>/draft.md`. Fix
   every flagged path. Return the draft's path and its sha256 from `shasum -a 256`. The harness
   refuses a subagent's `Write` of a report-named file such as `REPORT.md` at every depth, and it
   accepts `draft.md`. The dispatcher asks the user, then moves the draft to `<workspace>/REPORT.md`
   and checks the sha256. If the `Write` of `draft.md` is refused too, return the draft as text
   between the marker lines `<<<REPORT.md` and `REPORT.md>>>` instead, and the dispatcher extracts
   it with a script.
   Acceptance: `closeout.mjs sources` exits 0 on the draft, and the returned sha256 matches the
   draft's.
7. Return the decide candidates and the backlog rows as lines. The dispatcher records them, because
   a worker never writes a ledger.
   Acceptance: the return has both lists, each line or "none".

The dispatcher hands the description over and flips the ROADMAP. The worker does neither.
