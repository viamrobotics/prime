<svelte:options immutable />

<script lang="ts">
type Variants = 'danger' | 'warning' | 'success' | 'info';

import cx from 'classnames';
import { dispatcher } from '../lib/dispatch';
import { htmlToBoolean } from '../lib/boolean';

export let title = '';
export let message = '';
export let variant: Variants = 'info';
export let progress = 1;
export let exitable = 'false';

$: isExitable = htmlToBoolean(exitable, 'exitable');

const dispatch = dispatcher();

const handleClose = (event: Event) => {
  dispatch(event, 'close');
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
        <v-icon
          size="lg"
          class="text-danger-dark"
          name="alert-circle"
        />
      {:else if variant === 'info'}
        <v-icon
          size="lg"
          class="text-info-dark"
          name="information"
        />
      {:else if variant === 'success'}
        <v-icon
          size="lg"
          class="text-success-dark"
          name="check-circle"
        />
      {/if}

      {#if variant === 'warning'}
        <v-icon
          size="lg"
          class="text-warning-bright"
          name="alert"
        />
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

      {#if isExitable}
        <v-button
          variant="icon"
          icon="close"
          class="absolute right-1 top-1 text-gray-7"
          on:click={handleClose}
        />
      {/if}
    </div>
  </div>
</div>
