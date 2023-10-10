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
import ToggleButtons from '$lib/toggle-buttons.svelte';

export let options: string[];
export let selected: string | undefined = undefined;
export let disabled = false;
</script>

<ToggleButtons
  {options}
  {selected}
  {disabled}
  on:input
>
  <svelte:fragment slot="legend">Test toggle buttons</svelte:fragment>
</ToggleButtons>
