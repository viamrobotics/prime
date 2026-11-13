import { CalendarDate, getLocalTimeZone, today } from '@internationalized/date';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { userEvent } from 'vitest/browser';

import { backgroundColor, borderColor, colorOf } from '../../__tests__/computed-style.ts';
import BoundDatePicker from './BoundDatePicker.svelte';
import ControlledDatePicker from './ControlledDatePicker.svelte';
import UndefinedDatePicker from './UndefinedDatePicker.svelte';

const dateField = (container: Element) => container.querySelector<HTMLElement>('[role="group"]')!;
const trigger = (container: Element) => container.querySelector('button')!;
const segment = (container: Element, part: string) =>
	container.querySelector<HTMLElement>(`[data-segment="${part}"]`)!;
const owner = (container: Element) => container.querySelector('[data-testid="owner"]')?.textContent;
const calendar = () => document.querySelector('[role="dialog"], [role="grid"]');

const dayOf = async (date: string) => {
	let day: HTMLElement | null = null;
	await vi.waitFor(() => {
		day = document.querySelector<HTMLElement>(`[data-bits-day][data-value="${date}"]`);
		expect(day, `the day ${date} is in the calendar`).toBeTruthy();
	});
	return day!;
};

afterEach(async () => {
	if (calendar()) await userEvent.keyboard('{Escape}');
});

