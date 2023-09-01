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
import { Banner } from '$lib';
import type { BannerVariant } from '$lib/banner.svelte';

export let variant: BannerVariant;
export let progress = 1;
export let exitable = false;
</script>

<Banner
  {variant}
  {progress}
  {exitable}
  on:close
>
  <svelte:fragment slot="title">This is the title.</svelte:fragment>
  <svelte:fragment slot="message">This is the message.</svelte:fragment>
  <svelte:fragment slot="action">This is the action.</svelte:fragment>
</Banner>
