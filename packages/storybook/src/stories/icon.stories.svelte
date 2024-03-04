<script lang="ts">
import { Meta, Story } from '@storybook/addon-svelte-csf';
import { Icon, Tooltip } from '@viamrobotics/prime-core';

import { paths } from '../../../core/src/lib/icon/icons';

const pathsKeys = Object.keys(paths);
</script>

<Meta title="Elements/Icon" />

<Story name="Checkmark">
  <Icon
    name="check-circle"
    cx="text-gray-6"
  />
</Story>

<Story name="Checkmark 2xl">
  <Icon
    name="check-circle"
    size="2xl"
    cx="text-gray-6"
  />
</Story>

<Story name="All Icons">
  <div class="flex flex-wrap gap-8">
    {#each pathsKeys as name}
      <Tooltip>
        <Icon
          {name}
          size="lg"
          cx="text-gray-6"
        />
        <p slot="description">
          {name}
        </p>
      </Tooltip>
    {/each}
  </div>
</Story>
