import '../prime.css'
import { loadFonts } from './lib'

if (customElements.get('v-badge')) {
  console.warn('WARNING: Multiple instances of PRIME being imported.')
} else {
  loadFonts().catch(error => console.error(error))

  import('./elements/badge.svelte')
  import('./elements/breadcrumbs.svelte')
  import('./elements/button.svelte')
  import('./elements/collapse.svelte')
  import('./elements/dropdown.svelte')
  import('./elements/icon.svelte')
  import('./elements/input.svelte')
  import('./elements/notify.svelte')
  import('./elements/radio.svelte')
  import('./elements/select.svelte')
  import('./elements/slider.svelte')
  import('./elements/switch.svelte')
  import('./elements/table/table.svelte')
  import('./elements/tabs.svelte')
  import('./elements/table/tbody.svelte')
  import('./elements/table/th.svelte')
  import('./elements/table/td.svelte')
  import('./elements/table/thead.svelte')
  import('./elements/tooltip.svelte')
  import('./elements/table/tr.svelte')
}
