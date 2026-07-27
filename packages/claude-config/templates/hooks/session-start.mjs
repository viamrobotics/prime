#!/usr/bin/env node
// SessionStart hook (@viamrobotics/claude-config): a tiny git orientation header so the agent skips a full `git status`. Keep stdout small.

import { execFileSync } from "node:child_process";

// Returns RAW output — `git status --porcelain` lines are position-sensitive
// (2 status chars + space); a global trim would eat the first line's prefix.
function git(args) {
  try {
    return execFileSync("git", args, {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    });
  } catch {
    return null;
  }
}

try {
  const root = git(["rev-parse", "--show-toplevel"])?.trim();
  if (root) {
    const lines = [];
    const branch = git(["rev-parse", "--abbrev-ref", "HEAD"])?.trim();
    let tracking = "";
    const counts = git(["rev-list", "--left-right", "--count", "@{upstream}...HEAD"])?.trim();
    if (counts) {
      const [behind, ahead] = counts.split(/\s+/).map(Number);
      const bits = [ahead ? `ahead ${ahead}` : null, behind ? `behind ${behind}` : null].filter(
        Boolean,
      );
      if (bits.length > 0) tracking = ` (${bits.join(", ")})`;
    }
    lines.push(`[repo] branch: ${branch ?? "(no commits yet)"}${tracking}`);

    const status = git(["status", "--porcelain"]) ?? "";
    const changed = status
      .split("\n")
      .filter(Boolean)
      .map((l) => l.slice(3).trim());
    if (changed.length > 0) {
      const byArea = new Map();
      for (const path of changed) {
        const match = /^(packages|apps)\/([^/]+)\//.exec(path);
        if (match) {
          const area = `${match[1]}/${match[2]}`;
          byArea.set(area, (byArea.get(area) ?? 0) + 1);
        }
      }
      if (changed.length > 25) {
        const summary = [...byArea.entries()].map(([n, c]) => `${n} (${c})`).join(", ");
        lines.push(`[repo] uncommitted: ${changed.length} files${summary ? ` — ${summary}` : ""}`);
      } else {
        const shown = changed.slice(0, 10).join(", ");
        lines.push(
          `[repo] uncommitted (${changed.length}): ${shown}${changed.length > 10 ? ", …" : ""}`,
        );
        if (byArea.size > 0) lines.push(`[repo] areas touched: ${[...byArea.keys()].join(", ")}`);
      }
    }
    console.log(lines.join("\n"));
  }
} catch {
  // Never block session start.
}
process.exit(0);
