<!--
  @component

  The target of a tooltip.

  Used alongside <TooltipContainer> and <TooltipTarget> to create
  customized tooltips when the regular <Tooltip> can't be used.

  See <TooltipContainer> for details.
-->
<svelte:options immutable />

<script lang="ts">
import { useTooltip } from './tooltip-styles';

const { style, setHovered } = useTooltip();
const hover = () => setHovered(true);
const unhover = () => setHovered(false);
let referenceElement: HTMLElement | undefined;

$: style.register({ referenceElement });
</script>

<span
  role="presentation"
  bind:this={referenceElement}
  on:mouseenter={hover}
  on:mouseleave={unhover}
  on:focusin={hover}
  on:focusout={unhover}
>
  <slot />
</span>
