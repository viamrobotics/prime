<svelte:options immutable tag="v-pill" />

<script lang="ts">
  import cx from 'classnames';

  import { htmlToBoolean } from '../lib/boolean';
  import { dispatcher } from '../lib/dispatch';
  import { checkKeyboardEvent } from '../lib/events';
  import { addStyles } from '../lib/index';

  export let value = '';
  export let removable = 'true';
  export let readonly: string;
  export let disabled: string;

  const dispatch = dispatcher();
  addStyles();

  let isReadonly: boolean;
  let isDisabled: boolean;
  let isRemovable: boolean;

  $: isRemovable = htmlToBoolean(removable, 'removable');
  $: isReadonly = htmlToBoolean(readonly, 'readonly');
  $: isDisabled = htmlToBoolean(disabled, 'disabled');

  const handleRemove = (event: MouseEvent | KeyboardEvent) => {
    if (isDisabled || isReadonly) {
      return;
    }

    if (
      event instanceof KeyboardEvent &&
      !checkKeyboardEvent(event, ['Enter'])
    ) {
      return;
    }

    dispatch('remove', { value });
  };
</script>

<div
  class={cx(
    'flex items-center max-w-fit gap-1 rounded-xl bg-[#C4C4C4] py-0.5 px-2 text-[10px] hover:bg-gray-300',
    {
      'bg-black/20 cursor-not-allowed': isDisabled || isReadonly,
    }
  )}
  aria-disabled={isDisabled}
  aria-readonly={isReadonly}
>
  <span>
    {value}
  </span>
  {#if isRemovable}
    <button on:click={handleRemove} on:keydown={handleRemove}>
      <v-icon name="x" />
    </button>
  {/if}
</div>