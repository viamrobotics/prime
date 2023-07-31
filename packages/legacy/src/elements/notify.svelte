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
    'bg-info-light border-info-medium': variant === 'info',
    'bg-warning-light border-warning-medium': variant === 'warning',
    'bg-success-light border-success-medium': variant === 'success',
    'bg-danger-light border-danger-medium': variant === 'danger',
  })}
>
  <div class="relative flex-col">
    <div
      class={cx(
        'absolute top-0 left-0 w-[3px] h-[calc(100%+2px)] origin-bottom -mt-px -ml-px',
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
      class={cx('w-[3px] h-[calc(100%+2px)] origin-bottom -mt-px -ml-px', {
        'bg-danger-dark': variant === 'danger',
        'bg-warning-bright': variant === 'warning',
        'bg-success-dark': variant === 'success',
        'bg-info-dark': variant === 'info',
      })}
    />
  </div>

  <div class="flex justify-between w-full gap-2 p-3 relative">
    <div class="flex gap-3">
      {#if variant === 'danger'}
        <v-icon size="lg" class="text-danger-dark" name="alert-circle" />
      {:else if variant === 'info'}
        <v-icon size="lg" class="text-info-dark" name="information" />
      {:else if variant === 'success'}
        <v-icon size="lg" class="text-success-dark" name="check-circle" />
      {/if}

      {#if variant === 'warning'}
        <v-icon size="lg" class="text-warning-bright" name="alert" />
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
            <div class="pt-1 pb-2">
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
