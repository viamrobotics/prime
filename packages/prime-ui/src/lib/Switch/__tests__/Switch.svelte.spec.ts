import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { userEvent } from 'vitest/browser';

import { backgroundColor } from '../../__tests__/computed-style.ts';
import Switch from '../Switch.svelte';
import BoundSwitch from './BoundSwitch.svelte';
import ControlledSwitch from './ControlledSwitch.svelte';
import UndefinedSwitch from './UndefinedSwitch.svelte';

const toggle = (container: Element) =>
	container.querySelector<HTMLButtonElement>('[role="switch"]')!;
const thumb = (container: Element) => toggle(container).firstElementChild!;
const owner = (container: Element) => container.querySelector('[data-testid="owner"]')?.textContent;

describe('Switch', () => {
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

	it('is invalid and recolors the track in the error state', () => {
		const normal = render(Switch);
		const normalTrack = backgroundColor(toggle(normal.container));
		const { container } = render(Switch, { props: { state: 'error' } });

		expect(toggle(container).getAttribute('aria-invalid')).toBe('true');
		expect(backgroundColor(toggle(container))).not.toBe(normalTrack);
	});

	it('paints a different track and moves the thumb when on', () => {
		const off = render(Switch);
		const on = render(Switch, { props: { checked: true } });

		expect(backgroundColor(toggle(on.container))).not.toBe(backgroundColor(toggle(off.container)));
		expect(getComputedStyle(thumb(on.container)).translate).not.toBe(
			getComputedStyle(thumb(off.container)).translate
		);
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
