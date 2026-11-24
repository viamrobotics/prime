import { CalendarDate, getLocalTimeZone, today } from '@internationalized/date';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { userEvent } from 'vitest/browser';

import {
	backgroundColor,
	borderColor,
	colorOf,
	textColor
} from '../../../../test/computed-style.ts';
import BoundDateRangePicker from './fixtures/BoundDateRangePicker.svelte';
import ControlledDateRangePicker from './fixtures/ControlledDateRangePicker.svelte';
import FormDateRangePicker from './fixtures/FormDateRangePicker.svelte';
import UndefinedDateRangePicker from './fixtures/UndefinedDateRangePicker.svelte';

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
const ownerOpen = (container: Element) =>
	container.querySelector('[data-testid="open"]')?.textContent;
const startSegmentParts = (container: Element) =>
	[
		...container
			.querySelectorAll('[role="presentation"]')[0]
			.querySelectorAll('[role="spinbutton"]')
	].map((part) => part.getAttribute('data-segment'));
const monthButton = (name: string) =>
	document.querySelector<HTMLElement>(`[role="dialog"] button[aria-label="${name}"]`);
const monthButtonNames = () =>
	[...document.querySelectorAll('[role="dialog"] button')].map((button) =>
		button.getAttribute('aria-label')
	);
const calendarName = () =>
	document.querySelector('[role="application"]')?.getAttribute('aria-label');
