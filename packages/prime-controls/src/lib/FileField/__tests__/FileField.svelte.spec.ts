import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page, userEvent } from 'vitest/browser';

import '../../../../test/tailwind.css';
import FileField from '../FileField.svelte';
import BoundFileField from './fixtures/BoundFileField.svelte';

const input = (container: Element) => container.querySelector('input')!;
const row = (container: Element) => container.querySelector('label')!.parentElement!;
const shown = (container: Element) =>
	input(container).parentElement!.querySelector('span:not([aria-hidden])')!;
const owner = (container: Element) => container.querySelector('[data-testid="owner"]')?.textContent;

const audio = (name: string) => new File(['audio'], name, { type: 'audio/wav' });

const HINT = 'A WAV or MP3 recording';
const LONG_NAME = `${'a-very-long-recording-name-'.repeat(8)}.wav`;
const PANE_WIDTH = 320;

describe('FileField', () => {
	it('names the native file input by its label', () => {
		const { container } = render(FileField, { props: { label: 'Audio file' } });

		expect(input(container).type).toBe('file');
		expect(input(container).labels?.[0]?.textContent.trim()).toBe('Audio file');
		expect(container.querySelector('label')).toHaveClass('text-subtle-1');
	});

	it('takes its accessible name from aria-label without a label', () => {
		const { container } = render(FileField, { props: { 'aria-label': 'Audio file' } });

		expect(input(container).getAttribute('aria-label')).toBe('Audio file');
		expect(container.querySelector('label')).toBeNull();
	});

	it('forwards accept and multiple to the native input', () => {
		const { container } = render(FileField, {
			props: { label: 'Audio file', accept: '.wav,.mp3', multiple: true }
		});

		expect(input(container).accept).toBe('.wav,.mp3');
		expect(input(container).multiple, 'multiple is forwarded').toBe(true);
	});

	it('writes the chosen file through the binding and shows its name', async () => {
		const { container } = render(BoundFileField, { props: { label: 'Audio file' } });

		await userEvent.upload(input(container), audio('greeting.wav'));

		expect(owner(container)).toBe('greeting.wav');
		expect(shown(container).textContent.trim()).toBe('greeting.wav');
	});

	it('writes several files in order and shows every name', async () => {
		const { container } = render(BoundFileField, {
			props: { label: 'Audio files', multiple: true }
		});

		await userEvent.upload(input(container), [audio('one.wav'), audio('two.wav')]);

		expect(owner(container)).toBe('one.wav|two.wav');
		expect(shown(container).textContent.trim()).toBe('one.wav, two.wav');
	});

	it('clears the binding, the native input, and the name from the clear button', async () => {
		const { container } = render(BoundFileField, { props: { label: 'Audio file' } });
		await userEvent.upload(input(container), audio('greeting.wav'));

		await page.getByRole('button', { name: 'Clear selection' }).click();

		expect(owner(container)).toBe('');
		expect(input(container).files).toHaveLength(0);
		expect(shown(container).textContent.trim()).toBe('No file chosen');
	});

	it('truncates a long name inside a 320 px pane', async () => {
		const { container } = render(BoundFileField, { props: { label: 'Audio file' } });

		await userEvent.upload(input(container), audio(LONG_NAME));

		expect(shown(container).textContent.trim()).toBe(LONG_NAME);
		expect(row(container).getBoundingClientRect().width).toBe(PANE_WIDTH);
		expect(row(container).scrollWidth).toBeLessThanOrEqual(PANE_WIDTH);
		expect(shown(container).scrollWidth, 'the name is cut short').toBeGreaterThan(
			shown(container).clientWidth
		);
	});

	it('names the clear button from clearLabel and shows the chosen name', async () => {
		const { container } = render(FileField, {
			props: {
				label: 'Audio file',
				placeholder: 'Pick audio',
				clearLabel: 'Remove audio',
				value: [audio('greeting.wav')]
			}
		});

		await expect.element(page.getByRole('button', { name: 'Remove audio' })).toBeInTheDocument();
		expect(shown(container).textContent.trim()).toBe('greeting.wav');
	});

	it('shows the custom placeholder while no file is chosen', () => {
		const { container } = render(FileField, {
			props: { label: 'Audio file', placeholder: 'Pick audio' }
		});

		expect(shown(container).textContent.trim()).toBe('Pick audio');
	});

	it('disables the native input and the clear button', async () => {
		const { container } = render(FileField, {
			props: { label: 'Audio file', disabled: true, value: [audio('greeting.wav')] }
		});

		expect(input(container).disabled, 'the native input is disabled').toBe(true);
		await expect.element(page.getByRole('button', { name: 'Clear selection' })).toBeDisabled();
	});
});

describe('FileField hint', () => {
	it('names an info button after the label and describes the input by the hint', async () => {
		const { container } = render(FileField, { props: { label: 'Audio file', hint: HINT } });

		await expect
			.element(page.getByRole('button', { name: 'About Audio file' }))
			.toBeInTheDocument();
		expect(input(container)).toHaveAccessibleDescription(HINT);
	});

	it('lists the consumer description before the hint', () => {
		const { container } = render(FileField, {
			props: { id: 'audio', label: 'Audio file', hint: HINT, 'aria-describedby': 'note' }
		});

		expect(input(container).getAttribute('aria-describedby')).toBe('note audio-hint');
	});

	it('passes the consumer description through when there is no hint', () => {
		const { container } = render(FileField, {
			props: { label: 'Audio file', 'aria-describedby': 'note' }
		});

		expect(input(container).getAttribute('aria-describedby')).toBe('note');
	});

	it('sets no aria-describedby without a description or a hint', () => {
		const { container } = render(FileField, { props: { label: 'Audio file' } });

		expect(input(container).hasAttribute('aria-describedby'), 'attribute present').toBe(false);
	});

	it('disables the hint button with the input', async () => {
		render(FileField, { props: { label: 'Audio file', hint: HINT, disabled: true } });

		await expect.element(page.getByRole('button', { name: 'About Audio file' })).toBeDisabled();
	});
});

describe('FileField state', () => {
	it('sets aria-invalid and data-field-state on an error', () => {
		const { container } = render(FileField, { props: { label: 'Audio file', state: 'error' } });

		expect(input(container).getAttribute('aria-invalid')).toBe('true');
		expect(input(container).getAttribute('data-field-state')).toBe('error');
	});

	it('marks a warn without aria-invalid', () => {
		const { container } = render(FileField, { props: { label: 'Audio file', state: 'warn' } });

		expect(input(container).getAttribute('aria-invalid')).toBeNull();
		expect(input(container).getAttribute('data-field-state')).toBe('warn');
	});

	it('marks an info without aria-invalid', () => {
		const { container } = render(FileField, { props: { label: 'Audio file', state: 'info' } });

		expect(input(container).getAttribute('aria-invalid')).toBeNull();
		expect(input(container).getAttribute('data-field-state')).toBe('info');
	});
});
