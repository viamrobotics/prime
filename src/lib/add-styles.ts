import { get_current_component } from 'svelte/internal'
import css from '../../prime.css'

let sheet: CSSStyleSheet
let fallback = false
try {
  sheet = new CSSStyleSheet();
  // See https://github.com/microsoft/TypeScript-DOM-lib-generator/issues/897
  (sheet as unknown as { replaceSync(x: string): void }).replaceSync(css)
} catch {
  fallback = true
}

export const addStyles = () => {
  const element = get_current_component() as HTMLElement

  if (fallback) {
    const style = document.createElement('style')
    style.innerHTML = css
    element.shadowRoot!.append(style)
  } else {
    // See https://github.com/microsoft/TypeScript-DOM-lib-generator/issues/897
    (element.shadowRoot as unknown as { adoptedStyleSheets: unknown[] }).adoptedStyleSheets = [sheet]
  }
}
