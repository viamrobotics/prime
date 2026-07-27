import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { init } from "../src/commands/init.js";
import { install } from "../src/commands/install.js";
import { update } from "../src/commands/update.js";
import { LOCKFILE_PATH, MANIFEST_FILENAME } from "../src/core/constants.js";
import type { Lockfile } from "../src/types.js";

let dir: string;
beforeEach(() => {
  dir = mkdtempSync(join(tmpdir(), "cc-cmd-"));
});
afterEach(() => {
  rmSync(dir, { recursive: true, force: true });
});

function write(relativePath: string, content: unknown): void {
  writeFileSync(
    join(dir, relativePath),
    typeof content === "string" ? content : `${JSON.stringify(content)}\n`,
  );
}

function capture(run: () => number): { code: number; output: string } {
  const lines: string[] = [];
  const record = (...args: unknown[]) =>
    void lines.push(args.map(String).join(" "));
  const out = vi.spyOn(console, "log").mockImplementation(record);
  const err = vi.spyOn(console, "error").mockImplementation(record);
  try {
    return { code: run(), output: lines.join("\n") };
  } finally {
    out.mockRestore();
    err.mockRestore();
  }
}

interface Scaffolded {
  repo: { name: string; packageManager: string; nodeVersion: string };
  rules: { modules: Record<string, boolean> };
  mcp: { svelteTransport: string };
}

function scaffold(): Scaffolded {
  const { code } = capture(() =>
    init({ cwd: dir, dryRun: false, json: false, force: false }),
  );
  expect(code).toBe(0);
  return JSON.parse(
    readFileSync(join(dir, MANIFEST_FILENAME), "utf8"),
  ) as Scaffolded;
}

describe("init", () => {
  it("leaves the svelte MCP off when .mcp.json holds no svelte server", () => {
    write("package.json", { name: "@viamrobotics/thing" });
    write(".mcp.json", { mcpServers: { other: { command: "other" } } });
    expect(scaffold().mcp.svelteTransport).toBe("none");
  });

  it("reads the transport from an existing svelte server", () => {
    write("package.json", { name: "thing" });
    write(".mcp.json", { mcpServers: { svelte: { type: "http", url: "u" } } });
    expect(scaffold().mcp.svelteTransport).toBe("http");

    write(".mcp.json", { mcpServers: { svelte: { command: "npx" } } });
    rmSync(join(dir, MANIFEST_FILENAME));
    expect(scaffold().mcp.svelteTransport).toBe("stdio");
  });

  it("infers stdio from a svelte dependency when there is no .mcp.json", () => {
    write("package.json", { name: "thing", devDependencies: { svelte: "^5" } });
    expect(scaffold().mcp.svelteTransport).toBe("stdio");
  });

  it("enables rule modules from dependencies", () => {
    write("package.json", {
      name: "thing",
      devDependencies: { svelte: "^5", vitest: "^3", typescript: "^5" },
      dependencies: { three: "^0.170.0" },
    });
    const { modules } = scaffold().rules;
    expect(modules).toMatchObject({
      svelte: true,
      three: true,
      typescript: true,
      testingFrontend: true,
      go: false,
    });
  });

  it("detects the package manager from the lockfile and the Node major from .nvmrc", () => {
    write("package.json", { name: "thing", engines: { node: ">=20" } });
    write("yarn.lock", "");
    write(".nvmrc", "24.3.0\n");
    const { repo } = scaffold();
    expect(repo.packageManager).toBe("yarn");
    expect(repo.nodeVersion).toBe("24");
  });

  it("falls back to engines.node when there is no .nvmrc", () => {
    write("package.json", { name: "thing", engines: { node: ">=20" } });
    expect(scaffold().repo.nodeVersion).toBe("20");
  });

  it("refuses to overwrite an existing manifest without --force", () => {
    write(MANIFEST_FILENAME, { repo: { name: "keep" } });
    const { code, output } = capture(() =>
      init({ cwd: dir, dryRun: false, json: false, force: false }),
    );
    expect(code).toBe(3);
    expect(output).toContain("--force");
    expect(readFileSync(join(dir, MANIFEST_FILENAME), "utf8")).toContain(
      "keep",
    );
  });
});

describe("update", () => {
  const manifest = {
    repo: { name: "tmp", nodeVersion: "22" },
    rules: { modules: { svelte: true, typescript: true } },
    mcp: { svelteTransport: "stdio" },
  };

  function installed(): void {
    write(MANIFEST_FILENAME, manifest);
    capture(() => install({ cwd: dir, dryRun: false, json: false }));
  }

  it("reports no file changes when nothing moved", () => {
    installed();
    const { code, output } = capture(() =>
      update({ cwd: dir, dryRun: false, json: false }),
    );
    expect(code).toBe(0);
    expect(output).toContain("(no file changes)");
  });

  it("reports added, changed, and orphaned files against the prior lockfile", () => {
    installed();
    const lockPath = join(dir, LOCKFILE_PATH);
    const lock = JSON.parse(readFileSync(lockPath, "utf8")) as Lockfile;
    delete lock.files[".claude/rules/typescript.md"];
    lock.files[".claude/rules/svelte.md"] = "sha256-stale";
    lock.files[".claude/rules/go.md"] = "sha256-gone";
    writeFileSync(lockPath, `${JSON.stringify(lock, null, 2)}\n`);

    const { output } = capture(() =>
      update({ cwd: dir, dryRun: false, json: false }),
    );
    expect(output).toContain("+ .claude/rules/typescript.md");
    expect(output).toContain("~ .claude/rules/svelte.md");
    expect(output).toContain("- .claude/rules/go.md");
  });

  it("never reports a shared host file as orphaned", () => {
    installed();
    const lockPath = join(dir, LOCKFILE_PATH);
    const lock = JSON.parse(readFileSync(lockPath, "utf8")) as Lockfile;
    lock.files["CLAUDE.md"] = "sha256-stale";
    lock.files[".gitignore"] = "sha256-stale";
    writeFileSync(lockPath, `${JSON.stringify(lock, null, 2)}\n`);

    write(MANIFEST_FILENAME, { ...manifest, mcp: { svelteTransport: "none" } });
    const { output } = capture(() =>
      update({ cwd: dir, dryRun: false, json: false }),
    );
    expect(output).toContain("- .mcp.json");
    expect(output).not.toContain("- CLAUDE.md");
    expect(output).not.toContain("- .gitignore");
  });
});
