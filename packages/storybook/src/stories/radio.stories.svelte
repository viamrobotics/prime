<script lang="ts">
import { Meta, Story } from '@storybook/addon-svelte-csf';
import { Radio } from '@viamrobotics/prime-core';
</script>

<Meta title="Elements/Radio" />

<Story name="Basic">
  <Radio
    name="basic"
    options={['Opt 1', 'Opt 2', 'Opt 3']}
    selected="Opt 1"
  />
</Story>

<Story name="With legend">
  <Radio
    name="legend"
    options={['Opt 1', 'Opt 2']}
    selected="Opt 1"
  >
    <svelte:fragment slot="legend">These are your options</svelte:fragment>
  </Radio>
</Story>

<Story name="Required">
  <Radio
    name="required"
    options={['To be', 'Not to be']}
    selected="Opt 1"
    required
  >
    <svelte:fragment slot="legend">Answer the question</svelte:fragment>
  </Radio>
</Story>

<Story name="Disabled">
  <Radio
    name="disabled"
    options={['Frank', 'Dave']}
    selected="Frank"
    disabled
  >
    <svelte:fragment slot="legend"
      >I'm afraid that's something I cannot allow to happen.
    </svelte:fragment>
  </Radio>
</Story>

<Story name="Row">
  <Radio
    name="row"
    options={['Left', 'Right']}
    selected="Left"
    direction="row"
  />
</Story>
