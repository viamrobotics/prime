import './input.svelte'

// https://github.com/sveltejs/svelte/issues/7596
class Input extends customElements.get('v-input-internal')! {
  static formAssociated = true
}

customElements.define('v-input', Input)
