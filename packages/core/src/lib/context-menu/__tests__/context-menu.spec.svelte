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
import type cx from 'classnames';
import { ContextMenu, ContextMenuItem, ContextMenuSeparator } from '$lib';
export let extraClasses: cx.Argument = '';
</script>

<ContextMenu cx={extraClasses}>
  <ContextMenuItem
    label="hello"
    icon="plus"
    cx={extraClasses}
  />
  <ContextMenuSeparator cx={extraClasses} />
</ContextMenu>
