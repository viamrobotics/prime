import { CalendarDate, getLocalTimeZone, today } from '@internationalized/date';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { userEvent } from 'vitest/browser';

import { backgroundColor, borderColor, colorOf } from '../../__tests__/computed-style.ts';
import BoundDateRangePicker from './BoundDateRangePicker.svelte';
import ControlledDateRangePicker from './ControlledDateRangePicker.svelte';
import UndefinedDateRangePicker from './UndefinedDateRangePicker.svelte';

type RangeEnd = 'start' | 'end';

const rangeField = (container: Element) => container.querySelector<HTMLElement>('[role="group"]')!;
const trigger = (container: Element) => container.querySelector('button')!;
const segment = (container: Element, end: RangeEnd, part: string) =>
	container
		.querySelectorAll('[role="presentation"]')
		[end === 'start' ? 0 : 1].querySelector<HTMLElement>(`[data-segment="${part}"]`)!;
const shownDays = (container: Element) =>
	(['start', 'end'] as const).map((end) =>
		segment(container, end, 'day').getAttribute('aria-valuetext')
	);
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

const openCalendar = async (container: Element) => {
	await userEvent.click(trigger(container));
	await vi.waitFor(() => expect(calendar(), 'calendar open').toBeTruthy());
};

afterEach(async () => {
	if (calendar()) await userEvent.keyboard('{Escape}');
});

