<script lang="ts">
import { Meta, Story } from '@storybook/addon-svelte-csf';
import { Badge } from '@viamrobotics/prime-core';
</script>

<Meta title="Elements/Badge" />

<Story name="Inactive">
  <Badge
    variant="inactive"
    label="Inactive"
  />
</Story>

<Story name="Success">
  <Badge
    variant="success"
    label="Success"
  />
</Story>

<Story name="Warning">
  <Badge
    variant="warning"
    label="Warning"
  />
</Story>

<Story name="Danger">
  <Badge
    variant="danger"
    label="Danger"
  />
</Story>

<Story name="Neutral">
  <Badge
    variant="neutral"
    label="Neutral"
  />
</Story>
