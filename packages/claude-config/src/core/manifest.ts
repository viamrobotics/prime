import { readFileSync } from "node:fs";
import { join } from "node:path";
import { MANIFEST_FILENAME } from "./constants.js";
import { HOOK_IDS } from "./hooks.js";
import { isPlainObject } from "./json-merge.js";
import { RULE_MODULE_NAMES } from "./modules.js";
import { OUTPUT_STYLES, OUTPUT_STYLE_IDS } from "./output-styles.js";
import { VIAM_SOURCE_IDS } from "./viam-sources.js";
import type {
  HookId,
  OutputStyleId,
  OutputStyleState,
  PackageManager,
  ResolvedManifest,
  RuleModuleName,
  SvelteTransport,
  ViamSourceId,
} from "../types.js";

const PACKAGE_MANAGERS: readonly PackageManager[] = [
  "pnpm",
  "npm",
  "yarn",
  "bun",
];
const TRANSPORTS: readonly SvelteTransport[] = ["stdio", "http", "none"];

/** GitHub team handle, as the workflow stubs will paste it into a YAML prompt. */
const TEAM_MENTION = /^@[\w-]+\/[\w-]+$/;

/**
 * Every key each manifest section accepts. Drives unknown-key rejection here and is
 * asserted against `schema/manifest.schema.json` in test/schema.test.ts, so the
 * validator and the schema cannot drift apart.
 */
export const MANIFEST_KEYS = {
  "": [
    "$schema",
    "repo",
    "rules",
    "viamContext",
    "mcp",
    "outputStyle",
    "hooks",
    "ci",
    "verify",
    "workflows",
  ],
  repo: [
    "name",
    "monorepo",
    "packageManager",
    "nodeVersion",
    "packageScope",
    "workspaceRootPackage",
    "wireit",
  ],
  rules: ["modules"],
  "rules.modules": RULE_MODULE_NAMES,
  viamContext: ["sources"],
  "viamContext.sources": VIAM_SOURCE_IDS,
  mcp: ["svelteTransport", "vscode"],
  outputStyle: OUTPUT_STYLE_IDS,
  hooks: HOOK_IDS,
  ci: ["setupAction", "weeklyDependencyUpdate"],
  verify: ["lint", "check", "test", "build"],
  workflows: ["teamMention", "goTools", "secrets", "overrides"],
  "workflows.secrets": [
    "slackAlertWebhook",
    "gitAccessToken",
    "githubApp",
    "jira",
  ],
  "workflows.overrides.*": ["maxTurns"],
} as const satisfies Record<string, readonly string[]>;

export class ManifestError extends Error {
  constructor(readonly problems: string[]) {
    super(
      `Invalid ${MANIFEST_FILENAME}:\n${problems.map((p) => `  - ${p}`).join("\n")}`,
    );
    this.name = "ManifestError";
  }
}

export function manifestPath(cwd: string): string {
  return join(cwd, MANIFEST_FILENAME);
}

export function loadManifest(cwd: string): ResolvedManifest {
  let raw: string;
  try {
    raw = readFileSync(manifestPath(cwd), "utf8");
  } catch {
    throw new ManifestError([
      `no ${MANIFEST_FILENAME} found in ${cwd} — run "claude-config init"`,
    ]);
  }
  return parseManifest(raw);
}

export function parseManifest(raw: string): ResolvedManifest {
  let data: unknown;
  try {
    data = JSON.parse(raw);
  } catch (error) {
    throw new ManifestError([`not valid JSON: ${(error as Error).message}`]);
  }
  const problems: string[] = [];
  const resolved = resolve(data, problems);
  if (problems.length > 0) throw new ManifestError(problems);
  return resolved;
}

interface StrOpts {
  required?: boolean;
  pattern?: RegExp;
  fallback?: string;
}

function str(
  value: unknown,
  path: string,
  problems: string[],
  { required, pattern, fallback }: StrOpts = {},
): string {
  if (value === undefined) {
    if (required) problems.push(`${path} is required`);
    return fallback ?? "";
  }
  if (typeof value !== "string") {
    problems.push(`${path} must be a string`);
    return fallback ?? "";
  }
  if (pattern && !pattern.test(value)) {
    problems.push(`${path} must match ${pattern}`);
  }
  return value;
}

function bool(
  value: unknown,
  path: string,
  problems: string[],
  fallback: boolean,
): boolean {
  if (value === undefined) return fallback;
  if (typeof value !== "boolean") {
    problems.push(`${path} must be a boolean`);
    return fallback;
  }
  return value;
}

