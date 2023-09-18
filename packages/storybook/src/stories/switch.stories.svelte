<script lang="ts">
import { Meta, Story } from '@storybook/addon-svelte-csf';
import { Switch } from '@viamrobotics/prime-core';
</script>

<Meta title="Elements/Switch" />

<Story name="Default">
  <Switch on={false} />
</Story>

<Story name="Annotated">
  <Switch
    on={false}
    variant="annotated"
  />
</Story>

<Story name="With label">
  <Switch
    on={false}
    label="Lunchtime"
  />
</Story>

<Story name="Disabled">
  <Switch
    on={false}
    disabled={true}
    label="disabled"
  />
</Story>

<Story name="With Tooltip and Icon">
  <Switch
    on={false}
    tooltip="I am a tooltip"
    label="Tooltip and Icon"
  />
</Story>

<Story name="Readonly">
  <Switch
    on={true}
    variant="annotated"
    readonly={true}
    label="readonly"
  />
</Story>
