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
  "button-pending",
  "button-outline",
  "button-ghost",
  "icon-button",
  "badge",
  "badge-success",
  "badge-warning",
  "badge-danger",
  "badge-pending",
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
  "banner-pending",
  "banner-block",
  "banner-chip",
  "banner-title",
  "banner-description",
  "banner-actions",
  "banner-details",
  "banner-close",
  "banner-progress",
  "progress",
  "input",
  "input-compact",
  "button-compact",
  "status-dot",
  "status-dot-info",
  "status-dot-warning",
  "status-dot-success",
  "status-dot-danger",
  "status-dot-disabled",
  "status-dot-hollow",
  "shadow-popover",
  "shadow-dialog",
  "focus-ring",
  "focus-ring-within",
];
const BUTTON_COLORS = [
  "button-dark",
  "button-danger",
  "button-warning",
  "button-success",
  "button-info",
  "button-pending",
];
const BANNER_VARIANTS = [
  ["info", "var(--color-info-light)", "var(--color-info-dark)"],
  ["success", "var(--color-success-light)", "var(--color-success-dark)"],
  ["warning", "var(--color-warning-light)", "var(--color-warning-dark)"],
  ["danger", "var(--color-danger-light)", "var(--color-danger-dark)"],
  ["pending", "var(--color-pending-light)", "var(--color-pending-dark)"],
] as const;

const CANDIDATES = [
  "slider-thumb-w-3",
  "slider-thumb-h-3",
  "slider-track-h-1",
  "slider-thumb-w-foo",
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
  "shadow-sm",
  "shadow-popover/50",
  "shadow-red-500",
  "shadow-color-popover",
  ...CHROME_CLASSES,
];

const UNSET_SHADOW_LAYERS = "0 0 #0000, 0 0 #0000, 0 0 #0000, 0 0 #0000";
const ELEVATIONS = [
  ["sm", "0 4px 32px rgba(0, 0, 0, 0.06)", "0 4px 32px rgba(0, 0, 0, 0.4)"],
  [
    "popover",
    "0 8px 24px rgba(0, 0, 0, 0.12)",
    "0 8px 24px rgba(0, 0, 0, 0.5)",
  ],
  [
    "dialog",
    "0 12px 48px rgba(0, 0, 0, 0.25)",
    "0 12px 48px rgba(0, 0, 0, 0.6)",
  ],
] as const;

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

