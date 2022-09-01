<svelte:options immutable tag='v-icon' />

<script lang='ts'>

import cx from 'classnames';
import { addStyles } from '../lib/index';

type Size = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl'

export let name = '';
export let size: Size = 'base';

addStyles();

</script>

<i
  aria-hidden
  class={cx(`icon-${name} block`, {
    'text-xs': size === 'xs',
    'text-sm': size === 'sm',
    'text-base': size === 'base',
    'text-lg': size === 'lg',
    'text-xl': size === 'xl',
    'text-2xl': size === '2xl',
  })}
/>
