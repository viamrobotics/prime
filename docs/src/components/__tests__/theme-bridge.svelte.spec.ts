import { afterEach, describe, expect, it } from "vitest";
import { render } from "vitest-browser-svelte";

import { bridgeTheme } from "../../theme-bridge";
import ThemeProbe from "./ThemeProbe.svelte";
import "./theme.css";

const COLOR_WHITE_LIGHT_THEME = "rgb(255, 255, 255)";
const COLOR_WHITE_DARK_THEME = "rgb(19, 20, 20)";

const root = document.documentElement;
const nextFrame = () => new Promise((resolve) => requestAnimationFrame(resolve));
const probeBackground = (probe: HTMLElement) =>
  getComputedStyle(probe).backgroundColor;

describe("bridgeTheme", () => {
  let disconnect: (() => void) | undefined;

  afterEach(() => {
    disconnect?.();
    disconnect = undefined;
    root.removeAttribute("data-theme");
    root.classList.remove("dark", "light");
  });

  it("gives an island the dark token value when data-theme is dark", async () => {
    root.dataset.theme = "dark";
    disconnect = bridgeTheme(root);

    const screen = await render(ThemeProbe);
    const probe = screen.getByTestId("probe").element() as HTMLElement;

    expect(probeBackground(probe)).toBe(COLOR_WHITE_DARK_THEME);
  });

  it("gives an island the light token value when data-theme is light", async () => {
    root.dataset.theme = "light";
    disconnect = bridgeTheme(root);

    const screen = await render(ThemeProbe);
    const probe = screen.getByTestId("probe").element() as HTMLElement;

    expect(probeBackground(probe)).toBe(COLOR_WHITE_LIGHT_THEME);
  });

  it("restores the light value when data-theme flips from dark to light", async () => {
    root.dataset.theme = "dark";
    disconnect = bridgeTheme(root);
    const screen = await render(ThemeProbe);
    const probe = screen.getByTestId("probe").element() as HTMLElement;
    expect(probeBackground(probe), "dark before flip").toBe(COLOR_WHITE_DARK_THEME);

    root.dataset.theme = "light";
    await nextFrame();

    expect(probeBackground(probe)).toBe(COLOR_WHITE_LIGHT_THEME);
  });

  it("stops mirroring after the returned disconnect runs", async () => {
    root.dataset.theme = "dark";
    disconnect = bridgeTheme(root);
    const screen = await render(ThemeProbe);
    const probe = screen.getByTestId("probe").element() as HTMLElement;

    disconnect();
    root.dataset.theme = "light";
    await nextFrame();

    expect(probeBackground(probe)).toBe(COLOR_WHITE_DARK_THEME);
  });

  it("sets dark and clears light when data-theme is dark", () => {
    root.dataset.theme = "dark";

    disconnect = bridgeTheme(root);

    expect(root.classList.contains("dark"), "dark class").toBe(true);
    expect(root.classList.contains("light"), "light class").toBe(false);
  });

  it("sets light and clears dark when data-theme is absent", () => {
    root.classList.add("dark");

    disconnect = bridgeTheme(root);

    expect(root.classList.contains("light"), "light class").toBe(true);
    expect(root.classList.contains("dark"), "dark class").toBe(false);
  });

  it("swaps the classes when data-theme flips to dark", async () => {
    root.dataset.theme = "light";
    disconnect = bridgeTheme(root);

    root.dataset.theme = "dark";
    await nextFrame();

    expect(root.classList.contains("dark"), "dark class").toBe(true);
    expect(root.classList.contains("light"), "light class").toBe(false);
  });
});
