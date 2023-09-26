<svelte:options immutable />

<script
  context="module"
  lang="ts"
>
import { onMount } from 'svelte';
const loadedLanguages: Record<string, boolean> = {};
</script>

<script lang="ts">
import cx from 'classnames';
import pkg from '../../package.json';
import { dispatcher } from '../lib/dispatch';

type Themes = 'vs' | 'vsc-dark-plus';

export let language: string;
export let code: string;
export let theme: Themes = 'vs';
export let showbutton = 'true';

$: label = 'Copy';
$: icon = 'content-copy';
$: isDisabled = false;

const dispatch = dispatcher();

let element: HTMLElement;
const disabled = isDisabled;

const version = pkg.devDependencies.prismjs.replace('^', '');

const cdn = (src: string) =>
  `https://cdnjs.cloudflare.com/ajax/libs/prism/${version}/${src}`;

const script = async (src: string) =>
  new Promise((resolve, reject) => {
    const el = document.createElement('script');
    el.async = true;
    el.src = src;
    el.addEventListener('load', resolve);
    el.addEventListener('error', reject);
    document.head.append(el);
  });

const copyToClipboard = async (event: Event) => {
  try {
    await navigator.clipboard.writeText(code);
    label = 'Copied';
    icon = 'check';
    dispatch(event, 'copy', {
      value: 'Successfully copied snippet to the clipboard',
    });
  } catch {
    label = 'Failed.';
    dispatch(event, 'copy', {
      value: ':( Failed to copy snippet to the clipboard',
    });
  }

  window.setTimeout(() => {
    label = 'Copy';
    icon = 'content-copy';
  }, 2000);
};

const highlight = async () => {
  const { Prism } = window as { Prism: undefined | typeof import('prismjs') };

  if (!Prism) {
    await script(cdn('prism.min.js'));
  }

  if (!loadedLanguages[language] && language) {
    await script(cdn(`components/prism-${language}.min.js`));
    // eslint-disable-next-line require-atomic-updates
    loadedLanguages[language] = true;
  }

  window.Prism.highlightElement(element);

  element.setAttribute(
    'style',
    'font-family: Menlo, Monaco, "Courier New", monospace'
  );
};

const formatCode = (input: string): string => {
  const htmlEntities: Record<string, string> = {
    '<': '&lt;',
    '>': '&gt',
    '/': '&#47;',
  };

  let formattedCode = input;
  for (const [key, value] of Object.entries(htmlEntities)) {
    if (formattedCode) {
      formattedCode = formattedCode.replaceAll(key, value);
    }
  }

  return formattedCode;
};

onMount(async () => {
  await highlight();
});

$: {
  if (element && code) {
    element.innerHTML = formatCode(code);
    // eslint-disable-next-line no-void
    void highlight();
  }
}
</script>

<div
  class={cx('flex gap-x-4 p-2', {
    '!bg-gray-9': theme === 'vsc-dark-plus',
    '!bg-light': theme === 'vs',
  })}
>
  <pre class="!m-0 flex-1 !border-none !bg-inherit !p-0 !pl-2 !pt-2"><code
      bind:this={element}
      class="language-{language} font-mono">{code}</code
    ></pre>

  {#if showbutton === 'true'}
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <v-button
      class="!font-sans !text-black"
      on:click={copyToClipboard}
      on:keyup={copyToClipboard}
      {label}
      {icon}
      {disabled}
    />
  {/if}
</div>

{#if theme}
  <link
    rel="stylesheet"
    crossorigin="anonymous"
    referrerpolicy="no-referrer"
    href="https://cdnjs.cloudflare.com/ajax/libs/prism-themes/1.9.0/prism-{theme}.min.css"
  />
{/if}
