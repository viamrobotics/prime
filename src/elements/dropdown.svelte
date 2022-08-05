<svelte:options immutable={true} tag='v-dropdown' />

<script lang='ts'>

import cx from 'classnames';
import { addStyles, dispatch } from '../lib/index';

export let open: null | string | boolean = null;
export let match: null | string | boolean = null;
export let controlled: null | string | boolean = null;

let root: HTMLElement;

// coerce '' to boolean
$: match = match === '';
$: controlled = controlled === '';
$: open = open === '' || open;

addStyles();

const toggleDropdown = () => {
  if (controlled) {
    return;
  }
  open = !open;
  dispatch(root, 'toggle', { open });
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
        'left-0': match,
        'right-0': match,
        'overflow-hidden': match,
        invisible: !open,
      }
    )}
  >
    <slot name='content' />
  </div>
</div>
