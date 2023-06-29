import './input.svelte';

// https://github.com/sveltejs/svelte/issues/7596
class Input extends (customElements.get('v-input-internal')!) {
  static override formAssociated = true;
  override focus() {
    this.shadowRoot?.querySelector('input')?.focus();
  }
}

customElements.define('v-input', Input);
