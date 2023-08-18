<script lang="ts">
import { Select, type InputState } from '@viamrobotics/prime-core';

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
  <optgroup label="More options">
    <option>Option 4</option>
    <option>Option 5</option>
    <option>Option 6</option>
  </optgroup>
</Select>
