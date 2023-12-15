import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/svelte';

import Toast from './toast-banner.spec.svelte';
import { cxTestArguments, cxTestResults } from '$lib/__tests__/cx-test';
import { ToastVariant } from '../variants';

describe('Toast', () => {
  it('Renders toast element with appropriate message, and action text', () => {
    const { container } = render(Toast, {
      variant: ToastVariant.Success,
    });

    expect(screen.getByText('This is the message.')).toBeVisible();
    expect(screen.getByText('This is the action button.')).toBeVisible();
    expect(container.querySelector('.text-success-dark')).toBeVisible();
    expect(screen.getByRole('button')).toBeVisible();
  });

  it('Calls the dismiss function when the close button is clicked', async () => {
    const dismissMock = vi.fn();
    render(Toast, {
      variant: 'success',
      dismiss: dismissMock
    });

    await fireEvent.click(screen.getByLabelText(/Dismiss toast/iu));
    expect(dismissMock).toHaveBeenCalled();
  });

  it('Renders with the passed cx classes', () => {
    const { container } = render(Toast, {
      variant: 'success',
      extraClasses: cxTestArguments,
    });

    expect(container.querySelector('.bg-medium')).toHaveClass(cxTestResults);
  });
});
