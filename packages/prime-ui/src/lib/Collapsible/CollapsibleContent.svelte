<!--
@component
The region a [`Collapsible`](./Collapsible.svelte) shows and hides. Rendered only while open.
-->
<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import { Collapsible } from 'bits-ui';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		/** Element id. `null` is not accepted. */
		id?: string;
	}

	const { class: extraClasses, children, ...restProps }: Props = $props();
</script>

<Collapsible.Content {...restProps}>
	{#snippet child({ props, open })}
		{#if open}
			<div {...props} class={extraClasses}>
				{@render children?.()}
			</div>
		{/if}
	{/snippet}
</Collapsible.Content>
