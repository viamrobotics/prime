import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import { TabsBar } from '$lib';
import TabsBarWithSlots from './tabs-bar-with-slots.svelte';

describe('TabsBar renders correctly', () => {
  it('Renders rest props and default variant', () => {
    render(TabsBar, { 'aria-label': 'Tab example one' });
    expect(screen.getByRole('navigation')).toHaveAccessibleName(
      'Tab example one'
    );
    expect(screen.getByRole('navigation')).toHaveClass(
      'h-10 bg-medium tracking-wide sm:px-2 flex items-center font-roboto-mono'
    );
  });

  it('Renders secondary variant', () => {
    render(TabsBar, { variant: 'secondary' });
    expect(screen.getByRole('navigation')).toHaveClass(
      'flex items-center font-roboto-mono'
    );
  });

  it('Renders TabsBar with Tab components in slots', () => {
    render(TabsBarWithSlots);

    expect(screen.getByText('The first tab')).toBeInTheDocument();
    expect(screen.getByText('The second tab')).toBeInTheDocument();
    expect(screen.getByText('The third tab')).toBeInTheDocument();

    const firstTab = screen.getByText('The first tab');
    const secondTab = screen.getByText('The second tab');
    const thirdTab = screen.getByText('The third tab');

    expect(firstTab.closest('a')).toHaveAttribute('href', '#first');
    expect(secondTab.closest('a')).toHaveAttribute('href', '#second');
    expect(thirdTab.closest('a')).toHaveAttribute('href', '#third');

    expect(firstTab).toHaveAttribute('aria-current', 'page');
    expect(secondTab).toHaveAttribute('aria-current', 'false');
    expect(thirdTab).toHaveAttribute('aria-current', 'false');
  });
});
