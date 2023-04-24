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
  class={cx('inline-block rounded-full px-3 py-0.5 text-xs border', {
    'text-success-dark bg-success-light border-success-medium': variant === 'green',
    'text-warning-dark bg-warning-light border-warning-medium':
      variant === 'orange',
    'text-danger-dark bg-danger-light border-danger-medium': variant === 'red',
    'text-default bg-disabled-light border-medium': variant === 'gray',
    'text-info-dark bg-info-light border-info-medium': variant === 'blue',
  })}
>
  {label}
</small>
