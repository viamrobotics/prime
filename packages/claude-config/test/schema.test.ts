import { readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { MANIFEST_KEYS, parseManifest } from "../src/core/manifest.js";

function read(relativePath: string): string {
  return readFileSync(
    fileURLToPath(new URL(relativePath, import.meta.url)),
    "utf8",
  );
}

const schema = JSON.parse(read("../schema/manifest.schema.json")) as Record<
  string,
  unknown
>;

/** Walks `properties`/`additionalProperties` to the section a MANIFEST_KEYS path names. */
function schemaSection(path: string): Record<string, unknown> {
  let node = schema;
  if (path === "") return node;
  for (const segment of path.split(".")) {
    const properties = node.properties as
      | Record<string, Record<string, unknown>>
      | undefined;
    node =
      segment === "*"
        ? (node.additionalProperties as Record<string, unknown>)
        : properties![segment];
    expect(node, `schema is missing ${path}`).toBeDefined();
  }
  return node;
}

function schemaKeys(path: string): string[] {
  const properties = schemaSection(path).properties as Record<string, unknown>;
  return Object.keys(properties ?? {});
}

describe("schema matches the validator", () => {
  const paths = Object.keys(MANIFEST_KEYS);

  it.each(paths)("accepts the same keys as MANIFEST_KEYS at %s", (path) => {
    const allowed: readonly string[] =
      MANIFEST_KEYS[path as keyof typeof MANIFEST_KEYS];
    expect(new Set(schemaKeys(path))).toEqual(new Set(allowed));
  });

  it.each(paths)("closes %s to unknown keys", (path) => {
    expect(schemaSection(path).additionalProperties).toBe(false);
  });

  it("leaves workflows.overrides open, since stub names are arbitrary", () => {
    const overrides = schemaSection("workflows").properties as Record<
      string,
      Record<string, unknown>
    >;
    expect(overrides.overrides.additionalProperties).not.toBe(false);
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
