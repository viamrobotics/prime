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
import type cx from 'classnames';
import type { FloatingPlacement } from '$lib/floating';
import type { TooltipVisibility } from './tooltip-styles';

import TooltipContainer from './tooltip-container.svelte';
import TooltipTarget from './tooltip-target.svelte';
import TooltipText from './tooltip-text.svelte';

/**
 * The desired location for the tooltip, may be computed to a different
 * location  depending on layout.
 */
export let location: FloatingPlacement = 'top';

/**
 * If `visible`, the tooltip will always render. When `invisible` the tooltip
 * will never render. When `undefined` the tooltip will only render on mouse enter and focus
 */
export let state: TooltipVisibility | undefined = undefined;

/**
 * If state is `undefined`, the tooltip only renders on mouse enter and focus.
 * On mouse enter, this delay is present before the tooltip is shown.
 * There is no delay for focus.
 */
export let hoverDelayMs: number | undefined = undefined;

/** Additional CSS classes to pass to the tooltip text element. */
let extraClasses: cx.Argument = '';
export { extraClasses as cx };
</script>

<TooltipContainer
  let:tooltipID
  {hoverDelayMs}
>
  <TooltipTarget>
    <slot {tooltipID} />
  </TooltipTarget>
  <TooltipText
    cx={extraClasses}
    {location}
    {state}
  >
    <slot name="description" />
  </TooltipText>
</TooltipContainer>
