import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page, userEvent } from 'vitest/browser';

import { borderColor, colorOf } from '../../__tests__/computed-style.ts';
import FileInput from '../FileInput.svelte';
import BoundFileInput from './BoundFileInput.svelte';
import ControlledFileInput from './ControlledFileInput.svelte';
import FormFileInput from './FormFileInput.svelte';
import UndefinedFileInput from './UndefinedFileInput.svelte';

const input = (container: Element) => container.querySelector('input')!;
const frame = (container: Element) => container.querySelector('div')!;
const shown = (container: Element) => frame(container).querySelector('span:not([aria-hidden])')!;
const owner = (container: Element) => container.querySelector('[data-testid="owner"]')?.textContent;

const audio = (name: string) => new File(['audio'], name, { type: 'audio/wav' });

const LONG_NAME = `${'a-very-long-recording-name-'.repeat(8)}.wav`;

describe('FileInput', () => {
	it('renders a native file input inside the frame that takes the class', () => {
		const { container } = render(FileInput, { props: { 'aria-label': 'Upload', class: 'w-64' } });

		expect(input(container).type).toBe('file');
		expect(frame(container).classList.contains('w-64'), 'consumer class lands on the frame').toBe(
			true
		);
		expect(frame(container).classList.contains('input'), 'wears the shared frame').toBe(true);
		expect(
			frame(container).classList.contains('focus-ring-within'),
			'rings when the input has focus'
		).toBe(true);
	});

	it('shows the placeholder while no file is chosen, and no clear button', async () => {
		render(FileInput, { props: { 'aria-label': 'Upload', placeholder: 'Nothing yet' } });

		await expect.element(page.getByText('Nothing yet')).toBeInTheDocument();
		expect(page.getByRole('button', { name: 'Clear selection' }).query()).toBeNull();
	});

	it('forwards accept, multiple, and name to the native input', () => {
		const { container } = render(FileInput, {
			props: { 'aria-label': 'Upload', accept: '.wav,.mp3', multiple: true, name: 'clip' }
		});

		expect(input(container).accept).toBe('.wav,.mp3');
		expect(input(container).multiple).toBe(true);
		expect(input(container).name).toBe('clip');
	});

	it.each([
		{ state: 'error', dataState: 'error', invalid: 'true', border: 'border-danger-dark' },
		{ state: 'warn', dataState: 'warn', invalid: null, border: 'border-warning-dark' }
	] as const)(
		'state $state sets aria-invalid $invalid on the input and paints the frame $border',
		({ state, dataState, invalid, border }) => {
			const { container } = render(FileInput, { props: { 'aria-label': 'Upload', state } });

			expect(input(container).getAttribute('data-field-state')).toBe(dataState);
			expect(input(container).getAttribute('aria-invalid')).toBe(invalid);
			expect(borderColor(frame(container))).toBe(colorOf(border, 'borderTopColor'));
		}
	);

	it('two-way: choosing a file binds it to the owner and shows its name', async () => {
		const { container } = render(BoundFileInput);

		await userEvent.upload(input(container), audio('greeting.wav'));

		expect(owner(container)).toBe('greeting.wav');
		expect(shown(container).textContent.trim()).toBe('greeting.wav');
	});

	it('two-way: several files bind in order and show every name', async () => {
		const { container } = render(BoundFileInput, { props: { multiple: true } });

		await userEvent.upload(input(container), [audio('one.wav'), audio('two.wav')]);

		expect(owner(container)).toBe('one.wav|two.wav');
		expect(shown(container).textContent.trim()).toBe('one.wav, two.wav');
	});

	it('the clear button empties the binding and the native input, and focuses the input', async () => {
		const { container } = render(BoundFileInput);
		await userEvent.upload(input(container), audio('greeting.wav'));

		await page.getByRole('button', { name: 'Clear selection' }).click();

		expect(owner(container)).toBe('');
		expect(input(container).files).toHaveLength(0);
		expect(document.activeElement).toBe(input(container));
		await expect.element(page.getByText('No file chosen')).toBeInTheDocument();
	});

	it('an empty value written from outside empties the native input', async () => {
		const { container } = render(BoundFileInput);
		await userEvent.upload(input(container), audio('greeting.wav'));

		await page.getByRole('button', { name: 'Reset' }).click();

		await expect.poll(() => input(container).files).toHaveLength(0);
		await expect.element(page.getByText('No file chosen')).toBeInTheDocument();
	});

	it('a form reset empties the binding along with the native input', async () => {
		const { container } = render(FormFileInput);
		await userEvent.upload(input(container), audio('greeting.wav'));

		await page.getByRole('button', { name: 'Reset form' }).click();

		await expect.poll(() => owner(container)).toBe('');
		expect(input(container).files).toHaveLength(0);
		await expect.element(page.getByText('No file chosen')).toBeInTheDocument();
	});

	it('truncates a long name inside a narrow frame', async () => {
		const { container } = render(BoundFileInput, { props: { class: 'w-40' } });

		await userEvent.upload(input(container), audio(LONG_NAME));

		expect(shown(container).textContent.trim()).toBe(LONG_NAME);
		expect(frame(container).getBoundingClientRect().width, 'the frame keeps its width').toBe(160);
		expect(frame(container).scrollWidth).toBeLessThanOrEqual(frame(container).clientWidth);
		expect(shown(container).scrollWidth, 'the name is cut short').toBeGreaterThan(
			shown(container).clientWidth
		);
	});

	it('disables the native input and the clear button', async () => {
		const { container } = render(FileInput, {
			props: { 'aria-label': 'Upload', disabled: true, value: [audio('greeting.wav')] }
		});

		expect(input(container).disabled, 'native disabled attribute').toBe(true);
		await expect.element(page.getByRole('button', { name: 'Clear selection' })).toBeDisabled();
	});

	it('starts from an undefined binding without throwing, then binds the choice', async () => {
		const { container } = render(UndefinedFileInput);

		await userEvent.upload(input(container), audio('greeting.wav'));

		expect(owner(container)).toBe('["greeting.wav"]');
	});

	it.each([
		{ accept: true, bound: 'greeting.wav', held: 1 },
		{ accept: false, bound: '', held: 0 }
	])(
		'controlled: a setter with accept $accept leaves $held file in the native input',
		async ({ accept, bound, held }) => {
			const { container } = render(ControlledFileInput, { props: { accept } });

			await userEvent.upload(input(container), audio('greeting.wav'));

			expect(owner(container)).toBe(bound);
			expect(input(container).files).toHaveLength(held);
		}
	);
});
