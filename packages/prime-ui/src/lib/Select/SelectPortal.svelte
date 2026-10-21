<!--
@component
Portals a [`Select.Content`](./SelectContent.svelte) out to the body so it
escapes overflow clipping and stacking contexts.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';

	import { Select } from 'bits-ui';

	interface Props {
		/** Where to render the content. An element or a selector. @default document.body */
		to?: Element | string;

		/** The panel. */
		children?: Snippet;
	}

	const { children, ...restProps }: Props = $props();
</script>

<Select.Portal {...restProps}>
	{@render children?.()}
</Select.Portal>
