# The nested layer

Open this on every `/orchestrate` run without `--flat`. `SKILL.md` §4 names the default. This
carries the brief going down, the report coming up, the gates one layer down, and what the main
conversation does with each report. The `phase-orchestrator` agent runs the skill itself, one layer
down, and `agents/phase-orchestrator.md` carries only its delta over the skill.

## The brief, going down

One `Agent` call with `subagent_type: phase-orchestrator`, no `model` override, one phase per spawn.
The message is these lines, in this order, and nothing else. Never the plan text. The orchestrator
reads `.claude/plans/<slug>/` from disk, exactly as the skill does.

```
Plan: <slug>
Phase: <N>
Mode: check-in | auto
Gates: none | <ignored gate keys, comma-separated>
Domain: all | <path roots the orchestrator and its workers may write, comma-separated>
Siblings: none | <the domains of the other orchestrators in flight>
Seam: none | <paths the layer above wrote, comma-separated>
Workers: <n, optional: the wave ceiling for this orchestrator>
Ruling: <on a resume only: the answer to the last NEEDS_RULING, verbatim>
```

## The report, coming up

The first line is `PHASE <slug>/<N>: WAVE_CLOSED <n>/<total> | DONE | NEEDS_RULING | BLOCKED | PARTIAL`.
The sections follow in this order: `Status table`, `Landed`, `Verify`, `Ruling needed`,
`Rulings made`, `Backlogged`, `Out of scope`, `Requests`, `Decide candidates`, `Resume`. The format itself closes
`agents/phase-orchestrator.md`.

## Gates, one layer down

Each point where the skill stops for the user becomes a return. `RESLICE` and the two-round revise
cap stay nested, because they are the orchestrator's own calls, not the user's.

| Gate            | Where the skill stops today                                   | Nested status                                                                                               |
| --------------- | ------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `plan-tie`      | §0 step 4, two plans in flight and no slug                    | resolved above the spawn, since the brief carries `Plan:`. A `Plan:` with no workspace on disk is `BLOCKED` |
| `check-in`      | §8, between phases                                            | `DONE`, the pause lives at the main conversation                                                            |
| `blocked-slice` | §7, a slice marked `BLOCKED`                                  | `NEEDS_RULING`                                                                                              |
| `needs-context` | §5, a worker's `NEEDS_CONTEXT` the plan on disk cannot answer | `NEEDS_RULING`                                                                                              |
| `context-size`  | §8, past 300,000 tokens, before compaction near 364,000       | `PARTIAL`, after the current wave closes                                                                    |
| `depth-limit`   | preflight, `Agent` withheld from the orchestrator             | `BLOCKED`, naming `CLAUDE_CODE_MAX_SUBAGENT_SPAWN_DEPTH`                                                    |

## The main conversation

**Dispatch.** One `Agent` call with `subagent_type: phase-orchestrator`, no `model` override, and
the brief above. One phase per spawn. The agent id comes from the dispatcher's own `Agent` result.
Every later message to this orchestrator goes to that id with `SendMessage`.

**Relay.** Print `Status table` verbatim, with no prose over it. Put one line under it for anything
the columns cannot carry. Then act on the first line of the report:

- `WAVE_CLOSED`: send `continue` with `SendMessage` once the orchestrator's `finished` notice has
  arrived. Waiting for `finished`, below, says how to wait.
- `DONE`: run `/backlog-add` for each `Backlogged` entry, then `/decide` and `/pr-description` at
  this layer, from `Decide candidates`, with `/pr-description` after the last phase only. Under `all`, spawn the recomputed ready set
  (see Several orchestrators), one fresh brief each, in one message. Check-in mode stops for the user first. The fresh spawn doubles as the
  context-size gate, because the new orchestrator starts with an empty context.
- `NEEDS_RULING`: the round trip below.
- `PARTIAL`: spawn a fresh orchestrator with the same brief. It resumes from the plan workspace.
- `BLOCKED`: surface the report to the user. Never reword the cause. The one exception is a missing
  tool, routed as a phase that cannot nest, below.

**Waiting for `finished`.** Every `SendMessage` to an orchestrator that has handed back waits for
its `finished` notice. That covers a `continue`, a `Ruling:`, a changed seam path, and residue
after `DONE`. A message sent before the notice appears to stay inside the result that already
reported, and the orchestrator's next hand-back is refused. Send each message once per hand-back,
and fold a seam note into the `continue` it travels with.

