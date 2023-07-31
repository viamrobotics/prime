import { describe, it, expect } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/svelte';
import Switch from './switch.svelte';

describe('Switch', () => {
  it('Renders with default values', () => {
    render(Switch);

    // Check if the switch is initially off
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false');

    // Check if the switch label is empty
    expect(screen.queryByRole('button')).toBeNull();

    // Check if the tooltip is not present
    expect(screen.queryByRole('tooltip')).toBeNull();
  });

  // TODO(APP-2290), (APP-2304): Tooltips above icons won't work until tooltip/icons are migrated.
  it.skip('Renders with label and tooltip', () => {
    render(Switch, { label: 'Switch Label', tooltip: 'Switch tooltip' });

    // Check if the switch label is displayed
    expect(screen.getByRole('button')).toHaveTextContent('Switch Label');

    // Check if the tooltip is present
    expect(screen.getByRole('tooltip')).toHaveTextContent('Switch tooltip');
  });

  it('Switches on and off when clicked', async () => {
    render(Switch);

    // Initial state should be off
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false');

    // Click the switch to turn it on
    await fireEvent.click(screen.getByRole('switch'));
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true');

    // Click the switch again to turn it off
    await fireEvent.click(screen.getByRole('switch'));
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false');
  });

  it('Does not switch when disabled or readonly', async () => {
    render(Switch, { disabled: 'true', readonly: 'true' });

    // Initial state should be off
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false');

    // Try clicking the switch to turn it on, but it shouldn't change
    await fireEvent.click(screen.getByRole('switch'));
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false');
  });

  it('Renders annotated switch', async () => {
    render(Switch, { variant: 'annotated' });

    // Check if the 'on' or 'off' value is displayed next to the switch
    expect(screen.getByText('off')).toBeVisible();

    // Click the switch to turn it on
    await fireEvent.click(screen.getByRole('switch'));

    // Check if the value changes when the switch is clicked
    expect(screen.getByText('on')).toBeVisible();
  });
});
