<script lang="ts">
import cx from 'classnames';
import { clickOutside } from '$lib/click-outside';
import {
  floatingStyle,
  type FloatingReferenceElement,
  type FloatingPlacement,
  type FloatingFlipOptions,
  type FloatingShiftOptions,
  type FloatingSizeOptions,
} from './floating-style';

export let referenceElement: FloatingReferenceElement | undefined;
export let placement: FloatingPlacement = 'bottom-start';
export let offset: number | undefined = undefined;
export let flip: FloatingFlipOptions | undefined = undefined;
export let shift: FloatingShiftOptions | undefined = undefined;
export let size: FloatingSizeOptions | undefined = undefined;
export let auto = false;
export let onClickOutside: ((target: Element) => unknown) | undefined =
  undefined;

let className: cx.Argument = undefined;
export { className as cx };

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
  auto,
});
</script>

<div
  bind:this={floatingElement}
  class={cx('absolute left-0 top-0 z-max w-max', className)}
  class:invisible={!$style}
  style:top={$style?.top}
  style:left={$style?.left}
  use:clickOutside={onClickOutside}
>
  <slot />
</div>
