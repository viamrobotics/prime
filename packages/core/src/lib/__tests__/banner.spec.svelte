<!-- 
  @component

  This component allows us to render a Notify with its slotted
  children, due to limitations with rendering slots using
  `@testing-library`.

  See:
  - https://sveltesociety.dev/recipes/testing-and-debugging/unit-testing-svelte-component
  - https://github.com/testing-library/svelte-testing-library/issues/48
 -->

<script lang="ts">
import type cx from 'classnames';
import { Banner } from '$lib';
import type { BannerVariant } from '$lib/banner.svelte';

export let variant: BannerVariant;
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
  <svelte:fragment slot="message">This is the message.</svelte:fragment>
  <svelte:fragment slot="action">This is the action.</svelte:fragment>
</Banner>
