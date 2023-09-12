<svelte:options immutable />

<script lang="ts">
type LabelPosition = 'top' | 'left';

import cx from 'classnames';
import { dispatcher } from '../lib/dispatch';
import { htmlToBoolean } from '../lib/boolean';

export let label = '';
export let options = '';
export let selected = '';
export let labelposition: LabelPosition = 'top';
export let tooltip = '';
export let state: 'info' | 'warn' | 'error' = 'info';
export let readonly: string;
export let icon: string;
export let width: 'full' | 'default' = 'default';

const dispatch = dispatcher();

let parsedOptions: string[];
let isReadonly: boolean;
$: parsedOptions = options.split(',').map((str) => str.trim());
$: isReadonly = htmlToBoolean(readonly, 'readonly');

const handleClick = (value: string, event: Event) => {
  if (!isReadonly) {
    selected = value;
    dispatch(event, 'input', { value });
  }
};

$: {
  switch (state) {
    case 'info': {
      icon = 'information-outline';
      break;
    }
    case 'warn': {
      icon = 'alert-circle-outline';
      break;
    }
    case 'error': {
      icon = 'alert-circle-outline';
      break;
    }
  }
}
</script>

<!-- svelte-ignore a11y-label-has-associated-control -->
<label
  class={cx('flex gap-1', {
    'flex-col': labelposition === 'top',
    'flex-row': labelposition === 'left',
  })}
>
  <div class="flex items-center gap-1.5">
    {#if label}
      <p
        class={cx('text-xs text-subtle-1', {
          'text-black/50': isReadonly,
        })}
      >
        {label}
      </p>
    {/if}

    {#if tooltip}
      <v-tooltip text={tooltip}>
        <div
          class={cx({
            'text-warning-bright': state === 'warn',
            'text-danger-dark': state === 'error',
          })}
        >
          <v-icon name={icon} />
        </div>
      </v-tooltip>
    {/if}
  </div>

  <div class="flex flex-nowrap">
    {#each parsedOptions as option}
      <button
        class={cx('whitespace-nowrap border px-3 py-1.5 text-xs', {
          'border-light bg-medium text-subtle-1':
            option !== selected && !isReadonly,
          'border-gray-6 bg-light font-semibold text-default':
            option === selected && !isReadonly,
          'border-medium bg-light font-semibold text-disabled-dark':
            option === selected && isReadonly,
          'pointer-events-none cursor-not-allowed border-light bg-disabled-light text-disabled-dark':
            isReadonly,
          'w-full': width === 'full',
        })}
        on:click={(event) => handleClick(option, event)}
      >
        {option}
      </button>
    {/each}
  </div>
</label>
