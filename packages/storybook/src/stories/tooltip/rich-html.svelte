<script lang="ts">
import {
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
  <span
    slot="icon"
    role="img"
    class="information-outline"
  />
  <p slot="text">
    This is the <b class="underline"> tooltip text! </b>
  </p>
</Tooltip>
