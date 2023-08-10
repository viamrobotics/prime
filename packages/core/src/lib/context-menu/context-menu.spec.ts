import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/svelte';
import ContextMenuItem from './context-menu-item.svelte';
import ContextMenuSeparator from './context-menu-separator.svelte';
import ContextMenu from './context-menu.spec.svelte';

describe('Context menu', () => {
  it('Renders context menu item', () => {
    render(ContextMenuItem, { label: 'label' });
    expect(screen.getByText('label')).toBeVisible();
  });

  it('Renders context menu item with icon', () => {
    render(ContextMenuItem, { label: 'primary', icon: 'close' });
    expect(screen.getByRole('img', { name: 'close icon' })).toBeVisible();
  });

  it('Renders context menu separator', () => {
    render(ContextMenuSeparator);
    expect(screen.getByRole('separator')).toBeVisible();
  });

  it('Renders style variants', () => {
    render(ContextMenuItem, { label: 'label' });
    expect(screen.getByText('label')).toHaveClass('text-default');

    render(ContextMenuItem, { label: 'primary', variant: 'primary' });
    expect(screen.getByText('primary')).toHaveClass('text-default');

    render(ContextMenuItem, { label: 'danger', variant: 'danger' });
    expect(screen.getByText('danger')).toHaveClass('text-danger-dark');
  });

  it('Dispatches select events', async () => {
    const { component } = render(ContextMenuItem, {
      label: 'select me!',
      icon: 'arrow-up',
    });
    const onSelect = vi.fn();
    component.$on('select', onSelect);

    await fireEvent.click(screen.getByRole('menuitem'));
    expect(onSelect).toHaveBeenCalledOnce();
    expect(onSelect).toHaveBeenCalledWith(
      expect.objectContaining({ detail: { value: 'select me!' } })
    );

    await fireEvent.click(screen.getByText('select me!'));
    expect(onSelect).toHaveBeenCalledTimes(2);

    await fireEvent.click(screen.getByRole('img', { name: 'arrow-up icon' }));
    expect(onSelect).toHaveBeenCalledTimes(3);
  });

  it('Renders context menu slots', () => {
    render(ContextMenu);
    expect(screen.getByText('hello')).toBeVisible();
    expect(screen.getByRole('img', { name: 'plus icon' })).toBeVisible();
    expect(screen.getByRole('separator')).toBeVisible();
  });
});
