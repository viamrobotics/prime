<script lang="ts">
import type cx from 'classnames';
import { Banner, type BannerVariantType } from '$lib';

export let variant: BannerVariantType;
export let progress = 1;
export let exitable = false;
export let extraClasses: cx.Argument = '';
</script>

<Banner
  {variant}
  {progress}
  {exitable}
  cx={extraClasses}
  on:close
>
  <svelte:fragment slot="title">This is the title.</svelte:fragment>
  <svelte:fragment slot="subtitle">This is the subtitle.</svelte:fragment>
  <svelte:fragment slot="action">This is the action.</svelte:fragment>
  <svelte:fragment slot="actionEmphasize">This is the button.</svelte:fragment>
</Banner>
