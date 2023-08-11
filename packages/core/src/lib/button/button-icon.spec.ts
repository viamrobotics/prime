import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/svelte';
import ButtonIcon from './button-icon.svelte';

describe('ButtonIcon', () => {
  it('Renders label attribute as text within the button', () => {
    render(ButtonIcon, { label: 'label' });
    expect(screen.getByRole('button')).toBeVisible();
  });

  it('Renders a button in the style of the primary variant if no variant is specified', () => {
    render(ButtonIcon);
    expect(screen.getByRole('button')).toHaveClass(
      'text-gray-6',
      'hover:border-medium'
    );
  });

  it('Renders a button in the style of the primary variant if variant is specified as primary', () => {
    render(ButtonIcon, { variant: 'primary' });
    expect(screen.getByRole('button')).toHaveClass(
      'text-gray-6',
      'hover:border-medium'
    );
  });

  it('Renders a button in the style of danger if the variant is specified as danger', () => {
    render(ButtonIcon, { variant: 'danger' });
    expect(screen.getByRole('button')).toHaveClass(
      'hover:text-danger-dark',
      'active:text-danger-dark'
    );
  });

  it('Renders an icon within the button if an icon attribute is specified', () => {
    render(ButtonIcon, { icon: 'refresh' });
    expect(
      screen.getByRole('img', { name: 'refresh icon' })
    ).toBeInTheDocument();
  });

  it('Renders a clickable button', async () => {
    const { component } = render(ButtonIcon);
    const onClick = vi.fn();
    component.$on('click', onClick);
    await fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('Renders a disabled button', () => {
    render(ButtonIcon, { disabled: true });
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
