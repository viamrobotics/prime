<script lang="ts">
	import CodeEditor from '../../CodeEditor.svelte';

	let {
		isSplit = false,
		labelledby = 'query-label',
		label
	}: { isSplit?: boolean; labelledby?: string; label?: string } = $props();
</script>

<span id="query-label">Query</span>
<span id="other-label">Other</span>
<CodeEditor
	value="SELECT 1"
	original={isSplit ? 'SELECT 2' : undefined}
	diff={isSplit ? 'split' : 'unified'}
	language="sql"
	aria-label={label}
	aria-labelledby={labelledby}
/>
