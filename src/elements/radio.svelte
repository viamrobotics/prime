<svelte:options immutable tag='v-radio' />

<script lang='ts'>

import cx from 'classnames';
import { addStyles, dispatch } from '../lib/index';

type LabelPosition = 'top' | 'left'

export let label = '';
export let options = '';
export let selected = '';
export let labelposition: LabelPosition = 'top';
export let tooltip = '';
export let state: 'info' | 'warn' | 'error' | '' = 'info';

addStyles();

let button: HTMLButtonElement;
let parsedOptions: string[];

$: parsedOptions = options.split(',').map((str) => str.trim());

const handleClick = (value: string) => {
  selected = value;
  dispatch(button, 'input', { value });
};

</script>

<!-- svelte-ignore a11y-label-has-associated-control -->
<label>
  <div class={cx('flex', {
    'pb-1': labelposition === 'top',
  })}>
    {#if label}
      <p class={cx('text-xs', {
        inline: labelposition === 'left',
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

  <div class="flex">
    {#each parsedOptions as option}
      <button
        bind:this={button}
        class={cx('capitalize border-y border-l last:border-r border-black px-3 py-2 text-xs', {
          'bg-white': option !== selected,
          'bg-black text-white': option === selected,
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
