interface HTMLElement {
  connectedCallback(): void;
  disconnectedCallback(): void;
  attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string
  ): void;
}

// TODO(mp, 2023-06-12): svelte 3 web components are all or nothing, remove when migrating to svelte 4
declare module '*.component' {
  import { SvelteComponent } from 'svelte';
  const component: typeof SvelteComponent;
  export default component;
}
