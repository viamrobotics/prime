<svelte:options immutable />

<script lang="ts">
import cx from 'classnames';
import { Button, Icon } from '$lib';
import { iconName, iconClasses } from './variants';

/** The message displayed on the toast */
export let message: string;
/** Function called when the close button is clicked */
export let dismiss: () => void;
/** The action performed on the button */
export let action: { text: string; handler: () => void } | undefined =
  undefined;

/** Additional CSS classes to pass to the banner. */
let extraClasses: cx.Argument = '';
export { extraClasses as cx };
</script>

<div
  class={cx(
    'relative flex h-10 w-auto max-w-[480px] items-center border bg-medium pl-3 pr-1 text-sm',
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

    {message}
  </div>

  {#if action}
    <button
      on:click={action.handler}
      aria-label="Perform action"
    >
      <span class="text-sm font-medium hover:underline">{action.text}</span>
    </button>
  {/if}
  <Button
    variant="ghost"
    cx="text-gray-7"
    aria-label="Dismiss toast"
    on:click={dismiss}
  >
    <Icon name="close" />
  </Button>
</div>
