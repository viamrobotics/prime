<script lang="ts">
	import Textarea from '../Textarea.svelte';

	let value = $state<string | undefined>(undefined);
</script>

<Textarea bind:value />
<span data-testid="owner">{JSON.stringify(value)}</span>
