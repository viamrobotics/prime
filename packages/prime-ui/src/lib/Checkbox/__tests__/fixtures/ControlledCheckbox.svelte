<script lang="ts">
	import Checkbox from '../../Checkbox.svelte';

	interface Props {
		accept?: boolean;
	}

	const { accept = false }: Props = $props();

	let checked = $state(false);
</script>

<Checkbox
	aria-label="Accept"
	bind:checked={
		() => checked,
		(v) => {
			if (accept) checked = v;
		}
	}
/>
<span data-testid="owner">{checked}</span>
