---
name: debug-session
description: Hypothesis-driven debugging for bugs, with structured trace logging under .claude/debug/. Use when a bug's cause is non-obvious and print statements are about to be sprinkled in.
argument-hint: <bug description>
allowed-tools: Read, Edit, Write, Grep, Glob, Bash
---

Systematically debug: **$ARGUMENTS**

Three things make this cheaper than scattershot `console.log`. Hypotheses come first, every trace
line is machine-readable and tagged, and **every edit you make is removed at the end**. The tag
`CLAUDE-DEBUG` is the contract. It goes on every line you touch, so cleanup is a mechanical grep
rather than a memory exercise.

## 1. Frame the investigation

- Restate the bug in one line: the observed behavior, the expected behavior, and the exact trigger
  (route, command, input) that reproduces it.
- Write **1–3 explicit, falsifiable hypotheses**, labeled `H1`, `H2`, `H3`. Each must name a
  suspected cause _and_ the observation that would confirm or reject it. "Something's off in auth"
  is not a hypothesis. "H1: the session token is null by the time `requireUser` runs" is.
- Say which hypothesis you'll test first and why. Don't instrument everything at once.

## 2. Open the session log

One JSONL file per investigation: `.claude/debug/<slug>.jsonl`, where `<slug>` is a short kebab of
the bug, such as `login-500`. Create the dir if needed:

```
mkdir -p .claude/debug
```

`.claude/debug/` is self-gitignored, so logs never enter a commit. Write one JSON object per line.
Always include `hyp` (which hypothesis) and `at` (a trace-point label), plus whatever you're
observing:

```
{"hyp":"H1","at":"requireUser.entry","token":null,"path":"/dashboard"}
{"hyp":"H1","at":"session.load","found":false,"sid":"abc"}
```

## 3. Instrument to test the current hypothesis

Add trace lines that emit to the session log. **Tag every added line, and any added import or
helper, with `CLAUDE-DEBUG`.** That tag is what makes step 9 complete and verifiable.

For JS and TS, inline the fs/json call so the whole emit is one tagged line to delete:

<!-- prettier-ignore -->
```js
require('node:fs').appendFileSync('.claude/debug/login-500.jsonl', JSON.stringify({hyp:'H1', at:'requireUser.entry', token})+'\n'); // CLAUDE-DEBUG
```

Python:

```python
open('.claude/debug/login-500.jsonl','a').write(__import__('json').dumps({'hyp':'H1','at':'require_user.entry','token':token})+'\n')  # CLAUDE-DEBUG
```

In other languages, write one self-contained tagged line per emit that appends a JSON object and a
newline to the same file.

Rules that keep this clean:

- Keep each emit to one self-contained tagged line, so removal is a single-line delete. If you must
  add an import or helper instead of inlining, tag it `CLAUDE-DEBUG` too.
- The path is relative to the repo root. If the process runs from another CWD, use the absolute repo
  path instead.
- Instrument the _decision points_ your hypothesis is about, such as entry, branch taken, or value
  at a boundary. Not every line. Log the values that would distinguish confirm from reject.

## 4. Reproduce

Run the exact trigger to emit fresh logs: start the server and hit the route, run the failing test,
or invoke the command. Truncate the log between runs if a clean slate helps:
`: > .claude/debug/<slug>.jsonl`.

## 5. Read the evidence with `jq`

Query the log instead of eyeballing it. That's why it's structured.

```
jq -c 'select(.hyp=="H1")' .claude/debug/<slug>.jsonl        # all H1 evidence
jq -r '.hyp' .claude/debug/<slug>.jsonl | sort | uniq -c     # how much fired, per hypothesis
jq -c 'select(.hyp=="H1") | {at, token, found}' .claude/debug/<slug>.jsonl   # just the deciding fields
tail -n 20 .claude/debug/<slug>.jsonl | jq -c .              # the last events before the failure
```

For each hypothesis, state a verdict from the output: **confirmed**, **rejected**, or **supported,
not conclusive**. Quote the log line that decides it.

## 6. Loop

- Rejected a hypothesis? Move to the next, or form a new one from what the evidence revealed.
- Confirmed the mechanism but not the root cause? Push instrumentation one level deeper, up the call
  stack, into the dependency, or earlier in the lifecycle, and repeat from step 3.
- Continue until you've found a **root cause** or resolved every hypothesis. If all are rejected, say
  so plainly and propose the next hypotheses rather than guessing at a fix.

## 7. Review with the user

Before touching a fix, report the root cause, the evidence with the deciding log lines quoted, and
which hypotheses were confirmed or rejected. Let the user react. They may know context that reframes
it.

## 8. Propose the fix

Describe the minimal fix and **confirm before applying it.** The fix is real source. The
instrumentation is not. Keep them separate, and don't smuggle a fix into the debugging edits.

## 9. Remove ALL instrumentation

Once the user confirms the issue is resolved, or asks you to clean up, leave nothing orphaned:

1. Find every tagged edit:
   ```
   git grep -n --untracked CLAUDE-DEBUG -- ':!.claude'
   ```
2. Remove each one. Delete tagged lines, restore any line you modified, and delete any helper file
   you created solely for tracing.
3. **Verify zero remain.** This is the acceptance check, and the command must print nothing:
   ```
   git grep -n --untracked CLAUDE-DEBUG -- ':!.claude'
   ```
4. Clear the session log with `rm .claude/debug/<slug>.jsonl`, leaving `.claude/debug/.gitignore` in
   place.

The `.claude/debug/` directory should only ever hold _active_ investigations. If you're pausing an
investigation to resume later, leave the log and the tagged instrumentation in place. The
SessionStart reminder will flag both next session, so nothing is silently shipped.
