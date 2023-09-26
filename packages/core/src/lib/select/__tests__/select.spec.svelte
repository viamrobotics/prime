<!-- 
  @component

  This component allows us to render a Tooltip with its slotted
  children, due to limitations with rendering slots using
  `@testing-library`.

  See:
  - https://sveltesociety.dev/recipes/testing-and-debugging/unit-testing-svelte-component
  - https://github.com/testing-library/svelte-testing-library/issues/48
 -->
<script lang="ts">
import { Select, type SelectState } from '$lib';

export let value: string | undefined = undefined;
export let disabled = false;
export let state: SelectState = 'none';
</script>

<Select
  {value}
  {disabled}
  {state}
  {...$$restProps}
  on:change
  on:keydown
  on:mousedown
>
  <option>Option 1</option>
  <option>Option 2</option>
  <option>Option 3</option>
</Select>
