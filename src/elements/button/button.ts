import './button.svelte'

class Button extends customElements.get('v-button-internal')! {
  static formAssociated = true

  internals = this.attachInternals()

  override connectedCallback () {
    super.connectedCallback()
    this.addEventListener('click', this.requestSubmit)
  }

  override disconnectedCallback () {
    super.disconnectedCallback()
    this.removeEventListener('click', this.requestSubmit)
  }

  requestSubmit = () => {
    const { form } = this.internals

    if (form.requestSubmit) {
      form.requestSubmit()
    } else {
      form.submit()
    }
  }
}

customElements.define('v-button', Button)
