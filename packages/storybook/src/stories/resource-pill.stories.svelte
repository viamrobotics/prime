<script lang="ts">
import { Meta, Story } from '@storybook/addon-svelte-csf';
import { ResourcePill } from '@viamrobotics/prime-core';
</script>

<Meta title="Elements/ResourcePill" />

<Story name="Primary">
  <ResourcePill
    value="Not removable by default"
    icon="viam-service"
  />
</Story>

<Story name="Unremovable">
  <ResourcePill
    value="Removable"
    icon="viam-service"
    removable
  />
</Story>
