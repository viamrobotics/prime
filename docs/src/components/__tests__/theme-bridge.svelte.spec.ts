import { afterEach, describe, expect, it } from "vitest";
import { render } from "vitest-browser-svelte";
import { bridgeTheme } from "../../theme-bridge";
import ThemeProbe from "./ThemeProbe.svelte";
import "./theme.css";

// --color-white in tailwind-config.css is #fff, and --dark-color-white in tailwind-config-dark.css is #131414.
const LIGHT_WHITE = "rgb(255, 255, 255)";
const DARK_WHITE = "rgb(19, 20, 20)";

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

    expect(probeBackground(probe)).toBe(DARK_WHITE);
  });

  it("gives an island the light token value when data-theme is light", async () => {
    root.dataset.theme = "light";
    disconnect = bridgeTheme(root);

    const screen = await render(ThemeProbe);
    const probe = screen.getByTestId("probe").element() as HTMLElement;

    expect(probeBackground(probe)).toBe(LIGHT_WHITE);
  });

  it("restores the light value when data-theme flips from dark to light", async () => {
    root.dataset.theme = "dark";
    disconnect = bridgeTheme(root);
    const screen = await render(ThemeProbe);
    const probe = screen.getByTestId("probe").element() as HTMLElement;
    expect(probeBackground(probe), "dark before flip").toBe(DARK_WHITE);

    root.dataset.theme = "light";
    await nextFrame();

    expect(probeBackground(probe)).toBe(LIGHT_WHITE);
  });

  it("stops mirroring after the returned disconnect runs", async () => {
    root.dataset.theme = "dark";
    disconnect = bridgeTheme(root);
    const screen = await render(ThemeProbe);
    const probe = screen.getByTestId("probe").element() as HTMLElement;

    disconnect();
    root.dataset.theme = "light";
    await nextFrame();

    expect(probeBackground(probe)).toBe(DARK_WHITE);
  });
});
