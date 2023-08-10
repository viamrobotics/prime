<!-- 
  @component

  This component allows us to render a Tooltip with its slotted
  children, due to limitations with rendering slots using
  `@testing-library`.

  See:
  - https://sveltesociety.dev/recipes/testing-and-debugging/unit-testing-svelte-component
  - https://github.com/testing-library/svelte-testing-library/issues/48
 -->
<script lang="ts">
import ContextMenu from './context-menu.svelte';
import ContextMenuItem from './context-menu-item.svelte';
import ContextMenuSeparator from './context-menu-separator.svelte';
</script>

<ContextMenu>
  <ContextMenuItem
    label="hello"
    icon="plus"
  />
  <ContextMenuSeparator />
</ContextMenu>
