<script lang="ts">
import { Meta, Story } from '@storybook/addon-svelte-csf';
import { IconButton } from '@viamrobotics/prime-core';
</script>

<Meta title="Elements/IconButton" />

<Story name="Primary">
  <IconButton
    icon="play-circle-outline"
    label="Run"
  />
</Story>

<Story name="Danger">
  <IconButton
    label="Stop"
    icon="stop-circle-outline"
    variant="danger"
  />
</Story>

<Story name="Disabled">
  <IconButton
    icon="play-circle-outline"
    label="Run"
    disabled
  />
</Story>

<Story name="With title">
  <IconButton
    icon="play-circle-outline"
    label="Run"
    title="Run this command"
  />
</Story>
