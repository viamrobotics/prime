<!--
  @component

  This component allows us to render a Tooltip with its slotted
  children, due to limitations with rendering slots using
  `@testing-library`.

  See:
  - https://sveltesociety.dev/recipes/testing-and-debugging/unit-testing-svelte-component
  - https://github.com/testing-library/svelte-testing-library/issues/48
 -->
<script lang="ts">
import { Tooltip, type TooltipLocation, type TooltipVisibility } from '$lib';

export let location: TooltipLocation = 'top';
export let state: TooltipVisibility | undefined = undefined;
</script>

<Tooltip
  {location}
  {state}
  let:tooltipID
>
  <button
    data-testid="target"
    aria-describedby={tooltipID}
  >
    This element has a tooltip.
  </button>
  <p slot="description">This is the tooltip text!</p>
</Tooltip>
