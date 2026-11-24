<script lang="ts">
	import Field from '../../../Field/Field.svelte';
	import Switch from '../../Switch.svelte';

	interface Props {
		accept?: boolean;
	}

	const { accept = false }: Props = $props();

	let checked = $state(false);
</script>

<Field label="Switch">
	<Switch
		bind:checked={
			() => checked,
			(v) => {
				if (accept) checked = v;
			}
		}
	/>
</Field>
<span data-testid="owner">{checked}</span>
