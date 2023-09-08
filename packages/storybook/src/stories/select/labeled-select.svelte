<script lang="ts">
import { Label, type SelectState } from '@viamrobotics/prime-core';
import SelectWithOptions from './select-with-options.svelte';

export let value: string | undefined = undefined;
export let disabled = false;
export let state: SelectState = 'none';
export let cx = '';
</script>

<Label>
  Options:
  <SelectWithOptions
    slot="input"
    {value}
    {disabled}
    {state}
    {cx}
  />
</Label>
