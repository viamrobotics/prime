<script lang="ts">
import cx from 'classnames';

/** Additional CSS classes */
let extraClasses: cx.Argument = '';
export { extraClasses as cx };

/** Whether this is a header cell */
export let header = false;
</script>

<li
  role={header ? 'columnheader' : 'cell'}
  class={cx(
    'flex items-center gap-2 border-b p-2',
    header ? 'bg-light text-subtle-1' : '',
    extraClasses
  )}
  {...$$restProps}
>
  <slot />
</li>
