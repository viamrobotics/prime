import { readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { buildJsonSchema, parseManifest } from "../src/core/manifest.js";

function read(relativePath: string): string {
  return readFileSync(
    fileURLToPath(new URL(relativePath, import.meta.url)),
    "utf8",
  );
}

describe("published JSON Schema", () => {
  it("is up to date with the zod schema", () => {
    const committed: unknown = JSON.parse(
      read("../schema/manifest.schema.json"),
    );
    expect(
      committed,
      'stale — run "pnpm --filter @viamrobotics/claude-config run schema"',
    ).toEqual(buildJsonSchema());
  });

  it("closes the root to unknown keys", () => {
    expect(buildJsonSchema().additionalProperties).toBe(false);
  });

  it("leaves workflows.overrides open, since stub names are arbitrary", () => {
    const properties = buildJsonSchema().properties as Record<
      string,
      { properties: Record<string, Record<string, unknown>> }
    >;
    expect(
      properties.workflows.properties.overrides.additionalProperties,
    ).not.toBe(false);
  });
});

describe("fixture manifests", () => {
  const dir = fileURLToPath(new URL("./fixtures/manifests/", import.meta.url));
  const names = readdirSync(dir).filter((name) => name.endsWith(".json"));

  it("has fixtures to check", () => {
    expect(names.length).toBeGreaterThan(0);
  });

  it.each(names)("%s parses", (name) => {
    expect(() =>
      parseManifest(read(`./fixtures/manifests/${name}`)),
    ).not.toThrow();
  });
});
