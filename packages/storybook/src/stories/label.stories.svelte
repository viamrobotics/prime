<script lang="ts">
import { Meta, Story } from '@storybook/addon-svelte-csf';
import { Label } from '@viamrobotics/prime-core';
</script>

<Meta title="Elements/Label" />

<Story name="Input">
  <Label>
    Name:
    <input
      slot="input"
      name="name"
      class="border border-black"
      placeholder="Enter your name"
    />
  </Label>
</Story>
