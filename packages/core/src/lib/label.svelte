<!-- 
  @component
  
  For labelling inputs
  
```svelte
<Label>
  Name:
  <Input name="name" />
</Label>
```
 -->
<svelte:options immutable />

<script lang="ts">
import cx from 'classnames';

/** Whether or not the label should render as required */
export let required = false;

/** Whether or not the label should render as disabled */
export let disabled = false;
</script>

<label
  class={cx('text-xs', {
    'text-subtle-1': !disabled,
    'pointer-events-none text-disabled-dark': disabled,
    'after:ml-1 after:text-danger-dark after:content-["*"]': required,
  })}
>
  <slot />
</label>
