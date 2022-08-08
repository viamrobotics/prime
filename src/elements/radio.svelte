<svelte:options immutable={true} tag='v-radio' />

<script lang='ts'>

import cx from 'classnames';
import { addStyles, dispatch } from '../lib/index';

type LabelPosition = 'top' | 'left'

export let label = '';
export let options = '';
export let selected = '';
export let labelposition: LabelPosition = 'top';

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
  {#if label}
    <p class={cx('text-xs', {
      'pb-1': labelposition === 'top',
      inline: labelposition === 'left',
    })}>
      {label}
    </p>
  {/if}

  {#each parsedOptions as option}
    <button
      bind:this={button}
      class={cx('border-y border-l last:border-r border-black px-2 py-1 text-sm', {
        'bg-white': option !== selected,
        'bg-black text-white': option === selected,
      })}
      on:click={() => handleClick(option)}
    >
      {option}
    </button>
  {/each}
</label>
