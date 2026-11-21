<!--
@component
A button that closes its [`Takeover`](./Takeover.svelte). It renders a close icon by default, labeled
`Close`, and wears `icon-button` only then. Pass children to replace the icon, and their text names
the button. Pass `aria-label` to replace either name.
-->
<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';

	import DialogClose from '../Dialog/DialogClose.svelte';

	interface Props extends HTMLButtonAttributes {
		/** Element id. `null` is not accepted. */
		id?: string;
	}

	const props: Props = $props();
</script>

<DialogClose {...props} />
