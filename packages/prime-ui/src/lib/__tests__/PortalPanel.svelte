<script lang="ts" module>
	export const PANEL_KINDS = [
		'dialog',
		'takeover',
		'popover',
		'tooltip',
		'menu',
		'context-menu',
		'menubar',
		'select',
		'date-picker'
	] as const;

	export type PanelKind = (typeof PANEL_KINDS)[number];
</script>

<script lang="ts">
	import type { PortalTarget } from '../portal.ts';

	import { DatePicker } from '../DatePicker/date-picker.ts';
	import { Dialog } from '../Dialog/dialog.ts';
	import { ContextMenu } from '../Menu/context-menu.ts';
	import { Menu } from '../Menu/menu.ts';
	import { Menubar } from '../Menu/menubar.ts';
	import { Popover } from '../Popover/popover.ts';
	import { Select } from '../Select/select.ts';
	import { Takeover } from '../Takeover/takeover.ts';
	import { Tooltip } from '../Tooltip/tooltip.ts';

	const { kind, portal }: { kind: PanelKind; portal?: PortalTarget } = $props();

	const items = [{ value: 'sm', label: 'Small' }];

	let open = $state(true);
	let value = $state('sm');
</script>

<div data-testid="host" style="padding: 120px">
	{#if kind === 'dialog'}
		<Dialog bind:open>
			<Dialog.Content {portal} data-testid="panel">
				<Dialog.Title>Rename</Dialog.Title>
			</Dialog.Content>
		</Dialog>
	{:else if kind === 'takeover'}
		<Takeover bind:open>
			<Takeover.Content {portal} data-testid="panel">
				<Takeover.Title>Settings</Takeover.Title>
			</Takeover.Content>
		</Takeover>
	{:else if kind === 'popover'}
		<Popover bind:open>
			<Popover.Trigger class="button">Open</Popover.Trigger>
			<Popover.Content {portal} aria-label="Details" data-testid="panel">Details</Popover.Content>
		</Popover>
	{:else if kind === 'tooltip'}
		<Tooltip bind:open>
			<Tooltip.Trigger>
				<button type="button">Copy</button>
			</Tooltip.Trigger>
			<Tooltip.Content {portal} data-testid="panel">Copy to clipboard</Tooltip.Content>
		</Tooltip>
	{:else if kind === 'menu'}
		<Menu bind:open>
			<Menu.Trigger class="button">Open</Menu.Trigger>
			<Menu.Content {portal} aria-label="Actions" data-testid="panel">
				<Menu.Item>New</Menu.Item>
			</Menu.Content>
		</Menu>
	{:else if kind === 'context-menu'}
		<ContextMenu>
			<ContextMenu.Trigger>
				<div data-testid="opener" style="width: 100px; height: 100px">Area</div>
			</ContextMenu.Trigger>
			<ContextMenu.Content {portal} aria-label="Actions" data-testid="panel">
				<ContextMenu.Item>Copy</ContextMenu.Item>
			</ContextMenu.Content>
		</ContextMenu>
	{:else if kind === 'menubar'}
		<Menubar aria-label="Application">
			<Menubar.Menu>
				<Menubar.Trigger data-testid="opener">File</Menubar.Trigger>
				<Menubar.Content {portal} aria-label="File" data-testid="panel">
					<Menubar.Item>New</Menubar.Item>
				</Menubar.Content>
			</Menubar.Menu>
		</Menubar>
	{:else if kind === 'select'}
		<Select {items} bind:value>
			<Select.Trigger data-testid="opener">
				<Select.Value placeholder="Pick a size" />
			</Select.Trigger>
			<Select.Content {portal} data-testid="panel">
				<Select.Viewport>
					<Select.Item value="sm" label="Small" />
				</Select.Viewport>
			</Select.Content>
		</Select>
	{:else}
		<DatePicker bind:open>
			<DatePicker.Field>
				<DatePicker.Trigger />
			</DatePicker.Field>
			<DatePicker.Content {portal} data-testid="panel">
				<DatePicker.Calendar />
			</DatePicker.Content>
		</DatePicker>
	{/if}
</div>
<div data-testid="target"></div>
