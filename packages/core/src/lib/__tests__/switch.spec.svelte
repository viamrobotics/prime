<!-- 
  @component

  This component allows us to render a Switch with its slotted
  children, due to limitations with rendering slots using
  `@testing-library`.

  See:
  - https://sveltesociety.dev/recipes/testing-and-debugging/unit-testing-svelte-component
  - https://github.com/testing-library/svelte-testing-library/issues/48
 -->
<script lang="ts">
import Switch from '$lib/switch.svelte';

export let on = false;
export let annotated = false;
export let disabled = false;
</script>

<Switch
  {on}
  {annotated}
  {disabled}
  on:toggle
>
  <svelte:fragment slot="on">Enabled</svelte:fragment>
  <svelte:fragment slot="off">Disabled</svelte:fragment>
</Switch>
