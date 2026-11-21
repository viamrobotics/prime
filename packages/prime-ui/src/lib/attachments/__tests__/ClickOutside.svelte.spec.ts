import { describe, expect, it, vi, type Mock } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { userEvent } from 'vitest/browser';

import '../../__tests__/tailwind.css';
import ClickOutsideHost from './ClickOutsideHost.svelte';

const byTestId = (testId: string) =>
	document.querySelector<HTMLElement>(`[data-testid="${testId}"]`);

const pressedTestIds = (onOutside: Mock<(event: PointerEvent) => void>) =>
	onOutside.mock.calls.map(([event]) => (event.target as HTMLElement).dataset.testid);

describe('clickOutside', () => {
	it('runs the handler with the pointerdown of a press outside the element', async () => {
		const onOutside = vi.fn<(event: PointerEvent) => void>();
		render(ClickOutsideHost, { onOutside });

		await userEvent.click(byTestId('outside')!);

		await vi.waitFor(() => expect(pressedTestIds(onOutside)).toEqual(['outside']));
		expect(onOutside.mock.calls[0]![0].type).toBe('pointerdown');
	});

	it('ignores a press inside the element', async () => {
		const onOutside = vi.fn<(event: PointerEvent) => void>();
		render(ClickOutsideHost, { onOutside });

		await userEvent.click(byTestId('inner')!);
		await userEvent.click(byTestId('outside')!);

		await vi.waitFor(() => expect(pressedTestIds(onOutside)).toEqual(['outside']));
	});

	it('ignores a press inside a portal the element opens', async () => {
		const onOutside = vi.fn<(event: PointerEvent) => void>();
		render(ClickOutsideHost, { onOutside });
		await userEvent.click(byTestId('trigger')!);
		await vi.waitFor(() => expect(byTestId('portaled')).not.toBeNull());

		await userEvent.click(byTestId('portaled')!);
		await userEvent.click(byTestId('outside')!);

		await vi.waitFor(() => expect(pressedTestIds(onOutside)).toEqual(['outside']));
	});

	it('ignores a press on a target exclude accepts', async () => {
		const onOutside = vi.fn<(event: PointerEvent) => void>();
		const exclude = (target: HTMLElement) => target.dataset.testid === 'excluded';
		render(ClickOutsideHost, { onOutside, exclude });

		await userEvent.click(byTestId('excluded')!);
		await userEvent.click(byTestId('outside')!);

		await vi.waitFor(() => expect(pressedTestIds(onOutside)).toEqual(['outside']));
	});
});
