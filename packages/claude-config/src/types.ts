export type PackageManager = "pnpm" | "npm" | "yarn" | "bun";
export type SvelteTransport = "stdio" | "http" | "none";

export type RuleModuleName =
  | "svelte"
  | "frontendAesthetics"
  | "three"
  | "typescript"
  | "testingFrontend"
  | "changesets"
  | "prDescription"
  | "go"
  | "testingGo";

export interface RepoConfig {
  name: string;
  monorepo: boolean;
  packageManager: PackageManager;
  nodeVersion: string;
  packageScope: string;
  workspaceRootPackage: string;
  wireit: boolean;
}

export interface McpConfig {
  svelteTransport: SvelteTransport;
  vscode: boolean;
}

export type OutputStyleId = "terse";

/** Per-style state: false = not installed, true = installed, "default" = installed and set as the repo default. */
export type OutputStyleState = boolean | "default";

export type HookId = "sessionStart";

export interface CiConfig {
  setupAction: boolean;
  weeklyDependencyUpdate: boolean;
}

export interface VerifyConfig {
  lint: string;
  check: string;
  test: string;
  build: string;
}

export interface WorkflowsSecrets {
  slackAlertWebhook: boolean;
  gitAccessToken: boolean;
  githubApp: boolean;
  jira: boolean;
}

export interface WorkflowOverride {
  maxTurns?: number;
}

export interface WorkflowsConfig {
  teamMention: string | null;
  goTools: boolean;
  secrets: WorkflowsSecrets;
  overrides: Record<string, WorkflowOverride>;
}

/** A manifest with every field present and defaults applied. */
export interface ResolvedManifest {
  repo: RepoConfig;
  rules: Record<RuleModuleName, boolean>;
  mcp: McpConfig;
  outputStyle: Record<OutputStyleId, OutputStyleState>;
  hooks: Record<HookId, boolean>;
  ci: CiConfig;
  verify: VerifyConfig;
  workflows: WorkflowsConfig;
}

export type ManagedKind = "full" | "region" | "json";

/** Where to insert a managed region when the host file exists without markers. */
export type RegionAnchor = "eof" | "after-h1";

export interface RegionSpec {
  id: string;
  start: string;
  end: string;
  anchor: RegionAnchor;
  /** Surround the body with blank lines so Prettier leaves a markdown region stable. */
  pad?: boolean;
}

export interface PlanItem {
  /** Repo-root-relative path. */
  path: string;
  /** Identifier for reporting + the lockfile, e.g. "rule:svelte" or "mcp". */
  module: string;
  kind: ManagedKind;
  /**
   * `full`: the whole file. `region`: the region body (no markers). `json`: a
   * JSON object of top-level keys to merge in (other keys are preserved).
   */
  content: string;
  region?: RegionSpec;
  /** For `json` kind: "merge" (deep-merge content in; default) or "remove" (deep-remove content). */
  jsonMode?: "merge" | "remove";
}

export interface RenderPlan {
  items: PlanItem[];
}

export type FileStatus =
  | "ok"
  | "modified"
  | "missing"
  | "orphaned"
  | "no-marker";

export interface FileDrift {
  path: string;
  module?: string;
  status: FileStatus;
  /** Unified diff, present when status is "modified". */
  diff?: string;
}

export interface DriftReport {
  files: FileDrift[];
}

export interface Lockfile {
  templateVersion: string;
  workflowsRef: string;
  modules: string[];
  files: Record<string, string>;
}
