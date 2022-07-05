import { get_current_component } from 'svelte/internal'

const { PRIME_CONFIG } = window as unknown as {
  PRIME_CONFIG?: {
    base?: string
  }
}

const link = document.createElement('link')
link.rel = 'stylesheet'
link.href = `${PRIME_CONFIG?.base ?? ''}/prime.css`

export const addStyles = () => {
  const element = get_current_component() as HTMLElement
  element.style.display = 'none'

  const clone = link.cloneNode()
  clone.addEventListener('load', () => {
    element.style.removeProperty('display')
  })
  element.shadowRoot!.prepend(clone)
}
