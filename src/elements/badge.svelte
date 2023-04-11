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
    'text-success-fg bg-success-bg border-success-border': variant === 'green',
    'text-warning-fg bg-warning-bg border-warning-border': variant === 'orange',
    'text-danger-fg bg-danger-bg border-danger-border': variant === 'red',
    'text-text-default bg-disabled-bg border-border-2': variant === 'gray',
    'text-info-fg bg-info-bg border-info-border': variant === 'blue',
  })}
>
  {label}
</small>
