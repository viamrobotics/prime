<svelte:options immutable tag="v-notify" />

<script lang="ts">
type Variants = 'error' | 'warning' | 'success' | 'info';

import cx from 'classnames';
import { addStyles } from '../lib/index';

export let title = '';
export let message = '';
export let variant: Variants = 'info';
export let background: 'gray' | 'white' = 'gray';

addStyles();
</script>

<div
  class={cx('flex gap-2 border-l-4 py-2 px-2', {
    'bg-white': background === 'white',
    'bg-bg-2': background === 'gray',
    'border-danger-fg': variant === 'error',
    'border-warning-bright': variant === 'warning',
    'border-success-fg': variant === 'success',
    'border-info-fg': variant === 'info',
  })}
>
  {#if variant === 'error'}
    <v-icon class="mt-0.5 text-danger-fg" name="error-outline" />
  {:else if variant === 'info'}
    <v-icon class="mt-0.5 text-info-fg" name="info-outline" />
  {:else if variant === 'success'}
    <v-icon class="mt-0.5 text-success-fg" name="checkmark" />
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
        d="M8 2.99333L13.02 11.6667H2.98L8 2.99333ZM8 0.333328L0.666672 13H15.3333L8 0.333328ZM8.66667 9.66666H7.33334V11H8.66667V9.66666ZM8.66667 5.66666H7.33334V8.33333H8.66667V5.66666Z"
      />
    </svg>
  {/if}

  <figure>
    <figcaption class="text-sm">{title}</figcaption>

    {#if message}
      <p class="text-xs">{message}</p>
    {/if}

    <slot />
  </figure>
</div>
