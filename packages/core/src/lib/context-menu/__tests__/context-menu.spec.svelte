<!-- 
  @component

  This component allows us to render a Context Menu with its slotted
  children, due to limitations with rendering slots using
  `@testing-library`.

  See:
  - https://sveltesociety.dev/recipes/testing-and-debugging/unit-testing-svelte-component
  - https://github.com/testing-library/svelte-testing-library/issues/48
 -->
<script lang="ts">
import { ContextMenu, ContextMenuItem, ContextMenuSeparator } from '$lib';
</script>

<ContextMenu>
  <ContextMenuItem
    label="hello"
    icon="plus"
  />
  <ContextMenuSeparator />
</ContextMenu>
