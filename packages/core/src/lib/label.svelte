<!-- 
  @component
  
  For labelling inputs
  
```svelte
<Label>
  <span> Name:</span>
  <Input slot="input" name="name" />
</Label>
```
 -->
<svelte:options immutable />

<script
  lang="ts"
  context="module"
>
export type LabelPosition = 'top' | 'left';
</script>

<script lang="ts">
import cx from 'classnames';

/** Where to position the label relative to the input */
export let position: LabelPosition = 'top';

/** Whether or not the label should render as required */
export let required = false;

/** Whether or not the label should render as disabled */
export let disabled = false;
</script>

<label
  class={cx('flex w-full', {
    'flex-col gap-1': position === 'top',
    'items-center gap-2': position === 'left',
  })}
>
  <span
    class={cx('flex text-xs', {
      'inline whitespace-nowrap': position === 'left',
      'text-subtle-1': !disabled,
      'pointer-events-none text-disabled-dark': disabled,
      'after:ml-1 after:text-danger-dark after:content-["*"]': required,
    })}
  >
    <slot />
  </span>

  <slot name="input" />
</label>
