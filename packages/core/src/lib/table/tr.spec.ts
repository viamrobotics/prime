import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import TR from './tr.svelte';
import TRWithTD from './tr.spec.svelte';

describe('TR', () => {
  it('Renders default variant', () => {
    render(TR);
    expect(screen.getByRole('row')).toBeVisible();
    expect(screen.getByRole('row')).toHaveClass('border-b');
  });

  it('Renders success variant', () => {
    render(TR, { variant: 'success' });
    expect(screen.getByRole('row')).toBeVisible();
    expect(screen.getByRole('row')).toHaveClass(
      'text-green-700 bg-green-50 border-green-100'
    );
  });

  it('Renders disabled variant', () => {
    render(TR, { variant: 'disabled' });
    expect(screen.getByRole('row')).toBeVisible();
    expect(screen.getByRole('row')).toHaveClass('text-gray-500 bg-gray-50');
  });

  it('Renders error variant', () => {
    render(TR, { variant: 'error' });
    expect(screen.getByRole('row')).toBeVisible();
    expect(screen.getByRole('row')).toHaveClass(
      'text-red-500 bg-red-50 border-red-100'
    );
  });

  it('Renders table data', () => {
    render(TRWithTD);
    expect(screen.getByText('data'));
  });
});
