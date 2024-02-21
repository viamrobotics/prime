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

<Story name="With description">
  <Radio
    name="Upload model"
    options={[
      {
        label: 'New model',
        value: 'new model',
        description: 'Upload a new model',
      },
      {
        label: 'New version',
        value: 'new version',
        description:
          'Upload a new version of a model that already exists in Viam',
      },
    ]}
    selected="new model"
  >
    <svelte:fragment slot="legend">Upload model</svelte:fragment>
  </Radio>
</Story>

<Story name="With icon">
  <Radio
    name="Visibility"
    options={[
      {
        label: 'Public',
        value: 'public',
        description: 'Can be used by external organizations',
        icon: 'earth',
      },
      {
        label: 'Private',
        value: 'private',
        description: 'Only for internal use within this organization',
        icon: 'lock',
      },
    ]}
    selected="public"
  >
    <svelte:fragment slot="legend">Visibility</svelte:fragment>
  </Radio>
</Story>
