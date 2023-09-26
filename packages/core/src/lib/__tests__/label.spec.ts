import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import Label from './label.spec.svelte';
import { cxTestArguments, cxTestResults } from './cx-test';

describe('Label', () => {
  it('Renders the label text above the input', () => {
    render(Label);

    const label = screen.getByText('Name:');
    expect(label).toHaveClass('text-xs text-subtle-1');
    expect(label).not.toHaveClass('inline whitespace-nowrap');
  });

  it('Renders the label text left of the input', () => {
    render(Label, { position: 'left' });

    const label = screen.getByText('Name:');
    expect(label).toHaveClass('text-xs text-subtle-1');
    expect(label).toHaveClass('inline whitespace-nowrap');
  });

  it('Renders the label text as disabled', () => {
    render(Label, { disabled: true });
    expect(screen.getByText('Name:')).toHaveClass(
      'text-xs cursor-not-allowed text-disabled-dark'
    );
  });

  it('Renders the label text as required', () => {
    render(Label, { required: true });
    expect(screen.getByText('Name:')).toHaveClass(
      'after:ml-1 after:text-danger-dark after:content-["*"]'
    );
  });

  it('Renders the input slot', () => {
    render(Label);
    expect(screen.getByPlaceholderText('Enter your name')).toHaveAttribute(
      'name',
      'name'
    );
  });

  it('Renders the detail', () => {
    render(Label, { detail: 'detail' });
    expect(screen.getByText('detail')).toHaveClass('text-disabled');
  });

  it('Renders with the passed cx classes', () => {
    render(Label, { extraClasses: cxTestArguments });
    expect(screen.getByText('Name:').parentElement).toHaveClass(cxTestResults);
  });
});
