import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/svelte';

import Toast from './toast-banner.spec.svelte';
import { cxTestArguments, cxTestResults } from '$lib/__tests__/cx-test';

describe('Toast', () => {
  it('Renders toast element with appropriate message, and action text', () => {
    render(Toast, {
      variant: 'upload',
    });

    expect(screen.getByText('This is the message.')).toBeVisible();
    expect(screen.getByText('Cancel')).toBeVisible();
    expect(screen.getByRole('button')).toBeVisible();
  });

  it('Renders toast with neutral style if the variant is set to neutral', () => {
    render(Toast, {
      variant: 'neutral',
    });

    expect(screen.getByRole('button')).toBeVisible();
    expect(screen.getByRole('button')).toHaveClass(
      'text-gray-7',
      'hover:bg-ghost-light'
    );
  });

  it('Renders toast with success style if the variant is set to success', () => {
    const { container } = render(Toast, {
      variant: 'success',
    });

    expect(container.querySelector('.text-success-dark')).toBeVisible();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('Renders toast with uploading file style if the variant is set to uploading file', () => {
    const { container } = render(Toast, {
      variant: 'upload',
    });

    expect(container.querySelector('.text-info-dark')).toBeVisible();
  });

  it('Emits the close event when closeable and the close button is clicked', async () => {
    const onClose = vi.fn();
    const { component } = render(Toast, {
      closeable: true,
      variant: 'success',
    });

    component.$on('close', onClose);

    await fireEvent.click(screen.getByLabelText(/Dismiss toast/iu));

    expect(onClose).toHaveBeenCalled();
  });

  it('Renders with the passed cx classes', () => {
    const { container } = render(Toast, {
      variant: 'upload',
      extraClasses: cxTestArguments,
    });

    expect(container.querySelector('.bg-medium')).toHaveClass(cxTestResults);
  });
});
