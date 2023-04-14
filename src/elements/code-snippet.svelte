<svelte:options immutable tag="v-code-snippet" />

<script context='module' lang='ts'>

const loadedLanguages: Record<string, boolean> = {};

</script>

<script lang='ts'>

import { addStyles } from '../lib'
import pkg from '../../package.json';

export let language: string
export let code: string
export let theme: 'vs' | 'vsc-dark-plus' = 'vs'

let element: HTMLElement

addStyles()

const version = pkg.devDependencies.prismjs.replace('^', '');

const cdn = (src: string) =>
  `https://cdnjs.cloudflare.com/ajax/libs/prism/${version}/${src}`;

const script = (src: string) => new Promise((resolve, reject) => {
  const script = document.createElement('script');
  script.async = true;
  script.src = src;
  script.addEventListener('load', resolve);
  script.addEventListener('error', reject);
  document.head.append(script);
})

const highlight = async () => {
  console.log(1)
  const { Prism } = window as { Prism: typeof import('prismjs') };

  if (!Prism) {
    await script(cdn('prism.min.js'));
  }

  if (!loadedLanguages[language]) {
    await script(cdn(`components/prism-${language}.min.js`));
    // eslint-disable-next-line require-atomic-updates
    loadedLanguages[language] = true;
  }

  window.Prism.highlightElement(element);
};

$: highlight()

</script>

<div>
  <pre class='m-0 p-0'><code bind:this={element} class='language-{language} font-mono'>{code}</code></pre>
  <v-button label='Copy' icon='copy' />
</div>

<link
  rel="stylesheet"
  crossorigin="anonymous"
  referrerpolicy="no-referrer"
  href="https://cdnjs.cloudflare.com/ajax/libs/prism-themes/1.9.0/prism-{theme}.min.css"
/>
