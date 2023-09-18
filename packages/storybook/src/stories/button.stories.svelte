<script lang="ts">
import { Meta, Story } from '@storybook/addon-svelte-csf';
import { Button } from '@viamrobotics/prime-core';
</script>

<Meta title="Elements/Button" />

<Story name="Primary">
  <Button>Run</Button>
</Story>

<Story name="Dark">
  <Button variant="dark">Run</Button>
</Story>

<Story name="Ghost">
  <Button variant="ghost">Walk</Button>
</Story>

<Story name="Success">
  <Button variant="success">Success</Button>
</Story>

<Story name="Danger">
  <Button variant="danger">Stop</Button>
</Story>

<Story name="Danger (outline)">
  <Button variant="outline-danger">Slow down</Button>
</Story>

<Story name="Danger (outline with icon)">
  <Button
    variant="outline-danger"
    icon="trash-can-outline"
  >
    Delete component
  </Button>
</Story>

<Story name="Disabled">
  <Button disabled>Run</Button>
</Story>

<Story name="With title">
  <Button title="Run this command">Run</Button>
</Story>

<Story name="With icon">
  <Button icon="refresh">Refresh</Button>
</Story>

<Story name="Icon variant">
  <Button
    variant="ghost"
    icon="trash-can-outline"
  >
    Delete component
  </Button>
</Story>

<Story name="Full width button">
  <Button width="full">Wiiiiiiiiiiiiiiiiiiiiide</Button>
</Story>

<Story
  name="Full width button with icon"
  args={{
    width: 'full',
    label: 'hello',
    icon: 'trash-can-outline',
  }}
>
  <Button
    icon="trash-can-outline"
    width="full"
  >
    Iiiiiiiiiiiiiiiicon
  </Button>
</Story>
