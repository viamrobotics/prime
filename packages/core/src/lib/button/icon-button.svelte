<!--
@component
  
For user triggered actions.

```svelte
<IconButton type="submit" variant="success" on:click={onClick} />
```
-->
<svelte:options immutable />

<script lang="ts">
import { createEventDispatcher } from 'svelte';
import cx from 'classnames';
import { Icon } from '$lib';

/** The icon shown in the button. */
export let icon: string;

/** aria-label text for accessibility */
export let label: string;

/** Whether or not the button accepts clicks. */
export let disabled = false;

/** The behavior of the button. */
export let type: 'button' | 'submit' | 'reset' = 'button';

/** The communicated action type to the user. */
export let variant: 'primary' | 'danger' = 'primary';

/**
 * The text that appears in a native popup box on hoveClassListArguements to the value
 * of `label`.
 */
export let title = label;

/** Additional CSS classes to pass to the button. */
let extraClasses: cx.Argument = '';
export { extraClasses as cx };

const dispatch = createEventDispatcher<{ click: undefined }>();

const onClick = () => {
  if (disabled) {
    return;
  }

  dispatch('click');
};
</script>

<button
  {type}
  aria-label={label}
  aria-disabled={disabled}
  {title}
  class={cx(
    'inline-flex h-[30px] w-[30px] select-none items-center justify-center whitespace-nowrap',
    {
      'text-gray-6 hover:border-medium hover:bg-medium active:bg-gray-2':
        !disabled,
      'text-disabled-dark cursor-not-allowed': disabled,
      'hover:text-gray-7 active:text-gray-8':
        variant === 'primary' && !disabled,
      'hover:text-danger-dark active:text-danger-dark':
        variant === 'danger' && !disabled,
    },
    extraClasses
  )}
  {...$$restProps}
  on:click={onClick}
>
  <Icon name={icon} />
</button>
