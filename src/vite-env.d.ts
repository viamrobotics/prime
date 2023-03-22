/* eslint-disable spaced-comment */

/// <reference types="svelte" />
/// <reference types="vite/client" />
/// <reference types="monaco-editor/monaco" />

interface HTMLElement {
  connectedCallback(): void;
  disconnectedCallback(): void;
  attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string
  ): void;
}
