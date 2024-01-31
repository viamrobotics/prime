<script lang="ts">
import { Meta, Story } from '@storybook/addon-svelte-csf';
import { Label, Switch } from '@viamrobotics/prime-core';
</script>

<Meta title="Elements/Switch" />

<Story name="Basic">
  <Switch />
</Story>

<Story name="Disabled">
  <Switch disabled />
</Story>

<Story name="With label">
  <Label position="top">
    Enable encryption
    <Switch slot="input" />
  </Label>
</Story>
