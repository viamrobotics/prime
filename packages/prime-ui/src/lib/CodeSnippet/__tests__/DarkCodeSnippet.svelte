<script lang="ts">
	import CodeSnippet from '../CodeSnippet.svelte';

	const { code }: { code: string } = $props();
</script>

<div class="dark">
	<CodeSnippet {code} language="json" />
</div>
