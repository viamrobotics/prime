<script lang="ts">
import { Icon } from '@viamrobotics/prime-core';
import { paths } from '../../../../core/src/lib/icon/icons';

type Size = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';

const pathsKeys = Object.keys(paths);

export let size: Size;
</script>

<div class="flex flex-wrap gap-8">
  {#each pathsKeys as name}
  <Icon
    {name}
    {size}
  />
  {/each}  
</div>
