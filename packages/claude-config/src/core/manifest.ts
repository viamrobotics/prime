import { readFileSync } from "node:fs";
import { join } from "node:path";
import { MANIFEST_FILENAME } from "./constants.js";
import { HOOK_IDS } from "./hooks.js";
import { RULE_MODULE_NAMES } from "./modules.js";
import { OUTPUT_STYLES, OUTPUT_STYLE_IDS } from "./output-styles.js";
import type {
  HookId,
  OutputStyleId,
  OutputStyleState,
  PackageManager,
  ResolvedManifest,
  RuleModuleName,
  SvelteTransport,
} from "../types.js";

const PACKAGE_MANAGERS: readonly PackageManager[] = [
  "pnpm",
  "npm",
  "yarn",
  "bun",
];
const TRANSPORTS: readonly SvelteTransport[] = ["stdio", "http", "none"];

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

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
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

function resolve(data: unknown, problems: string[]): ResolvedManifest {
  if (!isObject(data)) {
    problems.push("root must be an object");
    data = {};
  }
  const root = data as Record<string, unknown>;

  if (root.repo !== undefined && !isObject(root.repo)) {
    problems.push("repo must be an object");
  }
  const repoRaw = isObject(root.repo) ? root.repo : {};
  if (root.repo === undefined) problems.push("repo is required");

  const name = str(repoRaw.name, "repo.name", problems, { required: true });
  const nodeVersion = str(repoRaw.nodeVersion, "repo.nodeVersion", problems, {
    required: true,
    pattern: /^\d+$/,
  });
  const packageManager = oneOf(
    repoRaw.packageManager,
    PACKAGE_MANAGERS,
    "repo.packageManager",
    problems,
    "pnpm",
  );
  const packageScope = str(
    repoRaw.packageScope,
    "repo.packageScope",
    problems,
    {
      fallback: "@viamrobotics",
    },
  );
  const repo = {
    name,
    monorepo: bool(repoRaw.monorepo, "repo.monorepo", problems, false),
    packageManager,
    nodeVersion,
    packageScope,
    workspaceRootPackage: str(
      repoRaw.workspaceRootPackage,
      "repo.workspaceRootPackage",
      problems,
      { fallback: name ? `${packageScope}/${name}` : "" },
    ),
    wireit: bool(repoRaw.wireit, "repo.wireit", problems, false),
  };

  const rulesRaw = isObject(root.rules) ? root.rules : {};
  if (root.rules !== undefined && !isObject(root.rules)) {
    problems.push("rules must be an object");
  }

  const modulesRaw = isObject(rulesRaw.modules) ? rulesRaw.modules : {};
  if (rulesRaw.modules !== undefined && !isObject(rulesRaw.modules)) {
    problems.push("rules.modules must be an object");
  }

  for (const key of Object.keys(modulesRaw)) {
    if (!RULE_MODULE_NAMES.includes(key as RuleModuleName)) {
      problems.push(`rules.modules.${key} is not a known rule module`);
    }
  }

  const rules = Object.fromEntries(
    RULE_MODULE_NAMES.map((mod) => [
      mod,
      bool(modulesRaw[mod], `rules.modules.${mod}`, problems, false),
    ]),
  ) as Record<RuleModuleName, boolean>;

  const mcpRaw = isObject(root.mcp) ? root.mcp : {};
  if (root.mcp !== undefined && !isObject(root.mcp)) {
    problems.push("mcp must be an object");
  }

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

  const osRaw = isObject(root.outputStyle) ? root.outputStyle : {};
  if (root.outputStyle !== undefined && !isObject(root.outputStyle)) {
    problems.push("outputStyle must be an object");
  }
  for (const key of Object.keys(osRaw)) {
    if (!OUTPUT_STYLE_IDS.includes(key as OutputStyleId)) {
      problems.push(`outputStyle.${key} is not a known output style`);
    }
  }
  const outputStyle = {} as Record<OutputStyleId, OutputStyleState>;
  let defaults = 0;
  for (const id of OUTPUT_STYLE_IDS) {
    const raw = osRaw[id];
    let state: OutputStyleState;
    if (raw === undefined) {
      state = OUTPUT_STYLES[id].defaultState;
    } else if (raw === true || raw === false || raw === "default") {
      state = raw;
    } else {
      problems.push(`outputStyle.${id} must be true, false, or "default"`);
      state = false;
    }
    if (state === "default") defaults++;
    outputStyle[id] = state;
  }
  if (defaults > 1) problems.push('only one outputStyle may be "default"');

  const hooksRaw = isObject(root.hooks) ? root.hooks : {};
  if (root.hooks !== undefined && !isObject(root.hooks)) {
    problems.push("hooks must be an object");
  }
  for (const key of Object.keys(hooksRaw)) {
    if (!HOOK_IDS.includes(key as HookId)) {
      problems.push(`hooks.${key} is not a known hook`);
    }
  }
  const hooks = Object.fromEntries(
    HOOK_IDS.map((id) => [
      id,
      bool(hooksRaw[id], `hooks.${id}`, problems, false),
    ]),
  ) as Record<HookId, boolean>;

  const ciRaw = isObject(root.ci) ? root.ci : {};
  if (root.ci !== undefined && !isObject(root.ci)) {
    problems.push("ci must be an object");
  }
  const ci = {
    setupAction: bool(ciRaw.setupAction, "ci.setupAction", problems, false),
    weeklyDependencyUpdate: bool(
      ciRaw.weeklyDependencyUpdate,
      "ci.weeklyDependencyUpdate",
      problems,
      false,
    ),
  };

  const verifyRaw = isObject(root.verify) ? root.verify : {};
  if (root.verify !== undefined && !isObject(root.verify)) {
    problems.push("verify must be an object");
  }
  const verify = {
    lint: str(verifyRaw.lint, "verify.lint", problems, {
      fallback: `${packageManager} lint`,
    }),
    check: str(verifyRaw.check, "verify.check", problems, {
      fallback: `${packageManager} check`,
    }),
    test: str(verifyRaw.test, "verify.test", problems, {
      fallback: `${packageManager} test`,
    }),
    build: str(verifyRaw.build, "verify.build", problems, {
      fallback: `${packageManager} build`,
    }),
  };

  const wfRaw = isObject(root.workflows) ? root.workflows : {};
  if (root.workflows !== undefined && !isObject(root.workflows)) {
    problems.push("workflows must be an object");
  }
  const secretsRaw = isObject(wfRaw.secrets) ? wfRaw.secrets : {};
  if (wfRaw.overrides !== undefined && !isObject(wfRaw.overrides)) {
    problems.push("workflows.overrides must be an object");
  }
  const overridesRaw = isObject(wfRaw.overrides) ? wfRaw.overrides : {};
  const overrides: Record<string, { maxTurns?: number }> = {};
  for (const [stub, value] of Object.entries(overridesRaw)) {
    if (!isObject(value)) {
      problems.push(`workflows.overrides.${stub} must be an object`);
      continue;
    }
    const entry: { maxTurns?: number } = {};
    if (value.maxTurns !== undefined) {
      if (
        typeof value.maxTurns !== "number" ||
        !Number.isInteger(value.maxTurns) ||
        value.maxTurns <= 0
      ) {
        problems.push(
          `workflows.overrides.${stub}.maxTurns must be a positive integer`,
        );
      } else {
        entry.maxTurns = value.maxTurns;
      }
    }
    overrides[stub] = entry;
  }
  const workflows = {
    teamMention:
      wfRaw.teamMention === undefined || wfRaw.teamMention === null
        ? null
        : str(wfRaw.teamMention, "workflows.teamMention", problems),
    goTools: bool(wfRaw.goTools, "workflows.goTools", problems, false),
    secrets: {
      slackAlertWebhook: bool(
        secretsRaw.slackAlertWebhook,
        "workflows.secrets.slackAlertWebhook",
        problems,
        false,
      ),
      gitAccessToken: bool(
        secretsRaw.gitAccessToken,
        "workflows.secrets.gitAccessToken",
        problems,
        false,
      ),
      githubApp: bool(
        secretsRaw.githubApp,
        "workflows.secrets.githubApp",
        problems,
        false,
      ),
      jira: bool(secretsRaw.jira, "workflows.secrets.jira", problems, false),
    },
    overrides,
  };

  return { repo, rules, mcp, outputStyle, hooks, ci, verify, workflows };
}
