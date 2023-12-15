<script lang="ts">
import type { ToastVariantType } from './../variants.ts';
import { ToastBanner } from '$lib/toast';
import type cx from 'classnames';
import { vi } from 'vitest';

export let variant: ToastVariantType;
export let dismiss = vi.fn();
export let extraClasses: cx.Argument = '';
</script>

<ToastBanner
  {variant}
  {dismiss}
  cx={extraClasses}
  on:close
>
  <svelte:fragment slot="message">This is the message.</svelte:fragment>
  <svelte:fragment slot="action">This is the action button.</svelte:fragment>
</ToastBanner>
