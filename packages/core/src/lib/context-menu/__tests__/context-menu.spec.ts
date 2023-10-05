import { describe, it, expect, vi } from 'vitest';
import { render, screen, within } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';

import ContextMenuSpec from './context-menu.spec.svelte';
import { cxTestArguments, cxTestResults } from '$lib/__tests__/cx-test';

describe('<ContextMenu> components', () => {
  it('should render menu, items, and separator', () => {
    render(ContextMenuSpec, { id: 'abc123' });

    const menu = screen.getByRole('menu');
    const firstItem = within(menu).queryByRole('menuitem', { name: /first/iu });
    const separator = within(menu).queryByRole('separator');

    expect(menu).toHaveAttribute('id', 'abc123');
    expect(firstItem).toBeInTheDocument();
    expect(firstItem!.querySelector('svg')).toBeVisible();
    expect(separator).toBeInTheDocument();
  });

  it('should render items with variants', () => {
    render(ContextMenuSpec);

    const menu = screen.getByRole('menu');
    const primaryItem = within(menu).getByRole('menuitem', {
      name: /primary/iu,
    });
    const dangerItem = within(menu).getByRole('menuitem', { name: /danger/iu });
    const primaryText = within(primaryItem).getByText(/primary/iu);
    const dangerText = within(dangerItem).getByText(/danger/iu);

    expect(primaryText).toHaveClass('text-default');
    expect(dangerText).toHaveClass('text-danger-dark');
  });

  it('should forward click events from items', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(ContextMenuSpec, { onClick });

    const firstItem = screen.getAllByRole('menuitem')[0]!;
    await user.click(firstItem);

    expect(onClick).toHaveBeenCalledOnce();
  });

  it('should pass extra classes with the `cx` prop', () => {
    render(ContextMenuSpec, { extraClasses: cxTestArguments });

    expect(screen.getByRole('menu')).toHaveClass(cxTestResults);
    expect(screen.getAllByRole('menuitem')[0]).toHaveClass(cxTestResults);
    expect(screen.getByRole('separator')).toHaveClass(cxTestResults);
  });
});
