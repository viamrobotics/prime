<svelte:options immutable tag="v-notify" />

<script lang="ts">
type Variants = 'danger' | 'warning' | 'success' | 'info';

import cx from 'classnames';
import { addStyles } from '../lib/index';

export let title = '';
export let message = '';
export let variant: Variants = 'info';

addStyles();
</script>

<div
  class={cx('relative flex border', {
    'bg-medium border-medium': variant !== 'danger',
    'bg-danger-light border-danger-medium': variant === 'danger',
  })}
>
  <div
    class={cx(
      'absolute top-0 left-0 w-[3px] h-[calc(100%+2px)] -mt-px -ml-px',
      {
        'bg-danger-dark': variant === 'danger',
        'bg-warning-bright': variant === 'warning',
        'bg-success-dark': variant === 'success',
        'bg-info-dark': variant === 'info',
      }
    )}
  />

  <div class="flex items-center justify-between w-full gap-2 py-2 px-3">
    <div class="flex gap-2">
      {#if variant === 'danger'}
        <v-icon class="mt-0.5 text-danger-dark" name="error-outline" />
      {:else if variant === 'info'}
        <v-icon class="mt-0.5 text-info-dark" name="info-outline" />
      {:else if variant === 'success'}
        <v-icon class="mt-0.5 text-success-dark" name="checkmark" />
      {/if}

      {#if variant === 'warning'}
        <svg
          width="14"
          height="14"
          viewBox="0 0 15 15"
          fill="none"
          class="mt-1 fill-warning-bright"
        >
          <path
            d="M8 2.99L13.02 11.677H2.98L8 2.99ZM8 0.3328L0.67 13H15.33L8 0.333328ZM8.66667 9.67H7.33334V11H8.66667V9.66666ZM8.66667 5.66666H7.33334V8.33333H8.66667V5.66666Z"
          />
        </svg>
      {/if}

      <figure>
        <figcaption class="text-sm font-medium text-default">
          {title}
        </figcaption>

        {#if message}
          <p class="text-sm text-subtle-1">{message}</p>
        {/if}

        <slot />
      </figure>
    </div>

    <slot name="action" />
  </div>
</div>
