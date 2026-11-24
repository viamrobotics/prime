<!--
@component
A button that closes the enclosing [`Popover`](./Popover.svelte). It renders a close icon and wears
`icon-button` by default, and it requires a name then: an `aria-label`, an `aria-labelledby`, or a
`label` it applies as its `aria-label`. Pass children to replace the icon, and their text names the
button, so no name is needed.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	import { mdiClose } from '@mdi/js';
	import { Popover } from 'bits-ui';

	import type { AccessibleName } from '../accessible-name.ts';

	import Icon from '../Icon/Icon.svelte';

	interface Props extends Omit<
		HTMLButtonAttributes,
		'aria-label' | 'aria-labelledby' | 'children'
	> {
		/** Element id. `null` is not accepted. */
		id?: string;
	}

	type CloseName =
		| ({ children?: undefined } & AccessibleName)
		| {
				children: Snippet;
				label?: string;
				'aria-label'?: string;
				'aria-labelledby'?: string;
		  };

	const {
		class: extraClasses,
		label,
		'aria-label': ariaLabel,
		children,
		...restProps
	}: Props & CloseName = $props();
</script>

<Popover.Close
	class={[!children && 'icon-button', extraClasses]}
	aria-label={label ?? ariaLabel}
	{...restProps}
>
	{#if children}
		{@render children()}
	{:else}
		<Icon icon={mdiClose} size="sm" />
	{/if}
</Popover.Close>
