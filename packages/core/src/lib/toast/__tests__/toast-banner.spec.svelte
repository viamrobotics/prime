<script lang="ts">
import { ToastBanner } from '$lib/toast';
import type cx from 'classnames';
import type { ToastVariantType } from '$lib';

export let variant: ToastVariantType;
export let progress = 1;
export let closeable = false;
export let extraClasses: cx.Argument = '';
</script>

<ToastBanner
  {variant}
  {progress}
  {closeable}
  cx={extraClasses}
  on:close
>
  <svelte:fragment slot="message">This is the message.</svelte:fragment>
</ToastBanner>
