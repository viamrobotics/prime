import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { parseManifest } from "../src/core/manifest.js";
import { buildPlan } from "../src/core/plan.js";

const FIXTURES = ["prime", "viam-svelte-sdk", "test-widgets", "visualization"];

function loadFixture(name: string) {
  const path = fileURLToPath(
    new URL(`./fixtures/manifests/${name}.json`, import.meta.url),
  );
  return parseManifest(readFileSync(path, "utf8"));
}

describe("buildPlan snapshots", () => {
  for (const name of FIXTURES) {
    it(`renders the ${name} plan`, () => {
      const plan = buildPlan(loadFixture(name));
      const serialized = plan.items
        .map(
          (item) =>
            `--- ${item.path} (${item.kind}, ${item.module}) ---\n${item.content}`,
        )
        .join("\n\n");
      expect(serialized).toMatchSnapshot();
    });
  }
});

describe("anti-rot", () => {
  it("keeps Go/foreign tech out of TS + Svelte rule sets", () => {
    for (const name of ["prime", "viam-svelte-sdk", "test-widgets"]) {
      const plan = buildPlan(loadFixture(name));
      const rules = plan.items
        .filter((item) => item.path.startsWith(".claude/rules/"))
        .map((item) => item.content)
        .join("\n");
      expect(rules, `${name} rules should be clean`).not.toMatch(
        /golangci-lint|go vet|Koota/,
      );
    }
  });

  it("omits design-system from a repo with no UI", () => {
    const plan = buildPlan(
      parseManifest(
        JSON.stringify({
          repo: { name: "rdk", nodeVersion: "22" },
          rules: { modules: { go: true, testingGo: true } },
        }),
      ),
    );
    expect(plan.items.map((item) => item.path)).not.toContain(
      ".claude/rules/design-system.md",
    );
  });
});
