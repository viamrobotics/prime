import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/svelte';
import { Tabs } from '$lib';

describe('Tabs', () => {
  it('Renders tabs correctly', () => {
    render(Tabs, { tabs: ['Tab 1', 'Tab 2', 'Tab 3'], selected: 'Tab 1' });
    expect(screen.getByText('Tab 1')).toBeVisible();
    expect(screen.getByText('Tab 2')).toBeVisible();
    expect(screen.getByText('Tab 3')).toBeVisible();
  });

  it('Marks the selected tab correctly', () => {
    render(Tabs, { tabs: ['Tab 1', 'Tab 2', 'Tab 3'], selected: 'Tab 1' });
    expect(screen.getByRole('button', { name: 'Tab 1' })).toHaveClass(
      'bg-white border border-x-border-2 border-t-border-2 border-b-white font-semibold'
    );
  });

  it('Switches to another tab on click', async () => {
    const { component } = render(Tabs, {
      tabs: ['Tab 1', 'Tab 2', 'Tab 3'],
      selected: 'Tab 1',
    });
    const onInput = vi.fn();
    component.$on('input', onInput);

    await fireEvent.click(screen.getByText('Tab 2'));
    expect(onInput).toHaveBeenCalledOnce();
    await fireEvent.click(screen.getByText('Tab 2'));
    expect(onInput).toHaveBeenCalledWith(
      expect.objectContaining({ detail: { value: 'Tab 2' } })
    );
  });
});
