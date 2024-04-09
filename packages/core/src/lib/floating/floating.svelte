<script lang="ts">
import classnames from 'classnames';
import { clickOutside } from '$lib/click-outside';
import {
  floatingStyle,
  type FloatingReferenceElement,
  type FloatingPlacement,
  type FloatingFlipOptions,
  type FloatingShiftOptions,
  type FloatingSizeOptions,
  type FloatingStrategy,
} from './floating-style';

export let referenceElement: FloatingReferenceElement | undefined;
export let placement: FloatingPlacement = 'bottom-start';
export let offset: number | undefined = undefined;
export let flip: FloatingFlipOptions | undefined = undefined;
export let shift: FloatingShiftOptions | undefined = undefined;
export let size: FloatingSizeOptions | undefined = undefined;
export let strategy: FloatingStrategy | undefined = undefined;
export let auto = false;
export let onClickOutside: ((target: Element) => unknown) | undefined =
  undefined;
export let cx: classnames.Argument = undefined;

const style = floatingStyle();
let floatingElement: HTMLElement | undefined;

$: style.register({
  referenceElement,
  floatingElement,
  placement,
  offset,
  flip,
  shift,
  size,
  strategy,
  auto,
});
</script>

<div
  bind:this={floatingElement}
  class={classnames(
    'left-0 top-0 z-max w-max',
    strategy === 'fixed' ? 'fixed' : 'absolute',
    cx
  )}
  class:invisible={!$style}
  style:top={$style?.top}
  style:left={$style?.left}
  use:clickOutside={onClickOutside}
>
  <slot />
</div>
