<script lang="ts">
	import CodeEditor from '../../CodeEditor.svelte';

	let value = $state<string>();
</script>

<CodeEditor aria-label="Robot config" bind:value />
<span data-testid="owner">{value ?? 'unset'}</span>
