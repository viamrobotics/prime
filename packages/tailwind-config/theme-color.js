/**
 * @param {import("./theme-color.d.ts").ThemeColorName} name
 * @param {Element} [element]
 * @returns {string | undefined}
 */
export function themeColor(name, element = document.documentElement) {
  const value = getComputedStyle(element).getPropertyValue(name).trim();
  return value === "" ? undefined : value;
}
