import '../public/prime.css';
/**
 * @TODO remove once safari support is widespread enough (~90-95% total support)
 * See: https://caniuse.com/mdn-api_elementinternals
 * and: https://bugs.webkit.org/show_bug.cgi?id=197960
 */
import 'element-internals-polyfill';
import { SvelteComponent } from 'svelte';
import { addStyles, loadFonts } from './lib';

export { notify } from './lib/notify';

/*
 * `element` is only present if compiled with the `customElement` option, which it is. Type it such that it exists.
 * https://github.com/sveltejs/svelte/blob/master/packages/svelte/src/runtime/internal/public.d.ts#L72-L73
 */
type ComponentWithElement = SvelteComponent & {
  element: typeof HTMLElement;
};

const main = async () => {
  // These components are exported as pure Svelte components.
  const componentModules = {
    'v-badge': await import('./elements/badge.svelte'),
    'v-breadcrumbs': await import('./elements/breadcrumbs.svelte'),
    'v-code-snippet': await import('./elements/code-snippet.svelte'),
    'v-context-menu': await import(
      './elements/context-menu/context-menu.svelte'
    ),
    'v-context-menu-item': await import(
      './elements/context-menu/context-menu-item.svelte'
    ),
    'v-context-menu-separator': await import(
      './elements/context-menu/context-menu-separator.svelte'
    ),
    'v-collapse': await import('./elements/collapse.svelte'),
    'v-dropdown': await import('./elements/dropdown.svelte'),
    'v-icon': await import('./elements/icon/icon.svelte'),
    'v-list-box': await import('./elements/list-box.svelte'),
    'v-modal': await import('./elements/modal.svelte'),
    'v-notify': await import('./elements/notify.svelte'),
    'v-pill': await import('./elements/pill.svelte'),
    'v-radio': await import('./elements/radio.svelte'),
    'v-select': await import('./elements/select/select.svelte'),
    'v-multiselect': await import('./elements/select/multiselect.svelte'),
    'v-select-button': await import('./elements/select/select-button.svelte'),
    'v-slider': await import('./elements/slider.svelte'),
    'v-switch': await import('./elements/switch.svelte'),
    'v-table': await import('./elements/table/table.svelte'),
    'v-tabs': await import('./elements/tabs.svelte'),
    'v-tbody': await import('./elements/table/tbody.svelte'),
    'v-th': await import('./elements/table/th.svelte'),
    'v-td': await import('./elements/table/td.svelte'),
    'v-thead': await import('./elements/table/thead.svelte'),
    'v-tooltip': await import('./elements/tooltip.svelte'),
    'v-tr': await import('./elements/table/tr.svelte'),
    'v-vector-input': await import('./elements/vector-input.svelte'),
  };

  for (const [name, componentModule] of Object.entries(componentModules)) {
    class Element extends (
      componentModule.default as unknown as ComponentWithElement
    ).element {
      constructor() {
        super();

        addStyles(this);
      }
    }

    customElements.define(name, Element);
  }

  // These elements are extended before export and must be handled separately.
  const elementModules = {
    'v-button': await import('./elements/button/button'),
    'v-code-editor': await import('./elements/code-editor/code-editor'),
    'v-input': await import('./elements/input/input'),
  };

  for (const [name, elementModule] of Object.entries(elementModules)) {
    customElements.define(
      name,
      elementModule.default as CustomElementConstructor
    );
  }
};

if (customElements.get('v-badge')) {
  console.warn('WARNING: Multiple instances of PRIME being imported.');
} else {
  loadFonts().catch(console.error);

  main().catch(console.error);
}
