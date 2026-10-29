<!--
@component
A button that closes its [`Dialog`](./Dialog.svelte). It renders a close icon by default, labelled
`Close`. Pass children to replace the icon, and `aria-label` to replace the label.
-->
<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';

	import { mdiClose } from '@mdi/js';
	import { Dialog } from 'bits-ui';

	import Icon from '../Icon/Icon.svelte';

	interface Props extends HTMLButtonAttributes {
		/** Element id. `null` is not accepted. */
		id?: string;
	}

	const {
		class: extraClasses,
		'aria-label': ariaLabel = 'Close',
		children,
		...restProps
	}: Props = $props();
</script>

<Dialog.Close class={['icon-button', extraClasses]} aria-label={ariaLabel} {...restProps}>
	{#if children}
		{@render children()}
	{:else}
		<Icon icon={mdiClose} size="sm" />
	{/if}
</Dialog.Close>
