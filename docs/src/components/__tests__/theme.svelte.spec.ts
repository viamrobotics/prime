import { flushSync } from "svelte";
import { afterEach, describe, expect, it } from "vitest";

import { theme } from "../theme.svelte";

const root = document.documentElement;
const nextFrame = () => new Promise((resolve) => requestAnimationFrame(resolve));

describe("theme", () => {
  afterEach(() => {
    root.removeAttribute("data-theme");
  });

  it("reads dark when data-theme is dark", () => {
    root.dataset.theme = "dark";

    expect(theme.current).toBe("dark");
  });

  it("reads light when data-theme is light", () => {
    root.dataset.theme = "light";

    expect(theme.current).toBe("light");
  });

  it("reads light when data-theme is absent", () => {
    expect(theme.current).toBe("light");
  });

  it("reruns an effect when data-theme changes", async () => {
    root.dataset.theme = "light";
    const seen: string[] = [];
    const stop = $effect.root(() => {
      $effect(() => {
        seen.push(theme.current);
      });
    });
    flushSync();

    root.dataset.theme = "dark";
    await nextFrame();
    flushSync();
    stop();

    expect(seen).toEqual(["light", "dark"]);
  });

  it("stops rerunning once the effect is destroyed", async () => {
    root.dataset.theme = "light";
    const seen: string[] = [];
    const stop = $effect.root(() => {
      $effect(() => {
        seen.push(theme.current);
      });
    });
    flushSync();
    stop();

    root.dataset.theme = "dark";
    await nextFrame();
    flushSync();

    expect(seen).toEqual(["light"]);
  });
});
