<script lang="ts">
	import { mdiPencil } from '@mdi/js';

	import Icon from '../../Icon/Icon.svelte';
	import { Menu } from '../menu.ts';

	let open = $state(false);
	let log = $state<string[]>([]);

	const record = (name: string) => () => {
		log.push(name);
	};
</script>

<Menu bind:open>
	<Menu.Trigger class="button">Open</Menu.Trigger>
	<Menu.Content aria-label="Actions">
		<Menu.Item onclick={record('New')}>New</Menu.Item>
		<Menu.Item onclick={record('Open')}>Open</Menu.Item>
		<Menu.Item onclick={record('Rename')}>
			<Icon icon={mdiPencil} size="sm" />
			Rename
		</Menu.Item>
		<Menu.Item disabled onclick={record('Share')}>Share</Menu.Item>
		<Menu.Item variant="danger" onclick={record('Delete')}>Delete</Menu.Item>
	</Menu.Content>
</Menu>
<span data-testid="owner">{open}</span>
<span data-testid="log">{log.join(',')}</span>
<button type="button">Outside</button>
