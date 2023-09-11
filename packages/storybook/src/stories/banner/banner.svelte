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
</Banner>
