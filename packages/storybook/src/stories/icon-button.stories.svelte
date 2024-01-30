<script lang="ts">
import { Meta, Story } from '@storybook/addon-svelte-csf';
import { IconButton } from '@viamrobotics/prime-core';
</script>

<Meta title="Elements/IconButton" />

<Story name="Primary">
  <IconButton
    icon="plus"
    label="Add object"
  />
</Story>

<Story name="Danger">
  <IconButton
    icon="trash-can-outline"
    label="Delete object"
    variant="danger"
  />
</Story>

<Story name="Disabled">
  <IconButton
    icon="refresh"
    label="Restart object"
    disabled
  />
</Story>
