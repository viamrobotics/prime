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
import BoundDatePicker from './fixtures/BoundDatePicker.svelte';
import ControlledDatePicker from './fixtures/ControlledDatePicker.svelte';
import FormDatePicker from './fixtures/FormDatePicker.svelte';
import UndefinedDatePicker from './fixtures/UndefinedDatePicker.svelte';

const dateField = (container: Element) => container.querySelector<HTMLElement>('[role="group"]')!;
const trigger = (container: Element) => container.querySelector('button')!;
const segment = (container: Element, part: string) =>
	container.querySelector<HTMLElement>(`[data-segment="${part}"]`)!;
const owner = (container: Element) => container.querySelector('[data-testid="owner"]')?.textContent;
const ownerOpen = (container: Element) =>
	container.querySelector('[data-testid="open"]')?.textContent;
const segmentParts = (container: Element) =>
	[...container.querySelectorAll('[role="spinbutton"]')].map((part) =>
		part.getAttribute('data-segment')
	);
const segmentAttributes = (container: Element, attribute: string) =>
	[...container.querySelectorAll('[role="spinbutton"]')].map((part) =>
		part.getAttribute(attribute)
	);
const shownSegments = (container: Element) => segmentAttributes(container, 'aria-valuetext');
const form = (container: Element) => container.querySelector('form')!;
const calendar = () => document.querySelector('[role="dialog"], [role="grid"]');
const monthButtonNames = () =>
	[...document.querySelectorAll('[role="dialog"] button')].map((button) =>
		button.getAttribute('aria-label')
	);
const monthButton = (name: string) =>
	document.querySelector<HTMLElement>(`[role="dialog"] button[aria-label="${name}"]`);
