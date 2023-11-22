import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import { Badge } from '$lib';
import { cxTestArguments, cxTestResults } from './cx-test';

describe('Badge', () => {
  it('Renders the correct text', () => {
    render(Badge, { variant: 'inactive', label: 'Inactive' });
    expect(screen.getByText('Inactive')).toBeInTheDocument();
  });

  it('Renders an inactive badge if the variant is specified as inactive', () => {
    render(Badge, { variant: 'inactive', label: 'Inactive' });
    const badge = screen.getByText('Inactive');
    expect(badge).toHaveClass(
      'border-medium',
      'bg-disabled-light',
      'text-default'
    );
  });

  it('Renders an inactive badge if the variant is not specified', () => {
    render(Badge, { label: 'Inactive' });
    const badge = screen.getByText('Inactive');
    expect(badge).toHaveClass(
      'border-medium',
      'bg-disabled-light',
      'text-default'
    );
  });

  it('Renders a success badge if the variant is specified as success', () => {
    render(Badge, { variant: 'success', label: 'Success' });
    const badge = screen.getByText('Success');
    expect(badge).toHaveClass(
      'border-success-medium',
      'bg-success-light',
      'text-success-dark'
    );
  });

  it('Renders an warning badge if the variant is specified as warning', () => {
    render(Badge, { variant: 'warning', label: 'Warning' });
    const badge = screen.getByText('Warning');
    expect(badge).toHaveClass(
      'border-warning-medium',
      'bg-warning-light',
      'text-warning-dark'
    );
  });

  it('Renders a danger badge if the variant is specified as danger', () => {
    render(Badge, { variant: 'danger', label: 'Danger' });
    const badge = screen.getByText('Danger');
    expect(badge).toHaveClass(
      'border-danger-medium',
      'bg-danger-light',
      'text-danger-dark'
    );
  });

  it('Renders a neutral badge if the variant is specified as neutral', () => {
    render(Badge, { variant: 'neutral', label: 'Neutral' });
    const badge = screen.getByText('Neutral');
    expect(badge).toHaveClass(
      'border-info-medium',
      'bg-info-light',
      'text-info-dark'
    );
  });

  it('Renders with the passed cx classes', () => {
    render(Badge, {
      label: 'Inactive',
      cx: cxTestArguments,
    });
    expect(screen.getByText('Inactive')).toHaveClass(cxTestResults);
  });
});
