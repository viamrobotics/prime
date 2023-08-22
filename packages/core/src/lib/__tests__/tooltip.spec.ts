import { describe, it, expect } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/svelte';
import Tooltip from './tooltip.spec.svelte';

describe('Tooltip', () => {
  it('Renders the target element without the tooltip', () => {
    render(Tooltip);
    expect(screen.getByText('This element has a tooltip.')).toBeInTheDocument();
    expect(screen.getByRole('tooltip')).toHaveClass('invisible');
  });

  it('Renders the tooltip when state is visible', () => {
    render(Tooltip, { state: 'visible' });
    expect(screen.getByRole('tooltip')).not.toHaveClass('invisible');
  });

  it('Renders the tooltip on mouse enter and hides it on mouse leave', async () => {
    render(Tooltip);

    const target = screen.getByText('This element has a tooltip.')
      .parentElement!;

    await fireEvent.mouseEnter(target);
    await waitFor(() => {
      expect(screen.getByRole('tooltip')).not.toHaveClass('invisible');
    });

    await fireEvent.mouseLeave(target);
    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toHaveClass('invisible');
    });
  });

  it('Renders the tooltip on mouse focus and hides it on blur', async () => {
    render(Tooltip);

    const target = screen.getByText('This element has a tooltip.')
      .parentElement!;

    await fireEvent.focus(target);
    await waitFor(() => {
      expect(screen.getByRole('tooltip')).not.toHaveClass('invisible');
    });

    await fireEvent.blur(target);
    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toHaveClass('invisible');
    });
  });
});
