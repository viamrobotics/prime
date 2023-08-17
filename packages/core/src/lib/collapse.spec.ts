import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/svelte';
import Collapse from './collapse.svelte';
import CollapseSlot from './collapse.spec.svelte';

describe('Collapse', () => {
  it('Renders the title correctly', () => {
    const { container } = render(Collapse, {
      title: 'I am a collapse component',
    });
    expect(container).toHaveTextContent('I am a collapse component');
  });

  it('Renders the contents of header slot correctly', () => {
    const { container } = render(CollapseSlot);
    expect(container).toHaveTextContent('Inactive');
  });

  it('Renders the contents of title slot correctly', () => {
    const { container } = render(CollapseSlot);
    expect(container).toContainHTML('Hi');
    expect(container).toContainHTML('Hello');
  });

  it('Renders the correct icon rotation on open', () => {
    const { container } = render(Collapse, { open: true });
    const svg = container.querySelector('svg');
    expect(svg?.parentElement).toHaveClass('rotate-180');
  });

  it('Renders the correct icon rotation on close', () => {
    const { container } = render(Collapse, { open: false });
    const svg = container.querySelector('svg');
    expect(svg?.parentElement).toHaveClass('rotate-0');
  });

  it('Renders content slot correctly when open', async () => {
    const { component } = render(CollapseSlot);
    const onToggle = vi.fn();
    component.$on('toggle', onToggle);
    await fireEvent.click(screen.getByText('Number 1'));
    const contentDiv = screen.getByText('One is the loneliest number.');
    expect(contentDiv).toBeVisible();
  });

  it('Hides content slot correctly when closed', () => {
    render(CollapseSlot);
    const contentDiv = screen.queryByText(
      'Two can be as bad as one, its the loneliest number since the number one.'
    );
    expect(contentDiv).not.toBeInTheDocument();
  });
});
