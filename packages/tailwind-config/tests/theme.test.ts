import { readFileSync } from "node:fs";
import path from "node:path";
import { compile, optimize } from "@tailwindcss/node";
import postcss, { AtRule, type Container, type Root, type Rule } from "postcss";
import { beforeAll, describe, expect, it } from "vitest";

const packageDirectory = path.resolve(import.meta.dirname, "..");
const DARK_SCHEME_MEDIA = "(prefers-color-scheme: dark)";
const CHROME_CLASSES = [
  "button",
  "button-primary",
  "button-ghost",
  "button-danger",
  "button-outline-danger",
  "button-success",
  "icon-button",
  "icon-button-secondary",
  "icon-button-danger",
  "badge",
  "badge-success",
  "badge-warning",
  "badge-danger",
  "badge-neutral",
  "pill",
  "pill-outline",
  "kbd",
  "avatar",
  "progress-dots",
  "input",
  "focus-ring",
  "focus-ring-within",
];
const CANDIDATES = [
  "dark:bg-gray-9",
  "bg-extralight",
  "bg-gray-0",
  "text-display",
  "text-code",
  "bg-heading",
  "text-xs",
  "px-4",
  ...CHROME_CLASSES,
];

const rulesOf = (root: Root, matches: (rule: Rule) => boolean): Rule[] => {
  const found: Rule[] = [];
  root.walkRules((rule) => {
    if (matches(rule)) found.push(rule);
  });
  return found;
};

const onlyRule = (root: Root, selectors: string): Rule => {
  const found = rulesOf(
    root,
    (rule) => rule.selectors.join(", ") === selectors,
  );
  expect(found).toHaveLength(1);
  return found[0]!;
};

const declarationsOf = (container: Container): Map<string, string> => {
  const declarations = new Map<string, string>();
  container.each((node) => {
    if (node.type === "decl") declarations.set(node.prop, node.value);
  });
  return declarations;
};

const startsWithClass = (rule: Rule, name: string): boolean =>
  rule.selectors.some((selector) =>
    new RegExp(`^\\.${name}(?![\\w-])`).test(selector),
  );

const firstRuleIndex = (root: Root, name: string): number =>
  rulesOf(root, () => true).findIndex((rule) => startsWithClass(rule, name));

const enclosingMedia = (rule: Rule): string | undefined => {
  let ancestor: Container | undefined = rule.parent;
  while (ancestor) {
    if (ancestor instanceof AtRule && ancestor.name === "media") {
      return ancestor.params;
    }
    ancestor = ancestor.parent as Container | undefined;
  }
  return undefined;
};

const propertyNames = (rule: Rule): string[] =>
  [...declarationsOf(rule).keys()].sort();

const stripPrefix = (names: string[], prefix: string): string[] =>
  names
    .filter((name) => name.startsWith(prefix))
    .map((name) => `--${name.slice(prefix.length)}`)
    .sort();

