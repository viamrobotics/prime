<!--
  @component
  
  The badge is often used to display status information.

  ```svelte
  <Badge
    variant='green'
    label='Active'
  />
  ```
-->
<svelte:options immutable />

<script lang="ts">
import cx from 'classnames';
import Progress from './progress/progress.svelte';

/** The badge text. */
export let label = '';

/** The color theme of the badge. */
export let variant:
  | 'success'
  | 'warning'
  | 'danger'
  | 'inactive'
  | 'neutral'
  | 'progress' = 'inactive';

/** Additional CSS classes to pass to the badge. */
let extraClasses: cx.Argument = '';
export { extraClasses as cx };
</script>

<small
  class={cx(
    'inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs',
    {
      'border-success-medium bg-success-light text-success-dark':
        variant === 'success',
      'border-warning-medium bg-warning-light text-warning-dark':
        variant === 'warning',
      'border-danger-medium bg-danger-light text-danger-dark':
        variant === 'danger',
      'border-medium bg-disabled-light text-default': variant === 'inactive',
      'border-info-medium bg-info-light text-info-dark':
        variant === 'neutral' || variant === 'progress',
    },
    extraClasses
  )}
>
  {#if variant === 'progress'}
    <Progress />
  {/if}
  {label}
</small>
