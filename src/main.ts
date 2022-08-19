import '../prime.css';
/**
 * @TODO remove once safari support is widespread enough (~90-95% total support)
 * See: https://caniuse.com/mdn-api_elementinternals
 * and: https://bugs.webkit.org/show_bug.cgi?id=197960
 */
import 'element-internals-polyfill';
import { loadFonts } from './lib';

if (customElements.get('v-badge')) {
  console.warn('WARNING: Multiple instances of PRIME being imported.');
} else {
  loadFonts().catch(error => console.error(error));

  import('./elements/badge.svelte');
  import('./elements/breadcrumbs.svelte');
  import('./elements/button/button');
  import('./elements/code-editor.svelte');
  import('./elements/collapse.svelte');
  import('./elements/dropdown.svelte');
  import('./elements/icon.svelte');
  import('./elements/json-editor.svelte');
  import('./elements/input/input');
  import('./elements/notify.svelte');
  import('./elements/radio.svelte');
  import('./elements/select/select.svelte');
  import('./elements/slider.svelte');
  import('./elements/switch.svelte');
  import('./elements/table/table.svelte');
  import('./elements/tabs.svelte');
  import('./elements/table/tbody.svelte');
  import('./elements/table/th.svelte');
  import('./elements/table/td.svelte');
  import('./elements/table/thead.svelte');
  import('./elements/tooltip.svelte');
  import('./elements/table/tr.svelte');
}
