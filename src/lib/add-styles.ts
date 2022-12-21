import { get_current_component } from 'svelte/internal';
import css from '../../prime.css?inline';

let sheet: CSSStyleSheet & { replaceSync(x: string): void };
let fallback = false;
try {
  sheet = new CSSStyleSheet() as CSSStyleSheet & { replaceSync(x: string): void };
  // See https://github.com/microsoft/TypeScript-DOM-lib-generator/issues/897
  sheet.replaceSync(css);
} catch {
  fallback = true;
}

export const addStyles = () => {
  const element = get_current_component() as HTMLElement;

  if (fallback) {
    const style = document.createElement('style');
    style.innerHTML = css;
    element.shadowRoot!.append(style);
  } else {
    const root = element.shadowRoot as unknown as { adoptedStyleSheets: unknown[] }
    // See https://github.com/microsoft/TypeScript-DOM-lib-generator/issues/897
    root.adoptedStyleSheets = [sheet];
  }
};
