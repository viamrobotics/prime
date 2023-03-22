import './button.svelte';

// https://github.com/sveltejs/svelte/issues/7596
class Button extends (customElements.get('v-button-internal')!) {
  static formAssociated = true;
}

customElements.define('v-button', Button);
