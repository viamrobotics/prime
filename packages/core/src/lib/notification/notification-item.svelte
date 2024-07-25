<script lang="ts">
import type { Readable } from 'svelte/store';
import { Banner, type BannerVariantType } from '$lib/banner';

export let title: string;
export let message: string | undefined = '';
export let variant: BannerVariantType;
export let progress: Readable<number>;
export let dismiss: () => unknown;
</script>

<Banner
  exitable
  cx="pointer-events-auto relative z-[9999] mb-2 w-screen sm:w-[360px]"
  on:close={dismiss}
  progress={$progress}
  {variant}
>
  <svelte:fragment slot="title">{title}</svelte:fragment>
  <svelte:fragment slot="subtitle">
    {#if message?.length}
      {message}
    {/if}
  </svelte:fragment>
</Banner>
