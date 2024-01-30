<svelte:options immutable />

<script lang="ts">
import cx from 'classnames';
import { Icon, IconButton } from '$lib';
import { iconName, iconClasses } from './variants';

/** The message displayed on the toast */
export let message: string;
/** Function called when the close button is clicked */
export let dismiss: () => void;
/** The action performed on the button */
export let action: { text: string; handler: () => unknown } | undefined =
  undefined;

/** Additional CSS classes to pass to the banner. */
let extraClasses: cx.Argument = '';
export { extraClasses as cx };
</script>

<div
  class={cx(
    'relative flex h-10 w-max max-w-[480px] items-center border bg-medium pl-3 pr-1 text-sm',
    extraClasses
  )}
>
  <div class="mr-4 flex gap-2">
    <Icon
      size="lg"
      name={iconName}
      cx={iconClasses}
      role="img"
      aria-hidden={false}
      aria-label="success"
    />

    <p class="truncate">{message}</p>
  </div>

  <div class="flex gap-1">
    {#if action}
      <button
        type="button"
        on:click={action.handler}
        aria-label="Perform action"
      >
        <span class="text-sm font-medium hover:underline">{action.text}</span>
      </button>
    {/if}
    <IconButton
      cx="text-gray-7"
      label="Dismiss toast"
      icon="close"
      on:click={dismiss}
    />
  </div>
</div>
