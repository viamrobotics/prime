import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { doctor } from "../src/commands/doctor.js";
import { init } from "../src/commands/init.js";
import { install } from "../src/commands/install.js";
import { update } from "../src/commands/update.js";
import { LOCKFILE_PATH, MANIFEST_FILENAME } from "../src/core/constants.js";
import { parseManifest } from "../src/core/manifest.js";
import type { Lockfile, ManifestFile } from "../src/types.js";

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

function scaffold(): ManifestFile {
  const { code } = capture(() =>
    init({ cwd: dir, dryRun: false, json: false, force: false }),
  );
  expect(code).toBe(0);
  const raw = readFileSync(join(dir, MANIFEST_FILENAME), "utf8");
  // The scaffold has to satisfy the CLI's own validator, or `init` hands back a repo
  // that `install` rejects on the next command.
  expect(() => parseManifest(raw)).not.toThrow();
  return JSON.parse(raw) as ManifestFile;
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

describe("install", () => {
  const manifest = {
    repo: { name: "tmp", nodeVersion: "22" },
    rules: { modules: { svelte: true } },
  };

  it("plans nothing when a dry run follows a real install", () => {
    write(MANIFEST_FILENAME, manifest);
    capture(() => install({ cwd: dir, dryRun: false, json: false }));

    const { code, output } = capture(() =>
      install({ cwd: dir, dryRun: true, json: false }),
    );
    expect(code).toBe(0);
    expect(output).toContain("0 file(s) planned");
  });

  it("touches no files on a dry run of a fresh repo", () => {
    write(MANIFEST_FILENAME, manifest);
    const { output } = capture(() =>
      install({ cwd: dir, dryRun: true, json: false }),
    );
    expect(output).toContain("would write");
    expect(existsSync(join(dir, ".claude"))).toBe(false);
  });

  it("names the file when a managed host file holds invalid JSON", () => {
    write(MANIFEST_FILENAME, manifest);
    mkdirSync(join(dir, ".claude"), { recursive: true });
    write(".claude/settings.json", "{ oops: }");
    expect(() => install({ cwd: dir, dryRun: false, json: false })).toThrow(
      /\.claude\/settings\.json is not a valid JSON object/,
    );
  });

  it("merges into a blank settings.json rather than calling it corrupt", () => {
    write(MANIFEST_FILENAME, manifest);
    mkdirSync(join(dir, ".claude"), { recursive: true });
    write(".claude/settings.json", "\n");
    capture(() => install({ cwd: dir, dryRun: false, json: false }));
    const settings = JSON.parse(
      readFileSync(join(dir, ".claude/settings.json"), "utf8"),
    ) as Record<string, unknown>;
    expect(settings.outputStyle).toBe("Terse");
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

  it("reports settings.json when only the output-style patch changes", () => {
    write(MANIFEST_FILENAME, {
      ...manifest,
      outputStyle: { terse: "default" },
    });
    capture(() => install({ cwd: dir, dryRun: false, json: false }));

    write(MANIFEST_FILENAME, { ...manifest, outputStyle: { terse: false } });
    const { output } = capture(() =>
      update({ cwd: dir, dryRun: false, json: false }),
    );
    expect(output).toContain("~ .claude/settings.json");
  });
});

describe("doctor", () => {
  const manifest = {
    repo: { name: "tmp", nodeVersion: "22" },
    rules: { modules: { svelte: true } },
  };

  function installed(): void {
    write(MANIFEST_FILENAME, manifest);
    capture(() => install({ cwd: dir, dryRun: false, json: false }));
  }

  function run(options: { fix?: boolean; prune?: boolean } = {}) {
    return capture(() =>
      doctor({
        cwd: dir,
        dryRun: false,
        json: false,
        fix: options.fix ?? false,
        prune: options.prune ?? false,
      }),
    );
  }

  it("exits 0 when the repo matches the plan", () => {
    installed();
    expect(run().code).toBe(0);
  });

  it("exits 1 on drift and 0 once --fix reconciles it", () => {
    installed();
    write(".claude/rules/svelte.md", "tampered\n");

    const drifted = run();
    expect(drifted.code).toBe(1);
    expect(drifted.output).toContain("modified");

    expect(run({ fix: true }).code).toBe(0);
    expect(
      readFileSync(join(dir, ".claude/rules/svelte.md"), "utf8"),
    ).toContain("Svelte 5");
  });

  it("exits 2 when the manifest is missing", () => {
    expect(run().code).toBe(2);
  });

  it("restores a managed file that was deleted", () => {
    installed();
    rmSync(join(dir, ".claude/rules/svelte.md"));
    expect(run().code).toBe(1);
    expect(run({ fix: true }).code).toBe(0);
  });

  it("leaves an orphan in place until --prune", () => {
    write(MANIFEST_FILENAME, {
      ...manifest,
      mcp: { svelteTransport: "stdio" },
    });
    capture(() => install({ cwd: dir, dryRun: false, json: false }));

    write(MANIFEST_FILENAME, { ...manifest, mcp: { svelteTransport: "none" } });
    expect(run().output).toContain("orphaned");
    expect(existsSync(join(dir, ".mcp.json"))).toBe(true);

    run({ fix: true, prune: true });
    expect(existsSync(join(dir, ".mcp.json"))).toBe(false);
  });
});
