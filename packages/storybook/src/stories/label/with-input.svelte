<script lang="ts">
import { Label, type LabelPosition } from '@viamrobotics/prime-core';

export let position: LabelPosition = 'top';
export let disabled = false;
export let required = false;
</script>

<Label
  {position}
  {disabled}
  {required}
>
  Name:
  <input
    slot="input"
    name="name"
    class="border border-black"
    placeholder="Enter your name"
    {disabled}
    {required}
  />
</Label>
