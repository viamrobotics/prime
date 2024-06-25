<!--
@component
  
For user triggered actions.

```svelte
<IconButton type="submit" variant="success" on:click={onClick} />
```
-->
<svelte:options immutable />

<script lang="ts">
import cx from 'classnames';
import { Icon, type IconName } from '$lib/icon';
import { preventHandler } from '$lib/prevent-handler';
import Progress from '$lib/progress/progress.svelte';

/** The icon shown in the button. */
export let icon: IconName;

/** aria-label text for accessibility */
export let label: string;

/** Whether or not the button accepts clicks. */
export let disabled = false;

/** The behavior of the button. */
export let type: 'button' | 'submit' | 'reset' = 'button';

/** The communicated action type to the user. */
export let variant: 'primary' | 'secondary' | 'danger' | 'ghost' = 'primary';

/** Shows progress indicator. Determinite progress is a @TODO */
export let progress: 'indeterminate' | number | undefined = undefined;

/** Additional CSS classes to pass to the button. */
let extraClasses: cx.Argument = '';
export { extraClasses as cx };

$: handleDisabled = preventHandler(disabled);
</script>

<button
  {type}
  aria-label={label}
  aria-disabled={disabled ? true : undefined}
  class={cx(
    'inline-flex h-7.5 w-7.5 select-none items-center justify-center whitespace-nowrap',
    {
      'text-gray-6': !disabled,
      'cursor-not-allowed text-gray-4': disabled,
      'hover:border-medium hover:bg-medium hover:text-gray-7 active:bg-gray-2 active:text-gray-8':
        variant === 'primary' && !disabled,
      'border-transparent text-default hover:bg-ghost-light active:border-ghost-medium active:bg-ghost-medium':
        variant === 'ghost' && !disabled,
      'border-light bg-light hover:border-medium hover:bg-medium active:border-medium active:bg-gray-2':
        variant === 'secondary' && !disabled,
      'hover:bg-danger-dark hover:bg-opacity-[0.08] hover:text-danger-dark active:bg-[rgba(190,53,54,0.16)] active:text-danger-dark':
        variant === 'danger' && !disabled,
    },
    extraClasses
  )}
  {...$$restProps}
  on:click
  on:click|capture={handleDisabled}
>
  {#if progress}
    <Progress variant={variant === 'danger' ? 'light' : 'dark'} />
  {:else}
    <Icon name={icon} />
  {/if}
</button>
