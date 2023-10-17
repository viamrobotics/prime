<!--
@component
  
For rendering readonly blocks of code. Uses `prism` for syntax highlighting:

https://prismjs.com

```svelte
<CodeSnippet language="json" code="{ myThing: true }" />
```
-->
<svelte:options immutable />

<script
  context="module"
  lang="ts"
>
export type CodeSnippetTheme = 'vs' | 'vsc-dark-plus';

// See: https://github.com/PrismJS/prism/releases
const PRISM_VERSION = '1.29.0' as const;

// See: https://github.com/PrismJS/prism-themes/releases
const PRISM_THEMES_VERSION = '1.9.0' as const;

const loadedLibraries: Record<string, boolean> = {};
</script>

<script lang="ts">
import { createEventDispatcher, onMount } from 'svelte';
import cx from 'classnames';

import type { IconName } from '$lib';
import IconButton from './button/icon-button.svelte';

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
 * The theme to use for syntax highlighting. Must be a theme provided by
 * prism-themes: https://github.com/PrismJS/prism-themes#available-themes
 *
 * Currently only the `vs` and `vsc-dark-plus` themes are supported.
 */
export let theme: CodeSnippetTheme = 'vs';

/**
 * Whether or not to show a copy-to-clipboard button.
 */
export let showCopyButton = true;

/**
 * Some prism languages have dependencies. For example, C++ requires C. If the
 * passed `language` has dependencies, they must be included here to be loaded.
 */
export let dependencies: string[] = [];

/** Additional CSS classes to pass to the aside. */
let extraClasses: cx.Argument = '';
export { extraClasses as cx };

let element: HTMLElement | undefined;

$: copyButtonLabel = 'Copy';
$: copyButtonIcon = 'content-copy' as IconName;

const dispatch = createEventDispatcher<{
  copy: { succeeded: boolean; message: string };
}>();

const getCdnUrl = (src: string) =>
  `https://cdnjs.cloudflare.com/ajax/libs/prism/${PRISM_VERSION}/${src}`;

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(code);

    copyButtonLabel = 'Copied';
    copyButtonIcon = 'check';

    dispatch('copy', {
      succeeded: true,
      message: 'Successfully copied snippet to the clipboard',
    });
  } catch {
    copyButtonLabel = 'Failed';
    copyButtonIcon = 'alert';

    dispatch('copy', {
      succeeded: false,
      message: 'Failed to copy snippet to the clipboard',
    });
  }

  window.setTimeout(() => {
    copyButtonLabel = 'Copy';
    copyButtonIcon = 'content-copy';
  }, 2000);
};

const highlight = () => {
  if (element) {
    window.Prism.highlightElement(element);
  }
};

const addScript = (
  src: string,
  onLoad?: (event: Event) => void,
  onError?: (event: ErrorEvent) => void
) => {
  const el = document.createElement('script');
  el.async = true;
  el.src = getCdnUrl(src);
  el.addEventListener('load', (event) => onLoad?.(event));
  el.addEventListener('error', (event) => onError?.(event));
  document.head.append(el);
};

const loadLanguage = () => {
  // If the language has already been loaded in the document, highlight
  if (loadedLibraries[language]) {
    highlight();
    return;
  }

  addScript(
    `components/prism-${language}.min.js`,
    () => highlight(),
    /* eslint-disable-next-line no-console */
    (error) => console.error(`Error loading prism-${language}`, error)
  );
};

const loadDependency = (index: number) => {
  if (index === dependencies.length) {
    loadLanguage();
    return;
  }

  const dependency = dependencies[index]!;
  if (loadedLibraries[dependency]) {
    loadDependency(index + 1);
    return;
  }

  addScript(
    `components/prism-${dependency}.min.js`,
    () => {
      loadedLibraries[dependency] = true;
      loadDependency(index + 1);
    },
    /* eslint-disable-next-line no-console */
    (error) => console.error(`Error loading prism-${dependency}`, error)
  );
};

const loadPrism = () => {
  // If we have already loaded prism, move on to dependencies
  if (loadedLibraries.prism) {
    loadDependency(0);
    return;
  }

  addScript(
    'prism.min.js',
    () => {
      loadedLibraries.prism = true;
      loadDependency(0);
    },
    /* eslint-disable-next-line no-console */
    (error) => console.error('Error loading prism', error)
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

$: {
  if (element && code && loadedLibraries.prism) {
    element.innerHTML = formatCode(code);
    highlight();
  }
}

onMount(() => {
  loadPrism();
});
</script>

<figure class={cx('flex flex-col', extraClasses)}>
  <div
    class={cx('flex gap-x-4 p-2', {
      'bg-gray-9': theme === 'vsc-dark-plus',
      'bg-light': theme === 'vs',
    })}
  >
    <!-- The formatting here is intentional to preserve the formatting of `code` -->
    <pre class="flex-1 overflow-x-auto"><code
        bind:this={element}
        class="language-{language}">{code}</code
      ></pre>

    {#if showCopyButton}
      <IconButton
        class="text-black"
        icon={copyButtonIcon}
        label={copyButtonLabel}
        on:click={copyToClipboard}
        on:keyup={copyToClipboard}
      />
    {/if}
  </div>
</figure>

{#if theme}
  <link
    rel="stylesheet"
    crossorigin="anonymous"
    referrerpolicy="no-referrer"
    href="https://cdnjs.cloudflare.com/ajax/libs/prism-themes/{PRISM_THEMES_VERSION}/prism-{theme}.min.css"
  />

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
{/if}
