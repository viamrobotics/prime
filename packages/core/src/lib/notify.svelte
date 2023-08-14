<svelte:options immutable />

<script lang="ts">
type Variants = 'danger' | 'warning' | 'success' | 'info';

import cx from 'classnames';
import { createEventDispatcher } from 'svelte';
import { Button, Icon } from '$lib';

/** The name of the notification you want to alert users about*/
export let title = '';
/** The specific details about your notifications*/
export let message = '';
/** The severity of the notification you want to show users*/
export let variant: Variants = 'info';
/** The scaling applied on the y access of the page*/
export let progress = 1;
/** If true a user can close out of the notification. If false they cannot*/
export let exitable = false;

const dispatch = createEventDispatcher<{
  /** when the notification close button is pressed*/
  close: {}
}>();

const handleClose = (event: Event) => {
  dispatch('close', event);
};
</script>

<div
  class={cx('flex border', {
    'border-info-medium bg-info-light': variant === 'info',
    'border-warning-medium bg-warning-light': variant === 'warning',
    'border-success-medium bg-success-light': variant === 'success',
    'border-danger-medium bg-danger-light': variant === 'danger',
  })}
>
  <div class="relative flex-col">
    <div
      class={cx(
        'absolute left-0 top-0 -ml-px -mt-px h-[calc(100%+2px)] w-[3px] origin-bottom',
        {
          'bg-[#df9a9b]': variant === 'danger',
          'bg-[#eed59f]': variant === 'warning',
          'bg-[#9ebe9f]': variant === 'success',
          'bg-[#80b3e5]': variant === 'info',
        }
      )}
    />
    <div
      style="transform: scale(1, {progress})"
      class={cx('-ml-px -mt-px h-[calc(100%+2px)] w-[3px] origin-bottom', {
        'bg-danger-dark': variant === 'danger',
        'bg-warning-bright': variant === 'warning',
        'bg-success-dark': variant === 'success',
        'bg-info-dark': variant === 'info',
      })}
    />
  </div>

  <div class="relative flex w-full justify-between gap-2 p-3">
    <div class="flex gap-3">
      {#if variant === 'danger'}
        <div class="text-danger-dark">
          <Icon
            size="lg"
            name="alert-circle"
          />
        </div>
      {:else if variant === 'info'}
        <div class="text-info-dark">
          <Icon
            size="lg"
            name="information"
          />
        </div>
      {:else if variant === 'success'}
        <div class="text-success-dark">
          <Icon
            size="lg"
            name="check-circle"
          />
        </div>
      {/if}

      {#if variant === 'warning'}
        <div class="text-warning-bright">
          <Icon
            size="lg"
            name="alert"
          />
        </div>
      {/if}

      <figure class="flex flex-col">
        <figcaption class="text-sm font-medium text-default">
          {title}
        </figcaption>

        <div class="flex flex-col gap-3">
          {#if message}
            <p class="text-sm text-subtle-1">{message}</p>
          {/if}

          <slot />

          {#if $$slots.action}
            <div class="pb-2 pt-1">
              <slot name="action" />
            </div>
          {/if}
        </div>
      </figure>

      {#if exitable}
        <div
          class="absolute right-1 top-1 text-gray-7"
          role="alert"
        >
          <Button
            variant='ghost'
            icon="close"
            on:click={handleClose}
            on:keydown={handleClose}
            on:keyup={handleClose}
            on:keypress={handleClose}
          />
        </div>
      {/if}
    </div>
  </div>
</div>
