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
export let action: { text: string; handler: () => unknown } | undefined =
  undefined;

/** Additional CSS classes to pass to the banner. */
let extraClasses: cx.Argument = '';
export { extraClasses as cx };
</script>

<div
  class={cx(
    'relative flex w-auto items-center gap-2 border bg-medium p-1 text-sm',
    extraClasses
  )}
>
  <div class="w-[18px]">
    <Icon
      size="lg"
      name={iconName}
      cx={iconClasses}
      role="img"
      aria-hidden={false}
      aria-label="success"
    />
  </div>

  <div class="mr-auto">{message}</div>

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