function oneOf<T extends string>(
  value: unknown,
  allowed: readonly T[],
  path: string,
  problems: string[],
  fallback: T,
): T {
  if (value === undefined) return fallback;
  if (typeof value !== "string" || !allowed.includes(value as T)) {
    problems.push(`${path} must be one of: ${allowed.join(", ")}`);
    return fallback;
  }
  return value as T;
}

/** A nested object, defaulting to empty. Flags a present-but-wrong-typed section. */
function section(
  value: unknown,
  path: string,
  problems: string[],
): Record<string, unknown> {
  if (value === undefined) return {};
  if (!isPlainObject(value)) {
    problems.push(`${path} must be an object`);
    return {};
  }
  return value;
}

/** Mirrors the schema's `additionalProperties: false`, so a typo is an error rather
 * than a silently applied default. */
function rejectUnknown(
  raw: Record<string, unknown>,
  path: keyof typeof MANIFEST_KEYS,
  problems: string[],
  noun = "field",
): void {
  const allowed: readonly string[] = MANIFEST_KEYS[path];
  const prefix = path === "" ? "" : `${path}.`;
  for (const key of Object.keys(raw)) {
    if (!allowed.includes(key)) {
      problems.push(`${prefix}${key} is not a known ${noun}`);
    }
  }
}

function resolveRepo(root: Record<string, unknown>, problems: string[]) {
  if (root.repo === undefined) problems.push("repo is required");
  const raw = section(root.repo, "repo", problems);
  rejectUnknown(raw, "repo", problems);

  const name = str(raw.name, "repo.name", problems, { required: true });
  const packageManager = oneOf(
    raw.packageManager,
    PACKAGE_MANAGERS,
    "repo.packageManager",
    problems,
    "pnpm",
  );
  const packageScope = str(raw.packageScope, "repo.packageScope", problems, {
    fallback: "@viamrobotics",
  });
  return {
    name,
    monorepo: bool(raw.monorepo, "repo.monorepo", problems, false),
    packageManager,
    nodeVersion: str(raw.nodeVersion, "repo.nodeVersion", problems, {
      required: true,
      pattern: /^\d+$/,
    }),
    packageScope,
    workspaceRootPackage: str(
      raw.workspaceRootPackage,
      "repo.workspaceRootPackage",
      problems,
      { fallback: name ? `${packageScope}/${name}` : "" },
    ),
    wireit: bool(raw.wireit, "repo.wireit", problems, false),
  };
}

function resolveOutputStyle(
  root: Record<string, unknown>,
  problems: string[],
): Record<OutputStyleId, OutputStyleState> {
  const raw = section(root.outputStyle, "outputStyle", problems);
  rejectUnknown(raw, "outputStyle", problems, "output style");

  const resolved = {} as Record<OutputStyleId, OutputStyleState>;
  let defaults = 0;
  for (const id of OUTPUT_STYLE_IDS) {
    const value = raw[id];
    let state: OutputStyleState;
    if (value === undefined) {
      state = OUTPUT_STYLES[id].defaultState;
    } else if (value === true || value === false || value === "default") {
      state = value;
    } else {
      problems.push(`outputStyle.${id} must be true, false, or "default"`);
      state = false;
    }
    if (state === "default") defaults++;
    resolved[id] = state;
  }
  if (defaults > 1) problems.push('only one outputStyle may be "default"');
  return resolved;
}

function resolveOverrides(
  raw: Record<string, unknown>,
  problems: string[],
): Record<string, { maxTurns?: number }> {
  const overrides: Record<string, { maxTurns?: number }> = {};
  for (const [stub, value] of Object.entries(raw)) {
    const path = `workflows.overrides.${stub}`;
    if (!isPlainObject(value)) {
      problems.push(`${path} must be an object`);
      continue;
    }
    rejectUnknown(value, "workflows.overrides.*", problems);
    const entry: { maxTurns?: number } = {};
    if (value.maxTurns !== undefined) {
      if (
        typeof value.maxTurns !== "number" ||
        !Number.isInteger(value.maxTurns) ||
        value.maxTurns <= 0
      ) {
        problems.push(`${path}.maxTurns must be a positive integer`);
      } else {
        entry.maxTurns = value.maxTurns;
      }
    }
    overrides[stub] = entry;
  }
  return overrides;
}