const rulesOf = (
  container: Container,
  matches: (rule: Rule) => boolean,
): Rule[] => {
  const found: Rule[] = [];
  container.walkRules((rule) => {
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

interface CustomPropertyReference {
  name: string;
  fallback: string | undefined;
  start: number;
  end: number;
}

const firstCustomPropertyReference = (
  value: string,
): CustomPropertyReference | undefined => {
  const start = value.indexOf("var(");
  if (start === -1) return undefined;
  const open = start + "var".length;
  let depth = 0;
  let comma: number | undefined;
  for (let index = open; index < value.length; index++) {
    const character = value[index];
    if (character === "(") depth++;
    if (character === "," && depth === 1) comma ??= index;
    if (character === ")" && --depth === 0) {
      return {
        name: value.slice(open + 1, comma ?? index).trim(),
        fallback:
          comma === undefined
            ? undefined
            : value.slice(comma + 1, index).trim(),
        start,
        end: index + 1,
      };
    }
  }
  throw new Error(`unbalanced var() in ${value}`);
};

const resolveCustomProperties = (
  value: string,
  properties: Map<string, string>,
): string => {
  const reference = firstCustomPropertyReference(value);
  if (!reference) return value;
  const substitute = properties.get(reference.name) ?? reference.fallback;
  if (substitute === undefined) {
    throw new Error(`${reference.name} has no value and no fallback`);
  }
  return resolveCustomProperties(
    value.slice(0, reference.start) + substitute + value.slice(reference.end),
    properties,
  );
};

const THEME_ROOT = ":root, :host";

const themeRootDeclarations = (root: Root): Map<string, string> =>
  new Map(
    rulesOf(root, (rule) => rule.selectors.join(", ") === THEME_ROOT).flatMap(
      (rule) => [...declarationsOf(rule)],
    ),
  );

const registeredInitialValues = (root: Root): Map<string, string> => {
  const values = new Map<string, string>();
  root.walkAtRules("property", (property) => {
    const initial = declarationsOf(property).get("initial-value");
    if (initial !== undefined) values.set(property.params, initial);
  });
  return values;
};

const paintedBoxShadow = (root: Root, cascade: Container[]): string => {
  const properties = new Map([
    ...registeredInitialValues(root),
    ...themeRootDeclarations(root),
    ...declarationsOf(onlyRule(root, ":root")),
    ...cascade.flatMap((container) => [...declarationsOf(container)]),
  ]);
  const boxShadow = properties.get("box-shadow");
  if (boxShadow === undefined) throw new Error("no box-shadow in the cascade");
  return resolveCustomProperties(boxShadow, properties);
};

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
    const source = postcss.parse(
      readFileSync(path.join(packageDirectory, "tailwind-config.css"), "utf8"),
    );
    source.walkAtRules("theme", (theme) => {
      for (const [name, value] of declarationsOf(theme)) {
        themeDefaults.set(name, value);
      }
    });
    for (const [name, value] of themeRootDeclarations(source)) {
      themeDefaults.set(name, value);
    }
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
    const emittedTheme = themeRootDeclarations(emitted);

    expect(
      declarationsOf(onlyRule(emitted, ".light")).get("--color-heading"),
    ).toBe("var(--light-color-heading)");
    expect(emittedTheme.get("--color-heading")).toBe("#131414");
    expect(rootDeclarations.get("--light-color-heading")).toBe(
      emittedTheme.get("--color-heading"),
    );
  });

  it("holds every --light-* value equal to its default in tailwind-config.css", () => {
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
    expect(themeRootDeclarations(emitted).get("--color-gray-0")).toBe(
      "#fbfbfc",
    );
    expect(
      declarationsOf(onlyRule(emitted, ".dark")).get("--color-gray-0"),
    ).toBe("var(--dark-color-gray-0)");
  });

  it("darkens light subtle-2 below gray-7 to a text-grade value and keeps the dark value", () => {
    const emittedTheme = themeRootDeclarations(emitted);

    expect(
      emittedTheme.get("--color-subtle-2"),
      "#6e7074 holds 4.5:1 on gray-1, the darkest surface subtle-2 text sits on",
    ).toBe("#6e7074");
    expect(emittedTheme.get("--color-gray-7")).toBe("#7a7c80");
    expect(
      declarationsOf(onlyRule(emitted, ":root")).get("--dark-color-subtle-2"),
    ).toBe("#9c9ca4");
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

    const theme = themeRootDeclarations(unoptimized);
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

  it("sizes slider parts from the bare spacing scale", () => {
    const valueOf = (
      name: string,
      pseudo: string,
      property: string,
    ): string | undefined => {
      const [nested] = rulesOf(
        onlyRule(unoptimized, `.${name}`),
        (rule) => rule.selector === `&${pseudo}`,
      );
      return declarationsOf(nested!).get(property);
    };
    const webkitThumb = "::-webkit-slider-thumb";
    expect(valueOf("slider-thumb-w-3", webkitThumb, "width")).toBe(
      "calc(var(--spacing) * 3)",
    );
    expect(valueOf("slider-thumb-w-3", "::-moz-range-thumb", "width")).toBe(
      "calc(var(--spacing) * 3)",
    );
    expect(valueOf("slider-thumb-h-3", webkitThumb, "height")).toBe(
      "calc(var(--spacing) * 3)",
    );
    expect(valueOf("slider-thumb-h-3", webkitThumb, "margin-top")).toBe(
      "calc(calc(var(--spacing) * 3) / -2)",
    );
    expect(
      valueOf("slider-track-h-1", "::-webkit-slider-runnable-track", "height"),
    ).toBe("calc(var(--spacing) * 1)");
  });

  it("emits no rule for an unknown slider thumb size", () => {
    expect(
      rulesOf(unoptimized, (rule) =>
        startsWithClass(rule, "slider-thumb-w-foo"),
      ),
    ).toHaveLength(0);
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

  it.each(["button", "icon-button", "banner-chip"])(
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
      ".banner:not(.banner-success, .banner-warning, .banner-danger, .banner-pending)",
    );
    expect(declarations.get("--banner-light")).toBe("var(--color-info-light)");
    expect(declarations.get("--banner-dark")).toBe("var(--color-info-dark)");
    expect(declared(emitted, ".banner").has("--banner-light")).toBe(false);
  });

  it("drops the side and top borders on .banner-block with a rule that outranks .banner", () => {
    expect(declared(emitted, ".banner-block").get("width")).toBe("100%");
    const block = declared(emitted, ".banner-block.banner");
    expect(block.get("border-inline-width")).toBe("0");
    expect(block.get("border-top-width")).toBe("0");
    expect(block.has("border-bottom-width")).toBe(false);
  });

  it("sets .button-compact and .input-compact to text-xs with tighter padding under a rule that outranks the base class", () => {
    const button = declared(emitted, ".button-compact.button");
    expect(button.get("gap")).toBe("calc(var(--spacing) * 1)");
    expect(button.get("padding-inline")).toBe("calc(var(--spacing) * 2)");
    expect(button.get("padding-block")).toBe("calc(var(--spacing) * 1)");
    expect(button.get("font-size")).toBe("var(--text-xs)");
    expect(button.get("line-height")).toBe(
      "var(--tw-leading, var(--text-xs--line-height))",
    );

    const input = declared(emitted, ".input-compact.input");
    expect(input.get("padding-inline")).toBe("calc(var(--spacing) * 2)");
    expect(input.get("padding-block")).toBe("calc(var(--spacing) * 1)");
    expect(input.get("font-size")).toBe("var(--text-xs)");
    expect(input.get("line-height")).toBe(
      "var(--tw-leading, var(--text-xs--line-height))",
    );
  });

  it("mints no shadow-color-* utility from the shadow colors", () => {
    expect(
      rulesOf(emitted, (rule) => startsWithClass(rule, "shadow-color-popover")),
    ).toHaveLength(0);
  });

  it("defines each shadow token over a shadow color and compiles the utility to read that color", () => {
    const tokens = Object.fromEntries(
      ELEVATIONS.flatMap(([name]) => [
        [`--shadow-${name}`, themeDefaults.get(`--shadow-${name}`)],
        [`--shadow-color-${name}`, themeDefaults.get(`--shadow-color-${name}`)],
        [
          `.shadow-${name}`,
          declared(emitted, `.shadow-${name}`).get("--tw-shadow"),
        ],
      ]),
    );

    expect(tokens).toStrictEqual({
      "--shadow-sm": "0 4px 32px var(--shadow-color-sm)",
      "--shadow-color-sm": "rgba(0, 0, 0, 0.06)",
      ".shadow-sm": "0 4px 32px var(--tw-shadow-color, var(--shadow-color-sm))",
      "--shadow-popover": "0 8px 24px var(--shadow-color-popover)",
      "--shadow-color-popover": "rgba(0, 0, 0, 0.12)",
      ".shadow-popover":
        "0 8px 24px var(--tw-shadow-color, var(--shadow-color-popover))",
      "--shadow-dialog": "0 12px 48px var(--shadow-color-dialog)",
      "--shadow-color-dialog": "rgba(0, 0, 0, 0.25)",
      ".shadow-dialog":
        "0 12px 48px var(--tw-shadow-color, var(--shadow-color-dialog))",
    });
  });

  it("assigns each shadow color in .dark, .light, and the media scope from its --dark-* or --light-* definition", () => {
    const scopes = [
      [".dark", "dark"],
      [".light", "light"],
      [":root:not(.light)", "dark"],
    ] as const;
    const root = declarationsOf(onlyRule(unoptimized, ":root"));

    const assigned = Object.fromEntries(
      scopes.flatMap(([selector]) =>
        ELEVATIONS.map(([name]) => [
          `${selector} ${name}`,
          declarationsOf(onlyRule(emitted, selector)).get(
            `--shadow-color-${name}`,
          ),
        ]),
      ),
    );
    const darkElevationColors = ELEVATIONS.map(([name]) =>
      root.get(`--dark-shadow-color-${name}`),
    );

    expect(assigned).toStrictEqual(
      Object.fromEntries(
        scopes.flatMap(([selector, scheme]) =>
          ELEVATIONS.map(([name]) => [
            `${selector} ${name}`,
            `var(--${scheme}-shadow-color-${name})`,
          ]),
        ),
      ),
    );
    expect(darkElevationColors).toStrictEqual([
      "rgba(0, 0, 0, 0.4)",
      "rgba(0, 0, 0, 0.5)",
      "rgba(0, 0, 0, 0.6)",
    ]);
  });

  it.each(ELEVATIONS)(
    "paints shadow-%s with the light shadow color at the root and the dark one under .dark",
    (name, light, dark) => {
      const utility = onlyRule(unoptimized, `.shadow-${name}`);

      const painted = {
        light: paintedBoxShadow(unoptimized, [utility]),
        dark: paintedBoxShadow(unoptimized, [
          onlyRule(unoptimized, ".dark"),
          utility,
        ]),
      };

      expect(
        painted,
        "Tailwind inlines a --shadow-* value into the utility, so reassigning --shadow-* alone leaves the dark case painting the light color",
      ).toStrictEqual({
        light: `${UNSET_SHADOW_LAYERS}, ${light}`,
        dark: `${UNSET_SHADOW_LAYERS}, ${dark}`,
      });
    },
  );

  it("lets shadow-red-500 recolor shadow-popover under .dark", () => {
    const painted = paintedBoxShadow(unoptimized, [
      onlyRule(unoptimized, ".dark"),
      onlyRule(unoptimized, ".shadow-popover"),
      onlyRule(unoptimized, ".shadow-red-500"),
    ]);

    expect(painted).toBe(
      `${UNSET_SHADOW_LAYERS}, 0 8px 24px oklch(63.7% 0.237 25.331)`,
    );
  });

  it("applies the shadow-popover/50 opacity to the dark shadow color", () => {
    const utility = onlyRule(unoptimized, String.raw`.shadow-popover\/50`);
    const relativeColor = utility.nodes.find(
      (node): node is AtRule =>
        node instanceof AtRule && node.name === "supports",
    );
    if (!relativeColor) throw new Error("shadow-popover/50 has no @supports");

    const painted = paintedBoxShadow(unoptimized, [
      onlyRule(unoptimized, ".dark"),
      utility,
      relativeColor,
    ]);

    expect(painted).toBe(
      `${UNSET_SHADOW_LAYERS}, 0 8px 24px oklab(from rgba(0, 0, 0, 0.5) l a b / 50%)`,
    );
  });

  it("draws .status-dot as an 8px round dot painting fill and border from --status-dot-color over a gray-6 fallback", () => {
    const dot = declared(emitted, ".status-dot");
    expect(dot.get("width")).toBe("calc(var(--spacing) * 2)");
    expect(dot.get("height")).toBe("calc(var(--spacing) * 2)");
    expect(dot.get("border-radius")).toBe("3.40282e38px");
    expect(dot.get("border-color")).toBe(
      "var(--status-dot-color, var(--color-gray-6))",
    );
    expect(dot.get("background-color")).toBe(
      "var(--status-dot-fill, var(--status-dot-color, var(--color-gray-6)))",
    );
  });

  it("assigns --status-dot-color per state modifier and emits no neutral modifier", () => {
    const states = [
      ["info", "var(--color-info-dark)"],
      ["warning", "var(--color-warning-bright)"],
      ["success", "var(--color-success-bright)"],
      ["danger", "var(--color-danger-dark)"],
      ["disabled", "var(--color-disabled-dark)"],
    ] as const;
    for (const [state, token] of states) {
      expect(
        declared(emitted, `.status-dot-${state}`).get("--status-dot-color"),
      ).toBe(token);
    }
    expect(
      rulesOf(emitted, (rule) => startsWithClass(rule, "status-dot-neutral")),
    ).toHaveLength(0);
  });

  it("clears only the fill on .status-dot-hollow", () => {
    const hollow = declared(emitted, ".status-dot-hollow");
    expect(hollow.get("--status-dot-fill")).toBe("transparent");
    expect(hollow.has("--status-dot-color")).toBe(false);
  });

  it("clears the fill and ring of a .status-dot that holds a direct .progress-dots child and colors the spinner", () => {
    const spinning = declared(emitted, ".status-dot:has( > .progress-dots)");
    expect(spinning.get("border-color")).toBe("#0000");
    expect(spinning.get("background-color")).toBe("#0000");
    expect(declared(emitted, ".status-dot > .progress-dots").get("color")).toBe(
      "var(--status-dot-color, var(--color-gray-6))",
    );
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
