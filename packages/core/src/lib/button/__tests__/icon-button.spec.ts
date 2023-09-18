import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/svelte';
import { IconButton } from '$lib';
import { cxTestArguments, cxTestResults } from '$lib/__tests__/cx-test';

describe('IconButton', () => {
  const common = { icon: 'close' as const, label: 'close' };
  it('Renders a button in the style of the primary variant if no variant is specified', () => {
    render(IconButton, common);
    expect(screen.getByRole('button')).toHaveClass(
      'text-gray-6',
      'hover:border-medium'
    );
  });

  it('Renders a button in the style of the primary variant if variant is specified as primary', () => {
    render(IconButton, { ...common, variant: 'primary' });
    expect(screen.getByRole('button')).toHaveClass(
      'text-gray-6',
      'hover:border-medium'
    );
  });

  it('Renders a button in the style of danger if the variant is specified as danger', () => {
    render(IconButton, { ...common, variant: 'danger' });
    expect(screen.getByRole('button')).toHaveClass(
      'hover:text-danger-dark',
      'active:text-danger-dark'
    );
  });

  it('Renders an icon within the button if an icon attribute is specified', () => {
    const { container } = render(IconButton, { ...common, icon: 'refresh' });
    expect(container.querySelector('svg')).toBeVisible();
  });

  it('Renders a clickable button', async () => {
    const { component } = render(IconButton, common);
    const onClick = vi.fn();
    component.$on('click', onClick);
    await fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('Renders a disabled button', async () => {
    const { component } = render(IconButton, { ...common, disabled: true });
    const onClick = vi.fn();
    component.$on('click', onClick);
    await fireEvent.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('Renders with the passed cx classes', () => {
    render(IconButton, { ...common, cx: cxTestArguments });
    expect(screen.getByRole('button')).toHaveClass(cxTestResults);
  });
});
