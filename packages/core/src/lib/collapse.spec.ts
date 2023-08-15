import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/svelte';
import Collapse from './collapse.svelte';
import CollapseSlot from './collapse.spec.svelte';

describe('Collapse', () => {
  it('Renders the title correctly', () => {
    render(Collapse, { title: 'I am a collapse component' });
    expect(screen.getByText('I am a collapse component')).toBeVisible();
  });

  it('Renders the contents of badge correctly', () => {
    render(CollapseSlot);
    expect(screen.getByText('Inactive')).toBeVisible();
  });

  it('Renders the contents of breadcrumbs correctly', () => {
    render(CollapseSlot);
    expect(screen.getByText('Hi')).toBeVisible();
    expect(screen.getByText('Hello')).toBeVisible();
  });

  it('Renders the correct icon rotation on open', async () => {
    render(Collapse, { open: true });
    const iconDiv = screen.getByRole('img').parentElement;
    expect(iconDiv).toHaveClass('rotate-180');
  });

  it('Renders the correct icon rotation on close', () => {
    render(Collapse, { open: false });
    const iconDiv = screen.getByRole('img').parentElement;
    expect(iconDiv).toHaveClass('rotate-0');
  });

  it('Renders content slot correctly when open', async () => {
    const { component } = render(CollapseSlot);
    const onToggle = vi.fn();
    component.$on('toggle', onToggle);
    await fireEvent.click(screen.getByText('Number 1'));
    const contentDiv = screen.getByText('One is the loneliest number.');
    expect(contentDiv).not.toHaveClass('hidden');
  });

  it('Hides content slot correctly when closed', () => {
    render(CollapseSlot);
    const contentDiv = screen.getByText(
      'Two can be as bad as one, its the loneliest number since the number one.'
    );
    expect(contentDiv).not.toHaveClass('hidden');
  });
});