A notice that lands while none of your tool calls is running does not wake you once the turn ends.
So never end a turn while such a message is owed. Wait with foreground `sleep 20` calls instead,
because a notice that lands during one arrives with its result. Claude Code refuses a long
standalone foreground sleep, so the wait is short calls repeated. After each one, check every
orchestrator that is owed a message. After 30 minutes with a
message still owed, stop waiting and tell the user which orchestrator reported and never
finished. The excuse is "the notice will wake me". The answer is that one did not, and an
`--auto` run sat idle until the user typed.

**The ruling round trip.** Before you open `AskUserQuestion`, send each message already owed to
another orchestrator whose `finished` notice has arrived, because the question blocks you until the
user answers. Relay `Ruling needed` verbatim through `AskUserQuestion`, with the
recommendation first. Never summarize it, because the orchestrator wrote the options with context
you do not have. Send the answer back as a `Ruling:` line with `SendMessage` to the same agent id.
Never respawn for a ruling, because the same id keeps its context.

**Interim notifications.** A notification saying the orchestrator awaits its own background work is
interim. Wait for its final report, because reviewing the interim one judges a phase that has not
finished. An interim notice after a delivered report may hide the next one. An orchestrator whose
hand-back answers that nothing was sent sends the same report with `SendMessage` instead, so read
the messages that arrived before you judge the phase still running.

**Preflight.** A `BLOCKED` report naming `CLAUDE_CODE_MAX_SUBAGENT_SPAWN_DEPTH` means the depth limit
withheld `Agent` from the orchestrator. Set the variable and spawn fresh with the same brief. A
re-brief changes nothing.

**A phase that cannot nest.** Two causes put a phase here. Its sub-plan carries `flat` on the
`**Signals:**` line, or its steps need a tool missing from the `tools:` line of
`.claude/agents/phase-orchestrator.md`, such as an MCP server's. Before any spawn, read each
sub-plan's `**Signals:**` line for `flat`. Grep the sub-plan for `mcp__` and compare each name
against that line. Hold that phase out of the spawn, and name it and the cause. Run the rest
nested. When the last orchestrator in flight returns, run the held phase flat here, §1 to §8 as
`--flat` does, before spawning anything else. That keeps its tool output out of this context while
relays are live, and its checks away from siblings' edits. A `BLOCKED` report naming a missing tool
is the same case found late, and takes the same route instead of stopping the run.
`orchestrate.orchestratorTools` in `.claude/houserules.config.json` lets a phase held for a missing tool nest after `npx houserules update`.

The `flat` cause holds these rules. Two flat phases run one at a time. A comma list holds a flat
phase out as it does a `live` one. `/orchestrate <slug> <n>` on a flat phase runs it here with no
spawn. `--flat` makes the signal moot. A `flat, live` phase has the main conversation start its
process before §1 and stop it after `DONE`.

## Several orchestrators

Run two or more orchestrators at once only when each phase fits a domain of its own. Dispatch them
in one message, one `Agent` call each, and keep every agent id. All the single-orchestrator rules
above hold per agent.

**Domains.** `Domain:` is the set of path roots an orchestrator and its workers may write. Draw
domains by the shared-resource rule in `slicing.md`, so no path root is in two domains. Name
everything two domains might both write, and keep it out of every domain: lockfiles, root config,
generated indexes, and the ledgers belong to the main conversation. `Siblings:` carries the other
orchestrators' domains, so a worker that finds a defect there reports it under `Out of scope` and
leaves it. A domain is a set of source paths. The plan workspace is never part of one.

