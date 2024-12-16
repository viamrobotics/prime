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
import { createEventDispatcher } from 'svelte';
import cx from 'classnames';

import { IconButton, type IconName, useTimeout } from '$lib';
import { highlightCode } from '$lib/highlight-code';

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

/** Additional CSS classes to pass to the aside. */
let extraClasses: cx.Argument = '';
export { extraClasses as cx };

const { set: setCopyTimeout } = useTimeout();

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
</script>

<figure class={cx('flex flex-col gap-2', extraClasses)}>
  {#if $$slots.caption}
    <figcaption><slot name="caption" /></figcaption>
  {/if}

  <div class="flex gap-x-4 bg-light p-4">
    <!-- The formatting here is intentional to preserve the formatting of `code` -->
    <pre
      class="flex-1 overflow-x-auto"
      use:highlightCode><code class="language-{language}">{code}</code></pre>

    {#if showCopyButton}
      <IconButton
        cx="text-gray-6"
        icon={COPY_STATES[copyState].icon}
        label={COPY_STATES[copyState].label}
        on:click={copyToClipboard}
        on:keyup={copyToClipboard}
      />
    {/if}
  </div>
</figure>