describe('DateRangePicker', () => {
	it('shows both ends of the bound range in the segments', () => {
		const { container } = render(BoundDateRangePicker);

		expect(
			(['start', 'end'] as const).flatMap((end) =>
				['month', 'day', 'year'].map((part) =>
					segment(container, end, part).getAttribute('aria-valuenow')
				)
			)
		).toEqual(['3', '10', '2026', '3', '20', '2026']);
	});

	it('draws one input frame around both ends', () => {
		const { container } = render(BoundDateRangePicker);

		expect(container.querySelectorAll('[role="group"]').length, 'one group').toBe(1);
		expect(rangeField(container).classList.contains('input'), 'input class').toBe(true);
		expect(rangeField(container).classList.contains('focus-ring-within'), 'frame ring').toBe(true);
		expect(rangeField(container).querySelectorAll('[data-segment="day"]').length).toBe(2);
	});

	it('separates the ends with a dash hidden from assistive technology', () => {
		const { container } = render(BoundDateRangePicker);
		const dash = rangeField(container).querySelector(':scope > [aria-hidden="true"]');

		expect(dash?.textContent).toBe('–');
	});

	it('names the trigger, the panel, and the calendar by default', async () => {
		const { container } = render(BoundDateRangePicker);

		await openCalendar(container);

		await vi.waitFor(() =>
			expect([
				trigger(container).getAttribute('aria-label'),
				document.querySelector('[role="dialog"]')?.getAttribute('aria-label'),
				document.querySelector('[role="application"]')?.getAttribute('aria-label')
			]).toEqual(['Open calendar', 'Choose a date range', 'Choose a date range March 2026'])
		);
	});

	it('two-way: clicking a start and an end day writes the range and closes the calendar', async () => {
		const { container } = render(BoundDateRangePicker);
		await openCalendar(container);

		await userEvent.click(await dayOf('2026-03-05'));
		await userEvent.click(await dayOf('2026-03-08'));

		await vi.waitFor(() => expect(owner(container)).toBe('2026-03-05 2026-03-08'));
		await vi.waitFor(() => expect(calendar(), 'calendar closed').toBeNull());
		expect(shownDays(container)).toEqual(['5', '8']);
	});

	it('two-way: arrowing the grid and pressing Enter on each end writes the range', async () => {
		const { container } = render(BoundDateRangePicker);
		trigger(container).focus();

		await userEvent.keyboard('{Enter}');
		await vi.waitFor(async () => expect(document.activeElement).toBe(await dayOf('2026-03-10')));
		await userEvent.keyboard('{Enter}{ArrowRight}{ArrowDown}{Enter}');

		await vi.waitFor(() => expect(owner(container)).toBe('2026-03-10 2026-03-18'));
		expect(shownDays(container)).toEqual(['10', '18']);
	});

	it('orders the range when the end is clicked before the start', async () => {
		const { container } = render(BoundDateRangePicker);
		await openCalendar(container);

		await userEvent.click(await dayOf('2026-03-15'));
		await userEvent.click(await dayOf('2026-03-12'));

		await vi.waitFor(() => expect(owner(container)).toBe('2026-03-12 2026-03-15'));
	});

	it('binds the start with an undefined end while only the start is picked', async () => {
		const { container } = render(BoundDateRangePicker);
		await openCalendar(container);

		await userEvent.click(await dayOf('2026-03-15'));

		await vi.waitFor(() => expect(owner(container)).toBe('2026-03-15 undefined'));
	});

	it('binds a typed start with an undefined end', async () => {
		const { container } = render(UndefinedDateRangePicker);
		segment(container, 'start', 'month').focus();

		await userEvent.keyboard('03152026');

		await vi.waitFor(() => expect(owner(container)).toBe('2026-03-15 undefined'));
	});

	it('keeps focus in the start segments until the start date is complete', async () => {
		const { container } = render(UndefinedDateRangePicker);
		segment(container, 'start', 'month').focus();

		await userEvent.keyboard('0315202');
		expect(document.activeElement, 'start year still being typed').toBe(
			segment(container, 'start', 'year')
		);

		await userEvent.keyboard('6');
		expect(document.activeElement, 'start complete').toBe(segment(container, 'end', 'month'));
	});

	it('starts undefined without throwing and writes the picked start back', async () => {
		const { container } = render(UndefinedDateRangePicker);
		expect(owner(container)).toBe('undefined');
		const todayIso = today(getLocalTimeZone()).toString();

		await openCalendar(container);
		await userEvent.click(await dayOf(todayIso));

		await vi.waitFor(() => expect(owner(container)).toBe(`${todayIso} undefined`));
	});

	it.each([
		{ accept: true, expected: '2026-03-15 undefined', days: ['15', 'Empty'] },
		{ accept: false, expected: '2026-03-10 2026-03-20', days: ['10', '20'] }
	])(
		'controlled: accept=$accept leaves the owner at $expected and the field showing it',
		async ({ accept, expected, days }) => {
			const { container } = render(ControlledDateRangePicker, { props: { accept } });
			await openCalendar(container);

			await userEvent.click(await dayOf('2026-03-15'));

			await vi.waitFor(() => expect(owner(container)).toBe(expected));
			await vi.waitFor(() => expect(shownDays(container)).toEqual(days));
		}
	);

	it('fills both ends and shades the days between them', async () => {
		const { container } = render(BoundDateRangePicker);

		await openCalendar(container);

		expect(
			[
				await dayOf('2026-03-10'),
				await dayOf('2026-03-15'),
				await dayOf('2026-03-20'),
				await dayOf('2026-03-25')
			].map(backgroundColor)
		).toEqual([
			colorOf('bg-gray-9', 'backgroundColor'),
			colorOf('bg-light', 'backgroundColor'),
			colorOf('bg-gray-9', 'backgroundColor'),
			'rgba(0, 0, 0, 0)'
		]);
	});

	it('shades the days up to the hovered day while only the start is picked', async () => {
		const { container } = render(BoundDateRangePicker);
		await openCalendar(container);
		await userEvent.click(await dayOf('2026-03-15'));

		await userEvent.hover(await dayOf('2026-03-18'));

		await vi.waitFor(async () =>
			expect(backgroundColor(await dayOf('2026-03-17'))).toBe(
				colorOf('bg-light', 'backgroundColor')
			)
		);
	});

	it('submits the range as an ISO 8601 interval when given a name', () => {
		const { container } = render(BoundDateRangePicker, { props: { name: 'period' } });

		expect(container.querySelector<HTMLInputElement>('input[name="period"]')?.value).toBe(
			'2026-03-10/2026-03-20'
		);
	});

	it('submits an empty value while only the start is picked', async () => {
		const { container } = render(BoundDateRangePicker, { props: { name: 'period' } });
		await openCalendar(container);

		await userEvent.click(await dayOf('2026-03-15'));

		await vi.waitFor(() =>
			expect(container.querySelector<HTMLInputElement>('input[name="period"]')?.value).toBe('')
		);
	});

	it.each([
		{ bound: 'min', props: { min: new CalendarDate(2026, 3, 8) }, day: '2026-03-05' },
		{ bound: 'max', props: { max: new CalendarDate(2026, 3, 25) }, day: '2026-03-28' }
	])('keeps days beyond $bound out of reach', async ({ props, day }) => {
		const { container } = render(BoundDateRangePicker, { props });
		await openCalendar(container);
		const outOfRange = await dayOf(day);

		await userEvent.click(outOfRange, { force: true });

		expect(outOfRange.getAttribute('aria-disabled')).toBe('true');
		expect(owner(container)).toBe('2026-03-10 2026-03-20');
	});

	it('is danger and aria-invalid when a typed start falls before min', async () => {
		const { container } = render(BoundDateRangePicker, {
			props: { min: new CalendarDate(2026, 3, 8) }
		});
		segment(container, 'start', 'day').focus();

		await userEvent.keyboard('05');

		await vi.waitFor(() => expect(rangeField(container).getAttribute('aria-invalid')).toBe('true'));
		expect(borderColor(rangeField(container))).toBe(
			colorOf('border-danger-dark', 'borderTopColor')
		);
	});

	it('is danger and aria-invalid in the error state', () => {
		const { container } = render(BoundDateRangePicker, { props: { state: 'error' } });

		expect(rangeField(container).getAttribute('aria-invalid')).toBe('true');
		expect(borderColor(rangeField(container))).toBe(
			colorOf('border-danger-dark', 'borderTopColor')
		);
	});

	it('darkens the frame while the calendar is open', async () => {
		const { container } = render(BoundDateRangePicker);
		await userEvent.unhover(rangeField(container));
		trigger(container).focus();

		await userEvent.keyboard('{Enter}');

		await vi.waitFor(() => expect(calendar(), 'calendar open').toBeTruthy());
		expect(borderColor(rangeField(container))).toBe(colorOf('border-gray-9', 'borderTopColor'));
	});

	it.each([
		{ readonly: true, frame: 'bg-gray-1', triggerDisabled: true },
		{ readonly: false, frame: 'bg-white', triggerDisabled: false }
	])(
		'readonly=$readonly paints the $frame frame and sets the trigger disabled to $triggerDisabled',
		({ readonly, frame, triggerDisabled }) => {
			const { container } = render(BoundDateRangePicker, { props: { readonly } });

			expect(backgroundColor(rangeField(container))).toBe(colorOf(frame, 'backgroundColor'));
			expect(trigger(container).disabled, 'trigger disabled').toBe(triggerDisabled);
		}
	);

	it('disables both ends and the trigger when disabled', () => {
		const { container } = render(BoundDateRangePicker, { props: { disabled: true } });

		expect(trigger(container).disabled, 'trigger disabled').toBe(true);
		expect(
			[segment(container, 'start', 'day'), segment(container, 'end', 'day')].map((day) =>
				day.getAttribute('aria-disabled')
			)
		).toEqual(['true', 'true']);
		expect(borderColor(rangeField(container))).toBe(
			colorOf('border-transparent', 'borderTopColor')
		);
	});
});
