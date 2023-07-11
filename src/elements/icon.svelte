<svelte:options immutable />

<script lang="ts">
type Size = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';

import cx from 'classnames';

export let name = '';
export let size: Size = 'base';
</script>

<i
  aria-hidden="true"
  class={cx(`icon-${name} block`, {
    'text-xs': size === 'xs',
    'text-sm': size === 'sm',
    'text-base': size === 'base',
    'text-lg': size === 'lg',
    'text-xl': size === 'xl',
    'text-2xl': size === '2xl',
    'text-3xl': size === '3xl',
    'text-4xl': size === '4xl',
  })}
/>
