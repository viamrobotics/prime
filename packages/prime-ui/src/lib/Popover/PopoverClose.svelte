<!--
@component
A button that closes the enclosing [`Popover`](./Popover.svelte). It renders a close icon unless given children.
-->
<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';

	import { mdiClose } from '@mdi/js';
	import { Popover } from 'bits-ui';

	import Icon from '../Icon/Icon.svelte';

	interface Props extends HTMLButtonAttributes {
		/** Element id. `null` is not accepted. */
		id?: string;
	}

	const {
		class: extraClasses,
		children,
		'aria-label': label = 'Close',
		...restProps
	}: Props = $props();
</script>

<Popover.Close class={['icon-button', extraClasses]} aria-label={label} {...restProps}>
	{#if children}
		{@render children()}
	{:else}
		<Icon icon={mdiClose} size="sm" />
	{/if}
</Popover.Close>
