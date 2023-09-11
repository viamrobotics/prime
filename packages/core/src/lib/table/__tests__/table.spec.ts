import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import { Table } from '$lib';
import TableWith3Cols from './table.spec.svelte';
import { cxTestArguments, cxTestResults } from '$lib/__tests__/cx-test';

describe('Table', () => {
  it('Renders default variant', () => {
    render(Table);
    expect(screen.getByRole('table')).toBeVisible();
    expect(screen.getByRole('table')).toHaveClass('table-auto');
  });

  it('Renders auto variant', () => {
    render(Table, { variant: 'auto' });
    expect(screen.getByRole('table')).toBeVisible();
    expect(screen.getByRole('table')).toHaveClass('table-auto');
  });

  it('Renders fixed variant', () => {
    render(Table, { variant: 'fixed' });
    expect(screen.getByRole('table')).toBeVisible();
    expect(screen.getByRole('table')).toHaveClass('table-fixed');
  });

  it('Renders columns with widths set by cols attribute', () => {
    const cols = ['20%', '30%', '50%'];
    const { container } = render(TableWith3Cols, { cols });

    for (const [i, width] of cols.entries()) {
      const col = container.querySelectorAll('col')[i];
      expect(col).toBeVisible();
      expect(col).toHaveStyle(`width:${width}`);
    }
  });

  it('Renders with the passed cx classes', () => {
    render(TableWith3Cols, { cx: cxTestArguments });

    expect(screen.getByText('stuff')).toHaveClass(cxTestResults);
    expect(screen.getByText('stuff').parentElement).toHaveClass(cxTestResults);

    expect(screen.getByText('stuff').parentElement?.parentElement).toHaveClass(
      cxTestResults
    );

    expect(
      screen.getByText('stuff').parentElement?.parentElement?.parentElement
    ).toHaveClass(cxTestResults);
  });
});
