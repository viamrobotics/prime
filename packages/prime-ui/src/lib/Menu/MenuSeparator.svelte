<!--
@component
A horizontal rule between groups of items in a [`Menu.Content`](./MenuContent.svelte).
-->
<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import { DropdownMenu } from 'bits-ui';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		/** Element id. `null` is not accepted. */
		id?: string;
	}

	const { class: extraClasses, children, ...restProps }: Props = $props();
</script>

<DropdownMenu.Separator class={['my-1 h-px bg-light', extraClasses]} {...restProps}>
	{@render children?.()}
</DropdownMenu.Separator>
