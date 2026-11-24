import { mdiAlert } from '@mdi/js';
import { createRawSnippet } from 'svelte';
import { render } from 'svelte/server';
import { describe, expect, it } from 'vitest';

import {
	Checkbox,
	CodeSnippet,
	FileInput,
	Hint,
	Icon,
	Label,
	NumberInput,
	Progress,
	StatusDot,
	Switch,
	Textarea
} from '../index.ts';
import SsrBanner from './fixtures/SsrBanner.svelte';
import SsrBreadcrumbs from './fixtures/SsrBreadcrumbs.svelte';
import SsrCollapsible from './fixtures/SsrCollapsible.svelte';
import SsrCombobox from './fixtures/SsrCombobox.svelte';
import SsrContextMenu from './fixtures/SsrContextMenu.svelte';
import SsrDatePicker from './fixtures/SsrDatePicker.svelte';
import SsrDateRangePicker from './fixtures/SsrDateRangePicker.svelte';
import SsrDialog from './fixtures/SsrDialog.svelte';
import SsrField from './fixtures/SsrField.svelte';
import SsrInput from './fixtures/SsrInput.svelte';
import SsrMenu from './fixtures/SsrMenu.svelte';
import SsrMenubar from './fixtures/SsrMenubar.svelte';
import SsrMultiSelect from './fixtures/SsrMultiSelect.svelte';
import SsrNotify from './fixtures/SsrNotify.svelte';
import SsrPopover from './fixtures/SsrPopover.svelte';
import SsrRadioGroup from './fixtures/SsrRadioGroup.svelte';
import SsrSelect from './fixtures/SsrSelect.svelte';
import SsrTabs from './fixtures/SsrTabs.svelte';
import SsrTakeover from './fixtures/SsrTakeover.svelte';
import SsrToast from './fixtures/SsrToast.svelte';
import SsrToggleButtons from './fixtures/SsrToggleButtons.svelte';
import SsrTooltip from './fixtures/SsrTooltip.svelte';

const text = (content: string) =>
	createRawSnippet(() => ({ render: () => `<span>${content}</span>` }));

const rows: { name: string; expected: string; html: () => string }[] = [
	{
		name: 'Checkbox',
		expected: 'aria-label="Accept"',
		html: () => render(Checkbox, { props: { 'aria-label': 'Accept', checked: true } }).body
	},
	{
		name: 'CodeSnippet',
		expected: '>install<',
		html: () => render(CodeSnippet, { props: { code: 'pnpm install', language: 'bash' } }).body
	},
	{
		name: 'FileInput',
		expected: 'type="file"',
		html: () => render(FileInput, { props: { 'aria-label': 'Upload' } }).body
	},
	{
		name: 'Hint',
		expected: 'Helpful text',
		html: () => render(Hint, { props: { children: text('Helpful text') } }).body
	},
	{
		name: 'Icon',
		expected: '<svg',
		html: () => render(Icon, { props: { icon: mdiAlert } }).body
	},
	{
		name: 'Label',
		expected: 'Email',
		html: () => render(Label, { props: { children: text('Email') } }).body
	},
	{
		name: 'NumberInput',
		expected: 'type="number"',
		html: () => render(NumberInput, { props: { 'aria-label': 'Quantity', value: 3 } }).body
	},
	{
		name: 'Progress',
		expected: '<div',
		html: () => render(Progress, { props: { 'aria-label': 'Download', value: 40 } }).body
	},
	{
		name: 'StatusDot',
		expected: '<span',
		html: () => render(StatusDot, { props: { 'aria-label': 'Online', state: 'success' } }).body
	},
	{
		name: 'Switch',
		expected: 'aria-label="Enabled"',
		html: () => render(Switch, { props: { 'aria-label': 'Enabled', checked: true } }).body
	},
	{
		name: 'Textarea',
		expected: '<textarea',
		html: () => render(Textarea, { props: { 'aria-label': 'Notes', value: 'Hello' } }).body
	},
	{ name: 'Banner', expected: 'Update available', html: () => render(SsrBanner).body },
	{ name: 'Breadcrumbs', expected: 'Settings', html: () => render(SsrBreadcrumbs).body },
	{ name: 'Collapsible', expected: 'Advanced settings', html: () => render(SsrCollapsible).body },
	{ name: 'Combobox', expected: 'aria-label="Mode"', html: () => render(SsrCombobox).body },
	{ name: 'ContextMenu', expected: 'Right click here', html: () => render(SsrContextMenu).body },
	{ name: 'DatePicker', expected: 'Start date', html: () => render(SsrDatePicker).body },
	{ name: 'DateRangePicker', expected: 'Dates', html: () => render(SsrDateRangePicker).body },
	{ name: 'Dialog', expected: 'Open dialog', html: () => render(SsrDialog).body },
	{ name: 'Field', expected: 'Email', html: () => render(SsrField).body },
	{ name: 'Input', expected: 'aria-label="Search"', html: () => render(SsrInput).body },
	{ name: 'Menu', expected: 'Open menu', html: () => render(SsrMenu).body },
	{ name: 'Menubar', expected: 'File', html: () => render(SsrMenubar).body },
	{ name: 'MultiSelect', expected: 'aria-label="Modes"', html: () => render(SsrMultiSelect).body },
	{ name: 'Notify', expected: 'Alerts', html: () => render(SsrNotify).body },
	{ name: 'Popover', expected: 'Open popover', html: () => render(SsrPopover).body },
	{ name: 'RadioGroup', expected: 'Rotate', html: () => render(SsrRadioGroup).body },
	{ name: 'Select', expected: 'aria-label="Mode"', html: () => render(SsrSelect).body },
	{ name: 'Tabs', expected: 'Move content', html: () => render(SsrTabs).body },
	{ name: 'Takeover', expected: 'Open takeover', html: () => render(SsrTakeover).body },
	{ name: 'Toast', expected: 'Messages', html: () => render(SsrToast).body },
	{ name: 'ToggleButtons', expected: 'Rotate', html: () => render(SsrToggleButtons).body },
	{ name: 'Tooltip', expected: 'Hover me', html: () => render(SsrTooltip).body }
];

describe('exports', () => {
	it.each(rows)('server-renders $name', ({ html, expected }) => {
		expect(html()).toContain(expected);
	});
});
