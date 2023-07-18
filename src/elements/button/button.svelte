<svelte:options immutable />

<script lang="ts">
// Added temporarily because <svelte:element> does not recognize "text" as a valid prop
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

type Variants =
  | 'primary'
  | 'inverse-primary'
  | 'ghost'
  | 'danger'
  | 'outline-danger'
  | 'success'
  | 'icon'
  | 'icon-danger';

import cx from 'classnames';
import { htmlToBoolean } from '../../lib/boolean';

export let disabled = 'false';
export let type: 'button' | 'submit' | 'reset' = 'button';
export let variant: Variants = 'primary';
export let label = '';
export let title = '';
export let icon = '';
export let tooltip = '';

// https://github.com/sveltejs/svelte/issues/7596
export let internals: ElementInternals;

let isDisabled: boolean;

$: isDisabled = htmlToBoolean(disabled, 'disabled');

const handleClick = () => {
  const { form } = internals;

  if (form?.requestSubmit) {
    form.requestSubmit();
  } else {
    form?.submit();
  }
};

const handleParentClick = (event: PointerEvent) => {
  event.stopImmediatePropagation();
};

let fill = 'danger';

$: {
  switch (variant) {
    case 'inverse-primary':
    case 'danger':
    case 'success': {
      fill = 'reversed';
      break;
    }
    case 'outline-danger':
    case 'icon-danger': {
      fill = 'danger-dark';
      break;
    }
  }

  if (isDisabled) {
    fill = 'disabled';
  }
}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<svelte:element
  this={tooltip ? 'v-tooltip' : 'span'}
  text={tooltip}
  on:click={isDisabled ? handleParentClick : undefined}
>
  <button
    {type}
    aria-label={variant === 'icon' || variant === 'icon-danger'
      ? label
      : undefined}
    aria-disabled={isDisabled ? true : undefined}
    {title}
    class={cx('whitespace-nowrap', {
      'h-[30px] w-[30px]': variant === 'icon' || variant === 'icon-danger',
      'px-3': !icon && variant !== 'icon',
      'pl-2 pr-3': icon && variant !== 'icon',
      'inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs border':
        variant !== 'icon',
      'bg-light border-light hover:bg-medium hover:border-medium active:bg-gray-2':
        variant === 'primary',
      'bg-gray-9 border-gray-9 text-white hover:bg-black hover:border-black active:bg-[#000]':
        variant === 'inverse-primary',
      'border-transparent hover:bg-[rgba(0,0,0,0.04)] active:bg-[rgba(0,0,0,0.08)] active-border-[rgba(0,0,0,0.08)]':
        variant === 'ghost' || variant === 'icon' || variant === 'icon-danger',
      'bg-danger-dark text-white border-danger-dark hover:bg-[#aa2a2b] active:bg-[#9e2728]':
        variant === 'danger',
      'bg-success-dark border-success-dark text-white': variant === 'success',
      'bg-danger-light border-danger-medium text-danger-dark hover:bg-[#f5dfdc] active:bg-[#f6d7d3]':
        variant === 'outline-danger',
      '!bg-disabled-light !border-disabled-light text-disabled-dark pointer-events-none select-none':
        isDisabled,
    })}
    style={isDisabled ? '-webkit-user-select: none' : ''}
    on:click={handleClick}
  >
    {#if icon}
      <v-icon name={icon} {fill} />
    {/if}

    {#if variant !== 'icon' && variant !== 'icon-danger'}
      <span class="mx-auto">
        {label}
      </span>
    {/if}
  </button>
</svelte:element>

<style>
:host {
  display: inline-block !important;
}
</style>
