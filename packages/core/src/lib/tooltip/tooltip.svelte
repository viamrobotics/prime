<!--
  @component

  The tooltip is used to provide contextual information to users
  for specific elements.

  ```svelte
  <Tooltip location="left" let:tooltipID>
    <p aria-describedby={tooltipID}>
      This element needs some additional context.
      <Icon slot="icon" name="information-outline" />
    </p>
    <p slot="description">This is the tooltip text!</p>
  </Tooltip>
  ```
-->
<svelte:options immutable />

<script lang="ts">
import type { TooltipLocation, TooltipVisibility } from './tooltip-styles';

import TooltipContainer from './tooltip-container.svelte';
import TooltipTarget from './tooltip-target.svelte';
import TooltipText from './tooltip-text.svelte';

/**
 * The desired location for the tooltip, may be computed to a different
 * location  depending on layout.
 */
export let location: TooltipLocation = 'top';

/**
 * If `visible`, the tooltip will always render. When `invisible` the tooltip
 * will only render on mouse enter and focus
 */
export let state: TooltipVisibility = 'invisible';
</script>

<TooltipContainer let:tooltipID>
  <TooltipTarget>
    <slot {tooltipID} />
  </TooltipTarget>
  <TooltipText
    {location}
    {state}
  >
    <slot name="description" />
  </TooltipText>
</TooltipContainer>
