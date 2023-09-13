<script lang="ts">
import { Meta, Story } from '@storybook/addon-svelte-csf';
import { Tabs } from '@viamrobotics/prime-core';

let tab = 'Tab 1';
</script>

<Meta title="Elements/Tabs" />

<Story name="Default">
  <Tabs
    tabs={['Tab 1', 'Tab 2', 'Tab 3']}
    selected={tab}
    on:input={(event) => {
      tab = event.detail.value;
    }}
  />
  <div class="my-4">Selected {tab}</div>
</Story>
