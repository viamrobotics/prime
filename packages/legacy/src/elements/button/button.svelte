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
export let width: 'full' | 'default' = 'default';

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
      'flex w-full': width === 'full',
      'inline-flex':
        width !== 'full' && variant !== 'icon' && variant !== 'icon-danger',
      'h-[30px] w-[30px] text-gray-6 hover:text-gray-7 active:text-gray-8':
        variant === 'icon',
      'h-[30px] w-[30px] text-gray-6 hover:text-danger-dark active:text-danger-dark':
        variant === 'icon-danger',
      'inline-grid place-content-center':
        variant === 'icon' || variant === 'icon-danger',
      'px-3': !icon && variant !== 'icon',
      'pl-2 pr-3': icon && variant !== 'icon' && variant !== 'icon-danger',
      'inline-flex items-center justify-center gap-1.5 border px-3 py-1.5 text-xs':
        variant !== 'icon' && variant !== 'icon-danger',
      'border-light bg-light hover:border-medium hover:bg-medium active:bg-gray-2':
        variant === 'primary',
      'border-gray-9 bg-gray-9 text-white hover:border-black hover:bg-black active:bg-[#000]':
        variant === 'inverse-primary',
      'border-transparent hover:bg-ghost-light active:border-ghost-medium active:bg-ghost-medium':
        variant === 'ghost' || variant === 'icon' || variant === 'icon-danger',
      'border-danger-dark bg-danger-dark text-white hover:bg-[#aa2a2b] active:bg-[#9e2728]':
        variant === 'danger',
      'border-success-dark bg-success-dark text-white': variant === 'success',
      'border-danger-medium bg-danger-light text-danger-dark hover:bg-[#f5dfdc] active:bg-[#f6d7d3]':
        variant === 'outline-danger',
      '!border-disabled-light !bg-disabled-light':
        isDisabled && variant !== 'icon' && variant !== 'icon-danger',
      'pointer-events-none select-none text-disabled-dark': isDisabled,
      'mx-auto': true,
    })}
    style={isDisabled ? '-webkit-user-select: none' : ''}
    on:click={handleClick}
  >
    {#if icon}
      <v-icon
        class={cx({
          'text-gray-6': variant === 'primary',
          'text-gray-4': isDisabled,
        })}
        name={icon}
      />
    {/if}

    {#if variant !== 'icon' && variant !== 'icon-danger'}
      <span>
        {label}
      </span>
    {/if}
  </button>
</svelte:element>
