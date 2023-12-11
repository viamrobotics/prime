<svelte:options immutable />

<script lang="ts">
import cx from 'classnames';
import { createEventDispatcher } from 'svelte';
import { Button, Icon, type IconName } from '$lib';
import { ToastVariant, type ToastVariantType } from './variants';

/** The type of toast banner to be displayed to the user */
export let variant: ToastVariantType;

/** Whether there is a close icon displayed */
export let closeable: boolean | undefined = false;

/** Whether there is an action button displayed */
export let action = '';

/** The scaling applied on the x axis of the page*/
export let progress = 1;

/** Additional CSS classes to pass to the banner. */
let extraClasses: cx.Argument = '';
export { extraClasses as cx };

const dispatch = createEventDispatcher<{
  /** when the toast close button is pressed*/
  close: null;
  /**  when the action button is pressed*/
  action: null;
}>();

const handleClose = () => dispatch('close');

const handleAction = () => dispatch('action');

$: isUpload = variant === ToastVariant.Upload;

let icon: IconName | null = null;
let iconClasses = '';
$: {
  switch (variant) {
    case ToastVariant.Neutral: {
      closeable = true;
      break;
    }
    case ToastVariant.Upload: {
      icon = 'sync';
      iconClasses = 'text-info-dark';
      action = 'Cancel';
      break;
    }
    case ToastVariant.Success: {
      icon = 'check-circle';
      iconClasses = 'text-success-dark';
      break;
    }
  }
}
</script>

<div class={cx('flex w-full flex-col border bg-medium', extraClasses)}>
  <div class="relative flex items-center justify-between gap-2 p-3 pr-10">
    <div class="flex items-center gap-3">
      {#if icon}
        <div class="w-[18px]">
          <Icon
            size="lg"
            name={icon}
            cx={iconClasses}
          />
        </div>
      {/if}

      <div class="flex">
        <div class="flex flex-col gap-2">
          <p class="text-sm">
            <slot name="message" />
          </p>
        </div>
      </div>

      {#if closeable}
        <Button
          variant="ghost"
          cx="text-gray-7 absolute right-1"
          aria-label="Dismiss toast"
          on:click={handleClose}
        >
          <Icon name="close" />
        </Button>
      {/if}

      {#if action}
        <Button
          variant="ghost"
          cx="absolute right-1"
          aria-label="Perform action"
          on:click={handleAction}
        >
          {action}
        </Button>
      {/if}
    </div>
  </div>

  {#if isUpload}
    <div class="relative flex-row">
      <div
        class={cx(
          'absolute left-0 top-0 -ml-px -mt-px h-[3px] w-[calc(100%+2px)] origin-left bg-gray-4'
        )}
      />
      <div
        style="transform: scale({progress}, 1)"
        class="-ml-px -mt-px h-[3px] w-[calc(100%+2px)] origin-left bg-info-dark"
      />
    </div>
  {/if}
</div>
