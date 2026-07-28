import {
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { applyPlan } from "../src/core/apply.js";
import { MARKERS } from "../src/core/constants.js";
import { computeDrift, isClean } from "../src/core/drift.js";
import { TargetRepo } from "../src/core/fs-target.js";
import { parseManifest } from "../src/core/manifest.js";
import { buildPlan } from "../src/core/plan.js";

const BASE = {
  repo: { name: "tmp", nodeVersion: "22" },
  rules: { modules: { svelte: true, typescript: true } },
  mcp: { svelteTransport: "stdio" },
};

function planFor(overrides: Record<string, unknown> = {}) {
  return buildPlan(parseManifest(JSON.stringify({ ...BASE, ...overrides })));
}

let dir: string;
beforeEach(() => {
  dir = mkdtempSync(join(tmpdir(), "cc-"));
});
afterEach(() => {
  rmSync(dir, { recursive: true, force: true });
});

describe("install + doctor round-trip", () => {
  it("is clean immediately after install", () => {
    const repo = new TargetRepo(dir, false);
    applyPlan(repo, planFor(), "0.0.0-test");
    expect(isClean(computeDrift(repo, planFor()))).toBe(true);
  });

  it("writes nothing on a second apply", () => {
    const repo = new TargetRepo(dir, false);
    applyPlan(repo, planFor(), "0.0.0-test");
    expect(applyPlan(repo, planFor(), "0.0.0-test").written).toEqual([]);
  });

  it("detects a modified managed file", () => {
    const repo = new TargetRepo(dir, false);
    applyPlan(repo, planFor(), "0.0.0-test");
    writeFileSync(
      join(dir, ".claude/rules/svelte.md"),
      "// tampered: use Koota ECS\n",
    );
    const report = computeDrift(repo, planFor());
    expect(isClean(report)).toBe(false);
    expect(
      report.files.find((f) => f.path === ".claude/rules/svelte.md")?.status,
    ).toBe("modified");
  });

  it("restores a modified file when re-applied", () => {
    const repo = new TargetRepo(dir, false);
    applyPlan(repo, planFor(), "0.0.0-test");
    writeFileSync(join(dir, ".claude/rules/svelte.md"), "tampered\n");
    applyPlan(repo, planFor(), "0.0.0-test", {
      paths: new Set([".claude/rules/svelte.md"]),
    });
    expect(isClean(computeDrift(repo, planFor()))).toBe(true);
  });

  it("flags an orphan when a module is disabled", () => {
    const repo = new TargetRepo(dir, false);
    applyPlan(repo, planFor(), "0.0.0-test");
    const shrunk = planFor({ rules: { modules: { typescript: true } } });
    const report = computeDrift(repo, shrunk);
    expect(
      report.files.find((f) => f.path === ".claude/rules/svelte.md")?.status,
    ).toBe("orphaned");
  });

  it("manages .gitignore and CLAUDE.md as regions", () => {
    const repo = new TargetRepo(dir, false);
    applyPlan(repo, planFor(), "0.0.0-test");
    const report = computeDrift(repo, planFor());
    expect(report.files.find((f) => f.path === ".gitignore")?.status).toBe(
      "ok",
    );
    expect(report.files.find((f) => f.path === "CLAUDE.md")?.status).toBe("ok");

    // Markdown region gets blank-line padding (so Prettier leaves it stable); ignore-file blocks stay tight.
    const claudeMd = readFileSync(join(dir, "CLAUDE.md"), "utf8");
    expect(claudeMd).toContain(`${MARKERS.claudeMdRulesTable.start}\n\n`);
    const gitignore = readFileSync(join(dir, ".gitignore"), "utf8");
    expect(gitignore).toContain(`${MARKERS.gitignore.start}\n`);
    expect(gitignore).not.toContain(`${MARKERS.gitignore.start}\n\n`);
  });

  it("flags a CLAUDE.md without markers and inserts the block after the H1", () => {
    const repo = new TargetRepo(dir, false);
    applyPlan(repo, planFor(), "0.0.0-test");
    writeFileSync(join(dir, "CLAUDE.md"), "# my repo\n\nprose\n");

    const report = computeDrift(repo, planFor());
    expect(report.files.find((f) => f.path === "CLAUDE.md")?.status).toBe(
      "no-marker",
    );

    applyPlan(repo, planFor(), "0.0.0-test", {
      paths: new Set(["CLAUDE.md"]),
    });
    const after = readFileSync(join(dir, "CLAUDE.md"), "utf8");
    expect(after.split("\n")[0]).toBe("# my repo");
    expect(after).toContain("prose");
    expect(isClean(computeDrift(repo, planFor()))).toBe(true);
  });

  it("reports settings.json once though several patches target it", () => {
    const repo = new TargetRepo(dir, false);
    const plan = planFor({ hooks: { sessionStart: true } });
    const patches = plan.items.filter(
      (item) => item.path === ".claude/settings.json",
    );
    expect(patches.length).toBeGreaterThan(1);

    applyPlan(repo, plan, "0.0.0-test");
    const entries = computeDrift(repo, plan).files.filter(
      (file) => file.path === ".claude/settings.json",
    );
    expect(entries).toHaveLength(1);
    expect(entries[0].status).toBe("ok");
  });

  it("merges outputStyle into settings.json, preserving other keys", () => {
    const repo = new TargetRepo(dir, false);
    mkdirSync(join(dir, ".claude"), { recursive: true });
    writeFileSync(
      join(dir, ".claude/settings.json"),
      `${JSON.stringify({ permissions: { allow: ["Bash(ls)"] } }, null, 2)}\n`,
    );
    applyPlan(repo, planFor(), "0.0.0-test");
    const settings = JSON.parse(
      readFileSync(join(dir, ".claude/settings.json"), "utf8"),
    ) as Record<string, unknown>;
    expect(settings.outputStyle).toBe("Terse");
    expect(settings.permissions).toEqual({ allow: ["Bash(ls)"] });
  });

  it("removes outputStyle on opt-out, keeping other keys", () => {
    const repo = new TargetRepo(dir, false);
    mkdirSync(join(dir, ".claude"), { recursive: true });
    writeFileSync(
      join(dir, ".claude/settings.json"),
      `${JSON.stringify({ outputStyle: "Terse", foo: 1 }, null, 2)}\n`,
    );
    applyPlan(repo, planFor({ outputStyle: { terse: false } }), "0.0.0-test");
    const settings = JSON.parse(
      readFileSync(join(dir, ".claude/settings.json"), "utf8"),
    ) as Record<string, unknown>;
    expect(settings.outputStyle).toBeUndefined();
    expect(settings.foo).toBe(1);
  });

  it("registers the sessionStart hook, preserving a repo's own hooks", () => {
    const repo = new TargetRepo(dir, false);
    mkdirSync(join(dir, ".claude"), { recursive: true });
    const own = {
      hooks: {
        PreToolUse: [{ hooks: [{ type: "command", command: "echo hi" }] }],
      },
    };
    writeFileSync(
      join(dir, ".claude/settings.json"),
      `${JSON.stringify(own, null, 2)}\n`,
    );
    applyPlan(repo, planFor({ hooks: { sessionStart: true } }), "0.0.0-test");
    const hooks = (
      JSON.parse(readFileSync(join(dir, ".claude/settings.json"), "utf8")) as {
        hooks: Record<string, unknown>;
      }
    ).hooks;
    expect(hooks.PreToolUse).toBeDefined();
    expect(hooks.SessionStart).toBeDefined();
  });

  it("does not duplicate the sessionStart hook on re-install", () => {
    const repo = new TargetRepo(dir, false);
    const plan = planFor({ hooks: { sessionStart: true } });
    applyPlan(repo, plan, "0.0.0-test");
    applyPlan(repo, plan, "0.0.0-test");
    const settings = JSON.parse(
      readFileSync(join(dir, ".claude/settings.json"), "utf8"),
    ) as {
      hooks: { SessionStart: unknown[] };
    };
    expect(settings.hooks.SessionStart).toHaveLength(1);
    expect(isClean(computeDrift(repo, plan))).toBe(true);
  });

  it("removes only our entry on hook opt-out", () => {
    const repo = new TargetRepo(dir, false);
    applyPlan(repo, planFor({ hooks: { sessionStart: true } }), "0.0.0-test");
    const settingsPath = join(dir, ".claude/settings.json");
    const withForeign = JSON.parse(readFileSync(settingsPath, "utf8")) as {
      hooks: { SessionStart: { hooks: { command: string }[] }[] };
    };
    withForeign.hooks.SessionStart.push({
      hooks: [{ type: "command", command: "echo other" }],
    });
    writeFileSync(settingsPath, `${JSON.stringify(withForeign, null, 2)}\n`);
    applyPlan(repo, planFor({ hooks: { sessionStart: false } }), "0.0.0-test");
    const after = JSON.parse(readFileSync(settingsPath, "utf8")) as {
      hooks: { SessionStart: { hooks: { command: string }[] }[] };
    };
    expect(after.hooks.SessionStart).toHaveLength(1);
    expect(after.hooks.SessionStart[0].hooks[0].command).toBe("echo other");
  });
});
