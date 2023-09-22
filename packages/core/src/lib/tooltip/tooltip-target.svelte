<!--
  @component

  The target of a tooltip.

  Used alongside <TooltipContainer> and <TooltipTarget> to create
  customized tooltips when the regular <Tooltip> can't be used.

  See <TooltipContainer> for details.
-->
<svelte:options immutable />

<script lang="ts">
import { useTooltipStyles } from './tooltip-styles';

const { setTarget, setHovered } = useTooltipStyles();
const hover = () => setHovered(true);
const unhover = () => setHovered(false);
let target: HTMLElement | undefined;

$: setTarget(target);
</script>

<span
  role="presentation"
  bind:this={target}
  on:mouseenter={hover}
  on:mouseleave={unhover}
  on:focusin={hover}
  on:focusout={unhover}
>
  <slot />
</span>
