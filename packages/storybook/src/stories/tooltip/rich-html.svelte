<script lang="ts">
import {
  Icon,
  Tooltip,
  type TooltipLocation,
  type TooltipState,
} from '@viamrobotics/prime-core';

export let location: TooltipLocation = 'top';
export let state: TooltipState = 'invisible';
</script>

<Tooltip
  {location}
  {state}
>
  <p>This <b>element</b> has a <em>tooltip</em>.</p>
  <Icon name="information-outline" />
  <p slot="text">
    This is the <b class="underline"> tooltip text! </b>
  </p>
</Tooltip>
