<script lang="ts">
import type { Readable } from 'svelte/store';
import { ToastBanner, type ToastVariantType } from '$lib/toast';

export let message: string;
export let closeable: boolean | undefined = false;
export let variant: ToastVariantType;
export let progress: Readable<number>;
export let dismiss: () => unknown;
</script>

<ToastBanner
  {closeable}
  cx="pointer-events-auto relative mb-2 w-screen sm:w-[360px]"
  on:close={dismiss}
  on:action={dismiss}
  progress={$progress}
  {variant}
>
  <svelte:fragment slot="message">
    {message}
  </svelte:fragment>
</ToastBanner>
