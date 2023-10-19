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
