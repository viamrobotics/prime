<svelte:options immutable={true} tag='v-button-internal' />

<script lang='ts'>

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

<v-tooltip text={tooltip}>
  <button
    {type}
    class={cx('inline-flex items-center justify-center gap-1.5 hover:scale-105 transition-transform', {
      'py-1.5 px-2 text-xs border': variant !== 'icon',
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
        aria-hidden
        class='icon-{icon} text-base'
      />
    {/if}
    <span class="mx-auto">
      {label}
    </span>
  </button>
</v-tooltip>