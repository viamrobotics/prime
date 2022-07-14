import { onMount } from 'svelte'
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

console.log('here')

export const loadFonts = async () => {
  const font = new FontFace('icons', 'url(icons.woff2?yaw0e2)')
  await font.load()
  document.fonts.add(font)
}

export const addStyles = () => {
  const element = get_current_component() as HTMLElement
  
  onMount(() => {
    const originalDisplay = element.style.getPropertyValue('display')
    element.style.setProperty('display', 'none')
    const clone = link.cloneNode()
    clone.addEventListener('load', () => {
      if (originalDisplay) {
        element.style.setProperty('display', originalDisplay)
      } else {
        element.style.removeProperty('display')
      }
    })
    element.shadowRoot!.prepend(clone)
  })
}
