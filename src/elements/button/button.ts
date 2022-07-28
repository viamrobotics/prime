import './button.svelte'

class Button extends customElements.get('v-button-internal')! {
  static formAssociated = true
}

customElements.define('v-button', Button)
