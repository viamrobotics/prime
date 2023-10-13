<script lang="ts">
import { Meta, Story } from '@storybook/addon-svelte-csf';
import { ToggleButtons } from '@viamrobotics/prime-core';
</script>

<Meta title="Elements/ToggleButtons" />

<Story name="Basic">
  <ToggleButtons
    options={['Opt 1', 'Opt 2', 'Opt 3']}
    selected="Opt 1"
  />
</Story>

<Story name="With legend">
  <ToggleButtons
    options={['Opt 1', 'Opt 2']}
    selected="Opt 1"
  >
    <svelte:fragment slot="legend">These are your options</svelte:fragment>
  </ToggleButtons>
</Story>

<Story name="Required">
  <ToggleButtons
    options={['To be', 'Not to be']}
    selected="Opt 1"
    required
  >
    <svelte:fragment slot="legend">Answer the question</svelte:fragment>
  </ToggleButtons>
</Story>

<Story name="Disabled">
  <ToggleButtons
    options={['Frank', 'Dave']}
    selected="Frank"
    disabled
  >
    <svelte:fragment slot="legend"
      >I'm afraid that's something I cannot allow to happen.
    </svelte:fragment>
  </ToggleButtons>
</Story>

<Story name="Full Width">
  <div class="flex flex-row gap-2">
    <ToggleButtons
      options={['Left', 'Right']}
      selected="Left"
    />

    <ToggleButtons
      options={['Left', 'Right']}
      selected="Right"
      cx="w-full"
    />
  </div>
</Story>
