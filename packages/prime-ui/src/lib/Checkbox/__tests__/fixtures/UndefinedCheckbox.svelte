<script lang="ts">
	import Checkbox from '../../Checkbox.svelte';

	let checked = $state<boolean>();
</script>

<Checkbox bind:checked aria-label="Accept" />
<span data-testid="owner">{String(checked)}</span>
