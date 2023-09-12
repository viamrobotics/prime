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

const handleRemove = (event: Event) => {
  if (isDisabled || isReadonly) {
    return;
  }

  dispatch(event, 'remove', { value });
};
</script>

<div
  class={cx(
    'flex max-w-fit items-center gap-1 whitespace-nowrap rounded-xl bg-medium px-2 py-0.5 text-[10px] hover:bg-gray-3',
    {
      'cursor-not-allowed bg-disabled-light text-disabled-dark':
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
