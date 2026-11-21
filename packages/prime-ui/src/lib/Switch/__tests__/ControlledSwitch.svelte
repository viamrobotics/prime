<script lang="ts">
	import Switch from '../Switch.svelte';

	interface Props {
		accept?: boolean;
	}

	const { accept = false }: Props = $props();

	let checked = $state(false);
</script>

<Switch
	bind:checked={
		() => checked,
		(v) => {
			if (accept) checked = v;
		}
	}
/>
<span data-testid="owner">{checked}</span>
