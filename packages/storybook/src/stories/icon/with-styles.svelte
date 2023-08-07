<script lang="ts">
import { Icon } from '@viamrobotics/prime-core';

type Size = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';

export let style: string;
export let name: string;
export let size: Size;
</script>

<div {style}>
  <Icon
    {name}
    {size}
  />
</div>
