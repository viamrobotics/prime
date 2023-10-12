import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/svelte';

import userEvent from '@testing-library/user-event';
import ToggleButtons from './toggle-buttons.spec.svelte';

describe('ToggleButtons', () => {
  const common = {
    options: ['Option 1', 'Option 2', 'Option 3'],
    selected: 'Option 1',
  };

  it('Renders radio options correctly', () => {
    render(ToggleButtons, common);

    expect(screen.getByRole('button', { name: /option 1/iu })).toBeVisible();
    expect(screen.getByRole('button', { name: /option 2/iu })).toBeVisible();
    expect(screen.getByRole('button', { name: /option 3/iu })).toBeVisible();
  });

  it('Marks the selected option correctly', () => {
    render(ToggleButtons, common);

    const button = screen.getByRole('button', { name: /option 1/iu });
    expect(button).toHaveClass('font-semibold text-default');
  });

  it('Marks the selected option as disabled if a disabled attribute of true has been specified', () => {
    render(ToggleButtons, {
      ...common,
      disabled: true,
    });

    const button = screen.getByRole('button', { name: /option 1/iu });
    expect(button).toHaveAttribute('aria-disabled');
  });

  it('Allows option input if not disabled', async () => {
    const { component } = render(ToggleButtons, common);
    const onInput = vi.fn();
    component.$on('input', onInput);

    const button = screen.getByRole('button', { name: /option 2/iu });

    await userEvent.click(button);

    expect(onInput).toHaveBeenCalled();
    expect(button).toHaveAttribute('aria-pressed', 'true');
  });

  it('Prevents option input if disabled', async () => {
    const { component } = render(ToggleButtons, {
      ...common,
      disabled: true,
    });
    const onInput = vi.fn();
    component.$on('input', onInput);

    const button = screen.getByRole('button', { name: /option 2/iu });

    await userEvent.click(button);

    expect(onInput).not.toHaveBeenCalled();
  });

  it('Renders the legend correctly', () => {
    render(ToggleButtons, common);
    expect(screen.getByText('Test toggle buttons')).toBeVisible();
  });

  it('Renders the legend correctly when disabled', () => {
    render(ToggleButtons, { ...common, disabled: true });

    const legend = screen.getByText('Test toggle buttons');
    expect(legend).toHaveClass('text-disabled-dark cursor-not-allowed');
  });
});
