<script lang="ts">
import { Meta, Story } from '@storybook/addon-svelte-csf';
import { Radio } from '@viamrobotics/prime-core';
</script>

<Meta title="Elements/Radio" />

<Story name="Basic">
  <Radio
    options={['Opt 1', 'Opt 2', 'Opt 3']}
    selected="Opt 1"
  />
</Story>

<Story name="With label">
  <Radio
    label="These are your options"
    labelposition="top"
    options={['Opt 1', 'Opt 2']}
    selected="Opt 1"
  />
</Story>

<Story name="Tooltip and state">
  <Radio
    label="Your options"
    labelposition="top"
    options={['Option 1', 'Option 2', 'Option 3']}
    selected="Option 1"
    tooltip="Warning - these options may not be your only options."
    state="warn"
  />
</Story>

<Story name="Readonly">
  <Radio
    options={['Opt 1', 'Opt 2', 'Opt 3']}
    selected="Opt 1"
    readonly={true}
  />
</Story>

<Story name="Full width radio">
  <Radio
    options={['Opt 1', 'Opt 2', 'Opt 3']}
    selected="Opt 1"
    width="full"
  />
</Story>
