import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/svelte';
import Button from './button.svelte';

describe('Button', () => {
  it('Renders label attribute as text within the button', () => {
    render(Button, { label: 'label' });
    expect(screen.getByRole('button')).toBeVisible();
  });

  it('Renders a button in the style of the primary variant if no variant is specified', () => {
    render(Button);
    expect(screen.getByRole('button')).toHaveClass('border-light', 'bg-light');
  });

  it('Renders a button in the style of the primary variant if variant is specified as primary', () => {
    render(Button, { variant: 'primary' });
    expect(screen.getByRole('button')).toHaveClass('border-light', 'bg-light');
  });

  it('Renders a button in the style of inverse primary if the variant is specified as inverse primary', () => {
    render(Button, { variant: 'inverse-primary' });
    expect(screen.getByRole('button')).toHaveClass(
      'border-gray-9',
      'bg-gray-9',
      'text-white'
    );
  });

  it('Renders a button in the style of success if the variant is specified as success', () => {
    render(Button, { variant: 'success' });
    expect(screen.getByRole('button')).toHaveClass(
      'border-success-dark',
      'bg-success-dark',
      'text-white'
    );
  });

  it('Renders a button in the style of danger if the variant is specified as danger', () => {
    render(Button, { variant: 'danger' });
    expect(screen.getByRole('button')).toHaveClass(
      'border-danger-dark',
      'bg-danger-dark',
      'text-white'
    );
  });

  it('Renders a button in the style of outline danger if the variant is specified as outline danger', () => {
    render(Button, { variant: 'outline-danger' });
    expect(screen.getByRole('button')).toHaveClass(
      'border-danger-medium',
      'bg-danger-light',
      'text-danger-dark'
    );
  });

  it('Renders a clickable button', async () => {
    const { component } = render(Button);
    const onClick = vi.fn();
    component.$on('click', onClick);
    await fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('Renders a disabled button', () => {
    render(Button, { disabled: true });
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('Renders a full width button', () => {
    render(Button, { width: 'full' });
    expect(screen.getByRole('button')).toHaveClass('w-full');
  });
});
