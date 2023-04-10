<svelte:options immutable tag="v-badge" />

<script lang="ts">
type Variants = 'green' | 'orange' | 'red' | 'gray' | 'blue';

import cx from 'classnames';
import { addStyles } from '../lib/index';

export let label = '';
export let variant: Variants = 'gray';

addStyles();
</script>

<small
  class={cx('inline-block rounded-full px-3 py-0.5 text-xs', {
    'text-success-fg bg-success-bg': variant === 'green',
    'text-warning-fg bg-warning-bg': variant === 'orange',
    'text-danger-fg bg-danger-bg': variant === 'red',
    'text-text-default bg-disabled-bg': variant === 'gray',
    'text-info-fg bg-info-bg': variant === 'blue',
  })}
>
  {label}
</small>
