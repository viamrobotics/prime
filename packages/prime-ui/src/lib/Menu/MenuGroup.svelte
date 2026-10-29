<!--
@component
A set of related items in a [`Menu.Content`](./MenuContent.svelte), labelled by its [`Menu.GroupHeading`](./MenuGroupHeading.svelte).
-->
<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import { DropdownMenu } from 'bits-ui';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		/** Element id. `null` is not accepted. */
		id?: string;
	}

	const { children, ...restProps }: Props = $props();
</script>

<DropdownMenu.Group {...restProps}>
	{@render children?.()}
</DropdownMenu.Group>
