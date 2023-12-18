<svelte:options immutable />

<script lang="ts">
import cx from 'classnames';
import { Button, Icon, type IconName, type ToastVariantType } from '$lib';
import { ToastVariant } from './variants';

/** The message displayed on the toast */
export let message: string;
/** The type of toast banner to be displayed to the user */
export let variant: ToastVariantType;
/** Function called when the close button is clicked */
export let dismiss: () => void;
/** The action performed on the button */
export let action: { text: string; handler: () => unknown } | undefined =
  undefined;

/** Additional CSS classes to pass to the banner. */
let extraClasses: cx.Argument = '';
export { extraClasses as cx };

let icon: IconName | null = null;
let iconClasses = '';

$: {
  // TODO: use a `switch` statement when extending the variants
  if (variant === ToastVariant.Success) {
    icon = 'check-circle';
    iconClasses = 'text-success-dark';
  }
}
</script>

<div
  class={cx(
    'pointer-events-auto relative flex w-auto items-center gap-2 border bg-medium p-3 text-sm',
    extraClasses
  )}
>
  {#if icon}
    <div class="w-[18px]">
      <Icon
        size="lg"
        name={icon}
        cx={iconClasses}
        role="img"
        aria-hidden={false}
        aria-label="success"
      />
    </div>
  {/if}

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
