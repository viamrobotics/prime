import { markdownTable } from "./table.js";
import type { ViamSourceId } from "../types.js";

export interface ViamSourceDef {
  id: ViamSourceId;
  /** GitHub repo under viamrobotics, or null for a docs-only source. */
  repo: string | null;
  /** Published reference docs, or null when the repo is the only reference. */
  docs: string | null;
  /** "Best for" cell in the generated sources table. */
  bestFor: string;
  /** npm package names whose presence in a package.json implies this source. */
  npm?: readonly string[];
  /** Go module paths whose presence in a go.mod implies this source. */
  go?: readonly string[];
  /** PyPI distribution names whose presence in a Python manifest implies this source. */
  pypi?: readonly string[];
}

/**
 * The Viam ecosystem pieces a repo can be given context for, in the order they
 * appear in the generated table. Protos come first because they are the contract
 * every other source implements.
 */
export const VIAM_SOURCES: readonly ViamSourceDef[] = [
  {
    id: "api",
    repo: "api",
    docs: null,
    bestFor:
      "Canonical `.proto` definitions. Prefer over `rdk` for RPC contracts.",
    // Every SDK ships generated proto code, so consuming one means the protos are
    // the real contract behind it.
    npm: ["@viamrobotics/sdk", "@viamrobotics/svelte-sdk"],
    go: ["go.viam.com/api"],
    pypi: ["viam-sdk"],
  },
  {
    id: "rdk",
    repo: "rdk",
    docs: null,
    bestFor: "Go service interface signatures and constants.",
    go: ["go.viam.com/rdk"],
  },
  {
    id: "typescriptSdk",
    repo: "viam-typescript-sdk",
    docs: "https://ts.viam.dev",
    bestFor: "TypeScript types, client patterns, exported API surface.",
    npm: ["@viamrobotics/sdk"],
  },
  {
    id: "svelteSdk",
    repo: "viam-svelte-sdk",
    docs: null,
    bestFor: "Svelte stores and utilities wrapping the TypeScript SDK.",
    npm: ["@viamrobotics/svelte-sdk"],
  },
  {
    id: "testWidgets",
    repo: "test-widgets",
    docs: null,
    bestFor: "Prebaked UI components for testing machine SDK APIs.",
    npm: ["@viamrobotics/test-widgets"],
  },
  {
    id: "motionTools",
    repo: "visualization",
    docs: null,
    bestFor: "Visualization tools for motion and spatial data.",
    npm: ["@viamrobotics/motion-tools"],
  },
  {
    id: "primeCore",
    repo: "prime",
    docs: "https://design.viam.com",
    bestFor: "v1 Svelte component library. Superseded by prime-ui.",
    npm: ["@viamrobotics/prime-core"],
  },
  {
    id: "primeUi",
    repo: "prime",
    docs: "https://design.viam.com",
    bestFor: "v2 Svelte component library.",
    npm: ["@viamrobotics/prime-ui"],
  },
  {
    id: "pythonSdk",
    repo: "viam-python-sdk",
    docs: "https://python.viam.dev",
    bestFor: "Python client API and resource base classes.",
    pypi: ["viam-sdk"],
  },
];

export const VIAM_SOURCE_IDS: readonly ViamSourceId[] = VIAM_SOURCES.map(
  (source) => source.id,
);

/**
 * Evidence gathered from a repo's dependency manifests. npm names are exact keys
 * from package.json, while Go and Python manifests are matched as text because
 * their formats vary too much to parse reliably for this purpose.
 */
export interface ViamSourceEvidence {
  npm: ReadonlySet<string>;
  goText: string;
  pyText: string;
}

/** Best-effort guess at which sources a repo uses. `init` writes the result into the manifest, where it stays editable. */
export function detectViamSources(
  evidence: ViamSourceEvidence,
): Record<ViamSourceId, boolean> {
  return Object.fromEntries(
    VIAM_SOURCES.map((source) => [
      source.id,
      (source.npm ?? []).some((name) => evidence.npm.has(name)) ||
        (source.go ?? []).some((path) => evidence.goText.includes(path)) ||
        (source.pypi ?? []).some((name) => evidence.pyText.includes(name)),
    ]),
  ) as Record<ViamSourceId, boolean>;
}

function reference(source: ViamSourceDef): string {
  const parts: string[] = [];
  if (source.repo !== null) parts.push(`\`viamrobotics/${source.repo}\``);
  if (source.docs !== null) parts.push(source.docs);
  return parts.join(", ");
}

/**
 * Markdown table of the enabled sources, built here rather than in the template
 * because the renderer has no loops.
 */
export function sourcesTable(enabled: readonly ViamSourceDef[]): string {
  return markdownTable(
    ["Source", "Best for"],
    enabled.map((source) => [reference(source), source.bestFor]),
  );
}
