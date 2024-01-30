<!--
@component

For rendering readonly blocks of code. Uses `prism` for syntax highlighting:

https://prismjs.com

```svelte
<CodeSnippet language="json" code="{ myThing: true }">
    <svelte:fragment slot="caption">This text captions the code snippet.</svelte:fragment>
</CodeSnippet>
```
-->
<svelte:options immutable />

<script
  context="module"
  lang="ts"
>
import Prism from 'prismjs';
import PrismPackage from 'prismjs/package.json';
import 'prism-themes/themes/prism-vs.min.css';

const PRISM_VERSION = PrismPackage.version;

type CodeSnippetCopyState = 'copy' | 'copied' | 'failed';
const COPY_STATES: Record<
  CodeSnippetCopyState,
  { label: string; icon: IconName }
> = {
  copy: { label: 'Copy', icon: 'content-copy' },
  copied: { label: 'Copied', icon: 'check' },
  failed: { label: 'Failed', icon: 'alert' },
} as const;
</script>

<script lang="ts">
import { createEventDispatcher, onMount } from 'svelte';
import cx from 'classnames';

import { IconButton, type IconName, useTimeout } from '$lib';
import { escape } from 'lodash-es';

/**
 * The language to use for syntax highlighting. Must be a language supported by
 * prism: https://prismjs.com/#supported-languages
 */
export let language: string;

/**
 * The code to render in the code-snippet.
 */
export let code: string;

/**
 * Whether or not to show a copy-to-clipboard button.
 */
export let showCopyButton = true;

/**
 * Some prism languages have dependencies. For example, C++ requires C. If the
 * passed `language` has dependencies, they must be included here to be loaded.
 *
 * See: https://prismjs.com/plugins/autoloader/
 */
export let dependencies: string[] = [];

/**
 * We use the prism autoloader to handle loading in language grammar files. The
 * default path for the grammar files is a CDN link so we don't have to include
 * grammar files in our bundle. If you prefer to point to your own grammars and
 * bypass the CDN, define the path to those files.
 *
 * See: https://prismjs.com/plugins/autoloader/
 */
export let grammarsPath = `https://cdnjs.cloudflare.com/ajax/libs/prism/${PRISM_VERSION}/components/`;

/** Additional CSS classes to pass to the aside. */
let extraClasses: cx.Argument = '';
export { extraClasses as cx };

const { set: setCopyTimeout } = useTimeout();
let element: HTMLElement | undefined;

$: copyState = 'copy' as CodeSnippetCopyState;

const dispatch = createEventDispatcher<{
  copy: { succeeded: boolean; message: string };
}>();

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(code);
    copyState = 'copied';

    dispatch('copy', {
      succeeded: true,
      message: 'Successfully copied snippet to the clipboard',
    });
  } catch {
    copyState = 'failed';

    dispatch('copy', {
      succeeded: false,
      message: 'Failed to copy snippet to the clipboard',
    });
  }

  setCopyTimeout(() => {
    copyState = 'copy';
  }, 2000);
};

const highlight = () => {
  if (element) {
    /**
     * We need to reset the inner HTML of the element to the raw value of
     * `code` so it can rescanned for highlighting from the raw.
     */
    element.innerHTML = escape(code);
    Prism.highlightElement(element);
  }
};

$: if (code) {
  highlight();
}

onMount(async () => {
  try {
    /**
     * After the HTML is loaded in the DOM, we can use the autoloader to manage
     * scanning for languages and including the components properly
     */
    await import(
      // @ts-expect-error no type declaration for this JS file
      'prismjs/plugins/autoloader/prism-autoloader'
    );

    // Make sure the autoloader knows where to find our languages
    (Prism.plugins.autoloader as { languages_path: string }).languages_path =
      grammarsPath;

    // Do the initial highlighting
    highlight();
  } catch (error) {
    /* eslint-disable-next-line no-console */
    console.error('Error initializing prismjs', error);
  }
});
</script>

<figure class={cx('flex flex-col gap-2', extraClasses)}>
  {#if $$slots.caption}
    <figcaption><slot name="caption" /></figcaption>
  {/if}

  <div class="flex gap-x-4 bg-light p-2">
    <!-- The formatting here is intentional to preserve the formatting of `code` -->
    <pre class="flex-1 overflow-x-auto language-{language}"><code
        bind:this={element}
        class="language-{language}"
        data-dependencies={dependencies.join(',')}>{code}</code
      ></pre>

    {#if showCopyButton}
      <IconButton
        class="text-black"
        icon={COPY_STATES[copyState].icon}
        label={COPY_STATES[copyState].label}
        on:click={copyToClipboard}
        on:keyup={copyToClipboard}
      />
    {/if}
  </div>
</figure>

<style>
/* Theme overrides */
figure pre[class*='language-'],
figure pre[class*='language-'] > code[class*='language-'] {
  margin: 0;
  border: none;
  background: inherit;
}

figure pre[class*='language-'] {
  padding: 0;
  padding-left: 0.5rem;
  padding-top: 0.5rem;
}

figure pre[class*='language-'] > code[class*='language-'] {
  font-family: 'Roboto Mono Variable', 'Roboto Mono', ui-monospace, monospace;
}
</style>
