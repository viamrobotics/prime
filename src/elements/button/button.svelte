<svelte:options immutable tag='v-button-internal' />

<script lang='ts'>

// Added temporarily because <svelte:element> does not recognize "text" as a valid prop
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

type Variants = 'primary' | 'inverse-primary' | 'danger' | 'outline-danger' | 'success' | 'icon'

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
const component = get_current_component() as HTMLElement & { internals: ElementInternals };
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

<style>
  :host { display: inline-block !important }
</style>

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
    title={title}
    class={cx('will-change-transform hover:scale-105 motion-safe:transition-transform', {
      'inline-flex items-center justify-center gap-1.5 py-1.5 px-2 text-xs border': variant !== 'icon',
      'bg-white border-gray-9': variant === 'primary',
      'bg-gray-9 border-gray-9 text-white': variant === 'inverse-primary',
      'bg-danger-fg text-white border-danger-fg': variant === 'danger',
      'bg-success-fg border-success-fg text-white': variant === 'success',
      'bg-danger-bg border-danger-bg text-danger-fg': variant === 'outline-danger',
      '!bg-disabled-bg border-disabled-bg text-disabled-fg pointer-events-none select-none': isDisabled,
    })}
    style={isDisabled ? '-webkit-user-select: none' : ''}
    on:click={handleClick}
  >
    {#if icon}
      <i
        aria-hidden='true'
        class='icon-{icon} text-{size}'
      />
    {/if}

    {#if variant !== 'icon'}
      <span class="mx-auto">
        {label}
      </span>
    {/if}
  </button>
</svelte:element>