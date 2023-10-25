<svelte:options immutable />

<script lang="ts">
import cx from 'classnames';
import { createEventDispatcher } from 'svelte';
import { Button, Icon, type IconName } from '$lib';
import { BannerVariant, type BannerVariantType } from './variants';

/** The severity of the notification you want to show users*/
export let variant: BannerVariantType;

/** The scaling applied on the y axis of the page*/
export let progress = 1;

/** If true a user can close out of the notification. If false they cannot*/
export let exitable = false;

/** Additional CSS classes to pass to the banner. */
let extraClasses: cx.Argument = '';
export { extraClasses as cx };

const dispatch = createEventDispatcher<{
  /** when the notification close button is pressed*/
  close: null;
}>();

const handleClose = () => dispatch('close');

$: isInfo = variant === BannerVariant.Info;
$: isWarn = variant === BannerVariant.Warning;
$: isDanger = variant === BannerVariant.Danger;
$: isSuccess = variant === BannerVariant.Success;

let icon: IconName | null = null;
let iconClasses = '';
$: {
  switch (variant) {
    case BannerVariant.Info: {
      icon = 'information';
      iconClasses = 'text-info-dark';
      break;
    }
    case BannerVariant.Warning: {
      icon = 'alert';
      iconClasses = 'text-warning-bright';
      break;
    }
    case BannerVariant.Danger: {
      icon = 'alert-circle';
      iconClasses = 'text-danger-dark';
      break;
    }
    case BannerVariant.Success: {
      icon = 'check-circle';
      iconClasses = 'text-success-dark';
      break;
    }
  }
}
</script>

<div
  class={cx(
    'flex border',
    {
      'border-info-medium bg-info-light': isInfo,
      'border-warning-medium bg-warning-light': isWarn,
      'border-success-medium bg-success-light': isSuccess,
      'border-danger-medium bg-danger-light': isDanger,
    },
    extraClasses
  )}
>
  <div class="relative flex-col">
    <div
      class={cx(
        'absolute left-0 top-0 -ml-px -mt-px h-[calc(100%+2px)] w-[3px] origin-bottom',
        {
          'bg-[#80b3e5]': isInfo,
          'bg-[#eed59f]': isWarn,
          'bg-[#9ebe9f]': isSuccess,
          'bg-[#df9a9b]': isDanger,
        }
      )}
    />
    <div
      style="transform: scale(1, {progress})"
      class={cx('-ml-px -mt-px h-[calc(100%+2px)] w-[3px] origin-bottom', {
        'bg-info-dark': isInfo,
        'bg-warning-bright': isWarn,
        'bg-success-dark': isSuccess,
        'bg-danger-dark': isDanger,
      })}
    />
  </div>

  <div class="relative flex w-full justify-between gap-2 p-3">
    <div class="flex gap-3">
      {#if icon}
        <Icon
          size="lg"
          name={icon}
          cx={iconClasses}
        />
      {/if}

      <div class="flex flex-col">
        <p class="text-sm font-semibold text-default">
          <slot name="title" />
        </p>

        <div class="flex flex-col gap-3">
          {#if $$slots.subtitle}
            <p class="text-sm text-subtle-1">
              <slot name="subtitle" />
            </p>
          {/if}

          <span class="text-sm"><slot name="message" /></span>

          {#if $$slots.action}
            <div class="pb-2 pt-1 text-sm">
              <slot name="action" />
            </div>
          {/if}
        </div>
      </div>

      {#if exitable}
        <Button
          variant="ghost"
          cx="text-gray-7 absolute right-1 top-2"
          aria-label="Dismiss notification"
          on:click={handleClose}
        >
          <Icon name="close" />
        </Button>
      {/if}
    </div>
  </div>
</div>
