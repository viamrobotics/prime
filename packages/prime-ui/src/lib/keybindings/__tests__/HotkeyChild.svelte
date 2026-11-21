<script lang="ts">
	import { untrack } from 'svelte';

	import { useHotkey } from '../index.ts';

	interface Props {
		run: () => void;
		when?: () => boolean;
		mod?: boolean;
		preventDefault?: boolean;
	}

	const { run, when, mod, preventDefault }: Props = $props();

	useHotkey(
		untrack(() => ({
			id: 'test-k',
			description: 'Test',
			group: 'View',
			key: 'k',
			mod,
			preventDefault,
			when: () => when?.() ?? true,
			run: () => run()
		}))
	);
</script>