**The ready set.** Under `all`, the dispatcher parses the `ROADMAP.md` phase lines and takes every
`TODO` phase whose `After` phases are all `DONE`. Absent `After` means the previous line, and
`none` means no wait. It spawns the whole ready set in one message. A phase with no `**Domain:**`
line, or with `live` or `flat` on its `**Signals:**` line, runs alone. It starts only when no other
phase is in flight, and nothing else spawns until it returns. A `live` phase reads a running process, such
as a dev server, that a sibling's edits would disturb. The main conversation starts that process
before the spawn, names its address in the brief, and stops it after `DONE`. A subagent never
starts it. After each `DONE` report the dispatcher recomputes
the ready set. `Domain:` is copied from the phase header, and `Siblings:` from the other spawns'
`Domain` headers. `Siblings:` keeps its meaning, the domains of the other live orchestrators, in
this plan or another. Inside one plan it needs no plan slug, because domains are paths. A milestone
step labels each entry with its item, as `web/signup-form (apps/web)`, so a finding there names the
plan that owns it (`references/milestone.md`). A comma list, `2,3`, is an
explicit set. The dispatcher refuses it before any spawn when a domain is missing or two overlap,
and names the overlap. A `live` phase in the list is held out and spawned alone once the rest have
returned.

**Workers.** Under `all`, the main conversation runs `node .claude/scripts/wave-ceiling.mjs` once and
divides `ceiling` across the ready set, at least one each. It sends each orchestrator its share as
`Workers:`. An absent line means the orchestrator runs the script itself.

**Ownership.** `ROADMAP.md` is the main conversation's: the `IN PROGRESS` flip before each spawn,
the `DONE` flip on each report, the `## Log` line, the `**Updated:**` bump, and the `plan-lint.mjs`
run after each. The pre-spawn pass sets the sub-plan header `IN PROGRESS` too, so the checker is
clean before the orchestrator exists. Reports arrive one at a time, so those runs are serial.
Each sub-plan is its orchestrator's from the spawn on, header included, whatever `Domain:` says.
Under `--flat`, and for a `flat` phase, the single layer writes
both files as `/plan-project` §5 says.

**The cross-domain seam.** Before dispatching either orchestrator, write what both domains depend
on and pass the paths on the `Seam:` line. That is shared types, route contracts, and config keys,
which is the skill's §2 one level up. A backend phase and the frontend phase that consumes it get
the API contract on disk first. Neither orchestrator edits the seam. A change one needs comes up as
a `Requests` line, and the main conversation applies it, then sends the other orchestrators whose
work it touches a `SendMessage` naming the changed path.

**The barrier, split.** Each orchestrator runs its §7 fixer and `/tidy` over its domain's paths,
then reruns each slice's acceptance command. That is its whole barrier. It runs no package-wide
verify, neither `/verify-changed` nor a `--filter` over its own packages. `/verify-changed` scopes
by `git diff`, so it pulls in siblings' packages. Two domains can also hold disjoint directories of
one package, and a package-wide run then tests a sibling's half-finished edits. Where `fix.filterFlag` is empty
and the fixer cannot scope by package, run the formatter and `eslint --fix` on the domain's paths
directly. Slice acceptances in sibling phases run concurrently. A build tool with no cross-process
lock can fail on shared build state, so an acceptance that fails on build state instead of a test
is rerun once alone before it is judged. After every orchestrator has returned `DONE`, the main
conversation runs the repo-wide fixer and `/verify-changed` once, or the repo's own verify when it
is not installed. That run is the only whole-tree proof. A failure there goes back to the
orchestrator whose domain holds the failing file, by `SendMessage` to its id with the residue,
because its context still holds the phase.

**The merged table.** Each time any orchestrator returns, print one table with a `Phase` column
first, carrying `<slug>/<N>` as in the report's first line, then every orchestrator's latest rows
verbatim:

```markdown
| Phase    | Slice            | Owns                  | State      |
| -------- | ---------------- | --------------------- | ---------- |
| api/1    | 1a route schema  | `packages/api/src/**` | ✅ done    |
| client/1 | 1a fetch wrapper | `packages/web/src/**` | 🔄 running |
```

An orchestrator that has not returned since the last printing keeps the rows it last returned.

**Rulings.** Relay each `NEEDS_RULING` tagged with its plan and phase, and resume only the agent
that asked, by its own id. The others keep running, and a `WAVE_CLOSED` from one gets its
`continue` without waiting on the ruling.

**Ledgers and lint.** The subagent write gate refuses ledger writes, so `Backlogged` entries and
`Decide candidates` travel up, and the dispatcher runs `/backlog-add` for each at its relay. An
orchestrator runs `plan-lint.mjs` after its own sub-plan writes, and the dispatcher runs it after
each `ROADMAP.md` write. The checker scans every
workspace and takes no path, so a finding in a sibling's workspace goes under `Out of scope`.
