<svelte:options immutable tag='v-radio' />

<script lang='ts'>

type LabelPosition = 'top' | 'left'

import cx from 'classnames';
import { addStyles } from '../lib/index';
import { dispatcher } from '../lib/dispatch';
import { htmlToBoolean } from '../lib/boolean';

export let label = '';
export let options = '';
export let selected = '';
export let labelposition: LabelPosition = 'top';
export let tooltip = '';
export let state: 'info' | 'warn' | 'error' = 'info';
export let readonly: string;

const dispatch = dispatcher();

addStyles();

let parsedOptions: string[];
let isReadonly: boolean;
$: parsedOptions = options.split(',').map((str) => str.trim());
$: isReadonly = htmlToBoolean(readonly, 'readonly');

const handleClick = (value: string) => {
  if (!isReadonly) {
    selected = value;
    dispatch('input', { value });
  }
};

</script>

<!-- svelte-ignore a11y-label-has-associated-control -->
<label class={cx('flex gap-1.5', {
  'flex-col': labelposition === 'top',
  'flex-row': labelposition === 'left',
})}>
  <div class='flex items-center gap-1.5'>
    {#if label}
      <p class={cx('text-xs', {
        'text-black/50': isReadonly,
      })}>
        {label}
      </p>
    {/if}

    {#if tooltip}
      <v-tooltip text={tooltip}>
        <div class={cx({
          'icon-info-outline': state === 'info',
          'icon-error-outline text-warning-fg': state === 'warn',
          'icon-error-outline text-danger-fg': state === 'error',
        })} />
      </v-tooltip>
    {/if}
  </div>

  <div class="flex flex-nowrap">
    {#each parsedOptions as option}
      <button
        class={cx('whitespace-nowrap capitalize border-y border-l last:border-r border-gray-9 px-2 py-1 text-xs', {
          'bg-white': option !== selected,
          'bg-gray-9 text-white font-bold': ((option === selected) && !isReadonly),
          'bg-disabled-bg text-disabled-fg font-bold': ((option === selected) && isReadonly),
          'border-disabled-fg text-disabled-fg': isReadonly,
          'cursor-not-allowed pointer-events-none': isReadonly,
        })}
        on:click={() => handleClick(option)}
      >
        {#if option === selected}
          <div class="flex">
            <v-icon
              class='mr-1'
              name='checkmark'
              size='base'
            />
            {option}
          </div>
        {:else}
          {option}
        {/if}
    </button>
    {/each}
  </div>
  
</label>
