import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import Label from './label.spec.svelte';

describe('Label', () => {
  it('Renders the Label', () => {
    render(Label);

    const label = screen.getByText('Name:');
    expect(label).toHaveClass('text-xs text-subtle-1');
    expect(label).not.toHaveClass('inline whitespace-nowrap');
  });

  it('Renders the Label text as disabled', () => {
    render(Label, { disabled: true });
    expect(screen.getByText('Name:')).toHaveClass(
      'text-xs pointer-events-none text-disabled-dark'
    );
  });

  it('Renders the Label text as required', () => {
    render(Label, { required: true });
    expect(screen.getByText('Name:')).toHaveClass(
      'after:ml-1 after:text-danger-dark after:content-["*"]'
    );
  });
});
