<script lang="ts">
import { Banner, type BannerVariant } from '@viamrobotics/prime-core';

export let variant: BannerVariant;
export let progress = 1;
export let exitable = false;
export let cx = '';
</script>

<Banner
  {variant}
  {progress}
  {exitable}
  {cx}
  on:close
>
  <svelte:fragment slot="title">This is the title.</svelte:fragment>
  <svelte:fragment slot="message">This is the message.</svelte:fragment>
  <svelte:fragment slot="action">This is the action.</svelte:fragment>
</Banner>
