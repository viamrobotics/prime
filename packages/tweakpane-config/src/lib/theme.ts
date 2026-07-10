import { type Theme, ThemeUtils } from "svelte-tweakpane-ui";

// Hex values mirror tokens declared in @viamrobotics/tailwind-config
export const primeTheme: Theme = {
  ...ThemeUtils.presets.light,

  baseBackgroundColor: "#f7f7f8",
  baseShadowColor: "rgba(0, 0, 0, 0.06)",
  baseFontFamily: '"Public Sans Variable", "Public Sans", sans-serif',

  buttonBackgroundColor: "#e4e4e6",
  buttonBackgroundColorHover: "#d7d7d9",
  buttonBackgroundColorFocus: "#c5c6cc",
  buttonBackgroundColorActive: "#9c9ca4",
  buttonForegroundColor: "#282829",

  containerBackgroundColor: "#f7f7f8",
  containerBackgroundColorHover: "#edeef0",
  containerBackgroundColorFocus: "#e4e4e6",
  containerBackgroundColorActive: "#d7d7d9",
  containerForegroundColor: "#282829",

  inputBackgroundColor: "#edeef0",
  inputBackgroundColorHover: "#e4e4e6",
  inputBackgroundColorFocus: "#e1f3ff",
  inputBackgroundColorActive: "#b6d1f4",
  inputForegroundColor: "#282829",

  labelForegroundColor: "#4e4f52",
  monitorBackgroundColor: "#f7f7f8",
  monitorForegroundColor: "#4e4f52",
  grooveForegroundColor: "#c5c6cc",
  pluginImageDraggingColor: "#2e67d3",
};

// Optional dark theme. Hex values mirror the dark tokens in
// @viamrobotics/tailwind-config/dark (the grayscale ramp is inverted, so light
// surfaces map to dark ones and vice versa). Unlike the CSS config, tweakpane
// themes are applied via JS, so there is no automatic prefers-color-scheme /
// `.dark` activation: the consumer chooses which theme to pass to
// ThemeUtils.setGlobalDefaultTheme (e.g. from a media-query listener).
export const primeThemeDark: Theme = {
  ...ThemeUtils.presets.standard,

  baseBackgroundColor: "#1c1c1e",
  baseShadowColor: "rgba(0, 0, 0, 0.4)",
  baseFontFamily: '"Public Sans Variable", "Public Sans", sans-serif',

  buttonBackgroundColor: "#2d2d30",
  buttonBackgroundColorHover: "#3a3a3d",
  buttonBackgroundColorFocus: "#4e4f52",
  buttonBackgroundColorActive: "#7a7c80",
  buttonForegroundColor: "#e4e4e6",

  containerBackgroundColor: "#1c1c1e",
  containerBackgroundColorHover: "#242426",
  containerBackgroundColorFocus: "#2d2d30",
  containerBackgroundColorActive: "#3a3a3d",
  containerForegroundColor: "#e4e4e6",

  inputBackgroundColor: "#242426",
  inputBackgroundColorHover: "#2d2d30",
  inputBackgroundColorFocus: "#16293a",
  inputBackgroundColorActive: "#3d5a7a",
  inputForegroundColor: "#e4e4e6",

  labelForegroundColor: "#c5c6cc",
  monitorBackgroundColor: "#1c1c1e",
  monitorForegroundColor: "#c5c6cc",
  grooveForegroundColor: "#4e4f52",
  pluginImageDraggingColor: "#6f9ee8",
};
