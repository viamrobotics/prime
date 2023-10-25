import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import { CodeSnippet } from '$lib';
import { cxTestArguments, cxTestResults } from './cx-test';
import CaptionedCodeSnippet from './code-snippet.spec.svelte';
import userEvent from '@testing-library/user-event';

describe('CodeSnippet', () => {
  const common = {
    language: 'json',
    code: '{ my: "json" }',
  };

  it('Renders the code snippet', () => {
    render(CodeSnippet, common);
    expect(screen.getByText(common.code)).toBeInTheDocument();
  });

  it('Renders with the passed cx classes', () => {
    render(CodeSnippet, {
      ...common,
      cx: cxTestArguments,
    });

    expect(screen.getByRole('figure')).toHaveClass(cxTestResults);
  });

  it('Renders with the copy button', async () => {
    const copy = vi.fn();
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: copy,
      },
    });

    render(CodeSnippet, common);

    const button = screen.getByRole('button', {
      name: /copy/iu,
    });

    expect(button).toBeInTheDocument();

    await userEvent.click(button);

    expect(copy).toHaveBeenCalledWith(common.code);
  });

  it('Renders without the copy button', () => {
    render(CodeSnippet, { ...common, showCopyButton: false });

    const button = screen.queryByRole('button', {
      name: /copy/iu,
    });

    expect(button).toBeNull();
  });

  it('Renders with the passed dependencies', () => {
    render(CodeSnippet, { ...common, dependencies: ['dep1', 'dep2'] });

    const code = screen
      .getByRole('figure')
      .querySelector('pre > code.language-json');

    expect(code).toHaveAttribute('data-dependencies', 'dep1,dep2');
  });

  it('Renders with a figcaption when the default slot is provided', () => {
    render(CaptionedCodeSnippet);

    expect(screen.getByText('This is the caption text.')).toBeInTheDocument();
  });
});
