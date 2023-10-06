import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import { Switch } from '$lib';
import AnnotatedSwitch from './switch.spec.svelte';
import userEvent from '@testing-library/user-event';

describe('Switch', () => {
  it('Renders with default values', () => {
    render(Switch);

    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false');
    expect(screen.queryByRole('button')).toBeNull();
    expect(screen.queryByRole('tooltip')).toBeNull();
  });

  it('Switches on and off when clicked', async () => {
    render(Switch);

    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false');

    await userEvent.click(screen.getByRole('switch'));
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true');

    await userEvent.click(screen.getByRole('switch'));
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false');
  });

  it('Does not switch when disabled', async () => {
    render(Switch, { disabled: true });

    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false');

    await userEvent.click(screen.getByRole('switch'));
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false');
  });

  it('Renders annotated switch', async () => {
    render(Switch, { annotated: true });

    expect(screen.getByText('Off')).toBeVisible();

    await userEvent.click(screen.getByRole('switch'));

    expect(screen.getByText('On')).toBeVisible();
  });

  it('Renders annotated switch with custom annotation', async () => {
    render(AnnotatedSwitch, { annotated: true });

    expect(screen.getByText('Disabled')).toBeVisible();

    await userEvent.click(screen.getByRole('switch'));

    expect(screen.getByText('Enabled')).toBeVisible();
  });
});
