<script lang="ts">
	import Label from '../Label.svelte';

	interface Props {
		required?: boolean;
		disabled?: boolean;
	}

	const { required = false, disabled = false }: Props = $props();
</script>

<Label {required} {disabled}>Email</Label>
