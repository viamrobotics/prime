<svelte:options immutable tag="v-code-snippet" />

<script context="module" lang="ts">
import { onMount } from 'svelte';
const loadedLanguages: Record<string, boolean> = {};
</script>

<script lang="ts">
import { addStyles } from '../lib';
import pkg from '../../package.json';

import { dispatcher } from '../lib/dispatch';

export let language: string;
export let code: string;
export let theme: 'vs' | 'vsc-dark-plus' = 'vs';
export let showbutton = 'true';

$: label = 'Copy';

const dispatch = dispatcher();

let element: HTMLElement;

addStyles();

const version = pkg.devDependencies.prismjs.replace('^', '');

const cdn = (src: string) =>
  `https://cdnjs.cloudflare.com/ajax/libs/prism/${version}/${src}`;

const script = (src: string) =>
  new Promise((resolve, reject) => {
    const el = document.createElement('script');
    el.async = true;
    el.src = src;
    el.addEventListener('load', resolve);
    el.addEventListener('error', reject);
    document.head.append(el);
  });

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(code);
    label = 'Success!';
    dispatch('copy', { value: 'Successfully copied snippet to the clipboard' });
  } catch {
    label = 'Failed.';
    dispatch('copy', { value: ':( Failed to copy snippet to the clipboard' });
  }

  window.setTimeout(() => {
    label = 'Copy';
  }, 2000);
};

const highlight = async (element: Element) => {
  const { Prism } = window as { Prism: typeof import('prismjs') };

  if (!Prism) {
    await script(cdn('prism.min.js'));
  }

  if (!loadedLanguages[language]) {
    await script(cdn(`components/prism-${language}.min.js`));
    // eslint-disable-next-line require-atomic-updates
    loadedLanguages[language] = true;
  }

  if (element !== undefined) {
    window.Prism.highlightElement(element);
    element.setAttribute(
      'style',
      'font-family: Menlo, Monaco, "Courier New", monospace'
    );
  }
};
onMount(async () => {
  await highlight(element);
});
</script>

<pre
  class="relative !border-none !m-0 !pt-3 !pr-24 !pb-0
    {theme === 'vsc-dark-plus' ? '!bg-gray-9' : '!bg-light'} "><code
    bind:this={element}
    class="language-{language} font-mono">{code}</code
  >
  {#if showbutton === 'true'}
    <v-button
      class="absolute top-2 right-2 !text-black !font-sans"
      on:click={copyToClipboard}
      on:keyup={copyToClipboard}
      {label}
      icon="copy"
    />
  {/if}
</pre>

<link
  rel="stylesheet"
  crossorigin="anonymous"
  referrerpolicy="no-referrer"
  href="https://cdnjs.cloudflare.com/ajax/libs/prism-themes/1.9.0/prism-{theme}.min.css"
/>

<style>
code[class*='language-'],
pre[class*='language-'],
pre[class*='language-'] code[class*='language-'] {
  font-family: cursive;
}
</style>
