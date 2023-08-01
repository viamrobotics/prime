<svelte:options immutable />

<script lang="ts">
import cx from 'classnames';
import { htmlToBoolean } from '../lib/boolean';
import { dispatcher } from '../lib/dispatch';

export let label = '';
export let name = '';
export let value: 'on' | 'off' = 'off';
export let variant: 'annotated' | 'default' = 'default';
export let disabled: string;
export let readonly: string;
export let tooltip = '';

const dispatch = dispatcher();

let input: HTMLInputElement;
let on: boolean;
let isDisabled: boolean;
let isReadonly: boolean;

$: on = value === 'on';
$: isDisabled = htmlToBoolean(disabled, 'disabled');
$: isReadonly = htmlToBoolean(readonly, 'readonly');

const handleClick = (event: Event) => {
  if (!(isDisabled || isReadonly)) {
    value = on ? 'off' : 'on';
    input.checked = value === 'on';
    dispatch(event, 'input', { value: input.checked });
  }
};
</script>

<label
  class={cx('flex gap-1 w-fit flex-col justify-start text-default', {
    'text-disabled-dark': isDisabled,
  })}
>
  <div class="flex items-center gap-1.5">
    {#if label}
      <button class="w-fit text-xs" on:click={handleClick}>{label}</button>
    {/if}

    {#if tooltip}
      <v-tooltip text={tooltip}>
        <v-icon class="text-gray-6 -mt-0.5" name="information-outline" />
      </v-tooltip>
    {/if}
  </div>

  <button
    on:click={handleClick}
    type="button"
    class={cx('flex gap-2 items-center', {
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
          'bg-success-dark border-success-dark':
            on && !(isDisabled || isReadonly),
          'text-disabled-dark': isDisabled,
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
        on:input|stopPropagation
      />
    </div>

    {#if variant === 'annotated'}
      <p class="text-sm">{value}</p>
    {/if}
  </button>
</label>
