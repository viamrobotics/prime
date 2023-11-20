<script lang="ts">
import { Meta, Story } from '@storybook/addon-svelte-csf';
import { ResourcePill } from '@viamrobotics/prime-core';
</script>

<Meta title="Elements/ResourcePill" />

<Story name="Primary">
  <ResourcePill value="cool pill" />
</Story>

<Story name="Removable">
  <ResourcePill
    value="Not removable"
    removable
  />
</Story>
