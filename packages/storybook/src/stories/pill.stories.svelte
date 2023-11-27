<script lang="ts">
import { Meta, Story } from '@storybook/addon-svelte-csf';
import { Pill } from '@viamrobotics/prime-core';
</script>

<Meta title="Elements/Pill" />

<Story name="Primary">
  <Pill value="cool pill" />
</Story>

<Story name="Unremovable">
  <Pill
    value="Not removable"
    readonly
  />
</Story>

<Story name="Resource">
  <Pill
    value="Viam resource"
    variant="outlined"
    icon="viam-service"
    removable={false}
  />
</Story>
