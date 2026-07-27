import { describe, expect, it } from "vitest";
import { ManifestError, parseManifest } from "../src/core/manifest.js";

function parse(value: unknown) {
  return parseManifest(JSON.stringify(value));
}

describe("parseManifest", () => {
  it("applies defaults for a minimal manifest", () => {
    const manifest = parse({ repo: { name: "x", nodeVersion: "22" } });
    expect(manifest.repo.packageManager).toBe("pnpm");
    expect(manifest.repo.packageScope).toBe("@viamrobotics");
    expect(manifest.repo.workspaceRootPackage).toBe("@viamrobotics/x");
    expect(manifest.rules.svelte).toBe(false);
    expect(manifest.mcp.svelteTransport).toBe("none");
    expect(manifest.outputStyle.terse).toBe("default");
    expect(manifest.hooks.sessionStart).toBe(false);
    expect(manifest.workflows.teamMention).toBeNull();
    expect(manifest.verify.lint).toBe("pnpm lint");
  });

  it("requires repo.name", () => {
    expect(() => parse({ repo: { nodeVersion: "22" } })).toThrow(ManifestError);
  });

  it("rejects a non-numeric nodeVersion", () => {
    expect(() => parse({ repo: { name: "x", nodeVersion: "lts" } })).toThrow(
      /nodeVersion/,
    );
  });

  it("rejects an unknown rule module", () => {
    expect(() =>
      parse({
        repo: { name: "x", nodeVersion: "22" },
        rules: { modules: { nope: true } },
      }),
    ).toThrow(/nope/);
  });

  it("accepts the opt-in three rule module (default off)", () => {
    expect(parse({ repo: { name: "x", nodeVersion: "22" } }).rules.three).toBe(
      false,
    );
    expect(
      parse({
        repo: { name: "x", nodeVersion: "22" },
        rules: { modules: { three: true } },
      }).rules.three,
    ).toBe(true);
  });

  it("rejects an invalid enum value", () => {
    expect(() =>
      parse({
        repo: { name: "x", nodeVersion: "22" },
        mcp: { svelteTransport: "ws" },
      }),
    ).toThrow(/svelteTransport/);
  });

  it("rejects an invalid outputStyle state", () => {
    expect(() =>
      parse({
        repo: { name: "x", nodeVersion: "22" },
        outputStyle: { terse: "loud" },
      }),
    ).toThrow(/terse/);
  });

  it("rejects an unknown output style", () => {
    expect(() =>
      parse({
        repo: { name: "x", nodeVersion: "22" },
        outputStyle: { nope: true },
      }),
    ).toThrow(/not a known output style/);
  });

  it("rejects an unknown hook", () => {
    expect(() =>
      parse({ repo: { name: "x", nodeVersion: "22" }, hooks: { nope: true } }),
    ).toThrow(/not a known hook/);
  });

  it('accepts true, false, and "default" for a style', () => {
    expect(
      parse({
        repo: { name: "x", nodeVersion: "22" },
        outputStyle: { terse: true },
      }).outputStyle.terse,
    ).toBe(true);
    expect(
      parse({
        repo: { name: "x", nodeVersion: "22" },
        outputStyle: { terse: false },
      }).outputStyle.terse,
    ).toBe(false);
    expect(
      parse({
        repo: { name: "x", nodeVersion: "22" },
        outputStyle: { terse: "default" },
      }).outputStyle.terse,
    ).toBe("default");
  });

  it("accepts a valid workflow override", () => {
    const manifest = parse({
      repo: { name: "x", nodeVersion: "22" },
      workflows: { overrides: { "ci-fix": { maxTurns: 50 } } },
    });
    expect(manifest.workflows.overrides["ci-fix"].maxTurns).toBe(50);
  });

  it("rejects a non-integer override maxTurns", () => {
    expect(() =>
      parse({
        repo: { name: "x", nodeVersion: "22" },
        workflows: { overrides: { "ci-fix": { maxTurns: 1.5 } } },
      }),
    ).toThrow(/maxTurns/);
  });

  it("rejects a non-object override", () => {
    expect(() =>
      parse({
        repo: { name: "x", nodeVersion: "22" },
        workflows: { overrides: { "ci-fix": 50 } },
      }),
    ).toThrow(/overrides\.ci-fix/);
  });

  it("reports all problems at once", () => {
    try {
      parse({ repo: { nodeVersion: 22 } });
      expect.unreachable("should have thrown");
    } catch (error) {
      expect(error).toBeInstanceOf(ManifestError);
      expect((error as ManifestError).problems.length).toBeGreaterThan(1);
    }
  });
});
