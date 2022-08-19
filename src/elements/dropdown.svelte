<svelte:options immutable tag='v-dropdown' />

<script lang='ts'>

import cx from 'classnames';
import { addStyles, dispatch } from '../lib/index';
import { htmlToBoolean } from '../lib/boolean';

export let open = 'false';
export let match = 'false';

let root: HTMLElement;

let isMatch: boolean;
let isOpen: boolean;

$: isMatch = htmlToBoolean(match, 'match');
$: isOpen = htmlToBoolean(open, 'open');

addStyles();

const toggleDropdown = () => {
  dispatch(root, 'toggle', { open: !isOpen });
};

</script>

<div
  class='relative inline-block w-full'
  bind:this={root}
>
  <div
    class='inline-block w-full'
    on:click={toggleDropdown}
  >
    <slot name='target'/>
  </div>
  <div 
    class={
      cx('absolute z-10', {
        'left-0': isMatch,
        'right-0': isMatch,
        'overflow-hidden': isMatch,
        invisible: !isOpen,
      }
    )}
  >
    <slot name='content' />
  </div>
</div>
