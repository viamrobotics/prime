<svelte:options immutable />

<script lang="ts">
import cx from 'classnames';
import Button from '$lib/button/button.svelte';
import { Icon, type IconName } from '$lib/icon';
import IconButton from '$lib/button/icon-button.svelte';
import { ToastVariant, type ToastVariantType } from './variants';

/** The message displayed on the toast */
export let message: string;
/** Function called when the close button is clicked */
export let dismiss: () => void;
/** The action performed on the button */
export let action: { text: string; handler: () => unknown } | undefined =
  undefined;

/** The severity of the notification you want to show users*/
export let variant: ToastVariantType = 'success';

/** Additional CSS classes to pass to the banner. */
let extraClasses: cx.Argument = '';
export { extraClasses as cx };

let icon: IconName | null = null;
let iconClasses = '';
$: {
  switch (variant) {
    case ToastVariant.Info: {
      icon = 'information-outline';
      iconClasses = 'text-info-dark';
      break;
    }
    case ToastVariant.Warning: {
      icon = 'alert';
      iconClasses = 'text-warning-bright';
      break;
    }
    case ToastVariant.Danger: {
      icon = 'alert-circle';
      iconClasses = 'text-danger-dark';
      break;
    }
    case ToastVariant.Success: {
      icon = 'check-circle';
      iconClasses = 'text-success-dark';
      break;
    }
    case ToastVariant.Neutral: {
      icon = 'domain';
      iconClasses = 'text-gray-7';
    }
  }
}
</script>

<div
  class={cx(
    'relative flex h-10 w-max max-w-[480px] items-center border border-medium bg-medium pl-3 pr-1 text-sm text-default shadow-sm',
    extraClasses
  )}
>
  <div class="mr-4 flex gap-2">
    {#if icon}
      <Icon
        size="lg"
        name={icon}
        cx={iconClasses}
        role="img"
        aria-hidden={false}
        aria-label="success"
      />
    {/if}

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
