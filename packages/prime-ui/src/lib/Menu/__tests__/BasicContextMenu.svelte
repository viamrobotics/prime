<script lang="ts">
	import { ContextMenu } from '../context-menu.ts';

	const { disabled = false }: { disabled?: boolean } = $props();

	let open = $state(false);
	let log = $state('');
</script>

<ContextMenu bind:open>
	<ContextMenu.Trigger {disabled}>
		<div data-testid="area" style="width: 200px; height: 200px; margin: 100px">Area</div>
	</ContextMenu.Trigger>
	<ContextMenu.Content aria-label="Actions">
		<ContextMenu.Item onclick={() => (log += 'Copy')}>Copy</ContextMenu.Item>
		<ContextMenu.Item onclick={() => (log += 'Paste')}>Paste</ContextMenu.Item>
	</ContextMenu.Content>
</ContextMenu>
<span data-testid="owner">{open}</span>
<span data-testid="log">{log}</span>
<button type="button">Outside</button>
