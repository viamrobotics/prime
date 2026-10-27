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
