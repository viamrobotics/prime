import { describe, expect, it } from "vitest";
import { parseManifest } from "../src/core/manifest.js";
import { buildPlan } from "../src/core/plan.js";
import {
  VIAM_SOURCES,
  detectViamSources,
  sourcesTable,
} from "../src/core/viam-sources.js";
import type { ViamSourceEvidence } from "../src/core/viam-sources.js";

const NO_EVIDENCE: ViamSourceEvidence = {
  npm: new Set(),
  goText: "",
  pyText: "",
};

function evidence(partial: Partial<ViamSourceEvidence>): ViamSourceEvidence {
  return { ...NO_EVIDENCE, ...partial };
}

function viamContextRule(manifest: string): string | undefined {
  return buildPlan(parseManifest(manifest)).items.find((item) =>
    item.path.endsWith("viam-context.md"),
  )?.content;
}

function manifest(sources: Record<string, boolean>, enabled = true): string {
  return JSON.stringify({
    repo: { name: "demo", nodeVersion: "22" },
    rules: { modules: { viamContext: enabled } },
    viamContext: { sources },
  });
}

describe("detectViamSources", () => {
  it("detects npm packages by exact name", () => {
    const found = detectViamSources(
      evidence({ npm: new Set(["@viamrobotics/svelte-sdk", "svelte"]) }),
    );
    expect(found.svelteSdk).toBe(true);
    expect(found.typescriptSdk).toBe(false);
  });

  it("does not match a package that merely shares a prefix", () => {
    const found = detectViamSources(
      evidence({ npm: new Set(["@viamrobotics/sdk-extras"]) }),
    );
    expect(found.typescriptSdk).toBe(false);
  });

  it("detects Go modules from go.mod text", () => {
    const found = detectViamSources(
      evidence({ goText: "require (\n\tgo.viam.com/rdk v0.1.0\n)" }),
    );
    expect(found.rdk).toBe(true);
    expect(found.api).toBe(false);
  });

  it("detects the Python SDK from a requirements file", () => {
    const found = detectViamSources(evidence({ pyText: "viam-sdk==0.79.2" }));
    expect(found.pythonSdk).toBe(true);
  });

  it("returns every source as false with no evidence", () => {
    expect(Object.values(detectViamSources(NO_EVIDENCE))).not.toContain(true);
  });

  it("covers every registered source id", () => {
    expect(Object.keys(detectViamSources(NO_EVIDENCE))).toEqual(
      VIAM_SOURCES.map((source) => source.id),
    );
  });
});

describe("sourcesTable", () => {
  it("pads every row to the same width", () => {
    const rows = sourcesTable(VIAM_SOURCES).split("\n");
    const widths = new Set(rows.map((row) => row.length));
    expect(widths.size).toBe(1);
  });

  it("lists the docs URL alongside the repo when a source has both", () => {
    const table = sourcesTable(
      VIAM_SOURCES.filter((source) => source.id === "typescriptSdk"),
    );
    expect(table).toContain("`viamrobotics/viam-typescript-sdk`");
    expect(table).toContain("https://ts.viam.dev");
  });
});

describe("viam-context rule", () => {
  it("lists only the enabled sources", () => {
    const rule = viamContextRule(manifest({ svelteSdk: true }));
    expect(rule).toContain("viamrobotics/viam-svelte-sdk");
    expect(rule).not.toContain("viamrobotics/rdk");
  });

  it("includes the Go search caveat only when rdk is enabled", () => {
    expect(viamContextRule(manifest({ api: true }))).not.toContain(
      "Go search limits",
    );
    expect(viamContextRule(manifest({ rdk: true }))).toContain(
      "Go search limits",
    );
  });

  it("always points at the Viam docs", () => {
    expect(viamContextRule(manifest({}))).toContain("https://docs.viam.com");
  });

  it("says how to add sources when none are enabled", () => {
    expect(viamContextRule(manifest({}))).toContain("viamContext.sources");
  });

  it("ends with exactly one trailing newline", () => {
    const cases: Record<string, boolean>[] = [{ rdk: true }, { api: true }, {}];
    for (const sources of cases) {
      expect(viamContextRule(manifest(sources))).toMatch(/[^\n]\n$/);
    }
  });

  it("is not installed when the module is off", () => {
    expect(viamContextRule(manifest({ rdk: true }, false))).toBeUndefined();
  });
});

describe("manifest validation", () => {
  it("rejects an unknown source id", () => {
    expect(() => parseManifest(manifest({ notAThing: true }))).toThrow(
      /not a known Viam source/,
    );
  });
});
