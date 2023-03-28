<svelte:options immutable tag='v-code-snippet' />

<script lang='ts'>

import pkg from '../../package.json';

const version = pkg.devDependencies['prismjs'].replace('^', '');
const cdn = (src: string) => `https://cdnjs.cloudflare.com/ajax/libs/prism/${version}/${src}`

let language = ''

const highlight = async (el: HTMLElement, language: string) => {
  const { Prism } = window as { Prism: typeof import('prismjs') }

  if (!Prism) {
    await import(/* @vite-ignore */cdn('prism.min.js'))
  }

  await import(/* @vite-ignore */cdn(`components/prism-${language}.min.js`))

  Prism.highlightElement(el)
}

export class VCode extends HTMLElement {
  observer!: MutationObserver

  override connectedCallback() {
    this.observer = new MutationObserver(this.render)
    this.observer.observe(this, { childList: true, characterData: true, subtree: true })
    this.attachShadow({ mode: 'open' })
    this.render()
  }

  override disconnectedCallback () {
    this.observer.disconnect()
  }

  render = () => {
    const code = this.shadowRoot!.querySelector('code')!
    code.textContent = `\n${(this.textContent ?? '').trim()}\n`
    highlight(code, language).catch(() => setTimeout(highlight, 2000, code, language))
  }
}

customElements.define('v-code-snippet', VCode)

</script>

<link rel="stylesheet" crossorigin="anonymous" referrerpolicy="no-referrer"
  href="https://cdnjs.cloudflare.com/ajax/libs/prism-themes/1.9.0/prism-vs.min.css"
/>
<style>
  :host { display: block }
  pre { padding: 0 1.25rem !important; }
  pre, code { font-size: 0.8rem !important; border: none !important; padding: 0 !important; margin: 0 !important; }
  code[class*=language-] { font-family: 'Space Mono', ui-monospace, monospace; font-weight: normal !important; }
</style>
<pre class="code-snippet">
  <code
    class="language-${language}"
  />
</pre>
