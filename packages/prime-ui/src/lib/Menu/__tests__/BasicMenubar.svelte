<script lang="ts">
	import { Menubar } from '../menubar.ts';

	let log = $state<string[]>([]);
	let showGrid = $state(false);

	const record = (name: string) => () => {
		log.push(name);
	};
</script>

<Menubar aria-label="Application">
	<Menubar.Menu>
		<Menubar.Trigger>File</Menubar.Trigger>
		<Menubar.Content aria-label="File">
			<Menubar.Item onclick={record('New')}>
				New
				<Menubar.Shortcut>⌘N</Menubar.Shortcut>
			</Menubar.Item>
			<Menubar.Item onclick={record('Open')}>Open</Menubar.Item>
			<Menubar.Separator />
			<Menubar.Sub>
				<Menubar.SubTrigger>Export</Menubar.SubTrigger>
				<Menubar.SubContent>
					<Menubar.Item onclick={record('PDF')}>PDF</Menubar.Item>
					<Menubar.Item onclick={record('PNG')}>PNG</Menubar.Item>
				</Menubar.SubContent>
			</Menubar.Sub>
		</Menubar.Content>
	</Menubar.Menu>
	<Menubar.Menu>
		<Menubar.Trigger>Edit</Menubar.Trigger>
		<Menubar.Content aria-label="Edit">
			<Menubar.Item onclick={record('Undo')}>Undo</Menubar.Item>
			<Menubar.Item onclick={record('Redo')}>Redo</Menubar.Item>
		</Menubar.Content>
	</Menubar.Menu>
	<Menubar.Menu>
		<Menubar.Trigger>View</Menubar.Trigger>
		<Menubar.Content aria-label="View">
			<Menubar.CheckboxItem bind:checked={showGrid}>Grid</Menubar.CheckboxItem>
			<Menubar.Item onclick={record('Zoom')}>Zoom</Menubar.Item>
		</Menubar.Content>
	</Menubar.Menu>
</Menubar>
<span data-testid="log">{log.join(',')}</span>
<span data-testid="grid">{showGrid}</span>
<input aria-label="Outside" />
