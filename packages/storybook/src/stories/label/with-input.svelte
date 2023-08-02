<script lang="ts">
import { Label } from '@viamrobotics/prime-core';

export let disabled = false;
export let required = false;
</script>

<Label
  {disabled}
  {required}
>
  Name:
  <input
    name="name"
    class="border border-black"
    placeholder="Enter your name"
    {disabled}
    {required}
  />
</Label>
