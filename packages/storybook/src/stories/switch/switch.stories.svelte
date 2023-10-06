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
  <Label position="left">
    Switch
    <Switch slot="input" />
  </Label>
</Story>

<Story name="Annotated">
  <Switch annotated />
</Story>

<Story name="Custom annotations">
  <Switch annotated>
    <svelte:fragment slot="on">Enabled</svelte:fragment>
    <svelte:fragment slot="off">Disabled</svelte:fragment>
  </Switch>
</Story>
