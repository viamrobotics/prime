import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import { CodeSnippet } from '$lib';
import { cxTestArguments, cxTestResults } from './cx-test';

describe('CodeSnippet', () => {
  const common = {
    language: 'json',
    code: '{ my: "json" }',
  };

  it('Renders the code snippet', () => {
    render(CodeSnippet, common);
    expect(screen.getByText('{ my: "json" }')).toBeInTheDocument();
  });

  it('Renders with the passed cx classes', () => {
    render(CodeSnippet, {
      ...common,
      cx: cxTestArguments,
    });

    expect(screen.getByRole('figure')).toHaveClass(cxTestResults);
  });

  it('Renders with the default theme', () => {
    render(CodeSnippet, common);

    const link = document.querySelector(
      'link[href="https://cdnjs.cloudflare.com/ajax/libs/prism-themes/1.9.0/prism-vs.min.css"]'
    );
    expect(link).toBeInTheDocument();
  });

  it('Renders with the dark theme', () => {
    render(CodeSnippet, {
      ...common,
      theme: 'vsc-dark-plus',
    });

    const link = document.querySelector(
      'link[href="https://cdnjs.cloudflare.com/ajax/libs/prism-themes/1.9.0/prism-vsc-dark-plus.min.css"]'
    );
    expect(link).toBeInTheDocument();
  });

  it('Renders with the copy button', () => {
    render(CodeSnippet, common);

    expect(screen.getByLabelText('Copy')).toBeInTheDocument();
  });

  it('Renders without the copy button', () => {
    render(CodeSnippet, { ...common, showCopyButton: false });

    expect(screen.queryByLabelText('Copy')).toBeNull();
  });
});
