import { render } from 'svelte/server';
import { describe, expect, it } from 'vitest';

import {
	FileField,
	Folder,
	NumberField,
	Panel,
	Point,
	Select,
	Slider,
	TextField,
	ToggleButtons
} from '../index.ts';
import TabsSsr from './fixtures/TabsSsr.svelte';

const items = [
	{ value: 'move', label: 'Move' },
	{ value: 'rotate', label: 'Rotate' }
];

const rows: { name: string; text: string; html: () => string }[] = [
	{
		name: 'FileField',
		text: 'Upload',
		html: () => render(FileField, { props: { label: 'Upload' } }).body
	},
	{
		name: 'Folder',
		text: 'Lighting',
		html: () => render(Folder, { props: { title: 'Lighting' } }).body
	},
	{
		name: 'NumberField',
		text: 'Speed',
		html: () => render(NumberField, { props: { label: 'Speed', value: 1 } }).body
	},
	{
		name: 'Panel',
		text: 'Camera',
		html: () => render(Panel, { props: { title: 'Camera' } }).body
	},
	{
		name: 'Point',
		text: 'Position',
		html: () => render(Point, { props: { label: 'Position', value: { x: 1, y: 2 } } }).body
	},
	{
		name: 'Select',
		text: 'Pick a mode',
		html: () =>
			render(Select, { props: { items, 'aria-label': 'Mode', placeholder: 'Pick a mode' } }).body
	},
	{
		name: 'Slider',
		text: 'Opacity',
		html: () => render(Slider, { props: { label: 'Opacity', value: 50 } }).body
	},
	{ name: 'Tabs', text: 'Move controls', html: () => render(TabsSsr).body },
	{
		name: 'TextField',
		text: 'Motion name',
		html: () => render(TextField, { props: { label: 'Motion name' } }).body
	},
	{
		name: 'ToggleButtons',
		text: 'Rotate',
		html: () => render(ToggleButtons, { props: { items, label: 'Mode', value: 'move' } }).body
	}
];

describe('exports', () => {
	it.each(rows)('server-renders $name with its label', ({ html, text }) => {
		expect(html()).toContain(text);
	});
});
