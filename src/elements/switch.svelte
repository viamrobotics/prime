<svelte:options immutable tag="v-switch" />

<script lang="ts">
import cx from 'classnames';
import { htmlToBoolean } from '../lib/boolean';
import { addStyles } from '../lib/index';
import { dispatcher } from '../lib/dispatch';

export let label = '';
export let name = '';
export let value: 'on' | 'off' = 'off';
export let variant: 'annotated' | 'default' = 'default';
export let disabled: string;
export let readonly: string;
export let labelposition: 'left' | 'top' = 'top';
export let tooltip = '';

const dispatch = dispatcher();

addStyles();

let input: HTMLInputElement;
let on: boolean;
let isDisabled: boolean;
let isReadonly: boolean;

$: on = value === 'on';
$: isDisabled = htmlToBoolean(disabled, 'disabled');
$: isReadonly = htmlToBoolean(readonly, 'readonly');

const handleClick = () => {
  if (!(isDisabled || isReadonly)) {
    value = on ? 'off' : 'on';
    input.checked = value === 'on';
    dispatch('input', { value: input.checked });
  }
};
</script>

<label
  class={cx('flex gap-1 w-fit', {
    'flex-col justify-start': labelposition === 'top',
    'items-center': labelposition === 'left',
    'text-disabled-fg': isDisabled,
  })}
>
  <div class="flex items-center gap-1.5">
    {#if label}
      <p
        class={cx('w-fit text-xs capitalize', {
          'whitespace-nowrap': labelposition === 'left',
        })}
      >
        {label}
      </p>
    {/if}

    {#if tooltip}
      <v-tooltip text={tooltip}>
        <div class="icon-info-outline text-black" />
      </v-tooltip>
    {/if}
  </div>

  <button
    on:click={handleClick}
    type="button"
    class={cx('flex gap-1.5 items-center', {
      'cursor-not-allowed pointer-events-none': isDisabled || isReadonly,
    })}
    role="switch"
    aria-label={label}
    aria-disabled={isDisabled}
    aria-checked={on ? 'true' : 'false'}
  >
    <div
      class={cx(
        'relative inline-flex flex-shrink-0 h-5 w-11 border cursor-pointer motion-safe:transition-colors ease-in-out duration-200 focus:outline-none',
        {
          'bg-gray-4 border-gray-4': isDisabled || isReadonly,
          'bg-gray-6 border-gray-6': !on && !(isDisabled || isReadonly),
          'bg-success-fg border-success-fg': on && !(isDisabled || isReadonly),
          'text-disabled-fg': isDisabled,
        }
      )}
    >
      <span
        class={cx(
          'pointer-events-none relative inline-block h-4 w-4 mt-px ml-px bg-white transform ring-0 motion-safe:transition-transform ease-in-out duration-200',
          {
            'border-gray-4': isDisabled || isReadonly,
          }
        )}
        class:translate-x-0={!on}
        class:translate-x-6={on}
      />
      <input
        {name}
        {value}
        disabled={isDisabled}
        readonly={isReadonly}
        class="hidden"
        type="checkbox"
        checked={on}
        bind:this={input}
      />
    </div>

    {#if variant === 'annotated'}
      <p class="capitalize text-xs">{value}</p>
    {/if}
  </button>
</label>
