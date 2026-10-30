import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { userEvent } from 'vitest/browser';

import '../../__tests__/tailwind.css';
import BoundCollapsible from './BoundCollapsible.svelte';
import ControlledCollapsible from './ControlledCollapsible.svelte';
import IndicatorCollapsible from './IndicatorCollapsible.svelte';
import UndefinedCollapsible from './UndefinedCollapsible.svelte';

const trigger = (container: Element) =>
	container.querySelector<HTMLButtonElement>('[aria-expanded]')!;
const owner = (container: Element) => container.querySelector('[data-testid="owner"]')?.textContent;
const region = () =>
	[...document.querySelectorAll('p')].find((p) => p.textContent === 'More settings') ?? null;
const chevron = (container: Element) => trigger(container).querySelector('svg')!;

describe('Collapsible', () => {
	it('is closed by default', () => {
		const { container } = render(BoundCollapsible);

		expect(trigger(container).getAttribute('aria-expanded')).toBe('false');
		expect(region()).toBeNull();
	});

	it('opens on click and links the trigger to the content', async () => {
		const { container } = render(BoundCollapsible);

		await userEvent.click(trigger(container));

		await vi.waitFor(() => expect(region()).toBeTruthy());
		expect(trigger(container).getAttribute('aria-expanded')).toBe('true');
		const controls = trigger(container).getAttribute('aria-controls')!;
		expect(document.getElementById(controls)?.contains(region())).toBe(true);
	});

	it('renders the consumer title and subtitle in the trigger', () => {
		const { container } = render(BoundCollapsible);

		expect(trigger(container).textContent).toContain('Advanced');
		expect(trigger(container).textContent).toContain('Extra settings');
	});

	it('two-way: clicks write to the owner and the owner opens it', async () => {
		const { container } = render(BoundCollapsible);

		await userEvent.click(trigger(container));
		await vi.waitFor(() => expect(owner(container)).toBe('true'));

		await userEvent.click(trigger(container));
		await vi.waitFor(() => expect(owner(container)).toBe('false'));

		const toggle = [...container.querySelectorAll('button')].find(
			(button) => button.textContent === 'Toggle owner'
		)!;
		await userEvent.click(toggle);
		await vi.waitFor(() => expect(region()).toBeTruthy());
	});

	it.each([
		{ accept: true, expected: 'true' },
		{ accept: false, expected: 'false' }
	])(
		'controlled: a setter with accept $accept leaves the owner $expected',
		async ({ accept, expected }) => {
			const { container } = render(ControlledCollapsible, { props: { accept } });

			await userEvent.click(trigger(container));

			await vi.waitFor(() => expect(owner(container)).toBe(expected));
			expect(trigger(container).getAttribute('aria-expanded')).toBe(expected);
		}
	);

	it('renders and opens from undefined state', async () => {
		const { container } = render(UndefinedCollapsible);
		expect(owner(container)).toBe('undefined');

		await userEvent.click(trigger(container));

		await vi.waitFor(() => expect(owner(container)).toBe('true'));
	});

	it('disabled disables the trigger', async () => {
		const { container } = render(BoundCollapsible, { props: { disabled: true } });

		expect(trigger(container).disabled).toBe(true);
		await userEvent.click(trigger(container), { force: true }).catch(() => {});
		expect(region()).toBeNull();
	});

	it('turns the default chevron when open', async () => {
		const { container } = render(BoundCollapsible);
		const closed = getComputedStyle(chevron(container)).rotate;

		await userEvent.click(trigger(container));

		await vi.waitFor(() => expect(getComputedStyle(chevron(container)).rotate).not.toBe(closed));
	});

	it('renders a custom indicator in place of the chevron with the live open state', async () => {
		const { container } = render(IndicatorCollapsible);
		const indicator = () => container.querySelector('[data-testid="indicator"]')!;

		expect(trigger(container).querySelector('svg')).toBeNull();
		expect(indicator().textContent).toBe('more');

		await userEvent.click(trigger(container));

		await vi.waitFor(() => expect(indicator().textContent).toBe('less'));
	});

	it.each(['{Enter}', ' '])('toggles with the %j key on the focused trigger', async (key) => {
		const { container } = render(BoundCollapsible);
		trigger(container).focus();

		await userEvent.keyboard(key);
		await vi.waitFor(() => expect(region()).toBeTruthy());

		await userEvent.keyboard(key);
		await vi.waitFor(() => expect(region()).toBeNull());
	});

	it('wears the shared focus ring on the trigger', () => {
		const { container } = render(BoundCollapsible);

		expect(trigger(container).classList.contains('focus-ring')).toBe(true);
	});
});
