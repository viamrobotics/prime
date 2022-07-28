/* eslint-disable spaced-comment */

/// <reference types="svelte" />
/// <reference types="vite/client" />

interface HTMLElement {
  connectedCallback(): void
  disconnectedCallback(): void
  attributeChangedCallback(name: string, oldValue: string, newValue: string): void
}
