import './button.svelte'

class Button extends customElements.get('v-button-internal')! {
  static formAssociated = true
  internals = this.attachInternals()
}

customElements.define('v-button', Button)
