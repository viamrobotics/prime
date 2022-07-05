import { get_current_component } from 'svelte/internal'

const { base = '', query = '' } = (window as unknown as {
  PRIME_CONFIG?: {
    base?: string
    query?: string
  }
}).PRIME_CONFIG ?? {}

const link = document.createElement('link')
link.rel = 'stylesheet'
link.href = `${base ?? ''}/prime.css${query}`

export const addStyles = () => {
  const element = get_current_component() as HTMLElement
  element.style.display = 'none'

  const clone = link.cloneNode()
  clone.addEventListener('load', () => {
    element.style.removeProperty('display')
  })
  element.shadowRoot!.prepend(clone)
}
