<svelte:options immutable />

<script lang="ts">
type Variants = 'green' | 'orange' | 'red' | 'gray' | 'blue';

import cx from 'classnames';

export let label = '';
export let variant: Variants = 'gray';
</script>

<small
  class={cx('inline-block rounded-full border px-3 py-0.5 text-xs', {
    'border-success-medium bg-success-light text-success-dark':
      variant === 'green',
    'border-warning-medium bg-warning-light text-warning-dark':
      variant === 'orange',
    'border-danger-medium bg-danger-light text-danger-dark': variant === 'red',
    'border-medium bg-disabled-light text-default': variant === 'gray',
    'border-info-medium bg-info-light text-info-dark': variant === 'blue',
  })}
>
  {label}
</small>
