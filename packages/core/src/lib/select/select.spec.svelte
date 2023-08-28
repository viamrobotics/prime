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
import type { InputState } from '$lib/input/input.svelte';
import Select from './select.svelte';

export let value: string | undefined = undefined;
export let disabled = false;
export let state: InputState = 'none';
</script>

<Select
  {value}
  {disabled}
  {state}
  {...$$restProps}
>
  <option>Option 1</option>
  <option>Option 2</option>
  <option>Option 3</option>
</Select>
