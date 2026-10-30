<script lang="ts">
	import CodeSnippet from '../CodeSnippet.svelte';

	const { wrapLines }: { wrapLines: boolean } = $props();
</script>

<CodeSnippet code="const a = 1;" language="typescript" {wrapLines} />
