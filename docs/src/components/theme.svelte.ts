import { createSubscriber } from "svelte/reactivity";

type Theme = "light" | "dark";

const readTheme = (): Theme =>
  document.documentElement.dataset.theme === "dark" ? "dark" : "light";

const subscribe = createSubscriber((update) => {
  const observer = new MutationObserver(update);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
});

/**
 * The site's current theme, read from Starlight's `data-theme` attribute, for an
 * island whose library has its own theme switch and cannot follow a CSS class. Reading
 * `current` inside an effect re-runs it when the picker changes. Light on the server.
 */
export const theme = {
  get current(): Theme {
    if (typeof document === "undefined") return "light";
    subscribe();
    return readTheme();
  },
};
