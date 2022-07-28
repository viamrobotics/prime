import './input.svelte'

class Input extends customElements.get('v-input-internal')! {
  static formAssociated = true
  internals = this.attachInternals()
}

customElements.define('v-input', Input)
