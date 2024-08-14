import { describe, expect, it } from 'vitest';
import type { ComponentProps } from 'svelte';
import { render, screen } from '@testing-library/svelte';

import Subject from '../json-diff.svelte';

const renderSubject = (props?: Partial<ComponentProps<Subject>>) => {
  return render(Subject, {
    labelPrefix: 'test',
    beforeValue: '',
    afterValue: '',
    ...props,
  });
};

describe('json diff', () => {
  it('should render both read-only editors with sorted JSON', async () => {
    const beforeJson = { aa: 1, bb: 2 };
    const afterJson = { aa: 1, cc: 4, bb: 3 };
    renderSubject({
      beforeValue: JSON.stringify(beforeJson, null, 2),
      afterValue: JSON.stringify(afterJson, null, 2),
    });
    const beforeEditor = await screen.findByLabelText('test-before');
    const afterEditor = await screen.findByLabelText('test-after');
    expect(beforeEditor).toHaveTextContent(/\{ "aa": 1, "bb": 2\}/iu);
    expect(afterEditor).toHaveTextContent(/\{ "aa": 1, "cc": 4, "bb": 3\}/iu);
  });

  it('should destroy the MergeView when the component is unmounted', () => {
    const { unmount } = renderSubject();
    // Check that the editor elements are in the DOM before destruction
    expect(screen.queryAllByLabelText(/test-(?:before|after)/iu)).toHaveLength(
      2
    );
    unmount();
    // Check that the editor elements are no longer in the DOM
    expect(screen.queryAllByLabelText(/test-(?:before|after)/iu)).toHaveLength(
      0
    );
  });
});
