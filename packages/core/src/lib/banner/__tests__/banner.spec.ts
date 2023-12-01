import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/svelte';

import Banner from './banner.spec.svelte';
import { cxTestArguments, cxTestResults } from '$lib/__tests__/cx-test';

describe('Banner', () => {
  it('Renders banner element with appropriate title, subtitle, message, and action text', () => {
    render(Banner, {
      variant: 'info',
    });

    expect(screen.getByText('This is the title.')).toBeVisible();
    expect(screen.getByText('This is the subtitle.')).toBeVisible();
    expect(screen.getByText('This is the action.')).toBeVisible();
  });

  it('Renders banner with danger style if the variant is set to danger', () => {
    const { container } = render(Banner, {
      variant: 'danger',
    });

    expect(container.querySelector('.bg-danger-dark')).toBeVisible();
    expect(container.querySelector('.text-danger-dark')).toBeVisible();
  });

  it('Renders banner with warning style if the variant is set to warning', () => {
    const { container } = render(Banner, {
      variant: 'warning',
    });

    expect(container.querySelector('.bg-warning-bright')).toBeVisible();
    expect(container.querySelector('.text-warning-bright')).toBeVisible();
  });

  it('Renders banner with success style if the variant is set to success', () => {
    const { container } = render(Banner, {
      variant: 'success',
    });

    expect(container.querySelector('.bg-success-dark')).toBeVisible();
    expect(container.querySelector('.text-success-dark')).toBeVisible();
  });

  it('Renders banner with info style if the variant is set to info', () => {
    const { container } = render(Banner, {
      variant: 'info',
    });

    expect(container.querySelector('.bg-info-dark')).toBeVisible();
    expect(container.querySelector('.text-info-dark')).toBeVisible();
  });

  it('Emits the close event when exitable and the close button is clicked', async () => {
    const onClose = vi.fn();
    const { component } = render(Banner, {
      exitable: true,
      variant: 'info',
    });

    component.$on('close', onClose);

    await fireEvent.click(screen.getByLabelText('Dismiss notification'));

    expect(onClose).toHaveBeenCalled();
  });

  it('Renders with the passed cx classes', () => {
    const { container } = render(Banner, {
      variant: 'info',
      extraClasses: cxTestArguments,
    });

    expect(container.querySelector('.border-info-medium')).toHaveClass(
      cxTestResults
    );
  });
});
