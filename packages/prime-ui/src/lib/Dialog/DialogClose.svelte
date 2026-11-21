<!--
@component
A button that closes its [`Dialog`](./Dialog.svelte). It renders a close icon by default, labeled
`Close`, and wears `icon-button` only then. Pass children to replace the icon, and their text names
the button. Pass `aria-label` to replace either name.
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

	const { class: extraClasses, 'aria-label': ariaLabel, children, ...restProps }: Props = $props();

	const ICON_LABEL = 'Close';
</script>

<Dialog.Close
	class={[!children && 'icon-button', extraClasses]}
	aria-label={ariaLabel ?? (children ? undefined : ICON_LABEL)}
	{...restProps}
>
	{#if children}
		{@render children()}
	{:else}
		<Icon icon={mdiClose} size="sm" />
	{/if}
</Dialog.Close>