const calendarName = () =>
	document.querySelector('[role="application"]')?.getAttribute('aria-label');

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
	it('closes the calendar when Escape is pressed', async () => {
		const { container } = render(BoundDatePicker);
		trigger(container).focus();

		await userEvent.keyboard('{Enter}');
		await vi.waitFor(() => expect(calendar(), 'calendar open').toBeTruthy());
		await userEvent.keyboard('{Escape}');

		await vi.waitFor(() => expect(calendar(), 'calendar closed').toBeNull());
	});

	it('shows the bound date in the segments', () => {
		const { container } = render(BoundDatePicker);

		expect(
			['month', 'day', 'year'].map((part) => segment(container, part).getAttribute('aria-valuenow'))
		).toEqual(['3', '10', '2026']);
	});

	it('wears the shared input frame and its focus ring', () => {
		const { container } = render(BoundDatePicker);

		expect(dateField(container).classList.contains('input'), 'input class').toBe(true);
		expect(dateField(container).classList.contains('date-field'), 'frame ring').toBe(true);
		expect(trigger(container).classList.contains('input-button'), 'trigger ring').toBe(true);
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

	it('writes the opened calendar to the bound open', async () => {
		const { container } = render(BoundDatePicker);

		await userEvent.click(trigger(container));

		await vi.waitFor(() => expect(ownerOpen(container)).toBe('true'));
	});

	it('orders the segments for the locale', () => {
		const { container } = render(BoundDatePicker, { props: { locale: 'de-DE' } });

		expect(segmentParts(container)).toEqual(['day', 'month', 'year']);
	});

	it('adds hour and minute segments at minute granularity', () => {
		const { container } = render(BoundDatePicker, { props: { granularity: 'minute' } });

		expect(segmentParts(container)).toEqual(['month', 'day', 'year', 'hour', 'minute']);
	});

	it('renders a hidden form input carrying the ISO date when given a name', () => {
		const { container } = render(BoundDatePicker, { props: { name: 'start' } });

		expect(container.querySelector<HTMLInputElement>('input[name="start"]')?.value).toBe(
			'2026-03-10'
		);
	});

	it('submits an empty value while no date is chosen', () => {
		const { container } = render(UndefinedDatePicker, { props: { name: 'start' } });

		expect(container.querySelector<HTMLInputElement>('input[name="start"]')?.value).toBe('');
	});

	it.each([
		{ disabled: false, submitted: '2026-03-10' },
		{ disabled: true, submitted: null }
	])('disabled=$disabled submits $submitted with the form', ({ disabled, submitted }) => {
		const { container } = render(FormDatePicker, { props: { disabled } });

		expect(new FormData(form(container)).get('start')).toBe(submitted);
	});

	it.each([
		{ empty: true, valid: false },
		{ empty: false, valid: true }
	])('a required picker with empty=$empty leaves the form valid=$valid', ({ empty, valid }) => {
		const { container } = render(FormDatePicker, { props: { empty, required: true } });

		expect(form(container).checkValidity()).toBe(valid);
	});

	it.each([
		{ required: true, expected: ['true', 'true', 'true'] },
		{ required: false, expected: [null, null, null] }
	])(
		'required=$required sets aria-required on the segments to $expected',
		({ required, expected }) => {
			const { container } = render(BoundDatePicker, { props: { required } });

			expect(segmentAttributes(container, 'aria-required')).toEqual(expected);
		}
	);

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

	it.each([
		{ bound: 'min', props: { min: new CalendarDate(2026, 3, 8) }, day: '2026-03-05' },
		{ bound: 'max', props: { max: new CalendarDate(2026, 3, 25) }, day: '2026-03-28' }
	])('keeps days beyond $bound out of reach', async ({ props, day }) => {
		const { container } = render(BoundDatePicker, { props });
		await userEvent.click(trigger(container));
		const outOfRange = await dayOf(day);

		await userEvent.click(outOfRange, { force: true });

		expect(outOfRange.getAttribute('aria-disabled')).toBe('true');
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

	it.each([
		{ accept: true, expected: '2026-03-24', shownDay: '24' },
		{ accept: false, expected: '2026-03-10', shownDay: '10' }
	])(
		'controlled: accept=$accept on a typed day leaves the owner at $expected and the field showing it',
		async ({ accept, expected, shownDay }) => {
			const { container } = render(ControlledDatePicker, { props: { accept } });
			segment(container, 'day').focus();

			await userEvent.keyboard('24');

			await vi.waitFor(() => expect(owner(container)).toBe(expected));
			await vi.waitFor(() =>
				expect(segment(container, 'day').getAttribute('aria-valuenow')).toBe(shownDay)
			);
		}
	);

	it('controlled: a refused typed date leaves an empty picker showing no date', async () => {
		const { container } = render(ControlledDatePicker, { props: { empty: true } });
		segment(container, 'month').focus();

		await userEvent.keyboard('03152');

		await vi.waitFor(() => expect(shownSegments(container)).toEqual(['Empty', 'Empty', 'Empty']));
		expect(owner(container)).toBe('undefined');
	});

	it.each([
		{ locale: undefined, expected: ['Last month', 'Next month'] },
		{ locale: 'de-DE', expected: ['Letzten Monat', 'Nächsten Monat'] }
	])('names the month buttons in the $locale locale', async ({ locale, expected }) => {
		const { container } = render(BoundDatePicker, { props: { locale } });

		await userEvent.click(trigger(container));

		await vi.waitFor(() => expect(monthButtonNames()).toEqual(expected));
	});

	it.each([
		{ calendarLabel: undefined, expected: 'Choose a date March 2026' },
		{ calendarLabel: 'Choose a start date', expected: 'Choose a start date March 2026' }
	])(
		'names the calendar $expected when its aria-label is $calendarLabel',
		async ({ calendarLabel, expected }) => {
			const { container } = render(BoundDatePicker, { props: { calendarLabel } });

			await userEvent.click(trigger(container));

			await vi.waitFor(() =>
				expect(document.querySelector('[role="application"]')?.getAttribute('aria-label')).toBe(
					expected
				)
			);
		}
	);

	it('names the panel after the calendar', async () => {
		const { container } = render(BoundDatePicker, {
			props: { calendarLabel: 'Choose a start date' }
		});

		await userEvent.click(trigger(container));

		await vi.waitFor(() =>
			expect(document.querySelector('[role="dialog"]')?.getAttribute('aria-label')).toBe(
				'Choose a start date'
			)
		);
	});

	it('replaces the month button chevrons with the chevron snippets', async () => {
		const { container } = render(BoundDatePicker, { props: { chevrons: true } });

		await userEvent.click(trigger(container));

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

	it('moves the calendar a month with the next and previous month buttons', async () => {
		const { container } = render(BoundDatePicker);
		await userEvent.click(trigger(container));
		await vi.waitFor(() => expect(calendarName()).toBe('Choose a date March 2026'));

		await userEvent.click(monthButton('Next month')!);
		await vi.waitFor(() => expect(calendarName()).toBe('Choose a date April 2026'));
		await userEvent.click(monthButton('Last month')!);
		await userEvent.click(monthButton('Last month')!);

		await vi.waitFor(() => expect(calendarName()).toBe('Choose a date February 2026'));
	});

	it('returns focus to the trigger when Escape closes the calendar', async () => {
		const { container } = render(BoundDatePicker);
		trigger(container).focus();
		await userEvent.keyboard('{Enter}');
		await vi.waitFor(async () => expect(document.activeElement).toBe(await dayOf('2026-03-10')));

		await userEvent.keyboard('{Escape}');

		await vi.waitFor(() => expect(document.activeElement).toBe(trigger(container)));
	});

	it('emphasizes today in bold', async () => {
		const { container } = render(UndefinedDatePicker);

		await userEvent.click(trigger(container));
		const todayCell = await dayOf(today(getLocalTimeZone()).toString());

		expect(getComputedStyle(todayCell).fontWeight).toBe('600');
	});

	it('paints today in the heading color, not the link color', async () => {
		const { container } = render(UndefinedDatePicker);

		await userEvent.click(trigger(container));
		const todayCell = await dayOf(today(getLocalTimeZone()).toString());

		expect(textColor(todayCell)).toBe(colorOf('text-heading', 'color'));
		expect(textColor(todayCell)).not.toBe(colorOf('text-link', 'color'));
	});

	it('is danger and aria-invalid when a typed date falls before min', async () => {
		const { container } = render(BoundDatePicker, {
			props: { min: new CalendarDate(2026, 3, 8) }
		});
		segment(container, 'day').focus();

		await userEvent.keyboard('05');

		await vi.waitFor(() => expect(dateField(container).getAttribute('aria-invalid')).toBe('true'));
		expect(borderColor(dateField(container))).toBe(colorOf('border-danger-dark', 'borderTopColor'));
	});

	it('darkens the frame while the calendar is open and restores it on close', async () => {
		const { container } = render(BoundDatePicker);
		await userEvent.unhover(dateField(container));
		trigger(container).focus();

		await userEvent.keyboard('{Enter}');
		await vi.waitFor(() => expect(calendar(), 'calendar open').toBeTruthy());
		const openBorder = borderColor(dateField(container));
		await userEvent.keyboard('{Escape}');
		await vi.waitFor(() => expect(calendar(), 'calendar closed').toBeNull());

		expect(openBorder, 'open').toBe(colorOf('border-gray-9', 'borderTopColor'));
		expect(borderColor(dateField(container)), 'closed').toBe(
			colorOf('border-light', 'borderTopColor')
		);
	});

	it('keeps the danger frame while the calendar is open in the error state', async () => {
		const { container } = render(BoundDatePicker, { props: { state: 'error' } });
		trigger(container).focus();

		await userEvent.keyboard('{Enter}');

		await vi.waitFor(() => expect(calendar(), 'calendar open').toBeTruthy());
		expect(borderColor(dateField(container))).toBe(colorOf('border-danger-dark', 'borderTopColor'));
	});

	it('is danger and aria-invalid in the error state', () => {
		const { container } = render(BoundDatePicker, { props: { state: 'error' } });

		expect(dateField(container).getAttribute('aria-invalid')).toBe('true');
		expect(borderColor(dateField(container))).toBe(colorOf('border-danger-dark', 'borderTopColor'));
	});

	it('sets aria-invalid on every segment in the error state', () => {
		const { container } = render(BoundDatePicker, { props: { state: 'error' } });

		expect(segmentAttributes(container, 'aria-invalid')).toEqual(['true', 'true', 'true']);
	});

	it('keeps its own data-state over one passed to the field', () => {
		const { container } = render(BoundDatePicker, {
			props: { fieldProps: { 'data-state': 'stale' } }
		});

		expect(dateField(container).getAttribute('data-state')).toBe('closed');
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

	it('names the trigger from its aria-label', () => {
		const { container } = render(BoundDatePicker, {
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
			const { container } = render(BoundDatePicker, { props: { readonly: true, triggerProps } });

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
			const { container } = render(BoundDatePicker, { props: { contentProps } });

			await userEvent.click(trigger(container));

			await vi.waitFor(() => expect(document.querySelector('[role="dialog"]')).toBeTruthy());
			const panel = document.querySelector('[role="dialog"]')!;
			expect(panel.getAttribute('aria-label')).toBe(label);
			expect(panel.getAttribute('aria-labelledby')).toBe(labelledBy);
		}
	);

	it('fills only the focused segment', async () => {
		const { container } = render(BoundDatePicker);
		const day = segment(container, 'day');
		const month = segment(container, 'month');
		const unfocusedFill = backgroundColor(day);

		month.focus();

		await vi.waitFor(() =>
			expect(backgroundColor(month)).toBe(colorOf('bg-medium', 'backgroundColor'))
		);
		expect(backgroundColor(day), 'unfocused segment').toBe(unfocusedFill);
		expect(unfocusedFill).not.toBe(colorOf('bg-medium', 'backgroundColor'));
	});
});
