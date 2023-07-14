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
    'whitespace-nowrap flex items-center max-w-fit text-xs gap-0.5 rounded bg-gray-3 py-0.5',
    {
      'pl-2 pr-1.5': isRemovable,
      'px-2': !isRemovable,
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
    <button class='-m-0.5 p-1 group' on:click={handleRemove}>
      <v-icon size='text-xs' name="x" class='text-gray-6 group-hover:text-gray-9' />
    </button>
  {/if}
</div>
