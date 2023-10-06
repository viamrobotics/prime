<script lang="ts">
import FloatingMenu from '../floating-menu.svelte';
import ContextMenuItem from '../context-menu-item.svelte';
</script>

<FloatingMenu>
  <span
    slot="control"
    let:isOpen
  >
    {isOpen ? 'close' : 'open'}
  </span>
  <svelte:fragment slot="items">
    <ContextMenuItem>item</ContextMenuItem>
  </svelte:fragment>
</FloatingMenu>
<span data-testid="outside-element" />
