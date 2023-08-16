import { describe, it, expect } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/svelte';
import Switch from './switch.svelte';

describe('Switch', () => {
  it('Renders with default values', () => {
    render(Switch);
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false');
    expect(screen.queryByRole('button')).toBeNull();
    expect(screen.queryByRole('tooltip')).toBeNull();
  });

  it('Renders with label and tooltip', () => {
    const { container } = render(Switch, {
      label: 'Switch Label',
      tooltip: 'Tooltip Message',
    });

    const label = screen.getByText('Switch Label');
    expect(label).toBeVisible();

    const icon = container.querySelector('svg') as Element;
    expect(icon).toBeInTheDocument();

    const path = icon.querySelector('path');
    expect(path).toHaveAttribute('fill', 'currentColor');
  });

  it('Switches on and off when clicked', async () => {
    render(Switch);

    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false');

    await fireEvent.click(screen.getByRole('switch'));
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true');

    await fireEvent.click(screen.getByRole('switch'));
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false');
  });

  it('Does not switch when disabled or readonly', async () => {
    render(Switch, { disabled: true, readonly: true });

    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false');

    await fireEvent.click(screen.getByRole('switch'));
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false');
  });

  it('Renders annotated switch', async () => {
    render(Switch, { variant: 'annotated' });

    expect(screen.getByText('off')).toBeVisible();

    await fireEvent.click(screen.getByRole('switch'));

    expect(screen.getByText('on')).toBeVisible();
  });
});
