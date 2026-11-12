<!--
@component
The button that opens a [`Takeover`](./Takeover.svelte). It carries no visual style of its own, so add `button` or another class.
-->
<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';

	import DialogTrigger from '../Dialog/DialogTrigger.svelte';

	interface Props extends HTMLButtonAttributes {
		/** Element id. `null` is not accepted. */
		id?: string;
	}

	const { children, ...restProps }: Props = $props();
</script>

<DialogTrigger {...restProps}>
	{@render children?.()}
</DialogTrigger>
