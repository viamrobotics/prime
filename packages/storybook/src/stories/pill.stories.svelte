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

<Story name="Icon">
  <div class="flex flex-row gap-1.5">
    <Pill
      value="my-base"
      icon="viam-component"
    />
    <Pill
      value="my-movement-sensor"
      icon="viam-component"
    />
    <Pill
      value="my-nav-service"
      icon="viam-service"
    />
  </div>
</Story>

<Story name="Icon Not Removable">
  <div class="flex flex-row gap-1.5">
    <Pill
      value="my-base"
      icon="viam-component"
      removable={false}
    />
    <Pill
      value="my-movement-sensor"
      icon="viam-component"
      removable={false}
    />
    <Pill
      value="my-nav-service"
      icon="viam-service"
      removable={false}
    />
  </div>
</Story>
