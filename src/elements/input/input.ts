import './input.svelte'

class Input extends customElements.get('v-input-internal')! {
  static formAssociated = true
}

customElements.define('v-input', Input)
