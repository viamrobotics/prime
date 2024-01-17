<script lang="ts">
import { Meta, Story } from '@storybook/addon-svelte-csf';
import { Radio } from '@viamrobotics/prime-core';
</script>

<Meta title="Elements/Radio" />

<Story name="Basic">
  <Radio
    name="basic"
    options={['Lion', 'Tiger', 'Bear']}
    selected="Lion"
  />
</Story>

<Story name="With legend">
  <Radio
    name="legend"
    options={['Lion', 'Tiger', 'Bear']}
    selected="Lion"
  >
    <svelte:fragment slot="legend">Favorite animal</svelte:fragment>
  </Radio>
</Story>

<Story name="Required">
  <Radio
    name="required"
    options={['Lion', 'Tiger', 'Bear']}
    selected="Lion"
    required
  >
    <svelte:fragment slot="legend">Favorite animal</svelte:fragment>
  </Radio>
</Story>

<Story name="Disabled">
  <Radio
    name="disabled"
    options={['Lion', 'Tiger', 'Bear']}
    selected="Lion"
    disabled
  >
    <svelte:fragment slot="legend">Favorite animal</svelte:fragment>
  </Radio>
</Story>
