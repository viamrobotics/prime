import { readFileSync } from "node:fs";
import { join } from "node:path";
import { z } from "zod";
import { MANIFEST_FILENAME } from "./constants.js";
import { HOOK_IDS } from "./hooks.js";
import { RULE_MODULE_NAMES } from "./modules.js";
import { OUTPUT_STYLES, OUTPUT_STYLE_IDS } from "./output-styles.js";
import { VIAM_SOURCE_IDS } from "./viam-sources.js";
import type { OutputStyleId, ResolvedManifest } from "../types.js";

/** GitHub team handle, as the workflow stubs will paste it into a YAML prompt. */
const TEAM_MENTION = /^@[\w-]+\/[\w-]+$/;

/** A section of independent switches, all defaulting off. */
function toggles<K extends string>(keys: readonly K[]) {
  const shape = Object.fromEntries(
    keys.map((key) => [key, z.boolean().default(false)]),
  ) as Record<K, z.ZodDefault<z.ZodBoolean>>;
  return z.strictObject(shape);
}

const OUTPUT_STYLE_STATE = z.union([z.boolean(), z.literal("default")]);

function outputStyleSection() {
  const shape = Object.fromEntries(
    OUTPUT_STYLE_IDS.map((id) => [
      id,
      OUTPUT_STYLE_STATE.default(OUTPUT_STYLES[id].defaultState),
    ]),
  ) as Record<OutputStyleId, z.ZodDefault<typeof OUTPUT_STYLE_STATE>>;
  return z
    .strictObject(shape)
    .prefault({})
    .superRefine((styles, ctx) => {
      const defaults = Object.values(styles).filter(
        (state) => state === "default",
      );
      if (defaults.length > 1) {
        ctx.addIssue({
          code: "custom",
          message: 'only one outputStyle may be "default"',
        });
      }
    });
}

/**
 * The manifest as written on disk. Every section is optional; defaults are filled in
 * here, except the few that depend on another field and so are resolved afterwards.
 * `schema/manifest.schema.json` is generated from this, so the two cannot drift.
 *
 * Sections use `prefault({})` rather than `default({})`: a zod `default` short-circuits
 * parsing and would hand back a literal `{}`, leaving every switch inside it undefined.
 */
export const ManifestSchema = z.strictObject({
  $schema: z.string().optional(),
  repo: z.strictObject({
    name: z.string().min(1).describe("Short repo name (no scope)."),
    monorepo: z.boolean().default(false),
    packageManager: z.enum(["pnpm", "npm", "yarn", "bun"]).default("pnpm"),
    nodeVersion: z
      .string()
      .regex(/^\d+$/)
      .describe('Major Node version, e.g. "22".'),
    packageScope: z
      .string()
      .default("@viamrobotics")
      .describe('npm scope, e.g. "@viamrobotics".'),
    workspaceRootPackage: z
      .string()
      .optional()
      .describe("Defaults to `<packageScope>/<name>`."),
    wireit: z.boolean().default(false),
  }),
  rules: z
    .strictObject({
      modules: toggles(RULE_MODULE_NAMES)
        .describe(
          "Toggle shared rule modules. code-comments, editing-discipline, and verification are always installed.",
        )
        .prefault({}),
    })
    .prefault({}),
  viamContext: z
    .strictObject({ sources: toggles(VIAM_SOURCE_IDS).prefault({}) })
    .prefault({}),
  mcp: z
    .strictObject({
      svelteTransport: z.enum(["stdio", "http", "none"]).default("none"),
      vscode: z.boolean().default(false),
    })
    .prefault({}),
  outputStyle: outputStyleSection(),
  hooks: toggles(HOOK_IDS).prefault({}),
  ci: toggles(["setupAction", "weeklyDependencyUpdate"] as const).prefault({}),
  verify: z
    .strictObject({
      lint: z.string().optional(),
      check: z.string().optional(),
      test: z.string().optional(),
      build: z.string().optional(),
    })
    .prefault({})
    .describe("Defaults to `<packageManager> <script>` for each script."),
  workflows: z
    .strictObject({
      teamMention: z.string().regex(TEAM_MENTION).nullable().default(null),
      goTools: z.boolean().default(false),
      secrets: toggles([
        "slackAlertWebhook",
        "gitAccessToken",
        "githubApp",
        "jira",
      ] as const).prefault({}),
      overrides: z
        .record(
          z.string(),
          z.strictObject({ maxTurns: z.int().positive().optional() }),
        )
        .prefault({}),
    })
    .prefault({}),
});

/**
 * The published JSON Schema, which powers editor IntelliSense via `$schema`.
 * `io: "input"` so defaulted fields stay optional, which is what a hand-written
 * manifest looks like; the identity fields zod does not emit are supplied here.
 */
export function buildJsonSchema(): Record<string, unknown> {
  const { $schema, ...body } = z.toJSONSchema(ManifestSchema, { io: "input" });
  return {
    $schema,
    $id: "https://viamrobotics.github.io/prime/claude-config/manifest.schema.json",
    title: "claude-config manifest",
    description: "Per-repo configuration for @viamrobotics/claude-config.",
    ...body,
  };
}

/** Sections whose unknown keys are not "fields": the message names what they hold. */
const UNKNOWN_KEY_NOUNS: Record<string, string> = {
  "rules.modules": "rule module",
  "viamContext.sources": "Viam source",
  outputStyle: "output style",
  hooks: "hook",
};

function problemsFrom(error: z.ZodError): string[] {
  return error.issues.flatMap((issue) => {
    const path = issue.path.join(".");
    if (issue.code === "unrecognized_keys") {
      const noun = UNKNOWN_KEY_NOUNS[path] ?? "field";
      const prefix = path === "" ? "" : `${path}.`;
      return issue.keys.map((key) => `${prefix}${key} is not a known ${noun}`);
    }
    if (issue.code === "custom") return [issue.message];
    return [path === "" ? issue.message : `${path} ${issue.message}`];
  });
}

/** Fills the defaults that read another field, which zod cannot express in the schema. */
function resolve(file: z.infer<typeof ManifestSchema>): ResolvedManifest {
  const { repo, verify } = file;
  return {
    repo: {
      ...repo,
      workspaceRootPackage:
        repo.workspaceRootPackage ?? `${repo.packageScope}/${repo.name}`,
    },
    rules: file.rules.modules,
    viamContext: file.viamContext,
    mcp: file.mcp,
    outputStyle: file.outputStyle,
    hooks: file.hooks,
    ci: file.ci,
    verify: {
      lint: verify.lint ?? `${repo.packageManager} lint`,
      check: verify.check ?? `${repo.packageManager} check`,
      test: verify.test ?? `${repo.packageManager} test`,
      build: verify.build ?? `${repo.packageManager} build`,
    },
    workflows: file.workflows,
  };
}

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
  const result = ManifestSchema.safeParse(data, {
    // Only the callback sees `input`, so a missing field can be told apart from a
    // wrong-typed one here but not from the issue list afterwards.
    error: (issue) =>
      issue.code === "invalid_type" && issue.input === undefined
        ? "is required"
        : undefined,
  });
  if (!result.success) throw new ManifestError(problemsFrom(result.error));
  return resolve(result.data);
}
