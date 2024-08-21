<script lang="ts">
  import { Icon, Tooltip } from '@viamrobotics/prime-core';

  import { paths } from './icons';
  const pathsKeys = Object.keys(paths);
</script>

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
