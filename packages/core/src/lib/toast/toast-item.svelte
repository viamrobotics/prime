<script lang="ts">
import type { ToastVariantType } from './variants.ts';
import { ToastBanner } from '$lib/toast';

export let variant: ToastVariantType;
export let message: string;
export let action: { text: string; handler: () => unknown } | undefined =
  undefined;
export let dismiss: () => unknown;
</script>

<ToastBanner
  {variant}
  cx="pointer-events-auto relative"
  on:close={dismiss}
  {dismiss}
>
  <svelte:fragment slot="message">
    {message}
  </svelte:fragment>
  <svelte:fragment slot="action">
    {#if action}
      <button on:click={action.handler}>
        <span class="text-sm font-medium hover:underline">{action.text}</span>
      </button>
    {/if}
  </svelte:fragment>
</ToastBanner>
