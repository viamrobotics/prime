<!--
@component
Marks where a dragged pane stacks onto this one. Place it inside [`Panes.TabList`](./TabList.svelte). A pane without one never stacks. It renders an `aria-hidden`, `inert` `div` with `pointer-events-none`, so only its rect matters and it never blocks the tabs under it. Size and position it with `class`. The pane's wrapper is the positioned ancestor.

Three placements work: a visible strip over the tabs, a grip area, and an edge strip that shows only during a drag. A region shown only during a drag should also show in move mode, so move mode can stack there. The root's `data-dragging` and `data-move-mode` attributes drive the styles. The first hit test after a drag starts misses a region that was hidden before, and the next pointer move finds it.

```svelte
<Panes.TabList aria-label="Stacked panes" class="flex gap-1">
	<Panes.TabListDropRegion
		class="absolute inset-x-0 top-0 hidden h-4 in-data-dragging:block in-data-move-mode:block"
	/>
</Panes.TabList>
```
-->
<script lang="ts">
	import { untrack } from 'svelte';
	import type { Snippet } from 'svelte';
	import type { Attachment } from 'svelte/attachments';
	import type { HTMLAttributes } from 'svelte/elements';

	import { usePane } from './usePanes.svelte.ts';

	interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
		/**
		 * Optional decorative content, such as a grip. The region is `inert` and hidden from assistive
		 * technology, so it holds no controls.
		 */
		children?: Snippet;
	}

	const { children, class: className, ...rest }: Props = $props();

	const pane = usePane();

	const register: Attachment<HTMLElement> = (region) =>
		untrack(() => pane.registerDropRegion(region));
</script>

<div
	{...rest}
	aria-hidden="true"
	inert
	data-tab-list-drop-region
	class={['pointer-events-none', className]}
	{@attach register}
>
	{@render children?.()}
</div>
