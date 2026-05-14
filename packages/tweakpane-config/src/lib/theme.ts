import type { Theme } from "svelte-tweakpane-ui";

// Hex values mirror tokens declared in @viamrobotics/tailwind-config
export const primeTheme: Theme = {
  baseBackgroundColor: "#ffffff",
  baseShadowColor: "rgba(0, 0, 0, 0.06)",
  baseBorderRadius: "2px",
  baseFontFamily: '"Public Sans Variable", "Public Sans", sans-serif',

  bladeBorderRadius: "2px",
  bladeHorizontalPadding: "8px",
  bladeValueWidth: "160px",

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
  containerHorizontalPadding: "8px",
  containerUnitSize: "24px",
  containerUnitSpacing: "4px",
  containerVerticalPadding: "6px",

  inputBackgroundColor: "#ffffff",
  inputBackgroundColorHover: "#f7f7f8",
  inputBackgroundColorFocus: "#e1f3ff",
  inputBackgroundColorActive: "#b6d1f4",
  inputForegroundColor: "#282829",

  labelForegroundColor: "#4e4f52",
  monitorBackgroundColor: "#f7f7f8",
  monitorForegroundColor: "#4e4f52",
  grooveForegroundColor: "#c5c6cc",
  pluginImageDraggingColor: "#2e67d3",
};
