import { onMount } from 'svelte'
import { get_current_component } from 'svelte/internal'
import { base, query } from './config'

const link = document.createElement('link')
link.rel = 'stylesheet'
link.href = `${base ?? ''}/prime.css${query}`

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
