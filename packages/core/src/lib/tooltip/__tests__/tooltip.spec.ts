import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';

import Tooltip from './tooltip.spec.svelte';

describe('Tooltip', () => {
  it('renders the target element without the tooltip', () => {
    render(Tooltip);

    const target = screen.getByTestId('target');
    const tooltip = screen.getByRole('tooltip');

    expect(target).toBeInTheDocument();
    expect(tooltip).toHaveClass('invisible');
  });

  it('passes the tooltip ID to the target slot', () => {
    render(Tooltip);

    const target = screen.getByTestId('target');
    const tooltip = screen.getByRole('tooltip');

    expect(tooltip).toHaveAttribute('id', expect.any(String));
    expect(target).toHaveAttribute('aria-describedby', tooltip.id);
  });

  it('renders the tooltip when state is visible', async () => {
    const user = userEvent.setup();

    render(Tooltip, { state: 'visible' });

    const target = screen.getByTestId('target');
    const tooltip = screen.getByRole('tooltip');

    // tooltip should initially be invisible before styles calculate
    expect(tooltip).toHaveClass('invisible');
    // then it should become visible
    await waitFor(() => expect(tooltip).not.toHaveClass('invisible'));

    await user.hover(target);
    expect(tooltip).not.toHaveClass('invisible');

    await user.unhover(target);
    expect(tooltip).not.toHaveClass('invisible');
  });

  it('does not render the tooltip when state is invisible', async () => {
    const user = userEvent.setup();

    render(Tooltip, { state: 'invisible' });

    const target = screen.getByTestId('target');
    const tooltip = screen.getByRole('tooltip');

    // tooltip should initially be invisible before styles calculate
    expect(tooltip).toHaveClass('invisible');

    // tooltip should stay invisible despite hover state
    await user.hover(target);
    expect(tooltip).toHaveClass('invisible');

    await user.unhover(target);
    expect(tooltip).toHaveClass('invisible');
  });

  it('shows/hides the tooltip on mouse enter/exit', async () => {
    const user = userEvent.setup();

    render(Tooltip);

    const target = screen.getByTestId('target');
    const tooltip = screen.getByRole('tooltip');

    await user.hover(target);
    expect(tooltip).not.toHaveClass('invisible');

    await user.unhover(target);
    expect(tooltip).toHaveClass('invisible');
  });

  it('shows the tooltip on mouse enter after a delay', async () => {
    const user = userEvent.setup();

    render(Tooltip, { hoverDelayMS: 50 });

    const target = screen.getByTestId('target');
    const tooltip = screen.getByRole('tooltip');

    await user.hover(target);
    expect(tooltip).toHaveClass('invisible');
    await waitFor(() => expect(tooltip).not.toHaveClass('invisible'));
  });

  it('shows/hides the tooltip on keyboard focus/blur', async () => {
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
