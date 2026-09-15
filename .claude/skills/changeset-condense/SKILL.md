---
name: changeset-condense
description: Condense pending changesets, consolidating redundant .changeset/*.md entries into one. Use when a later changeset supersedes, extends, or fixes an earlier one.
argument-hint: [id ...]
allowed-tools: Bash(node .claude/scripts/changeset-write.mjs:*), Bash(node .claude/scripts/changeset-gate.mjs:*), Bash(git status:*), Bash(git log:*), Read, Glob, Grep
---

Fold the pending changesets that describe one feature into one entry. Arguments (optional, limits
the pass to these ids): $ARGUMENTS

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
     step 1 of the `changeset` skill applied after the fact.
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
     of the `changeset` skill.
   - **A long-form survivor keeps its shape.** Some changesets are a multi-paragraph release note.
     `--amend` replaces the whole body, so pass the full rewritten note and edit only the part the
     group changed. A one-line summary here would discard everything else the note said.

   Watch for a survivor that enumerates. "Ships A and B" is not made false by a later entry adding
   C, but it is now an incomplete list, and that is the same defect one step quieter.

5. **Propose, then confirm.** For each group, print the ids, which one survives, the new summary,
   and one line on why they are one entry. Wait for approval. Absorbing deletes the other files,
   and a changeset that was never committed cannot be recovered.

6. **Execute**, one call per group.

   ```
   node .claude/scripts/changeset-write.mjs --amend <survivor> --absorb <id> [--absorb <id> ...] --summary "<new summary>"
   ```

   The survivor keeps its path and takes the union of every bump the group declared, at the highest
   level any of them named. The absorbed files are deleted. Never hand-edit a `.changeset/*.md`,
   never `rm` one, and never merge by writing a new changeset and deleting the originals. The
   script owns both the write and the delete.

7. **Check for package-set drift.** `node .claude/scripts/changeset-gate.mjs` flags a
   just-written survivor whose declared packages are missing one the current diff also touches.
   It also runs on its own as a Stop hook at the end of the turn, so this step surfaces the same
   finding immediately.
8. **Report** each surviving path, what it now declares, and which ids it absorbed. An absorbed
   changeset that was already committed shows up as a deletion in `git status`, which is expected
   and belongs in the same commit as the condense.

Finding nothing to merge is the common outcome and a good one. Report it and stop, rather than
forcing a merge to justify the pass.
