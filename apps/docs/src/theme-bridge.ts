/**
 * Mirrors Starlight's `data-theme` attribute on `root` into the `dark` and `light`
 * classes `@viamrobotics/tailwind-config/dark` keys off, now and on every later change,
 * so an island follows the site's theme picker instead of the OS preference.
 *
 * @returns Stops mirroring. Attribute changes after that are ignored.
 */
export const bridgeTheme = (root: HTMLElement): (() => void) => {
  const mirror = () => {
    const isDark = root.dataset.theme === "dark";
    root.classList.toggle("dark", isDark);
    root.classList.toggle("light", !isDark);
  };
  mirror();
  const observer = new MutationObserver(mirror);
  observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
};
