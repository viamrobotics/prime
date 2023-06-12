interface HTMLElement {
  connectedCallback(): void;
  disconnectedCallback(): void;
  attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string
  ): void;
}

declare module '*.component' {
  import { SvelteComponent } from 'svelte';
  const component: typeof SvelteComponent;
  export default component;
}
