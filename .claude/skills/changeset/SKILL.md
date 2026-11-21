---
name: changeset
description: Record a pending release note (changeset) for the packages a change touched. Use after completing a user-visible change, before the user commits. Also condenses pending changesets, consolidating redundant .changeset/*.md entries into one, when a later changeset supersedes, extends, or fixes an earlier one.
argument-hint: '[pkg[:level] ...] ["summary"] | condense [id ...]'
allowed-tools: Bash(node .claude/scripts/changeset-write.mjs:*), Bash(node .claude/scripts/changeset-gate.mjs:*), Bash(git status:*), Bash(git diff:*), Bash(git log:*), Read, Glob, Grep
---

Record what this change means for the next release. Arguments (optional overrides): $ARGUMENTS

**If you dispatched the `changeset-writer` subagent, its report is a recommendation, not a
completed write.** `changeset-write.mjs` is refused for any subagent by the repo's ledger write
gate, so the agent stops at package set, bump levels, summary, and the literal command. Run that
command yourself at step 5 below. Read its recommendation, sanity-check it against the diff, and
proceed from wherever the numbered steps below still apply, usually straight to step 5.

**One changeset per feature, not one per change.** A feature is usually built over several
turns, and each turn is not its own release note. Read the release notes a user will see: one
feature is one bullet there, however many commits it took.

1. **Survey what is already pending.** Glob `.changeset/*.md` and read them. For each, ask
   whether this change is part of the feature that changeset already describes.
   - **Already covered, and its summary still describes the feature.** Record nothing. Report
     which file covers it and stop. This is the common case on a feature's second turn.
   - **Covered, but the summary is now wrong or the package set grew.** Amend it in place with
     step 5's `--amend`. Do not add a second file.
   - **A genuinely separate feature.** Write a new changeset.

   The test is whether a reader needs both bullets. If the second one only extends, refines, or
   fixes the first, it is the same feature. Two features shipped in the same session are two
   changesets, and that is what `--amend` is not for. When several pending changesets already
   describe one tangled feature, follow the Condense section below instead of amending them
   one at a time.

2. **Identify touched packages.** `git status --porcelain` and `git diff --name-only`, mapped
   through the targets in `.claude/houserules.config.json`.
3. **Pick the bump level per package** (semver):
   - `patch`: fixes, internal refactors with no API change. The default.
   - `minor`: new user-facing capability, backward-compatible.
   - `major`: breaking change. **Propose a major and get the user's answer before writing it.**
4. **Write the summary.** This is the canonical spec, and the `changeset-writer` agent follows it
   too.
   - **One short sentence**, 15 words or fewer, in changelog voice, naming what changed as the
     package's users read it.
   - Describe the change, not its mechanism, its rationale, or what stayed the same.
   - When amending, write the sentence for the whole feature as it now stands, not for the part
     you just added. The old summary is replaced, so it has to cover everything.
   - No semicolons and no second clause. "So that…", "whenever…", "because…", and ", and also…"
     all mean you are packing in too much. A run-on is still too much even when it's one sentence.
   - Use exact names and numbers from the diff, not from memory.
   - Never put a ledger id in the summary. The summary ships in the public CHANGELOG, and a
     backlog or decision id resolves only against the local ledger. Name what was fixed in
     plain words instead.

   Good: `Fix compact tool output hook to reduce noise.`

   Too much: `changeset-write.mjs now authors with @changesets/write whenever changesets is
installed, so files match the version; the zero-dep writer remains as fallback.`
   → `Changeset authoring uses the repo's installed changesets writer when available.`

5. **Record it.** The script validates package names against the real workspace.

   ```
   node .claude/scripts/changeset-write.mjs --pkg <name>:<level> [--pkg <name>:<level> ...] --summary "<summary>" --chat <session-id>
   ```

   Pass the current session's id as `--chat` when you know it. It stamps the outcome
   record that links the changeset to its session, and it is safe to omit.

   To fold this change into a pending changeset instead, name it with `--amend`:

   ```
   node .claude/scripts/changeset-write.mjs --amend <id> --summary "<rewritten summary>" [--pkg <name>:<level> ...]
   ```

   `--amend` rewrites that one file in place. The bumps it already declares are kept, and a
   `--pkg` for a package it already names raises the level but never lowers it, so pass only what
   the pending file is missing.

   Nothing release-worthy (tests, tooling, docs)? Record that decision instead:

   ```
   node .claude/scripts/changeset-write.mjs --empty --summary "<why no release is needed>"
   ```

6. **Check for package-set drift.** `node .claude/scripts/changeset-gate.mjs` flags a
   just-written changeset whose declared packages are missing one the current diff also
   touches. It also runs on its own as a Stop hook at the end of the turn, so this step just
   surfaces the same finding immediately instead of waiting for it. If it reports drift, add
   the missing package with `--amend` and re-run it.
7. **Report** the `.changeset/*.md` path and what it declares, and say whether you created it or
   amended it.

Never hand-edit `CHANGELOG.md`, which `changeset version` generates at release time, and never
hand-write or hand-edit `.changeset/*.md`. Always go through the script.

## Condense

Fold the pending changesets that describe one feature into one entry. Ask for it with
`/changeset condense [id ...]` or a plain request such as "condense the pending changesets". The
optional ids limit the pass to those files. Skip steps 1 to 7 above and follow these instead.

Everything in `.changeset/` ships in the same release. Two pending entries for the same work both
reach the changelog, and when the later one changed what the earlier one described, the earlier
bullet announces something no user ever saw.

1. **Read the whole pending set.** Glob `.changeset/*.md` and read every one, skipping
   `config.json` and `README.md`. Fewer than two means there is nothing to condense, so report that
   and stop.
2. **Group them.** For each pair, ask whether a reader of the release notes needs both bullets.
   Merge when one of these holds.
   - **The later one supersedes the earlier.** It changed what the earlier one described, so that
     sentence is now false. "Adds an `x` flag" plus "Renames `x` to `y`" is one entry, "Adds a `y`
     flag". The flag called `x` never existed for a user.
   - **The later one extends or refines the earlier.** One feature built over more turns. This is
     step 1 above applied after the fact.
   - **The later one fixes something unreleased.** The bug lives only in another pending
     changeset's work, so it never reached a user and it is not its own bullet.
   - **A release-free entry is now wrong.** Work recorded with `--empty` as needing no release, and
     a later changeset releases it after all. Absorb the empty one into the entry that describes
     the release.

   Leave them alone otherwise. Two entries that touch the same package, the same file, or the same
   subsystem are still two entries when a reader needs both. Same file is not the test. Needing
   both bullets is. When two summaries are ambiguous, read what landed with each one:
   `git log --diff-filter=A --format='%h %ad %s' -- .changeset/` gives the order they were added.

3. **Pick the survivor.** The earliest changeset of the group, so the file with the longest review
   history is the one that stays. Anything untracked is newer than everything tracked.
4. **Write the summary for the feature as it now stands.** Not for the survivor alone, and not the
   old summaries concatenated. Every summary in the group is replaced, so the new one has to cover
   all of them.
   - **A one-sentence survivor stays one sentence.** 15 words or fewer, under the rules in step 4
     above.
   - **A long-form survivor keeps its shape.** Some changesets are a multi-paragraph release note.
     `--amend` replaces the whole body, so pass the full rewritten note and edit only the part the
     group changed. A one-line summary here would discard everything else the note said.

   Watch for a survivor that enumerates. "Ships A and B" is not made false by a later entry adding
   C, but it is now an incomplete list, and that is the same defect one step quieter.

5. **Propose, then confirm.** For each group, print the ids, which one survives, the new summary,
   and one line on why they are one entry. Wait for the user's answer before running `--absorb`. Absorbing deletes the other files,
   and a changeset that was never committed cannot be recovered.
6. **Execute**, one call per group.

   ```
   node .claude/scripts/changeset-write.mjs --amend <survivor> --absorb <id> [--absorb <id> ...] --summary "<new summary>"
   ```

   The survivor keeps its path and takes the union of every bump the group declared, at the highest
   level any of them named. The absorbed files are deleted. Never hand-edit a `.changeset/*.md`,
   never `rm` one, and never merge by writing a new changeset and deleting the originals. The
   script owns both the write and the delete.

7. **Check for package-set drift** with `node .claude/scripts/changeset-gate.mjs`, as in step 6
   above. It flags a just-written survivor whose declared packages are missing one the current
   diff also touches.
8. **Report** each surviving path, what it now declares, and which ids it absorbed. An absorbed
   changeset that was already committed shows up as a deletion in `git status`, which is expected
   and belongs in the same commit as the condense.

Finding nothing to merge is the common outcome and a good one. Report it and stop, rather than
forcing a merge to justify the pass.