describe('DatePicker', () => {
	it('shows the bound date in the segments', () => {
		const { container } = render(BoundDatePicker);

		expect(
			['month', 'day', 'year'].map((part) => segment(container, part).getAttribute('aria-valuenow'))
		).toEqual(['3', '10', '2026']);
	});

	it('wears the shared input frame and its focus ring', () => {
		const { container } = render(BoundDatePicker);

		expect(dateField(container).classList.contains('input'), 'input class').toBe(true);
		expect(dateField(container).classList.contains('focus-ring-within'), 'frame ring').toBe(true);
		expect(trigger(container).classList.contains('focus-ring'), 'trigger ring').toBe(true);
	});

	it('names the trigger by default', () => {
		const { container } = render(BoundDatePicker);

		expect(trigger(container).getAttribute('aria-label')).toBe('Open calendar');
	});

	it('gives the trigger a 24px target', () => {
		const { container } = render(BoundDatePicker);

		expect(getComputedStyle(trigger(container)).width).toBe('24px');
	});

	it('names the open calendar panel', async () => {
		const { container } = render(BoundDatePicker);

		await userEvent.click(trigger(container));

		await vi.waitFor(() =>
			expect(document.querySelector('[role="dialog"]')?.getAttribute('aria-label')).toBe(
				'Choose a date'
			)
		);
	});

	it('does not scroll the page when the calendar opens', async () => {
		document.body.style.paddingBlock = '150vh';
		try {
			const { container } = render(BoundDatePicker);
			trigger(container).scrollIntoView({ block: 'center' });
			const scrolledTo = window.scrollY;

			await userEvent.click(trigger(container));
			const selectedDay = await dayOf('2026-03-10');
			await vi.waitFor(() => expect(document.activeElement).toBe(selectedDay));

			expect(scrolledTo).toBeGreaterThan(0);
			expect(window.scrollY).toBe(scrolledTo);
		} finally {
			document.body.style.paddingBlock = '';
		}
	});

	it('renders a hidden form input carrying the ISO date when given a name', () => {
		const { container } = render(BoundDatePicker, { props: { name: 'start' } });

		expect(container.querySelector<HTMLInputElement>('input[name="start"]')?.value).toBe(
			'2026-03-10'
		);
	});

	it('two-way: clicking a day writes it to the owner and closes the calendar', async () => {
		const { container } = render(BoundDatePicker);

		await userEvent.click(trigger(container));
		await userEvent.click(await dayOf('2026-03-15'));

		await vi.waitFor(() => expect(owner(container)).toBe('2026-03-15'));
		await vi.waitFor(() => expect(calendar(), 'calendar closed').toBeNull());
		expect(segment(container, 'day').getAttribute('aria-valuenow')).toBe('15');
	});

	it('two-way: arrowing the calendar grid and pressing Enter selects the focused day', async () => {
		const { container } = render(BoundDatePicker);
		trigger(container).focus();

		await userEvent.keyboard('{Enter}');
		await vi.waitFor(async () => expect(document.activeElement).toBe(await dayOf('2026-03-10')));
		await userEvent.keyboard('{ArrowRight}{ArrowDown}{Enter}');

		await vi.waitFor(() => expect(owner(container)).toBe('2026-03-18'));
	});

	it('two-way: typing into the day segment writes the date', async () => {
		const { container } = render(BoundDatePicker);
		segment(container, 'day').focus();

		await userEvent.keyboard('24');

		await vi.waitFor(() => expect(owner(container)).toBe('2026-03-24'));
	});

	it('two-way: ArrowUp on the month segment steps the month', async () => {
		const { container } = render(BoundDatePicker);
		segment(container, 'month').focus();

		await userEvent.keyboard('{ArrowUp}');

		await vi.waitFor(() => expect(owner(container)).toBe('2026-04-10'));
	});

	it('keeps days before min out of reach', async () => {
		const { container } = render(BoundDatePicker, {
			props: { min: new CalendarDate(2026, 3, 8) }
		});

		await userEvent.click(trigger(container));
		const early = await dayOf('2026-03-05');
		await userEvent.click(early, { force: true });

		expect(early.getAttribute('aria-disabled')).toBe('true');
		expect(owner(container)).toBe('2026-03-10');
	});

	it('starts undefined without throwing and writes the picked day back', async () => {
		const { container } = render(UndefinedDatePicker);
		expect(owner(container)).toBe('undefined');
		const todayIso = today(getLocalTimeZone()).toString();

		await userEvent.click(trigger(container));
		await userEvent.click(await dayOf(todayIso));

		await vi.waitFor(() => expect(owner(container)).toBe(todayIso));
	});

	it.each([
		{ accept: true, expected: '2026-03-15', shownDay: '15' },
		{ accept: false, expected: '2026-03-10', shownDay: '10' }
	])(
		'controlled: accept=$accept leaves the owner at $expected',
		async ({ accept, expected, shownDay }) => {
			const { container } = render(ControlledDatePicker, { props: { accept } });

			await userEvent.click(trigger(container));
			await userEvent.click(await dayOf('2026-03-15'));

			await vi.waitFor(() => expect(owner(container)).toBe(expected));
			expect(segment(container, 'day').getAttribute('aria-valuenow')).toBe(shownDay);
		}
	);

	it('is danger and aria-invalid in the error state', () => {
		const { container } = render(BoundDatePicker, { props: { state: 'error' } });

		expect(dateField(container).getAttribute('aria-invalid')).toBe('true');
		expect(borderColor(dateField(container))).toBe(colorOf('border-danger-dark', 'borderTopColor'));
	});

	it.each([
		{ readonly: true, frame: 'bg-gray-1', triggerDisabled: true },
		{ readonly: false, frame: 'bg-white', triggerDisabled: false }
	])(
		'readonly=$readonly paints the $frame frame and sets the trigger disabled to $triggerDisabled',
		({ readonly, frame, triggerDisabled }) => {
			const { container } = render(BoundDatePicker, { props: { readonly } });

			expect(backgroundColor(dateField(container))).toBe(colorOf(frame, 'backgroundColor'));
			expect(trigger(container).disabled, 'trigger disabled').toBe(triggerDisabled);
		}
	);

	it('disables the segments and the trigger when disabled', () => {
		const { container } = render(BoundDatePicker, { props: { disabled: true } });

		expect(trigger(container).disabled, 'trigger disabled').toBe(true);
		expect(segment(container, 'day').getAttribute('aria-disabled')).toBe('true');
		expect(borderColor(dateField(container))).toBe(colorOf('border-transparent', 'borderTopColor'));
	});
});
