<svelte:options immutable={true} tag='v-td' />

<script lang='ts'>
import cx from 'classnames'

import { addStyles } from '../../lib/index'

addStyles()

export let baseclass = ''
</script>

<td class={cx("p-2 overflow-hidden", baseclass)}>
  <slot />
</td>
