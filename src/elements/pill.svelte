<svelte:options immutable />

<script lang="ts">
import cx from 'classnames';

import { htmlToBoolean } from '../lib/boolean';
import { dispatcher } from '../lib/dispatch';

export let value = '';
export let removable = 'true';
export let readonly: string;
export let disabled: string;

const dispatch = dispatcher();

let isReadonly: boolean;
let isDisabled: boolean;
let isRemovable: boolean;

$: isRemovable = htmlToBoolean(removable, 'removable');
$: isReadonly = htmlToBoolean(readonly, 'readonly');
$: isDisabled = htmlToBoolean(disabled, 'disabled');

const handleRemove = () => {
  if (isDisabled || isReadonly) {
    return;
  }

  dispatch('remove', { value });
};
</script>

<div
  class={cx(
    'whitespace-nowrap flex items-center max-w-fit gap-1 rounded-xl bg-medium py-0.5 px-2 text-[10px] hover:bg-gray-3',
    {
      'bg-disabled-light text-disabled-dark cursor-not-allowed':
        isDisabled || isReadonly,
    }
  )}
  aria-disabled={isDisabled}
  aria-readonly={isReadonly}
>
  <span>
    {value}
  </span>
  {#if isRemovable}
    <button on:click={handleRemove}>
      <v-icon name="close" />
    </button>
  {/if}
</div>
