<svelte:options immutable tag='v-button-internal' />

<script lang='ts'>

// Added temporarily because <svelte:element> does not recognize "text" as a valid prop
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import cx from 'classnames';
import { get_current_component } from 'svelte/internal';
import { htmlToBoolean } from '../../lib/boolean';
import { addStyles } from '../../lib/index';

type Variants = 'primary' | 'inverse-primary' | 'danger' | 'outline-danger' | 'success' | 'icon'

export let disabled = 'false';
export let type: 'button' | 'submit' | 'reset' = 'button';
export let variant: Variants = 'primary';
export let label = '';
export let icon = '';
export let size = 'base';
export let tooltip = '';

let isDisabled: boolean;

$: isDisabled = htmlToBoolean(disabled, 'disabled');

addStyles();

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

</script>

<style>
  :host { display: inline-block !important }
</style>

<svelte:element
  this={tooltip ? 'v-tooltip' : 'span'}
  text={tooltip}
>
  <button
    {type}
    aria-label={variant === 'icon' ? label : undefined}
    aria-disabled={isDisabled}
    class={cx('will-change-transform hover:scale-105 motion-safe:transition-transform', {
      'inline-flex items-center justify-center gap-1.5 py-1.5 px-2 text-xs border': variant !== 'icon',
      'cursor-not-allowed opacity-50 pointer-events-none': isDisabled,
      'bg-white border-black': variant === 'primary',
      'bg-black border-white text-white': variant === 'inverse-primary',
      'bg-red/90 text-white border-red/90': variant === 'danger',
      'bg-green/90 border-green/90 text-white': variant === 'success',
      'bg-white border-red/90 text-red/90': variant === 'outline-danger',
    })}
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