<script lang="ts">
import { Meta, Story } from '@storybook/addon-svelte-csf';
import { Pill } from '@viamrobotics/prime-core';
</script>

<Meta title="Elements/Pill" />

<Story name="Default">
  <div class="flex flex-row gap-1.5">
    <Pill value="Lion" />
    <Pill value="Tiger" />
    <Pill value="Bear" />
  </div>
</Story>

<Story name="Default Not Removable">
  <div class="flex flex-row gap-1.5">
    <Pill
      value="Lion"
      removable={false}
    />
    <Pill
      value="Tiger"
      removable={false}
    />
    <Pill
      value="Bear"
      removable={false}
    />
  </div>
</Story>

<Story name="Outlined">
  <div class="flex flex-row gap-1.5">
    <Pill
      value="my-base"
      variant="outlined"
      icon="viam-component"
    />
    <Pill
      value="my-movement-sensor"
      variant="outlined"
      icon="viam-component"
    />
    <Pill
      value="my-nav-service"
      variant="outlined"
      icon="viam-service"
    />
  </div>
</Story>

<Story name="Outlined Not Removable">
  <div class="flex flex-row gap-1.5">
    <Pill
      value="my-base"
      variant="outlined"
      icon="viam-component"
      removable={false}
    />
    <Pill
      value="my-movement-sensor"
      variant="outlined"
      icon="viam-component"
      removable={false}
    />
    <Pill
      value="my-nav-service"
      variant="outlined"
      icon="viam-service"
      removable={false}
    />
  </div>
</Story>
