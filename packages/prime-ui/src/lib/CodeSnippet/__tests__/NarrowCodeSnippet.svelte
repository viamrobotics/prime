<script lang="ts">
	import CodeSnippet from '../CodeSnippet.svelte';

	const {
		code,
		hasCaption = false,
		wrapLines = false
	}: { code: string; hasCaption?: boolean; wrapLines?: boolean } = $props();
</script>

<div style="width: 120px">
	{#if hasCaption}
		<CodeSnippet {code} language="typescript" {wrapLines}>
			{#snippet caption()}
				rover.ts
			{/snippet}
		</CodeSnippet>
	{:else}
		<CodeSnippet {code} language="typescript" {wrapLines} />
	{/if}
</div>
