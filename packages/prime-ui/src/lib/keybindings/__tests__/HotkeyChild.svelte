<script lang="ts">
	import { useHotkey } from '../index.ts';

	let { run }: { run: () => void } = $props();

	useHotkey({ id: 'test-k', description: 'Test', group: 'View', key: 'k', run: () => run() });
</script>
