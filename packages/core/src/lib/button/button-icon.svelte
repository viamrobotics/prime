<!--
@component
  
For user triggered actions.

```svelte
<ButtonIcon type="submit" variant="success" on:click={onClick} />
```
-->
<svelte:options immutable />

<script lang="ts">
import cx from 'classnames';
import { Icon } from '$lib';

/** Whether or not the button accepts clicks. */
export let disabled = false;

/** The behavior of the button. */
export let type: 'button' | 'submit' | 'reset' = 'button';

/** The communicated action type to the user. */
export let variant: 'primary' | 'danger' = 'primary';

/** aria-label text for accessibility */
export let label = '';

/** The text that appears in a native popup box on hover. */
export let title = '';

/**
 * The icon shown in the button.
 */
export let icon = '';
</script>

<button
  {type}
  aria-label={label}
  aria-disabled={disabled}
  {disabled}
  {title}
  class={cx(
    'mx-auto inline-flex h-8 w-8 items-center justify-center whitespace-nowrap ' +
      'text-gray-6 hover:border-medium hover:bg-medium active:bg-gray-2',
    {
      'pointer-events-none select-none text-disabled-dark': disabled,
      'hover:text-gray-7 active:text-gray-8': variant === 'primary',
      'hover:text-danger-dark active:text-danger-dark': variant === 'danger',
    }
  )}
  style={disabled ? '-webkit-user-select: none' : ''}
  on:click
>
  <Icon name={icon} />
</button>
