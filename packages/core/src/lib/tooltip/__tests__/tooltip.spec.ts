import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';

import Tooltip from './tooltip.spec.svelte';

describe('Tooltip', () => {
  it('Renders the target element without the tooltip', () => {
    render(Tooltip);

    const target = screen.getByTestId('target');
    const tooltip = screen.getByRole('tooltip');

    expect(target).toBeInTheDocument();
    expect(tooltip).toHaveClass('invisible');
  });

  it('Renders the tooltip when state is visible', async () => {
    const user = userEvent.setup();

    render(Tooltip, { state: 'visible' });

    const target = screen.getByTestId('target');
    const tooltip = screen.getByRole('tooltip');

    expect(tooltip).not.toHaveClass('invisible');

    await user.hover(target);
    expect(tooltip).not.toHaveClass('invisible');

    await user.unhover(target);
    expect(tooltip).not.toHaveClass('invisible');
  });

  it('Renders the tooltip on mouse enter and hides it on mouse leave', async () => {
    const user = userEvent.setup();

    render(Tooltip);

    const target = screen.getByTestId('target');
    const tooltip = screen.getByRole('tooltip');

    await user.hover(target);
    expect(tooltip).not.toHaveClass('invisible');

    await user.unhover(target);
    expect(tooltip).toHaveClass('invisible');
  });

  it('Renders the tooltip on keyboard focus', async () => {
    render(Tooltip);

    const target = screen.getByTestId('target');
    const tooltip = screen.getByRole('tooltip');

    await userEvent.tab();
    expect(target).toHaveFocus();
    expect(tooltip).not.toHaveClass('invisible');

    await userEvent.tab();
    expect(target).not.toHaveFocus();
    expect(tooltip).toHaveClass('invisible');
  });
});
