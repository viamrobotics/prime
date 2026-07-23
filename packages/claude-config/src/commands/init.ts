import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { basename, join } from "node:path";
import { MANIFEST_FILENAME } from "../core/constants.js";
import type { PackageManager } from "../types.js";
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

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
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

const LOCKFILE_MANAGERS: readonly [file: string, manager: PackageManager][] = [
  ["pnpm-lock.yaml", "pnpm"],
  ["bun.lockb", "bun"],
  ["bun.lock", "bun"],
  ["yarn.lock", "yarn"],
  ["package-lock.json", "npm"],
];

function sniff(cwd: string) {
  const pkgRaw = readJson(join(cwd, "package.json"));
  const pkg = (isObject(pkgRaw) ? pkgRaw : {}) as PkgJson;
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
  const mcpJson = readJson(join(cwd, ".mcp.json"));
  let svelteTransport: "stdio" | "http" | "none" = "none";
  if (isObject(mcpJson)) {
    const servers = mcpJson.mcpServers;
    const svelteServer = isObject(servers) ? servers.svelte : undefined;
    const type = isObject(svelteServer) ? svelteServer.type : undefined;
    svelteTransport = type === "http" ? "http" : "stdio";
  } else if (has("svelte")) {
    svelteTransport = "stdio";
  }

  return {
    $schema: `./node_modules/@viamrobotics/claude-config/schema/${MANIFEST_FILENAME.replace(".json", ".schema.json")}`,
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
        typescript: has("typescript") || hasFile("tsconfig.json"),
        testingFrontend: has("vitest"),
        changesets: hasFile(".changeset"),
        prDescription: hasFile(".changeset"),
        go: isGo,
        testingGo: isGo,
      },
    },
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
  const target = join(cwd, MANIFEST_FILENAME);
  if (existsSync(target) && !force) {
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

  writeFileSync(target, content);
  log.message(
    `Wrote ${MANIFEST_FILENAME}. Review it (especially nodeVersion, secrets, teamMention), then run "claude-config install".`,
  );
  return 0;
}
