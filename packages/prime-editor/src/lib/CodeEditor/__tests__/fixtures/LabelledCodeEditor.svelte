<script lang="ts">
	import CodeEditor from '../CodeEditor.svelte';

	let { split = false }: { split?: boolean } = $props();
</script>

<span id="query-label">Query</span>
<CodeEditor
	value="SELECT 1"
	original={split ? 'SELECT 2' : undefined}
	diff={split ? 'split' : 'unified'}
	language="sql"
	aria-labelledby="query-label"
/>