function resolveWorkflows(root: Record<string, unknown>, problems: string[]) {
  const raw = section(root.workflows, "workflows", problems);
  rejectUnknown(raw, "workflows", problems);
  const secrets = section(raw.secrets, "workflows.secrets", problems);
  rejectUnknown(secrets, "workflows.secrets", problems);

  return {
    teamMention:
      raw.teamMention === undefined || raw.teamMention === null
        ? null
        : str(raw.teamMention, "workflows.teamMention", problems, {
            pattern: TEAM_MENTION,
          }),
    goTools: bool(raw.goTools, "workflows.goTools", problems, false),
    secrets: {
      slackAlertWebhook: bool(
        secrets.slackAlertWebhook,
        "workflows.secrets.slackAlertWebhook",
        problems,
        false,
      ),
      gitAccessToken: bool(
        secrets.gitAccessToken,
        "workflows.secrets.gitAccessToken",
        problems,
        false,
      ),
      githubApp: bool(
        secrets.githubApp,
        "workflows.secrets.githubApp",
        problems,
        false,
      ),
      jira: bool(secrets.jira, "workflows.secrets.jira", problems, false),
    },
    overrides: resolveOverrides(
      section(raw.overrides, "workflows.overrides", problems),
      problems,
    ),
  };
}

function resolve(data: unknown, problems: string[]): ResolvedManifest {
  if (!isPlainObject(data)) {
    problems.push("root must be an object");
    data = {};
  }
  const root = data as Record<string, unknown>;
  rejectUnknown(root, "", problems);

  const repo = resolveRepo(root, problems);

  const rulesRaw = section(root.rules, "rules", problems);
  rejectUnknown(rulesRaw, "rules", problems);
  const modulesRaw = section(rulesRaw.modules, "rules.modules", problems);
  rejectUnknown(modulesRaw, "rules.modules", problems, "rule module");
  const rules = Object.fromEntries(
    RULE_MODULE_NAMES.map((mod) => [
      mod,
      bool(modulesRaw[mod], `rules.modules.${mod}`, problems, false),
    ]),
  ) as Record<RuleModuleName, boolean>;

  const viamRaw = section(root.viamContext, "viamContext", problems);
  rejectUnknown(viamRaw, "viamContext", problems);
  const sourcesRaw = section(viamRaw.sources, "viamContext.sources", problems);
  rejectUnknown(sourcesRaw, "viamContext.sources", problems, "Viam source");
  const viamContext = {
    sources: Object.fromEntries(
      VIAM_SOURCE_IDS.map((id) => [
        id,
        bool(sourcesRaw[id], `viamContext.sources.${id}`, problems, false),
      ]),
    ) as Record<ViamSourceId, boolean>,
  };

  const mcpRaw = section(root.mcp, "mcp", problems);
  rejectUnknown(mcpRaw, "mcp", problems);
  const mcp = {
    svelteTransport: oneOf(
      mcpRaw.svelteTransport,
      TRANSPORTS,
      "mcp.svelteTransport",
      problems,
      "none",
    ),
    vscode: bool(mcpRaw.vscode, "mcp.vscode", problems, false),
  };

  const hooksRaw = section(root.hooks, "hooks", problems);
  rejectUnknown(hooksRaw, "hooks", problems, "hook");
  const hooks = Object.fromEntries(
    HOOK_IDS.map((id) => [
      id,
      bool(hooksRaw[id], `hooks.${id}`, problems, false),
    ]),
  ) as Record<HookId, boolean>;

  const ciRaw = section(root.ci, "ci", problems);
  rejectUnknown(ciRaw, "ci", problems);
  const ci = {
    setupAction: bool(ciRaw.setupAction, "ci.setupAction", problems, false),
    weeklyDependencyUpdate: bool(
      ciRaw.weeklyDependencyUpdate,
      "ci.weeklyDependencyUpdate",
      problems,
      false,
    ),
  };

  const verifyRaw = section(root.verify, "verify", problems);
  rejectUnknown(verifyRaw, "verify", problems);
  const verify = {
    lint: str(verifyRaw.lint, "verify.lint", problems, {
      fallback: `${repo.packageManager} lint`,
    }),
    check: str(verifyRaw.check, "verify.check", problems, {
      fallback: `${repo.packageManager} check`,
    }),
    test: str(verifyRaw.test, "verify.test", problems, {
      fallback: `${repo.packageManager} test`,
    }),
    build: str(verifyRaw.build, "verify.build", problems, {
      fallback: `${repo.packageManager} build`,
    }),
  };

  return {
    repo,
    rules,
    viamContext,
    mcp,
    outputStyle: resolveOutputStyle(root, problems),
    hooks,
    ci,
    verify,
    workflows: resolveWorkflows(root, problems),
  };
}
