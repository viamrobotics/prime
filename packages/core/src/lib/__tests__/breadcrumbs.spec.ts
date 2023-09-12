import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import { Breadcrumbs } from '$lib';
import { cxTestArguments, cxTestResults } from './cx-test';

describe('Breadcrumbs', () => {
  it('Renders breadcrumbs with the list of values specified in crumbs attribute as pills', () => {
    render(Breadcrumbs, { crumbs: ['Chocolate Chip', 'Oatmeal Raisin'] });
    expect(screen.getByText('Chocolate Chip')).toBeInTheDocument();
    expect(screen.getByText('Oatmeal Raisin')).toBeInTheDocument();
  });

  it('Renders with the passed cx classes', () => {
    render(Breadcrumbs, {
      crumbs: ['Chocolate Chip', 'Oatmeal Raisin'],
      cx: cxTestArguments,
    });

    expect(screen.getByText('Chocolate Chip').parentElement).toHaveClass(
      cxTestResults
    );
  });
});
