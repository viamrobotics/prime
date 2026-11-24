<!--
@component
A button that closes its [`Takeover`](./Takeover.svelte). It renders a close icon and wears
`icon-button` by default, and it requires a name then: an `aria-label`, an `aria-labelledby`, or a
`label` it applies as its `aria-label`. Pass children to replace the icon, and their text names the
button, so no name is needed.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	import type { AccessibleName } from '../accessible-name.ts';

	import DialogClose from '../Dialog/DialogClose.svelte';

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

	const props: Props & CloseName = $props();
</script>

<DialogClose {...props} />
