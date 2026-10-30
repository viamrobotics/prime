import { readFileSync } from "node:fs";
import path from "node:path";
import { compile, optimize } from "@tailwindcss/node";
import postcss, { AtRule, type Container, type Root, Rule } from "postcss";
import { beforeAll, describe, expect, it } from "vitest";

const packageDirectory = path.resolve(import.meta.dirname, "..");
const DARK_SCHEME_MEDIA = "(prefers-color-scheme: dark)";
const CHROME_CLASSES = [
  "button",
  "button-dark",
  "button-danger",
  "button-warning",
  "button-success",
  "button-info",
  "button-outline",
  "button-ghost",
  "icon-button",
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
  "banner",
  "banner-info",
  "banner-success",
  "banner-warning",
  "banner-danger",
  "banner-site",
  "banner-chip",
  "banner-title",
  "banner-description",
  "banner-actions",
  "banner-details",
  "banner-close",
  "banner-progress",
  "progress",
  "input",
  "focus-ring",
  "focus-ring-within",
];
const BUTTON_COLORS = [
  "button-dark",
  "button-danger",
  "button-warning",
  "button-success",
  "button-info",
];
const BANNER_VARIANTS = [
  ["info", "var(--color-info-light)", "var(--color-info-dark)"],
  ["success", "var(--color-success-light)", "var(--color-success-dark)"],
  ["warning", "var(--color-warning-light)", "var(--color-warning-dark)"],
  ["danger", "var(--color-danger-light)", "var(--color-danger-dark)"],
] as const;

const CANDIDATES = [
  "dark:bg-gray-9",
  "bg-extralight",
  "bg-gray-0",
  "text-display",
  "text-code",
  "bg-heading",
  "text-xs",
  "px-4",
  "z-dialog",
  "z-tooltip",
  "z-max",
  "z-50",
  "z-1150",
  "z-nope",
  ...CHROME_CLASSES,
];

const Z_LAYERS = [
  ["sticky", "100"],
  ["overlay", "1000"],
  ["dialog", "1100"],
  ["popover", "1200"],
  ["menu", "1200"],
  ["toast", "1300"],
  ["tooltip", "1400"],
  ["max", "9999"],
] as const;

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

const declared = (root: Root, selector: string): Map<string, string> =>
  declarationsOf(onlyRule(root, selector));

const startsWithClass = (rule: Rule, name: string): boolean =>
  rule.selectors.some((selector) =>
    new RegExp(`^\\.${name}(?![\\w-])`).test(selector),
  );

