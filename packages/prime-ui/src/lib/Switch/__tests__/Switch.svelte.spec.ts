import { afterEach, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { userEvent } from 'vitest/browser';

import { backgroundColor, colorOf } from '../../../../test/computed-style.ts';
import { emulateReducedMotion } from '../../../../test/reduced-motion.ts';
import Switch from '../Switch.svelte';
import BoundSwitch from './fixtures/BoundSwitch.svelte';
import ControlledSwitch from './fixtures/ControlledSwitch.svelte';
import UndefinedSwitch from './fixtures/UndefinedSwitch.svelte';

const toggle = (container: Element) =>
	container.querySelector<HTMLButtonElement>('[role="switch"]')!;
const thumb = (container: Element) => toggle(container).firstElementChild!;
const owner = (container: Element) => container.querySelector('[data-testid="owner"]')?.textContent;

afterEach(() => emulateReducedMotion('no-preference'));

describe('Switch', () => {
	it('slides the thumb with a transition', () => {
		const { container } = render(Switch);

		expect(parseFloat(getComputedStyle(thumb(container)).transitionDuration)).toBeGreaterThan(0);
	});

	it('holds the thumb still under prefers-reduced-motion', async () => {
		await emulateReducedMotion('reduce');

		const { container } = render(Switch);

		expect(parseFloat(getComputedStyle(thumb(container)).transitionDuration)).toBe(0);
	});

	it('renders an off, valid switch by default', () => {
		const { container } = render(Switch);

		expect(toggle(container).getAttribute('aria-checked')).toBe('false');
		expect(toggle(container).getAttribute('aria-invalid')).toBeNull();
	});

	it('disables the button when disabled', () => {
		const { container } = render(Switch, { props: { disabled: true } });

		expect(toggle(container).disabled, 'native disabled attribute').toBe(true);
	});

	it('wears the shared focus ring', () => {
		const { container } = render(Switch);

		expect(toggle(container).classList.contains('focus-ring'), 'focus-ring utility').toBe(true);
	});

	it('is invalid in the error state', () => {
		const { container } = render(Switch, { props: { state: 'error' } });

		expect(toggle(container).getAttribute('aria-invalid')).toBe('true');
	});

	it.each([
		{ props: {}, color: 'bg-gray-6' },
		{ props: { checked: true }, color: 'bg-gray-9' },
		{ props: { state: 'error' }, color: 'bg-danger-light' },
		{ props: { checked: true, state: 'error' }, color: 'bg-danger-dark' },
		{ props: { disabled: true }, color: 'bg-disabled-light' },
		{ props: { checked: true, disabled: true }, color: 'bg-disabled-dark' },
		{ props: { disabled: true, state: 'error' }, color: 'bg-disabled-light' }
	] as const)('paints the track $color for $props', ({ props, color }) => {
		const { container } = render(Switch, { props });

		expect(backgroundColor(toggle(container))).toBe(colorOf(color, 'backgroundColor'));
	});

	it.each([
		{ tone: 'switch-info', color: 'bg-info-dark' },
		{ tone: 'switch-success', color: 'bg-success-dark' },
		{ tone: 'switch-warning', color: 'bg-warning-dark' },
		{ tone: 'switch-danger', color: 'bg-danger-dark' }
	] as const)('paints the on track in $color under $tone', ({ tone, color }) => {
		const { container } = render(Switch, { props: { checked: true, class: tone } });

		expect(backgroundColor(toggle(container))).toBe(colorOf(color, 'backgroundColor'));
	});

	it('keeps the off track gray under a tone class', () => {
		const { container } = render(Switch, { props: { class: 'switch-success' } });

		expect(backgroundColor(toggle(container))).toBe(colorOf('bg-gray-6', 'backgroundColor'));
	});

	it('paints the error track over a tone class while on', () => {
		const { container } = render(Switch, {
			props: { checked: true, state: 'error', class: 'switch-success' }
		});

		expect(backgroundColor(toggle(container))).toBe(colorOf('bg-danger-dark', 'backgroundColor'));
	});

	it.each([
		{ checked: false, offset: 2 },
		{ checked: true, offset: 18 }
	])('sits the thumb $offset px into the track when checked is $checked', ({ checked, offset }) => {
		const { container } = render(Switch, { props: { checked } });

		expect(
			thumb(container).getBoundingClientRect().left - toggle(container).getBoundingClientRect().left
		).toBe(offset);
	});

	it('renders a hidden form input carrying name and value when given a name', () => {
		const { container } = render(Switch, {
			props: { name: 'notify', value: 'yes', checked: true }
		});

		const hidden = container.querySelector<HTMLInputElement>('input[name="notify"]')!;
		expect(hidden.value).toBe('yes');
	});

	it('forwards onclick, onfocus, and onblur to the button', async () => {
		const onclick = vi.fn();
		const onfocus = vi.fn();
		const onblur = vi.fn();
		const { container } = render(Switch, { props: { onclick, onfocus, onblur } });

		await userEvent.click(toggle(container));
		await userEvent.click(document.body);

		expect(onclick).toHaveBeenCalledTimes(1);
		expect(onfocus).toHaveBeenCalledTimes(1);
		expect(onblur).toHaveBeenCalledTimes(1);
	});

	it('two-way: bind:checked keeps the owner in sync', async () => {
		const { container } = render(BoundSwitch);

		await userEvent.click(toggle(container));

		expect(toggle(container).getAttribute('aria-checked')).toBe('true');
		expect(owner(container)).toBe('true');
	});

	it('two-way: renders off from undefined state and writes a boolean back', async () => {
		const { container } = render(UndefinedSwitch);
		expect(toggle(container).getAttribute('aria-checked')).toBe('false');
		expect(owner(container)).toBe('undefined');

		await userEvent.click(toggle(container));

		expect(owner(container)).toBe('true');
	});

	it.each([
		{ accept: true, result: 'true' },
		{ accept: false, result: 'false' }
	])(
		'controlled: a function-binding setter with accept=$accept leaves the owner $result',
		async ({ accept, result }) => {
			const { container } = render(ControlledSwitch, { props: { accept } });

			await userEvent.click(toggle(container));

			expect(toggle(container).getAttribute('aria-checked')).toBe(result);
			expect(owner(container)).toBe(result);
		}
	);
});
