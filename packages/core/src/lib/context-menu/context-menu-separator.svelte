<!--
@component

A horizontal line divider within a context menu.
```svelte
<ContextMenuSeparator />
```
-->
<svelte:options immutable />

<script lang="ts">
import cx from 'classnames';

/** Additional CSS classes to pass to the separator. */
let extraClasses: cx.Argument = '';
export { extraClasses as cx };
</script>

<hr class={cx('mb-0.5 mt-1 border-light shadow-none', extraClasses)} />
