<svelte:options immutable tag="v-button-internal" />

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
  | 'icon';

import cx from 'classnames';
import { get_current_component } from 'svelte/internal';
import { htmlToBoolean } from '../../lib/boolean';
import { addStyles } from '../../lib/index';

export let disabled = 'false';
export let type: 'button' | 'submit' | 'reset' = 'button';
export let variant: Variants = 'primary';
export let label = '';
export let title = '';
export let icon = '';
export let size = 'base';
export let tooltip = '';

addStyles();

let isDisabled: boolean;

$: isDisabled = htmlToBoolean(disabled, 'disabled');

// @TODO switch to <svelte:this bind:this={component}> https://github.com/sveltejs/rfcs/pull/58
const component = get_current_component() as HTMLElement & {
  internals: ElementInternals;
};
const internals = component.attachInternals();

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
<svelte:element
  this={tooltip ? 'v-tooltip' : 'span'}
  text={tooltip}
  on:click={isDisabled ? handleParentClick : undefined}
>
  <button
    {type}
    aria-label={variant === 'icon' ? label : undefined}
    aria-disabled={isDisabled ? true : undefined}
    {title}
    class={cx({
      'h-[30px] w-[30px]': variant === 'icon',
      'px-4': !icon,
      'pl-3 pr-4': icon,
      'inline-flex items-center justify-center gap-1.5 py-1 text-sm border':
        variant !== 'icon',
      'bg-light border-light hover:bg-medium hover:border-medium active:bg-gray-2':
        variant === 'primary',
      'bg-gray-9 border-gray-9 text-white hover:bg-black hover:border-black active:bg-[#000]':
        variant === 'inverse-primary',
      'border-transparent hover:bg-[rgba(0,0,0,0.04)] active:bg-[rgba(0,0,0,0.08)] active-border-[rgba(0,0,0,0.08)]':
        variant === 'ghost' || variant === 'icon',
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
      <i aria-hidden="true" class="icon-{icon} text-{size}" />
    {/if}

    {#if variant !== 'icon'}
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
