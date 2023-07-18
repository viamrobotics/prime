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
export let fill: string;
export let icon: string;

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
      fill = 'gray-6';
      icon = 'information-outline';
      break;
    }
    case 'warn': {
      fill = 'warning-bright';
      icon = 'alert-circle-outline';
      break;
    }
    case 'error': {
      fill = 'danger-dark';
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
          <v-icon {fill} name={icon} />
        </div>
      </v-tooltip>
    {/if}
  </div>

  <div class="flex flex-nowrap">
    {#each parsedOptions as option}
      <button
        class={cx('whitespace-nowrap border px-3 py-1.5 text-xs', {
          'bg-medium border-light text-subtle-1':
            option !== selected && !isReadonly,
          'bg-light border-gray-6 text-default font-semibold':
            option === selected && !isReadonly,
          'bg-light border-medium text-disabled-dark font-semibold':
            option === selected && isReadonly,
          'bg-disabled-light border-light text-disabled-dark cursor-not-allowed pointer-events-none':
            isReadonly,
        })}
        on:click={(event) => handleClick(option, event)}
      >
        {option}
      </button>
    {/each}
  </div>
</label>
