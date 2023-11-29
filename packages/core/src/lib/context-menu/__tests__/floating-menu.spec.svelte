<script lang="ts">
import FloatingMenu from '../floating-menu.svelte';
import ContextMenuItem from '../context-menu-item.svelte';

let isOpen = false;
const handleChange = (nextIsOpen: boolean) => (isOpen = nextIsOpen);
</script>

<FloatingMenu
  {isOpen}
  onChange={handleChange}
>
  <span slot="control">
    {isOpen ? 'close' : 'open'}
  </span>
  <svelte:fragment slot="items">
    <ContextMenuItem on:click={() => (isOpen = false)}>item</ContextMenuItem>
  </svelte:fragment>
</FloatingMenu>
<span data-testid="outside-element" />
