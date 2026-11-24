import { createRawSnippet } from 'svelte';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page, userEvent } from 'vitest/browser';

import { borderColor, colorOf } from '../../../../test/computed-style.ts';
import FileInput from '../FileInput.svelte';
import BoundFileInput from './fixtures/BoundFileInput.svelte';
import ControlledFileInput from './fixtures/ControlledFileInput.svelte';
import FormFileInput from './fixtures/FormFileInput.svelte';
import UndefinedFileInput from './fixtures/UndefinedFileInput.svelte';

const input = (container: Element) => container.querySelector('input')!;
const frame = (container: Element) => container.querySelector('div')!;
const shown = (container: Element) => frame(container).querySelector('span:not([aria-hidden])')!;
const promptOf = (container: Element) =>
	frame(container).querySelector(':scope > span[aria-hidden="true"]')!;
const owner = (container: Element) => container.querySelector('[data-testid="owner"]')?.textContent;

const audio = (name: string) => new File(['audio'], name, { type: 'audio/wav' });

const LONG_NAME = `${'a-very-long-recording-name-'.repeat(8)}.wav`;

const afterPendingTimers = () => new Promise((resolve) => setTimeout(resolve));

describe('FileInput', () => {
	it('takes its width from a consumer class on the frame', () => {
		const { container } = render(FileInput, { props: { 'aria-label': 'Upload', class: 'w-64' } });

		expect(frame(container).getBoundingClientRect().width).toBe(256);
	});

	it('rings the frame through focus-ring-within while the native input has focus', async () => {
		const { container } = render(FileInput, { props: { 'aria-label': 'Upload', class: 'w-40' } });
		expect(getComputedStyle(frame(container)).outlineWidth, 'no ring before focus').not.toBe('2px');

		await userEvent.click(container);
		expect(document.activeElement, 'clicking beside the frame leaves the input unfocused').not.toBe(
			input(container)
		);

		await userEvent.tab();

		expect(document.activeElement, 'Tab lands on the native input').toBe(input(container));
		expect(getComputedStyle(frame(container)).outlineWidth, 'the frame is ringed').toBe('2px');
	});

	it.each([
		{ multiple: false, prompt: 'Choose file' },
		{ multiple: true, prompt: 'Choose files' }
	])('multiple $multiple prompts $prompt', ({ multiple, prompt }) => {
		const { container } = render(FileInput, { props: { 'aria-label': 'Upload', multiple } });

		expect(promptOf(container).textContent.trim()).toBe(prompt);
	});

	it('renders children in place of the default prompt', () => {
		const { container } = render(FileInput, {
			props: {
				'aria-label': 'Upload',
				children: createRawSnippet(() => ({ render: () => '<span>Browse</span>' }))
			}
		});

		expect(promptOf(container).textContent.trim()).toBe('Browse');
	});

	it('shows the placeholder while no file is chosen, and no clear button', async () => {
		render(FileInput, { props: { 'aria-label': 'Upload', placeholder: 'Nothing yet' } });

		await expect.element(page.getByText('Nothing yet')).toBeInTheDocument();
		expect(page.getByRole('button', { name: 'Clear selection' }).query()).toBeNull();
	});

	it('forwards accept, multiple, name, and required to the native file input', () => {
		const { container } = render(FileInput, {
			props: {
				'aria-label': 'Upload',
				accept: '.wav,.mp3',
				multiple: true,
				name: 'clip',
				required: true
			}
		});

		expect(input(container).type).toBe('file');
		expect(input(container).accept).toBe('.wav,.mp3');
		expect(input(container).multiple, 'native multiple attribute').toBe(true);
		expect(input(container).name).toBe('clip');
		expect(input(container).required, 'native required attribute').toBe(true);
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

	it('the clear button empties the binding and the native input', async () => {
		const { container } = render(BoundFileInput);
		await userEvent.upload(input(container), audio('greeting.wav'));

		await page.getByRole('button', { name: 'Clear selection' }).click();

		expect(owner(container)).toBe('');
		expect(input(container).files).toHaveLength(0);
		await expect.element(page.getByText('No file chosen')).toBeInTheDocument();
	});

	it('clearing moves focus to the native input before the clear button unmounts', async () => {
		const { container } = render(BoundFileInput);
		await userEvent.upload(input(container), audio('greeting.wav'));

		await page.getByRole('button', { name: 'Clear selection' }).click();

		expect(document.activeElement).toBe(input(container));
	});

	it('an empty value written from outside empties the native input', async () => {
		const { container } = render(BoundFileInput);
		await userEvent.upload(input(container), audio('greeting.wav'));

		await page.getByRole('button', { name: 'Reset' }).click();

		await expect.poll(() => input(container).files).toHaveLength(0);
		await expect.element(page.getByText('No file chosen')).toBeInTheDocument();
	});

	it.each([
		{ reset: 'a form reset', cancelReset: false, outcome: 'empties', bound: '', held: 0 },
		{
			reset: 'a canceled form reset',
			cancelReset: true,
			outcome: 'keeps',
			bound: 'greeting.wav',
			held: 1
		}
	])('$reset $outcome the binding and the native input', async ({ cancelReset, bound, held }) => {
		const { container } = render(FormFileInput, { props: { cancelReset } });
		await userEvent.upload(input(container), audio('greeting.wav'));

		await page.getByRole('button', { name: 'Reset form' }).click();
		await afterPendingTimers();

		expect(owner(container)).toBe(bound);
		expect(input(container).files).toHaveLength(held);
	});

	it('writes nothing to the binding when a form reset unmounts it', async () => {
		const { container } = render(FormFileInput, { props: { unmountOnReset: true } });
		await userEvent.upload(input(container), audio('greeting.wav'));

		await page.getByRole('button', { name: 'Reset form' }).click();
		await afterPendingTimers();

		expect(container.querySelector('input[type="file"]'), 'unmounted by the reset').toBeNull();
		expect(owner(container)).toBe('greeting.wav');
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
		{ mode: 'accepts', accept: true, bound: 'greeting.wav', held: 1 },
		{ mode: 'vetoes', accept: false, bound: '', held: 0 }
	])(
		'controlled: a function-binding setter $mode the choice and leaves $held file in the native input',
		async ({ accept, bound, held }) => {
			const { container } = render(ControlledFileInput, { props: { accept } });

			await userEvent.upload(input(container), audio('greeting.wav'));

			expect(owner(container)).toBe(bound);
			expect(input(container).files).toHaveLength(held);
		}
	);
});
