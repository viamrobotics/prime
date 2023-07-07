<svelte:options immutable tag="v-notify" />

<script lang="ts">
type Variants = 'danger' | 'warning' | 'success' | 'info';

import cx from 'classnames';
import { addStyles } from '../lib/index';
import { createEventDispatcher } from 'svelte/internal';

export let title = '';
export let message = '';
export let variant: Variants = 'info';
export let progress = 1;

const dispatch = createEventDispatcher<{ close: undefined }>()

addStyles();
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
      class={cx('absolute top-0 left-0 w-[3px] h-[calc(100%+2px)] origin-bottom -mt-px -ml-px', {
        'bg-[#df9a9b]': variant === 'danger',
        'bg-[#eed59f]': variant === 'warning',
        'bg-[#9ebe9f]': variant === 'success',
        'bg-[#80b3e5]': variant === 'info',
      })}
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

  <div class="flex items-center justify-between w-full gap-2 p-3 relative">
    <div class="flex gap-3">
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

      <figure class="flex flex-col">
        <figcaption class="text-sm font-medium text-default">
          {title}
        </figcaption>

        <div class='flex flex-col gap-3'>
          {#if message}
            <p class="text-sm text-subtle-1">{message}</p>
          {/if}
          
          <slot />
          
          {#if $$slots.action}
            <div class='pt-1 pb-2'>
              <slot name="action" />
            </div>
          {/if}
        </div>
        
      </figure>

      <v-button
        variant='icon'
        icon='x'
        class='absolute right-1 top-1 text-gray-7'
        on:click={() => dispatch('close')}
      />
    </div>
  </div>
</div>
