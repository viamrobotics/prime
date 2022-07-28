<svelte:options immutable={true} tag='v-th' />

<script lang='ts'>
import cx from 'classnames'
import { addStyles } from '../../lib/index'

addStyles()

export let baseclass = ''
</script>

<th class={cx("p-2 text-neutral-600 font-normal overflow-hidden", baseclass)}>
  <slot />
</th>
