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

/** Additional detail text to render after the default slot. */
export let detail = '';

/** Additional CSS classes to pass to the label. */
let extraClasses: cx.Argument = '';
export { extraClasses as cx };
</script>

<label
  class={cx(
    'flex w-full',
    {
      'flex-col gap-1': position === 'top',
      'items-center gap-2': position === 'left',
    },
    extraClasses
  )}
>
  <span
    class={cx('flex text-xs', {
      'inline whitespace-nowrap': position === 'left',
      'text-subtle-1': !disabled,
      'text-disabled-dark cursor-not-allowed': disabled,
      'after:text-danger-dark after:ml-1 after:content-["*"]': required,
    })}
  >
    <slot />
    {#if detail !== ''}
      <span class={cx('text-disabled', { 'ml-1': !required })}>{detail}</span>
    {/if}
  </span>

  <slot name="input" />
</label>
