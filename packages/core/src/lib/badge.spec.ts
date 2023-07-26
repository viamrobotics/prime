import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import Badge from './badge.svelte';

describe('Badge', () => {
  it('Renders the correct text', () => {
    render(Badge, { variant: 'gray', label: 'Inactive' });
    expect(screen.getByText('Inactive')).toBeInTheDocument();
  });

  it('Renders a gray badge if the variant is specified as gray', () => {
    render(Badge, { variant: 'gray', label: 'Inactive' });
    const grayBadge = screen.getByText('Inactive');
    expect(grayBadge).toHaveClass(
      'border-medium',
      'bg-disabled-light',
      'text-default'
    );
  });

  it('Renders a gray badge if the variant is not specified', () => {
    render(Badge, { label: 'Default' });
    const defaultBadge = screen.getByText('Default');
    expect(defaultBadge).toHaveClass(
      'border-medium',
      'bg-disabled-light',
      'text-default'
    );
  });

  it('Renders a green badge if the variant is specified as green', () => {
    render(Badge, { variant: 'green', label: 'Go' });
    const greenBadge = screen.getByText('Go', { exact: true });
    expect(greenBadge).toHaveClass(
      'border-success-medium',
      'bg-success-light',
      'text-success-dark'
    );
  });

  it('Renders an orange badge if the variant is specified as orange', () => {
    render(Badge, { variant: 'orange', label: 'Danger' });
    const orangeBadge = screen.getByText('Danger');
    expect(orangeBadge).toHaveClass(
      'border-warning-medium',
      'bg-warning-light',
      'text-warning-dark'
    );
  });

  it('Renders a red badge if the variant is specified as red', () => {
    render(Badge, { variant: 'red', label: 'Unhealthy' });
    const redBadge = screen.getByText('Unhealthy');
    expect(redBadge).toHaveClass(
      'border-danger-medium',
      'bg-danger-light',
      'text-danger-dark'
    );
  });

  it('Renders a blue badge if the variant is specified as blue', () => {
    render(Badge, { variant: 'blue', label: 'Info' });
    const blueBadge = screen.getByText('Info');
    expect(blueBadge).toHaveClass(
      'border-info-medium',
      'bg-info-light',
      'text-info-dark'
    );
  });
});
