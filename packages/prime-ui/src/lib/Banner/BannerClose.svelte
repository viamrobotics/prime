<!--
@component
The dismiss button of a [`Banner`](./Banner.svelte). It renders a close icon and requires a name
then: an `aria-label`, an `aria-labelledby`, or a `label` it applies as its `aria-label`. Pass
children to replace the icon, and their text names the button, so no name is needed. The banner owns
no open state, so handle `onclick` and remove the banner yourself.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	import { mdiClose } from '@mdi/js';

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

<button
	type="button"
	{...restProps}
	class={['icon-button', 'banner-close', extraClasses]}
	aria-label={label ?? ariaLabel}
>
	{#if children}
		{@render children()}
	{:else}
		<Icon icon={mdiClose} size="sm" />
	{/if}
</button>
