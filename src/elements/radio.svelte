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
export let state: 'info' | 'warn' | 'error' | '' = 'info';
export let readonly: string;

const dispatch = dispatcher();

addStyles();

let parsedOptions: string[];
let isReadonly: boolean;
$: parsedOptions = options.split(',').map((str) => str.trim());
$: isReadonly = htmlToBoolean(readonly, 'readonly');

const handleClick = (value: string) => {
  if(!isReadonly){
    selected = value;
    dispatch('input', { value });
  }
};

</script>

<!-- svelte-ignore a11y-label-has-associated-control -->
<label>
  <div class={cx('flex items-center gap-1.5', {
    'pb-1': labelposition === 'top',
  })}>
    {#if label}
      <p class={cx('text-xs', {
        inline: labelposition === 'left',
        'opacity-75 pointer-events-none': isReadonly,
      })}>
        {label}
      </p>
    {/if}

    {#if tooltip}
      <v-tooltip text={tooltip}>
        <div class={cx({
          'icon-info-outline': state === 'info',
          'icon-error-outline text-orange-400': state === 'warn',
          'icon-error-outline text-red-600': state === 'error',
        })} />
      </v-tooltip>
    {/if}
  </div>

  <div class="flex flex-nowrap">
    {#each parsedOptions as option}
      <button
        class={cx('whitespace-nowrap capitalize border-y border-l last:border-r border-black px-2 py-1 text-xs', {
          'bg-white': option !== selected,
          'bg-black text-white': option === selected,
          'opacity-75 pointer-events-none': isReadonly,
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
