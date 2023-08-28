<script lang="ts">
import { Label, type InputState } from '@viamrobotics/prime-core';
import SelectWithOptions from './select-with-options.svelte';

export let value: string | undefined = undefined;
export let disabled = false;
export let state: InputState = 'none';
</script>

<Label>
  Options:
  <SelectWithOptions
    slot="input"
    {value}
    {disabled}
    {state}
  />
</Label>
