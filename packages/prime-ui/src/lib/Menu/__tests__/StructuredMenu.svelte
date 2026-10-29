<script lang="ts">
	import { Menu } from '../menu.ts';

	let log = $state<string[]>([]);

	const record = (name: string) => () => {
		log.push(name);
	};
</script>

<Menu>
	<Menu.Trigger class="button">Open</Menu.Trigger>
	<Menu.Content aria-label="Actions">
		<Menu.Group>
			<Menu.GroupHeading>File</Menu.GroupHeading>
			<Menu.Item onclick={record('New')}>New</Menu.Item>
			<Menu.Item onclick={record('Open')}>Open</Menu.Item>
		</Menu.Group>
		<Menu.Separator />
		<Menu.Sub>
			<Menu.SubTrigger>Export</Menu.SubTrigger>
			<Menu.SubContent>
				<Menu.Item onclick={record('PDF')}>PDF</Menu.Item>
				<Menu.Item onclick={record('PNG')}>PNG</Menu.Item>
				<Menu.Item onclick={record('Markdown')}>Markdown</Menu.Item>
			</Menu.SubContent>
		</Menu.Sub>
	</Menu.Content>
</Menu>
<span data-testid="log">{log.join(',')}</span>
