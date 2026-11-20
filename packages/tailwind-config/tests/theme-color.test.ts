import { readFileSync } from "node:fs";
import path from "node:path";
import { compile } from "@tailwindcss/node";
import postcss from "postcss";
import { afterEach, describe, expect, it, vi } from "vitest";

import { themeColor } from "../theme-color.js";

const packageDirectory = path.resolve(import.meta.dirname, "..");
const stylesheet = readFileSync(
  path.join(packageDirectory, "tailwind-config.css"),
  "utf8",
);

const declaredColorTokens = (): string[] => {
  const names: string[] = [];
  postcss.parse(stylesheet).walkAtRules("theme", (theme) => {
    theme.walkDecls((declaration) => {
      if (declaration.prop.startsWith("--color-")) names.push(declaration.prop);
    });
  });
  return names;
};

const typedColorTokens = (): string[] => {
  const declarations = readFileSync(
    path.join(packageDirectory, "theme-color.d.ts"),
    "utf8",
  );
  return [...declarations.matchAll(/^\s*\| "(--color-[a-z0-9-]+)"/gm)].map(
    ([, name]) => name,
  );
};

const emittedBy = async (candidates: string[]): Promise<string> => {
  const compiler = await compile(`@import "tailwindcss";\n${stylesheet}`, {
    base: packageDirectory,
    onDependency: () => {},
  });
  return compiler.build(candidates);
};

const stubPageWith = (properties: Record<string, string>): void => {
  const root = {};
  vi.stubGlobal("document", { documentElement: root });
  vi.stubGlobal("getComputedStyle", (target: unknown) => ({
    getPropertyValue: (name: string) =>
      target === root ? (properties[name] ?? "") : "",
  }));
};

describe("ThemeColorName", () => {
  it("names every color token the stylesheet declares, and no other", () => {
    expect(typedColorTokens()).toEqual(declaredColorTokens());
  });
});

describe("themeColor", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("returns the document root's value for the token, without the stylesheet's leading space", () => {
    stubPageWith({ "--color-solar-power-bright": " #ffd400" });

    expect(themeColor("--color-solar-power-bright")).toBe("#ffd400");
  });

  it("returns undefined for a token the page does not set", () => {
    stubPageWith({});

    expect(themeColor("--color-solar-power-bright")).toBeUndefined();
  });
});

describe("a color token in the compiled stylesheet", () => {
  it("is left out when no source names it", async () => {
    expect(await emittedBy([])).not.toContain("--color-solar-power-bright:");
  });

  it("is emitted when a source names the whole property, as a themeColor call does", async () => {
    expect(await emittedBy(["--color-solar-power-bright"])).toContain(
      "--color-solar-power-bright: #ffd400",
    );
  });
});
