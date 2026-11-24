import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it, vi } from "vitest";

import { primeTheme, primeThemeDark } from "../theme.js";

vi.mock("svelte-tweakpane-ui", () => ({
  ThemeUtils: { presets: { light: {}, standard: {}, dark: {} } },
}));

const tailwindDir = resolve(import.meta.dirname, "../../../../tailwind-config");

const parseProperties = (file: string, prefix: string) => {
  const css = readFileSync(resolve(tailwindDir, file), "utf8");
  const pattern = new RegExp(`^\\s*(${prefix}[a-z0-9-]+):\\s*([^;]+);`, "gm");
  const properties = new Map<string, string>();
  for (const [, name, value] of css.matchAll(pattern)) {
    if (name && value && !properties.has(name)) {
      properties.set(name, value.trim().toLowerCase());
    }
  }
  return properties;
};

const lightTokens = parseProperties("tailwind-config.css", "--color-");
const darkTokens = parseProperties("tailwind-config-dark.css", "--dark-color-");

const lightMap: Record<string, string> = {
  baseBackgroundColor: "--color-gray-1",
  buttonBackgroundColor: "--color-gray-3",
  buttonBackgroundColorHover: "--color-gray-4",
  buttonBackgroundColorFocus: "--color-gray-5",
  buttonBackgroundColorActive: "--color-gray-6",
  buttonForegroundColor: "--color-gray-9",
  containerBackgroundColor: "--color-gray-1",
  containerBackgroundColorHover: "--color-gray-2",
  containerBackgroundColorFocus: "--color-gray-3",
  containerBackgroundColorActive: "--color-gray-4",
  containerForegroundColor: "--color-gray-9",
  inputBackgroundColor: "--color-gray-2",
  inputBackgroundColorHover: "--color-gray-3",
  inputBackgroundColorFocus: "--color-info-light",
  inputBackgroundColorActive: "--color-info-medium",
  inputForegroundColor: "--color-gray-9",
  labelForegroundColor: "--color-gray-8",
  monitorBackgroundColor: "--color-gray-1",
  monitorForegroundColor: "--color-gray-8",
  grooveForegroundColor: "--color-gray-5",
  pluginImageDraggingColor: "--color-info-dark",
};

const darkMap: Record<string, string> = {
  baseBackgroundColor: "--dark-color-gray-1",
  buttonBackgroundColor: "--dark-color-gray-3",
  buttonBackgroundColorHover: "--dark-color-gray-4",
  buttonBackgroundColorFocus: "--dark-color-gray-5",
  buttonBackgroundColorActive: "--dark-color-gray-6",
  buttonForegroundColor: "--dark-color-gray-9",
  containerBackgroundColor: "--dark-color-gray-1",
  containerBackgroundColorHover: "--dark-color-gray-2",
  containerBackgroundColorFocus: "--dark-color-gray-3",
  containerBackgroundColorActive: "--dark-color-gray-4",
  containerForegroundColor: "--dark-color-gray-9",
  inputBackgroundColor: "--dark-color-gray-2",
  inputBackgroundColorHover: "--dark-color-gray-3",
  inputBackgroundColorFocus: "--dark-color-info-light",
  inputBackgroundColorActive: "--dark-color-info-medium",
  inputForegroundColor: "--dark-color-gray-9",
  labelForegroundColor: "--dark-color-gray-8",
  monitorBackgroundColor: "--dark-color-gray-1",
  monitorForegroundColor: "--dark-color-gray-8",
  grooveForegroundColor: "--dark-color-gray-5",
  pluginImageDraggingColor: "--dark-color-info-dark",
};

const exemptKeys = ["baseFontFamily", "baseShadowColor"];

const cases = [
  { name: "primeTheme", theme: primeTheme, map: lightMap, tokens: lightTokens },
  {
    name: "primeThemeDark",
    theme: primeThemeDark,
    map: darkMap,
    tokens: darkTokens,
  },
];

describe.each(cases)("$name", ({ theme, map, tokens }) => {
  const values = theme as Record<string, unknown>;

  it.each(Object.entries(map))("%s matches %s", (key, token) => {
    const expected = tokens.get(token);
    expect(expected, `${token} is declared in the stylesheet`).toBeDefined();
    expect(String(values[key]).toLowerCase()).toBe(expected);
  });

  it("maps or exempts every key", () => {
    const unaccounted = Object.keys(values).filter(
      (key) => !(key in map) && !exemptKeys.includes(key),
    );
    expect(unaccounted).toEqual([]);
  });

  it("defines every mapped key", () => {
    const missing = Object.keys(map).filter((key) => !(key in values));
    expect(missing).toEqual([]);
  });
});
