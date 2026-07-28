import { structuredPatch } from "diff";

/**
 * Unified diff for the `doctor` report. `-` lines are on disk, `+` lines are canonical
 * (what `--fix` would write). Human-facing only, never compared or applied.
 */
export function unifiedDiff(from: string, to: string, context = 3): string {
  const { hunks } = structuredPatch("", "", from, to, "", "", { context });
  return hunks
    .flatMap((hunk) => [
      `@@ -${hunk.oldStart},${hunk.oldLines} +${hunk.newStart},${hunk.newLines} @@`,
      ...hunk.lines,
    ])
    .join("\n");
}
