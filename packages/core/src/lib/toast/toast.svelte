<svelte:options immutable />

<script lang="ts">
import { type IconName, Icon, Button } from '$lib';
import cx from 'classnames';
import { createEventDispatcher } from 'svelte';
import { ToastVariant, type ToastVariantType } from './variants';

/** The message displayed by the toast */
export let message: string;

/** The type of toast banner to be displayed to the user */
export let variant: ToastVariantType;

/** Whether there is an action button displayed */
export let actionable = false;

/** Whether there is a close icon displayed */
export let closeable = false;

/** The scaling applied on the x axis of the page*/
export let progress = 1;

/** Additional CSS classes to pass to the button. */
let extraClasses: cx.Argument = '';
export { extraClasses as cx };

const dispatch = createEventDispatcher<{
  /** when the toast close button is pressed*/
  close: null;
}>();

const handleClose = () => dispatch('close');

// $: isUploadingFile = variant === ToastVariant.UploadingFile;

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
      actionable = true;
      iconClasses = 'text-info-dark';
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

<div
  class={cx(
    'absolute left-1/2 h-10 -translate-x-1/2 transform items-center border border-light bg-light py-0 text-sm shadow-sm',

    {
      'flex w-[300px] flex-col border-b-0': actionable,
      'inline-flex shrink-0 gap-2 pl-3': !actionable,
    },
    extraClasses
  )}
>
  {#if actionable}
    <div class="flex items-center self-stretch pl-3 pr-1">
      <div class="flex-basis-0 flex flex-shrink-0 flex-grow items-start gap-2">
        {#if icon}
          <div class="w-[18px]">
            <Icon
              size="lg"
              name={icon}
              cx={iconClasses}
            />
          </div>
        {/if}
        <span>{message}</span>
      </div>
      <Button variant="ghost">Cancel</Button>
    </div>
    <div class="h-[calc(100%+2px)] w-full bg-medium">
      <div
        style="transform: scale(1, {progress})"
        class="-mr-py -mb-py h-full w-[3px] origin-bottom-left self-stretch bg-info-dark pr-[20px]"
      />
    </div>
  {:else}
    <div class="flex items-center gap-2">
      {#if icon}
        <div class="w-[18px]">
          <Icon
            size="lg"
            name={icon}
            cx={iconClasses}
          />
        </div>
      {/if}
      <span>{message}</span>
    </div>
    {#if closeable}
      <Button
        variant="ghost"
        cx="text-gray-7"
        aria-label="Dismiss toast"
        on:click={handleClose}
      >
        <Icon name="close" />
      </Button>
    {/if}
  {/if}
</div>