const calendar = () => document.querySelector('[role="dialog"], [role="grid"]');
const segmentAttributes = (container: Element, attribute: string) =>
	[...container.querySelectorAll('[role="spinbutton"]')].map((part) =>
		part.getAttribute(attribute)
	);

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
	it('closes the calendar when Escape is pressed', async () => {
		const { container } = render(BoundDateRangePicker);
		await openCalendar(container);

		await userEvent.keyboard('{Escape}');

		await vi.waitFor(() => expect(calendar(), 'calendar closed').toBeNull());
	});

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
		expect(rangeField(container).classList.contains('date-field'), 'frame ring').toBe(true);
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

	it.each([
		{ locale: undefined, expected: ['Last month', 'Next month'] },
		{ locale: 'de-DE', expected: ['Letzten Monat', 'Nächsten Monat'] }
	])('names the month buttons in the $locale locale', async ({ locale, expected }) => {
		const { container } = render(BoundDateRangePicker, { props: { locale } });

		await openCalendar(container);

		await vi.waitFor(() => expect(monthButtonNames()).toEqual(expected));
	});

	it('moves the calendar a month with the next and previous month buttons', async () => {
		const { container } = render(BoundDateRangePicker);
		await openCalendar(container);
		await vi.waitFor(() => expect(calendarName()).toBe('Choose a date range March 2026'));

		await userEvent.click(monthButton('Next month')!);
		await vi.waitFor(() => expect(calendarName()).toBe('Choose a date range April 2026'));
		await userEvent.click(monthButton('Last month')!);
		await userEvent.click(monthButton('Last month')!);

		await vi.waitFor(() => expect(calendarName()).toBe('Choose a date range February 2026'));
	});

	it('names the calendar from its aria-label followed by the month', async () => {
		const { container } = render(BoundDateRangePicker, {
			props: { calendarLabel: 'Choose a reporting period' }
		});

		await openCalendar(container);

		await vi.waitFor(() => expect(calendarName()).toBe('Choose a reporting period March 2026'));
	});

	it('names the panel after the calendar', async () => {
		const { container } = render(BoundDateRangePicker, {
			props: { calendarLabel: 'Choose a reporting period' }
		});

		await openCalendar(container);

		await vi.waitFor(() =>
			expect(document.querySelector('[role="dialog"]')?.getAttribute('aria-label')).toBe(
				'Choose a reporting period'
			)
		);
	});

	it('replaces the month button chevrons with the chevron snippets', async () => {
		const { container } = render(BoundDateRangePicker, { props: { chevrons: true } });

		await openCalendar(container);

		await vi.waitFor(() =>
			expect(
				[monthButton('Last month'), monthButton('Next month')].map((button) => button?.innerHTML)
			).toEqual([
				expect.stringContaining('data-testid="previous-chevron"'),
				expect.stringContaining('data-testid="next-chevron"')
			])
		);
		expect(document.querySelector('[role="dialog"] button svg')).toBeNull();
	});

	it('returns focus to the trigger when Escape closes the calendar', async () => {
		const { container } = render(BoundDateRangePicker);
		trigger(container).focus();
		await userEvent.keyboard('{Enter}');
		await vi.waitFor(async () => expect(document.activeElement).toBe(await dayOf('2026-03-10')));

		await userEvent.keyboard('{Escape}');

		await vi.waitFor(() => expect(document.activeElement).toBe(trigger(container)));
	});

	it('emphasizes today in bold and the heading color', async () => {
		const { container } = render(UndefinedDateRangePicker);

		await openCalendar(container);
		const todayCell = await dayOf(today(getLocalTimeZone()).toString());

		expect(getComputedStyle(todayCell).fontWeight, 'weight').toBe('600');
		expect(textColor(todayCell), 'color').toBe(colorOf('text-heading', 'color'));
	});

	it('writes the opened calendar to the bound open', async () => {
		const { container } = render(BoundDateRangePicker);

		await userEvent.click(trigger(container));

		await vi.waitFor(() => expect(ownerOpen(container)).toBe('true'));
	});

	it('orders the segments for the locale', () => {
		const { container } = render(BoundDateRangePicker, { props: { locale: 'de-DE' } });

		expect(startSegmentParts(container)).toEqual(['day', 'month', 'year']);
	});

	it('writes undefined once both ends are cleared', async () => {
		const { container } = render(BoundDateRangePicker);
		segment(container, 'start', 'month').focus();
		await userEvent.keyboard('{Backspace}');
		segment(container, 'end', 'month').focus();

		await userEvent.keyboard('{Backspace}');

		await vi.waitFor(() => expect(owner(container)).toBe('undefined'));
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

	it.each([
		{ accept: true, expected: '2026-03-24 2026-03-20', days: ['24', '20'] },
		{ accept: false, expected: '2026-03-10 2026-03-20', days: ['10', '20'] }
	])(
		'controlled: accept=$accept on a typed start day leaves the owner at $expected and the field showing it',
		async ({ accept, expected, days }) => {
			const { container } = render(ControlledDateRangePicker, { props: { accept } });
			segment(container, 'start', 'day').focus();

			await userEvent.keyboard('24');

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

	it.each([
		{ disabled: false, submitted: '2026-03-10/2026-03-20' },
		{ disabled: true, submitted: null }
	])('disabled=$disabled submits $submitted with the form', ({ disabled, submitted }) => {
		const { container } = render(FormDateRangePicker, { props: { disabled } });

		expect(new FormData(container.querySelector('form')!).get('period')).toBe(submitted);
	});

	it.each([
		{ required: true, expected: 'true' },
		{ required: false, expected: null }
	])(
		'required=$required sets aria-required on every segment to $expected',
		({ required, expected }) => {
			const { container } = render(BoundDateRangePicker, { props: { required } });

			expect(segmentAttributes(container, 'aria-required')).toEqual(Array(6).fill(expected));
		}
	);

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

	it('sets aria-invalid on every segment in the error state', () => {
		const { container } = render(BoundDateRangePicker, { props: { state: 'error' } });

		expect(segmentAttributes(container, 'aria-invalid')).toEqual(Array(6).fill('true'));
	});

	it('keeps its own data-state over one passed to the field', () => {
		const { container } = render(BoundDateRangePicker, {
			props: { fieldProps: { 'data-state': 'stale' } }
		});

		expect(rangeField(container).getAttribute('data-state')).toBe('closed');
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

	it('names the trigger from its aria-label', () => {
		const { container } = render(BoundDateRangePicker, {
			props: { triggerProps: { 'aria-label': 'Pick a start date' } }
		});

		expect(trigger(container).getAttribute('aria-label')).toBe('Pick a start date');
	});

	it.each([
		{ triggerProps: {}, disabled: true },
		{ triggerProps: { disabled: false }, disabled: false }
	])(
		'a readonly picker with trigger props $triggerProps sets the trigger disabled to $disabled',
		({ triggerProps, disabled }) => {
			const { container } = render(BoundDateRangePicker, {
				props: { readonly: true, triggerProps }
			});

			expect(trigger(container).disabled).toBe(disabled);
		}
	);

	it.each([
		{
			contentProps: { 'aria-label': 'Reporting period' },
			label: 'Reporting period',
			labelledBy: null
		},
		{
			contentProps: { 'aria-labelledby': 'period-heading' },
			label: null,
			labelledBy: 'period-heading'
		}
	])(
		'names the panel with $contentProps instead of the default name',
		async ({ contentProps, label, labelledBy }) => {
			const { container } = render(BoundDateRangePicker, { props: { contentProps } });

			await userEvent.click(trigger(container));

			await vi.waitFor(() => expect(document.querySelector('[role="dialog"]')).toBeTruthy());
			const panel = document.querySelector('[role="dialog"]')!;
			expect(panel.getAttribute('aria-label')).toBe(label);
			expect(panel.getAttribute('aria-labelledby')).toBe(labelledBy);
		}
	);

	it('fills only the focused segment', async () => {
		const { container } = render(BoundDateRangePicker);
		const day = segment(container, 'start', 'day');
		const month = segment(container, 'start', 'month');
		const unfocusedFill = backgroundColor(day);

		month.focus();

		await vi.waitFor(() =>
			expect(backgroundColor(month)).toBe(colorOf('bg-medium', 'backgroundColor'))
		);
		expect(backgroundColor(day), 'unfocused segment').toBe(unfocusedFill);
		expect(unfocusedFill).not.toBe(colorOf('bg-medium', 'backgroundColor'));
	});

	it('does not scroll the page when the calendar opens', async () => {
		document.body.style.paddingBlock = '150vh';
		try {
			const { container } = render(BoundDateRangePicker);
			trigger(container).scrollIntoView({ block: 'center' });
			const scrolledTo = window.scrollY;

			await userEvent.click(trigger(container));
			const startDay = await dayOf('2026-03-10');
			await vi.waitFor(() => expect(document.activeElement).toBe(startDay));

			expect(scrolledTo).toBeGreaterThan(0);
			expect(window.scrollY).toBe(scrolledTo);
		} finally {
			document.body.style.paddingBlock = '';
		}
	});
});
