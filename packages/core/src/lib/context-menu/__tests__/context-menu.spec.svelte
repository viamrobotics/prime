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

export let id = '';
export let extraClasses: cx.Argument = '';
export let onClick: (() => unknown) | undefined = undefined;
</script>

<ContextMenu
  {id}
  cx={extraClasses}
>
  <ContextMenuItem
    icon="plus"
    cx={extraClasses}
    on:click={onClick}
  >
    First
  </ContextMenuItem>
  <ContextMenuSeparator cx={extraClasses} />
  <ContextMenuItem variant="primary">Primary</ContextMenuItem>
  <ContextMenuItem variant="danger">Danger</ContextMenuItem>
</ContextMenu>
