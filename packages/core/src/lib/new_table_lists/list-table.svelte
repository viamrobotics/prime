<script lang="ts">
import cx from 'classnames';

/**
 * Variant:
 * - 'auto': no predefined widths; rows are flex.
 * - 'fixed': user provides column widths via cols prop; rows are grid.
 */
export let variant: 'auto' | 'fixed' = 'auto';

/**
 * Array of valid CSS values for columns if variant='fixed', e.g.
 * ['1fr','2fr','auto','10%','100px']
 * <ListTable cols={["10%", "30%", "60%"]}>
 * ```
 */
export let cols: string[] = [];

/** Additional CSS classes to pass to the <ul> container. */
let extraClasses: cx.Argument = '';
export { extraClasses as cx };
</script>

<!-- The parent <ul> is a single grid container.
     Rows themselves will decide if they are `display: grid;` or `flex;`. -->
<ul
  role="table"
  class={cx(
    'w-full border border-light bg-white',
    {
      'list-table-fixed': variant === 'fixed',
      'list-table-auto': variant === 'auto',
    },
    extraClasses
  )}
  style={variant === 'fixed' && cols.length > 0
    ? `grid-template-columns: ${cols.join(' ')}; display: grid;`
    : 'display: grid; grid-template-columns: auto auto auto;'}
>
  <!-- Rows (li.list-table-row) come in via the <slot> -->
  <slot />
</ul>

<style lang="postcss">
/* Make each row simply “transparent” so that its child cells 
   line up in the parent’s single grid. */
:global(.list-table-row) {
  display: contents;
}
</style>
