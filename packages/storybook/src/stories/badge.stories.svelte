<script lang="ts">
import { Meta, Story } from '@storybook/addon-svelte-csf';
import { Badge } from '@viamrobotics/prime-core';
</script>

<Meta title='Elements/Badge' />

<Story name="Neutral">
  <Badge
    variant="gray"
    label="Inactive"
  />
</Story>

<Story name="Success">
  <Badge
    variant="green"
    label="Active"
  />
</Story>

<Story name="Warning">
  <Badge
    variant="orange"
    label="Danger"
  />
</Story>

<Story name="Danger">
  <Badge
    variant="red"
    label="Unhealthy"
  />
</Story>

<Story name="Info">
  <Badge
    variant="blue"
    label="Info"
  />
</Story>
