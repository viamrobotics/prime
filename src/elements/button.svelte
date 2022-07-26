<svelte:options immutable={true} tag='v-button' />

<script lang='ts'>

import cx from 'classnames'
import { addStyles } from '../lib/index'

type Variants = 'primary' | 'danger' | 'outline-danger' | 'success'

export let disabled: 'true' | 'false' = 'false'
export let type: 'button' | 'submit' | 'reset' = 'button'
export let variant: Variants = 'primary'
export let label = ''
export let icon = ''

addStyles()

</script>

<button
  type={type}
  class={cx('flex items-center gap-1.5 py-1.5 px-2 text-xs border', {
    'cursor-not-allowed opacity-50 pointer-events-none': disabled === 'true',
    'bg-white border-black': variant === 'primary',
    'bg-red/90 text-white border-red/90': variant === 'danger',
    'bg-green/90 border-green/90 text-white': variant === 'success',
    'bg-white border-red/90 text-red/90': variant === 'outline-danger',
  })}
>
  {#if icon}
    <i
      aria-hidden
      class='icon-{icon} text-base'
    />
  {/if}
  {label}
</button>
