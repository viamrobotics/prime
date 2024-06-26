<svelte:options immutable />

<script lang="ts">
import cx from 'classnames';
import Button from '$lib/button/button.svelte';
import { Icon } from '$lib/icon';
import IconButton from '$lib/button/icon-button.svelte';
import { DisplayDetailsByVariant, ToastVariant, type ToastVariantType } from './variants';

/** The message displayed on the toast */
export let message: string;
/** Function called when the close button is clicked */
export let dismiss: () => void;
/** The action performed on the button */
export let action: { text: string; handler: () => unknown } | undefined =
  undefined;

/** The severity of the notification you want to show users*/
export let variant: ToastVariantType = ToastVariant.Success;

const displayDetails = DisplayDetailsByVariant[variant]

/** Additional CSS classes to pass to the banner. */
let extraClasses: cx.Argument = '';
export { extraClasses as cx };
</script>

<div
  class={cx(
    'relative flex h-10 w-max max-w-[480px] items-center border border-medium bg-medium pl-3 pr-1 text-sm text-default shadow-sm',
    extraClasses
  )}
>
  <div class="mr-4 flex gap-2">
    <Icon
      size="lg"
      name={displayDetails.icon}
      cx={displayDetails.iconClasses}
      role="img"
      aria-hidden={false}
      aria-label={displayDetails.label}
    />
    <p class="truncate">{message}</p>
  </div>

  <div class="flex">
    {#if action}
      <Button
        height="fixed"
        textSize="text-sm"
        variant="ghost"
        type="button"
        on:click={action.handler}
      >
        {action.text}
      </Button>
    {/if}
    <IconButton
      variant="ghost"
      cx="text-gray-7"
      label="Dismiss toast"
      icon="close"
      on:click={dismiss}
    />
  </div>
</div>
