import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { userEvent } from 'vitest/browser';

import '../../__tests__/tailwind.css';
import ClickOutsideHost from './ClickOutsideHost.svelte';

const byTestId = (testId: string) =>
	document.querySelector<HTMLElement>(`[data-testid="${testId}"]`);

describe('clickOutside', () => {
	it('runs the handler on a press outside the element', async () => {
		const onOutside = vi.fn();
		render(ClickOutsideHost, { onOutside });

		await userEvent.click(byTestId('outside')!);

		await vi.waitFor(() => expect(onOutside).toHaveBeenCalledTimes(1));
		expect(onOutside.mock.calls[0]![0]).toBeInstanceOf(PointerEvent);
	});

	it('ignores a press inside the element', async () => {
		const onOutside = vi.fn();
		render(ClickOutsideHost, { onOutside });

		await userEvent.click(byTestId('inner')!);
		await userEvent.click(byTestId('outside')!);

		await vi.waitFor(() => expect(onOutside).toHaveBeenCalledTimes(1));
	});

	it('ignores a press inside a portal the element opens', async () => {
		const onOutside = vi.fn();
		render(ClickOutsideHost, { onOutside });

		await userEvent.click(byTestId('trigger')!);
		await vi.waitFor(() => expect(byTestId('portaled')).not.toBeNull());
		await userEvent.click(byTestId('portaled')!);

		expect(onOutside).not.toHaveBeenCalled();

		await userEvent.click(byTestId('outside')!);

		await vi.waitFor(() => expect(onOutside).toHaveBeenCalledTimes(1));
	});
});