// The guard stays nested under its rule or is hoisted around a copy of it, depending on the
// optimizer, so the declarations are read from whichever node holds them.
const contrastGuards = (root: Root, name: string): Container[] => {
  const guards: Container[] = [];
  root.walkAtRules("supports", (atRule) => {
    if (!atRule.params.includes("contrast-color(red)")) return;
    const nested = atRule.parent instanceof Rule;
    const owner = nested ? atRule.parent : atRule.first;
    if (owner instanceof Rule && owner.selector.startsWith(`.${name}:`)) {
      guards.push(nested ? atRule : owner);
    }
  });
  return guards;
};

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

  it.each(Z_LAYERS)(
    "emits z-%s as z-index: var(--z-%s) with the token set to %s",
    async (name, value) => {
      const compiler = await compile(
        `@import "tailwindcss";\n@import "./tailwind-config.css";`,
        { base: packageDirectory, onDependency() {} },
      );
      const built = postcss.parse(compiler.build([`z-${name}`]));
      const rule = onlyRule(built, `.z-${name}`);
      expect(declarationsOf(rule).get("z-index")).toBe(`var(--z-${name})`);
      expect(themeDefaults.get(`--z-${name}`)).toBe(value);
    },
  );

  it("emits bare z numbers through Tailwind's own utility", () => {
    expect(declarationsOf(onlyRule(unoptimized, ".z-50")).get("z-index")).toBe(
      "50",
    );
    expect(
      declarationsOf(onlyRule(unoptimized, ".z-1150")).get("z-index"),
    ).toBe("1150");
  });

  it("emits no rule for an unknown z name", () => {
    expect(
      rulesOf(unoptimized, (rule) => startsWithClass(rule, "z-nope")),
    ).toHaveLength(0);
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
    expect(declarations.get("outline")).toBe("2px solid var(--color-link)");
    expect(declarations.get("outline-offset")).toBe("2px");
  });

  it("emits .button before .px-4 so a later utility wins", () => {
    const buttonIndex = firstRuleIndex(emitted, "button");
    const paddingIndex = firstRuleIndex(emitted, "px-4");
    expect(buttonIndex).toBeGreaterThanOrEqual(0);
    expect(paddingIndex).toBeGreaterThan(buttonIndex);
  });

  it.each(BUTTON_COLORS)(
    "emits .%s after .button and .icon-button so the color wins",
    (name) => {
      const colorIndex = firstRuleIndex(emitted, name);
      expect(colorIndex).toBeGreaterThan(firstRuleIndex(emitted, "button"));
      expect(colorIndex).toBeGreaterThan(
        firstRuleIndex(emitted, "icon-button"),
      );
    },
  );

  it.each(BUTTON_COLORS)(
    "paints .%s solid only without a fill modifier and only when enabled",
    (name) => {
      const solid = rulesOf(
        emitted,
        (rule) =>
          rule.selector ===
            `.${name}:not(:disabled, [aria-disabled="true"], .button-outline, .button-ghost)` &&
          !(rule.parent instanceof AtRule && rule.parent.name === "supports"),
      );
      expect(solid).toHaveLength(1);
      expect(declarationsOf(solid[0]!).get("background-color")).toBe(
        "var(--button-dark)",
      );
    },
  );

  it.each(BUTTON_COLORS)(
    "paints .%s text with contrast-color behind an @supports guard",
    (name) => {
      const guards = contrastGuards(emitted, name);
      expect(guards).toHaveLength(1);
      expect(declarationsOf(guards[0]!).get("color")).toBe(
        "contrast-color(var(--button-dark))",
      );
    },
  );

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

  it("replaces the native arrow on a single .input select and pads for the chevron", () => {
    const [select] = rulesOf(
      emitted,
      (rule) => rule.selector === ".input:is(select:not([multiple]))",
    );
    const declarations = declarationsOf(select!);
    expect(declarations.get("appearance")).toBe("none");
    expect(declarations.get("padding-right")).toBe("calc(var(--spacing) * 7)");
    expect(declarations.get("background-image")).toContain(
      "var(--color-subtle-2)",
    );
  });

  it.each(["button", "icon-button"])(
    "lets .%s pass its text color to progress-dots inside it",
    (name) => {
      const rules = rulesOf(
        emitted,
        (rule) => rule.selector === `.${name} .progress-dots`,
      );
      expect(rules).toHaveLength(1);
      expect(declarationsOf(rules[0]!).get("color")).toBe("inherit");
    },
  );

  it("paints warning text with the text-grade warning token on the badge, the hint color, and the warning button fills", () => {
    const badge = rulesOf(
      emitted,
      (rule) => rule.selector === ".badge-warning",
    );
    expect(declarationsOf(badge[0]!).get("color")).toBe(
      "var(--color-warning-text)",
    );
    const warning = rulesOf(
      emitted,
      (rule) => rule.selector === ".button-warning",
    );
    expect(declarationsOf(warning[0]!).get("--button-text")).toBe(
      "var(--color-warning-text)",
    );
    for (const fill of ["button-outline", "button-ghost"]) {
      const rule = rulesOf(emitted, (r) => r.selector === `.${fill}`);
      expect(declarationsOf(rule[0]!).get("color"), fill).toBe(
        "var(--button-text)",
      );
    }
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

  it("lays .banner out as the compact one-liner by default", () => {
    const compact = declared(emitted, ".banner");
    expect(compact.get("display")).toBe("grid");
    expect(compact.get("position")).toBe("relative");
    expect(compact.get("grid-template-columns")).toBe(
      "auto minmax(0, 1fr) auto auto",
    );
    expect(compact.get("min-height")).toBe("calc(var(--spacing) * 10)");
    expect(compact.get("padding")).toBe("calc(var(--spacing) * 1.5)");
    expect(compact.get("align-items")).toBe("center");
    expect(compact.get("border-width")).toBe("1px");
    expect(compact.get("border-color")).toBe("var(--color-gray-3)");
    expect(compact.get("background-color")).toBe("var(--color-white)");
  });

  it("spaces .banner columns with part margins, never a grid gap, and keeps the corners square", () => {
    const compact = declared(emitted, ".banner");
    for (const property of ["gap", "column-gap", "border-radius"]) {
      expect(compact.has(property), property).toBe(false);
    }
  });

  it("switches .banner to the stacked padding and top alignment when it holds a .banner-title", () => {
    const stacked = declared(emitted, ".banner:has(.banner-title)");
    expect(stacked.get("padding-block")).toBe("calc(var(--spacing) * 3)");
    expect(stacked.get("padding-right")).toBe("calc(var(--spacing) * 3)");
    expect(stacked.get("padding-left")).toBe("calc(var(--spacing) * 4)");
    expect(stacked.get("align-items")).toBe("flex-start");
  });

  it("sizes the chip 28px with a 16px glyph, and 32px with a 20px glyph once stacked", () => {
    const compact = declared(emitted, ".banner-chip");
    expect(compact.get("width")).toBe("calc(var(--spacing) * 7)");
    expect(compact.get("height")).toBe("calc(var(--spacing) * 7)");
    expect(compact.get("margin-right")).toBe("calc(var(--spacing) * 3)");
    expect(compact.get("background-color")).toBe("var(--banner-light)");
    expect(compact.get("color")).toBe("var(--banner-dark)");
    expect(declared(emitted, ".banner-chip > svg").get("width")).toBe(
      "calc(var(--spacing) * 4)",
    );

    const stacked = declared(
      emitted,
      ".banner:has(.banner-title) .banner-chip",
    );
    expect(stacked.get("width")).toBe("calc(var(--spacing) * 8)");
    expect(stacked.get("height")).toBe("calc(var(--spacing) * 8)");
    expect(stacked.get("grid-row")).toBe("1 / span 4");
    expect(
      declared(emitted, ".banner:has(.banner-title) .banner-chip > svg").get(
        "width",
      ),
    ).toBe("calc(var(--spacing) * 5)");
  });

  it("sets the banner body in the default color compact and in subtle-1 once stacked", () => {
    expect(declared(emitted, ".banner-description").get("color")).toBe(
      "var(--color-default)",
    );
    const stacked = declared(
      emitted,
      ".banner:has(.banner-title) .banner-description",
    );
    expect(stacked.get("color")).toBe("var(--color-subtle-1)");
    expect(stacked.get("margin-top")).toBe("calc(var(--spacing) * .5)");
  });

  it("sets the banner title semibold in the default color in the content column", () => {
    const title = declared(emitted, ".banner-title");
    expect(title.get("font-weight")).toBe("var(--font-weight-semibold)");
    expect(title.get("color")).toBe("var(--color-default)");
    expect(title.get("grid-column-start")).toBe("2");
  });

  it("places .banner-actions under the text stacked and in the third column compact", () => {
    const stacked = declared(emitted, ".banner-actions");
    expect(stacked.get("display")).toBe("flex");
    expect(stacked.get("grid-column-start")).toBe("2");
    expect(stacked.get("gap")).toBe("calc(var(--spacing) * 4)");
    expect(stacked.get("margin-top")).toBe("calc(var(--spacing) * 2)");

    const compact = declared(
      emitted,
      ".banner:not(:has(.banner-title)) .banner-actions",
    );
    expect(compact.get("grid-column-start")).toBe("3");
    expect(compact.get("grid-row-start")).toBe("1");
    expect(compact.get("margin-left")).toBe("calc(var(--spacing) * 4)");
    expect(compact.get("margin-top")).toBe("calc(var(--spacing) * 0)");
  });

  it("sets .banner-details under a divider in the content column", () => {
    const details = declared(emitted, ".banner-details");
    expect(details.get("grid-column-start")).toBe("2");
    expect(details.get("margin-top")).toBe("calc(var(--spacing) * 2)");
    expect(details.get("border-top-width")).toBe("1px");
    expect(details.get("border-color")).toBe("var(--color-gray-3)");
    expect(details.get("padding-top")).toBe("calc(var(--spacing) * 2)");
  });

  it("puts .banner-close in the fourth column, pulled into the padding once stacked and centered without growing the row compact", () => {
    const close = declared(emitted, ".banner-close");
    expect(close.get("grid-column-start")).toBe("4");
    expect(close.get("grid-row-start")).toBe("1");
    expect(close.get("margin-left")).toBe("calc(var(--spacing) * 3)");

    const stacked = declared(
      emitted,
      ".banner:has(.banner-title) .banner-close",
    );
    expect(stacked.get("margin-top")).toBe("calc(var(--spacing) * -1.5)");
    expect(stacked.get("margin-right")).toBe("calc(var(--spacing) * -1.5)");

    const compact = declared(
      emitted,
      ".banner:not(:has(.banner-title)) .banner-close",
    );
    expect(compact.get("margin-block")).toBe("-1px");
  });

  it.each(BANNER_VARIANTS)(
    "sets both banner custom properties on .banner-%s",
    (name, light, dark) => {
      const declarations = declared(emitted, `.banner-${name}`);
      expect(declarations.get("--banner-light")).toBe(light);
      expect(declarations.get("--banner-dark")).toBe(dark);
    },
  );

  it("defaults .banner to the info tokens behind a guard that excludes every other variant", () => {
    const declarations = declared(
      emitted,
      ".banner:not(.banner-success, .banner-warning, .banner-danger)",
    );
    expect(declarations.get("--banner-light")).toBe("var(--color-info-light)");
    expect(declarations.get("--banner-dark")).toBe("var(--color-info-dark)");
    expect(declared(emitted, ".banner").has("--banner-light")).toBe(false);
  });

  it("drops the side and top borders on .banner-site with a rule that outranks .banner", () => {
    expect(declared(emitted, ".banner-site").get("width")).toBe("100%");
    const site = declared(emitted, ".banner-site.banner");
    expect(site.get("border-inline-width")).toBe("0");
    expect(site.get("border-top-width")).toBe("0");
    expect(site.has("border-bottom-width")).toBe(false);
  });

  it("pins .banner-progress to the bottom edge and outranks the track's relative position", () => {
    const pinned = declared(emitted, ".banner-progress");
    expect(pinned.get("position")).toBe("absolute");
    expect(pinned.get("inset-inline")).toBe("calc(var(--spacing) * 0)");
    expect(pinned.get("bottom")).toBe("calc(var(--spacing) * 0)");
    expect(declared(emitted, ".progress").get("position")).toBe("relative");
    expect(declared(emitted, ".banner-progress.progress").get("position")).toBe(
      "absolute",
    );
  });

  it("draws .progress as a 3px gray-2 track that clips an info-dark fill", () => {
    const track = declared(emitted, ".progress");
    expect(track.get("display")).toBe("block");
    expect(track.get("width")).toBe("100%");
    expect(track.get("height")).toBe("calc(var(--spacing) * .75)");
    expect(track.get("overflow")).toBe("hidden");
    expect(track.get("background-color")).toBe("var(--color-gray-2)");

    const fill = declared(emitted, ".progress > .progress-fill");
    expect(fill.get("height")).toBe("100%");
    expect(fill.get("background-color")).toBe("var(--color-info-dark)");
    expect(fill.has("animation")).toBe(false);
  });

  it("animates the indeterminate .progress fill only under the no-preference motion query", () => {
    const indeterminate = rulesOf(
      emitted,
      (rule) =>
        rule.selector === ".progress:not([aria-valuenow]) > .progress-fill",
    );
    const sized = indeterminate.filter((rule) =>
      declarationsOf(rule).has("width"),
    );
    expect(sized).toHaveLength(1);
    expect(declarationsOf(sized[0]!).get("width")).toBe("40%");
    expect(enclosingMedia(sized[0]!)).toBeUndefined();

    const animated = indeterminate.filter((rule) =>
      declarationsOf(rule).has("animation"),
    );
    expect(animated).toHaveLength(1);
    expect(declarationsOf(animated[0]!).get("animation")).toBe(
      "1.5s ease-in-out infinite progress-indeterminate",
    );
    expect(enclosingMedia(animated[0]!)).toBe(
      "(prefers-reduced-motion: no-preference)",
    );
  });

  it("emits the progress-indeterminate keyframes sliding from -100% to 250%", () => {
    const keyframes: AtRule[] = [];
    emitted.walkAtRules("keyframes", (atRule) => {
      if (atRule.params === "progress-indeterminate") keyframes.push(atRule);
    });
    expect(keyframes).toHaveLength(1);

    const stops = new Map(
      (keyframes[0]!.nodes ?? [])
        .filter((node): node is Rule => node.type === "rule")
        .map((rule) => [rule.selector, declarationsOf(rule).get("transform")]),
    );
    expect([...stops.keys()]).toStrictEqual(["from", "to"]);
    expect(stops.get("from")).toBe("translateX(-100%)");
    expect(stops.get("to")).toBe("translateX(250%)");
  });
});
