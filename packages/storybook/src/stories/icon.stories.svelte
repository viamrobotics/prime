<script lang="ts">
import { Meta, Story } from '@storybook/addon-svelte-csf';
import { Icon, Tooltip, type IconName } from '@viamrobotics/prime-core';

import { paths } from '../../../core/src/lib/icon/icons';

const pathsKeys = Object.keys(paths) as IconName[];
</script>

<Meta title="Elements/Icon" />

<Story name="Checkmark">
  <Icon name="check-circle" />
</Story>

<Story name="Checkmark 2xl">
  <Icon
    name="check-circle"
    size="2xl"
  />
</Story>

<Story name="All Icons">
  <div class="flex flex-wrap gap-8">
    {#each pathsKeys as name}
      <Tooltip>
        <Icon
          {name}
          size="lg"
        />
        <p slot="description">
          {name}
        </p>
      </Tooltip>
    {/each}
  </div>
</Story>