describe("theme stylesheets compiled through Tailwind", () => {
  let emitted: Root;
  let unoptimized: Root;
  let themeDefaults: Map<string, string>;

  beforeAll(async () => {
    const compiler = await compile(
      `@import "tailwindcss";\n@import "./tailwind-config.css";\n@import "./tailwind-config-dark.css";`,
      { base: packageDirectory, onDependency() {} },
    );
    const built = compiler.build([...CANDIDATES]);
    emitted = postcss.parse(optimize(built).code);
    unoptimized = postcss.parse(built);

    themeDefaults = new Map();
    postcss
      .parse(
        readFileSync(
          path.join(packageDirectory, "tailwind-config.css"),
          "utf8",
        ),
      )
      .walkAtRules("theme", (theme) => {
        for (const [name, value] of declarationsOf(theme)) {
          themeDefaults.set(name, value);
        }
      });
  });

  it("emits the dark variant as a class rule and a media rule, both skipping .light", () => {
    const variantRules = rulesOf(emitted, (rule) =>
      rule.selector.startsWith(String.raw`.dark\:bg-gray-9`),
    );
    expect(variantRules).toHaveLength(2);

    const classRules = variantRules.filter(
      (rule) => enclosingMedia(rule) === undefined,
    );
    const mediaRules = variantRules.filter(
      (rule) => enclosingMedia(rule) === DARK_SCHEME_MEDIA,
    );
    expect(classRules).toHaveLength(1);
    expect(mediaRules).toHaveLength(1);

    expect(classRules[0]!.selector).toContain(".dark *");
    expect(classRules[0]!.selector).toContain(":not(.light, .light *)");
    expect(mediaRules[0]!.selector).not.toContain(".dark *");
    expect(mediaRules[0]!.selector).toContain(":not(.light, .light *)");

    expect(
      variantRules.map((rule) => declarationsOf(rule).get("background-color")),
    ).toStrictEqual(["var(--color-gray-9)", "var(--color-gray-9)"]);
  });

  it("assigns the same custom properties in .dark, .light, and the media scope as the --dark-* and --light-* definitions", () => {
    const rootNames = propertyNames(onlyRule(emitted, ":root"));
    const darkTokens = stripPrefix(rootNames, "--dark-");
    expect(darkTokens.length).toBeGreaterThan(0);

    expect(stripPrefix(rootNames, "--light-")).toEqual(darkTokens);
    expect(propertyNames(onlyRule(emitted, ".dark"))).toEqual(darkTokens);
    expect(propertyNames(onlyRule(emitted, ".light"))).toEqual(darkTokens);
    expect(propertyNames(onlyRule(emitted, ":root:not(.light)"))).toEqual(
      darkTokens,
    );
  });

  it("restores the light default through .light", () => {
    const rootDeclarations = declarationsOf(onlyRule(emitted, ":root"));
    const emittedTheme = declarationsOf(onlyRule(emitted, ":root, :host"));

    expect(
      declarationsOf(onlyRule(emitted, ".light")).get("--color-heading"),
    ).toBe("var(--light-color-heading)");
    expect(emittedTheme.get("--color-heading")).toBe("#131414");
    expect(rootDeclarations.get("--light-color-heading")).toBe(
      emittedTheme.get("--color-heading"),
    );
  });

  it("holds every --light-* value equal to its @theme default in tailwind-config.css", () => {
    const lightDefaults = [...declarationsOf(onlyRule(unoptimized, ":root"))]
      .filter(([name]) => name.startsWith("--light-"))
      .map(([name, value]) => [`--${name.slice("--light-".length)}`, value]);
    expect(lightDefaults.length).toBeGreaterThan(0);

    const expected = lightDefaults.map(([name]) => [
      name,
      themeDefaults.get(name!),
    ]);
    expect(Object.fromEntries(lightDefaults)).toStrictEqual(
      Object.fromEntries(expected),
    );
  });

  it("orders the .light rule after the .dark rule", () => {
    const allRules = rulesOf(emitted, () => true);
    const darkIndex = allRules.indexOf(onlyRule(emitted, ".dark"));
    const lightIndex = allRules.indexOf(onlyRule(emitted, ".light"));
    expect(darkIndex).toBeGreaterThanOrEqual(0);
    expect(lightIndex).toBeGreaterThan(darkIndex);
  });

  it("derives bg-extralight from gray-0, which adapts in dark", () => {
    const [extralight] = rulesOf(emitted, (rule) =>
      rule.selectors.includes(".bg-extralight"),
    );
    expect(declarationsOf(extralight!).get("background-color")).toBe(
      "var(--color-gray-0)",
    );
    expect(
      declarationsOf(onlyRule(emitted, ":root, :host")).get("--color-gray-0"),
    ).toBe("#fbfbfc");
    expect(
      declarationsOf(onlyRule(emitted, ".dark")).get("--color-gray-0"),
    ).toBe("var(--dark-color-gray-0)");
  });

  it("declares text-display and text-code from the type tokens", () => {
    const display = declarationsOf(onlyRule(unoptimized, ".text-display"));
    expect(Object.fromEntries(display)).toStrictEqual({
      "font-family": "var(--font-space-grotesk)",
      "font-weight": "500",
      "font-size": "1.5rem",
      "line-height": "1.625rem",
    });

    const code = declarationsOf(onlyRule(unoptimized, ".text-code"));
    expect(Object.fromEntries(code)).toStrictEqual({
      "font-family": "var(--font-roboto-mono)",
      "font-size": "var(--text-xs)",
      "line-height": "var(--text-xs--line-height)",
    });

    const theme = declarationsOf(onlyRule(unoptimized, ":root, :host"));
    expect(theme.get("--text-xs")).toBe("0.75rem");
    expect(theme.get("--text-xs--line-height")).toBe("calc(1 / 0.75)");
  });

  it.each(CHROME_CLASSES)("emits at least one rule for .%s", (name) => {
    const found = rulesOf(emitted, (rule) => startsWithClass(rule, name));
    expect(found.length, `no rule starts with .${name}`).toBeGreaterThan(0);
  });

  it("draws the focus ring on .button:focus-visible", () => {
    const [ring] = rulesOf(
      emitted,
      (rule) => rule.selector === ".button:focus-visible",
    );
    const declarations = declarationsOf(ring!);
    expect(declarations.get("outline")).toBe(
      "2px solid var(--color-power-button-dark)",
    );
    expect(declarations.get("outline-offset")).toBe("2px");
  });

  it("emits .button before .px-4 so a later utility wins", () => {
    const buttonIndex = firstRuleIndex(emitted, "button");
    const paddingIndex = firstRuleIndex(emitted, "px-4");
    expect(buttonIndex).toBeGreaterThanOrEqual(0);
    expect(paddingIndex).toBeGreaterThan(buttonIndex);
  });

  it("emits .button-primary after .button so the modifier wins", () => {
    const buttonIndex = firstRuleIndex(emitted, "button");
    const modifierIndex = firstRuleIndex(emitted, "button-primary");
    expect(buttonIndex).toBeGreaterThanOrEqual(0);
    expect(modifierIndex).toBeGreaterThan(buttonIndex);
  });

  it("gives .input the danger border when aria-invalid is true", () => {
    const [invalid] = rulesOf(
      emitted,
      (rule) =>
        rule.selector.startsWith(".input:is(") &&
        rule.selector.includes('[aria-invalid="true"]'),
    );
    expect(declarationsOf(invalid!).get("border-color")).toBe(
      "var(--color-danger-dark)",
    );
  });

  it("gives a disabled .button the not-allowed cursor", () => {
    const [disabled] = rulesOf(
      emitted,
      (rule) =>
        rule.selector === '.button:is(:disabled, [aria-disabled="true"])',
    );
    expect(declarationsOf(disabled!).get("cursor")).toBe("not-allowed");
  });

  it("emits the progress-dots keyframes with 10 stops", () => {
    const keyframes: AtRule[] = [];
    emitted.walkAtRules("keyframes", (atRule) => {
      if (atRule.params === "progress-dots") keyframes.push(atRule);
    });
    expect(keyframes).toHaveLength(1);

    const stops = (keyframes[0]!.nodes ?? [])
      .filter((node): node is Rule => node.type === "rule")
      .map((rule) => rule.selector);
    expect(stops).toStrictEqual([
      "0%",
      "10%",
      "20%",
      "30%",
      "40%",
      "50%",
      "60%",
      "70%",
      "80%",
      "90%",
    ]);
  });
});
