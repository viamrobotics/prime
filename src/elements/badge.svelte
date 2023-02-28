<svelte:options immutable tag='v-badge' />

<script lang='ts'>

type Variants = 'green' | 'orange' | 'red' | 'gray'

import cx from 'classnames';
import { addStyles } from '../lib/index';

export let label = '';
export let variant: Variants = 'gray';

addStyles();

</script>

<small class={cx('inline-block rounded-full px-3 py-0.5 text-xs', {
  'text-green/900 bg-green/200': variant === 'green',
  'text-orange/900 bg-orange/200': variant === 'orange',
  'text-red/900 bg-red/200': variant === 'red',
  'text-gray/800 bg-gray/200': variant === 'gray',
})}>
  { label }
</small>
