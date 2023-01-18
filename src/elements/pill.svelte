<svelte:options immutable tag='v-pill' />

<script lang='ts'>

import cx from 'classnames';
import { dispatcher } from '../lib/dispatch';
import { addStyles } from '../lib/index';
import { htmlToBoolean } from '../lib/boolean';

export let value = ''; 
export let removable = 'true';
export let readonly: string;
export let disabled: string;
let isReadonly: boolean;
let isDisabled: boolean;
let isRemovable: boolean;
$: isRemovable = htmlToBoolean(removable, 'removable');
$: isReadonly = htmlToBoolean(readonly, 'readonly');
$: isDisabled = htmlToBoolean(disabled, 'disabled');

const dispatch = dispatcher();
addStyles();

const handleRemove = () => {
  dispatch('remove', { value });
};

</script>


<div class={cx('flex items-center max-w-fit gap-1 rounded-xl bg-[#C4C4C4] py-0.5 px-2 text-[10px] hover:bg-gray-300', {
  'bg-black/20': isDisabled || isReadonly
})}>
  <span>
    {value}
  </span>
  {#if isRemovable}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <v-icon 
      class='cursor-pointer'
      name='x'
      on:click={handleRemove}
    />
  {/if}
</div>
