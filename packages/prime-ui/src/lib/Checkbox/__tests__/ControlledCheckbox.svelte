<script lang="ts">
	import Checkbox from '../Checkbox.svelte';

	interface Props {
		/** When false, the setter rejects every change (controlled veto). */
		accept?: boolean;
	}

	const { accept = false }: Props = $props();

	let checked = $state(false);
</script>

<Checkbox
	bind:checked={
		() => checked,
		(v) => {
			if (accept) checked = v;
		}
	}
/>
<span data-testid="owner">{checked}</span>
