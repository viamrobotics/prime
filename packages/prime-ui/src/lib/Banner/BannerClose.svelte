<!--
@component
The dismiss button of a [`Banner`](./Banner.svelte), labelled `Dismiss`. It renders a close icon by
default. Pass children to replace the icon, and `aria-label` to replace the label. The banner owns
no open state, so handle `onclick` and remove the banner yourself.
-->
<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';

	import { mdiClose } from '@mdi/js';

	import Icon from '../Icon/Icon.svelte';

	interface Props extends HTMLButtonAttributes {
		/** Element id. `null` is not accepted. */
		id?: string;
	}

	const {
		class: extraClasses,
		'aria-label': ariaLabel = 'Dismiss',
		children,
		...restProps
	}: Props = $props();
</script>

<button
	type="button"
	{...restProps}
	class={['icon-button', 'banner-close', extraClasses]}
	aria-label={ariaLabel}
>
	{#if children}
		{@render children()}
	{:else}
		<Icon icon={mdiClose} size="sm" />
	{/if}
</button>
