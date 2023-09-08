<script lang="ts">
import { Input, Label, type InputState } from '@viamrobotics/prime-core';

export let value = '';
export let readonly = false;
export let disabled = false;
export let state: InputState = 'none';
export let cx = '';
</script>

<Label>
  Name:
  <Input
    slot="input"
    {value}
    {readonly}
    {disabled}
    {state}
    {cx}
  />
</Label>
