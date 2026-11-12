<!--
@component
One menu of a [`Menubar`](./Menubar.svelte). It renders no element. It pairs a [`Menubar.Trigger`](./MenubarTrigger.svelte) with a [`Menubar.Content`](./MenubarContent.svelte).
-->
<script lang="ts">
	import type { Snippet } from 'svelte';

	import { Menubar } from 'bits-ui';

	interface Props {
		/** The `Menubar.Trigger` and `Menubar.Content` of this menu. */
		children?: Snippet;
	}

	const { children }: Props = $props();
</script>

<Menubar.Menu>
	{@render children?.()}
</Menubar.Menu>
