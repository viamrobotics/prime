import { existsSync, readdirSync, readFileSync } from "node:fs";
import { basename, join } from "node:path";
import { MANIFEST_FILENAME, SCHEMA_FILENAME } from "../core/constants.js";
import { TargetRepo } from "../core/fs-target.js";
import { isPlainObject } from "../core/json-merge.js";
import { detectViamSources } from "../core/viam-sources.js";
import type { ManifestFile, PackageManager } from "../types.js";
import type { InitContext } from "./context.js";
import * as log from "./log.js";

interface PkgJson {
  name?: string;
  engines?: { node?: string };
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
  workspaces?: string[];
  wireit?: unknown;
}

function readText(path: string): string | null {
  try {
    return readFileSync(path, "utf8");
  } catch {
    return null;
  }
}

function readJson(path: string): unknown {
  const raw = readText(path);
  if (raw === null) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function majorFrom(value: string | undefined): string | null {
  const match = value?.match(/(\d+)/);
  return match ? match[1] : null;
}

const SKIP_DIRS = new Set([
  "node_modules",
  ".git",
  ".wireit",
  ".svelte-kit",
  ".venv",
  "__pycache__",
  "vendor",
  "dist",
  "build",
  "target",
]);

const PY_MANIFESTS =
  /^(pyproject\.toml|setup\.py|setup\.cfg|requirements.*\.txt)$/;

/**
 * Walks the repo collecting dependency manifests from every workspace member, not
 * just the root, so a monorepo with one Go module or one SDK consumer is detected.
 * Depth is capped because the answer never lives deep in a tree.
 */
function collectDependencyEvidence(cwd: string) {
  const npm = new Set<string>();
  const goParts: string[] = [];
  const pyParts: string[] = [];

  const visit = (dir: string, depth: number): void => {
    let entries;
    try {
      entries = readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      const path = join(dir, entry.name);
      if (entry.isDirectory()) {
        if (
          depth > 0 &&
          !SKIP_DIRS.has(entry.name) &&
          !entry.name.startsWith(".")
        ) {
          visit(path, depth - 1);
        }
        continue;
      }
      if (entry.name === "package.json") {
        const parsed = readJson(path);
        const pkg = (isPlainObject(parsed) ? parsed : {}) as PkgJson;
        for (const key of Object.keys({
          ...pkg.dependencies,
          ...pkg.devDependencies,
          ...pkg.peerDependencies,
        })) {
          npm.add(key);
        }
      } else if (entry.name === "go.mod") {
        goParts.push(readText(path) ?? "");
      } else if (PY_MANIFESTS.test(entry.name)) {
        pyParts.push(readText(path) ?? "");
      }
    }
  };

  visit(cwd, 5);
  return { npm, goText: goParts.join("\n"), pyText: pyParts.join("\n") };
}

const LOCKFILE_MANAGERS: readonly [file: string, manager: PackageManager][] = [
  ["pnpm-lock.yaml", "pnpm"],
  ["bun.lockb", "bun"],
  ["bun.lock", "bun"],
  ["yarn.lock", "yarn"],
  ["package-lock.json", "npm"],
];

/** An existing `.mcp.json` records the transport already in use; otherwise infer from deps. */
function sniffSvelteTransport(
  cwd: string,
  hasSvelte: boolean,
): "stdio" | "http" | "none" {
  const mcpJson = readJson(join(cwd, ".mcp.json"));
  const servers = isPlainObject(mcpJson) ? mcpJson.mcpServers : undefined;
  const svelteServer = isPlainObject(servers) ? servers.svelte : undefined;
  if (svelteServer !== undefined) {
    const type = isPlainObject(svelteServer) ? svelteServer.type : undefined;
    return type === "http" ? "http" : "stdio";
  }
  return hasSvelte ? "stdio" : "none";
}

function sniff(cwd: string): ManifestFile {
  const pkgRaw = readJson(join(cwd, "package.json"));
  const pkg = (isPlainObject(pkgRaw) ? pkgRaw : {}) as PkgJson;
  const deps = {
    ...pkg.dependencies,
    ...pkg.devDependencies,
    ...pkg.peerDependencies,
  };
  const has = (name: string): boolean => name in deps;
  const hasFile = (rel: string): boolean => existsSync(join(cwd, rel));

  const name = pkg.name?.replace(/^@[^/]+\//, "") ?? basename(cwd);
  const packageScope = pkg.name?.startsWith("@")
    ? pkg.name.split("/")[0]
    : "@viamrobotics";

  const packageManager =
    LOCKFILE_MANAGERS.find(([file]) => hasFile(file))?.[1] ?? "pnpm";

  const nvmrc = readText(join(cwd, ".nvmrc"));
  const nodeVersion =
    majorFrom(nvmrc?.trim()) ?? majorFrom(pkg.engines?.node) ?? "22";

  const workspaceYaml = readText(join(cwd, "pnpm-workspace.yaml"));
  const monorepo =
    (workspaceYaml !== null && /^\s*packages:/m.test(workspaceYaml)) ||
    Array.isArray(pkg.workspaces);

  const isGo = hasFile("go.mod");
  const hasUi = has("svelte") || has("react") || has("tailwindcss");
  const svelteTransport = sniffSvelteTransport(cwd, has("svelte"));
  const viamSources = detectViamSources(collectDependencyEvidence(cwd));
  const usesViam = Object.values(viamSources).some(Boolean);

  return {
    $schema: `./node_modules/@viamrobotics/claude-config/schema/${SCHEMA_FILENAME}`,
    repo: {
      name,
      monorepo,
      packageManager,
      nodeVersion,
      packageScope,
      workspaceRootPackage: pkg.name ?? `${packageScope}/${name}`,
      wireit: has("wireit") || pkg.wireit != null,
    },
    rules: {
      modules: {
        svelte: has("svelte"),
        frontendAesthetics: has("svelte") || has("tailwindcss"),
        three: has("three"),
        typescript: has("typescript") || hasFile("tsconfig.json"),
        testingFrontend: has("vitest"),
        changesets: hasFile(".changeset"),
        prDescription: hasFile(".changeset"),
        go: isGo,
        testingGo: isGo,
        viamContext: usesViam,
        designSystem: hasUi,
      },
    },
    viamContext: { sources: viamSources },
    mcp: { svelteTransport, vscode: hasFile(".vscode") },
    outputStyle: { terse: "default" },
    hooks: { sessionStart: false },
    ci: {
      setupAction: hasFile(".github/actions/setup"),
      weeklyDependencyUpdate: hasFile(
        ".github/workflows/weekly-dependency-update.yml",
      ),
    },
    verify: {
      lint: `${packageManager} lint`,
      check: `${packageManager} check`,
      test: `${packageManager} test`,
      build: `${packageManager} build`,
    },
    workflows: {
      teamMention: null,
      goTools: isGo,
      secrets: {
        slackAlertWebhook: false,
        gitAccessToken: false,
        githubApp: false,
        jira: false,
      },
      overrides: {},
    },
  };
}

export function init({ cwd, dryRun, force }: InitContext): number {
  const repo = new TargetRepo(cwd, dryRun);
  if (repo.exists(MANIFEST_FILENAME) && !force) {
    log.error(
      `${MANIFEST_FILENAME} already exists — pass --force to overwrite.`,
    );
    return 3;
  }

  const manifest = sniff(cwd);
  const content = `${JSON.stringify(manifest, null, 2)}\n`;
  if (dryRun) {
    log.message(content);
    return 0;
  }

  repo.write(MANIFEST_FILENAME, content);
  log.message(
    `Wrote ${MANIFEST_FILENAME}. Review it (especially nodeVersion, secrets, teamMention), then run "claude-config install".`,
  );
  return 0;
}
