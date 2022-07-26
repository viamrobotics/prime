<svelte:options immutable={true} tag='v-notify' />

<script lang='ts'>
  import cx from 'classnames'
  import { addStyles } from '../lib/index'

  type Variants = 'error' | 'warning' | 'success' | 'info';

  export let title = ''
  export let message = ''
  export let variant: Variants = 'info'
  export let background: 'gray' | 'white' = 'gray'

  addStyles()
</script>

<div
  class={cx('flex gap-2 border-l-4 py-2 px-2', {
    'bg-gray-100': background === 'gray',
    'bg-white': background === 'white',
    'border-red/90': variant === 'error',
    'border-orange/90': variant === 'warning',
    'border-green/90': variant === 'success',
    'border-blue/90': variant === 'info',
  })}
>
  <div class='mt-1'>
    <svg
      width='14'
      height='14'
      viewBox='0 0 15 15'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      {#if variant === 'error'}
        <path
          d='M6.33 9H7.66666V10.3333H6.33333V9ZM6.33 3.66666H7.66666V7.66666H6.33333V3.66666ZM6.99333 0.333328C3.31333 0.333328 0.333328 3.31999 0.333328 7C0.333328 10.68 3.31333 13.6667 6.99333 13.6667C10.68 13.6667 13.6667 10.68 13.6667 7C13.6667 3.31999 10.68 0.333328 6.99333 0.333328ZM7 12.3333C4.05333 12.3333 1.66666 9.94666 1.66666 7C1.66666 4.05333 4.05333 1.66666 7 1.66666C9.94666 1.66666 12.3333 4.05333 12.3333 7C12.3333 9.94666 9.94666 12.3333 7 12.3333Z'
          fill='#BE3026'
        />
      {:else if variant === 'warning'}
        <path
          d='M8 2.99333L13.02 11.6667H2.98L8 2.99333ZM8 0.333328L0.666672 13H15.3333L8 0.333328ZM8.66667 9.66666H7.33334V11H8.66667V9.66666ZM8.66667 5.66666H7.33334V8.33333H8.66667V5.66666Z'
          fill='#FF9900'
        />
      {:else if variant === 'success'}
        <path
          d='M4 7.78L1.22 5L0.273331 5.94L4 9.66667L12 1.66667L11.06 0.726665L4 7.78Z'
          fill='#397F48'
        />
      {:else if variant === 'info'}
        <path
          d='M6.33 3.66667H7.66666V5H6.33333V3.66667ZM6.33 6.33333H7.66666V10.3333H6.33333V6.33333ZM7 0.333334C3.31999 0.333334 0.333328 3.32 0.333328 7C0.333328 10.68 3.31999 13.6667 7 13.6667C10.68 13.6667 13.6667 10.68 13.6667 7C13.6667 3.32 10.68 0.333334 7 0.333334ZM7 12.3333C4.06 12.3333 1.66666 9.94 1.66666 7C1.66666 4.06 4.06 1.66667 7 1.66667C9.93999 1.66667 12.3333 4.06 12.3333 7C12.3333 9.94 9.93999 12.3333 7 12.3333Z'
          fill='#045681'
        />
      {/if}
    </svg>
  </div>
  <figure>
    <figcaption class='text-sm'>{title}</figcaption>
    
    {#if message}
      <p class='text-xs'>{message}</p>
    {/if}
  </figure>
</div>
