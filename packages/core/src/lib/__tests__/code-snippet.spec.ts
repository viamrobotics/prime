import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import { CodeSnippet } from '$lib';
import { cxTestArguments, cxTestResults } from './cx-test';
import CaptionedCodeSnippet from './code-snippet.spec.svelte'

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

  it('Renders with the copy button', () => {
    render(CodeSnippet, common);

    expect(screen.getByLabelText('Copy')).toBeInTheDocument();
  });

  it('Renders without the copy button', () => {
    render(CodeSnippet, { ...common, showCopyButton: false });

    expect(screen.queryByLabelText('Copy')).toBeNull();
  });

  it('Renders with the passed dependencies', () => {
    render(CodeSnippet, { ...common, dependencies: ['dep1', 'dep2'] });

    const code = document.querySelector('code.language-json');

    expect(code).toHaveAttribute('data-dependencies', 'dep1,dep2');
  });

  it('Renders with a figcaption when the default slot is provided', () => {
    render(CaptionedCodeSnippet);

    expect(screen.getByText('This is the caption text.')).toBeInTheDocument();
  });
});
