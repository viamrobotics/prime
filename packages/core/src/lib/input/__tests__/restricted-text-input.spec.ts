import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/svelte';
import { RestrictedTextInput } from '$lib';
import { cxTestArguments, cxTestResults } from '$lib/__tests__/cx-test';
import userEvent from '@testing-library/user-event';
import type { UserEvent } from '@testing-library/user-event/dist/types/setup/setup';
import BoundRestrictedTextInput from './restricted-text-input.spec.svelte';

describe('Restricted Text Input', () => {
  let user: UserEvent;

  beforeEach(() => {
    user = userEvent.setup();
  });

  it('renders the input', () => {
    render(RestrictedTextInput, {
      value: '',
      restrictInput: (value: string) => value,
      tooltipDescription: 'tooltip description',
      placeholder: 'Enter your name',
    });

    expect(screen.getByPlaceholderText('Enter your name')).toHaveAttribute(
      'type',
      'text'
    );
  });

  it('renders with the passed input cx classes', () => {
    render(RestrictedTextInput, {
      value: '',
      restrictInput: (value: string) => value,
      tooltipDescription: 'tooltip description',
      placeholder: 'Enter your name',
      inputCX: cxTestArguments,
    });

    expect(screen.getByPlaceholderText('Enter your name')).toHaveClass(
      cxTestResults
    );
  });

  it('only allows restricted input', async () => {
    const { component } = render(BoundRestrictedTextInput, {
      value: '',
      restrictInput: (value: string) => value.replaceAll(' ', '-'),
    });

    const onChange = vi.fn();
    component.$on('change', onChange);

    const input = screen.getByRole('textbox');

    await user.type(input, 'input with spaces');

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ detail: 'input-with-spaces' })
    );
  });

  it('shows a tooltip and an animation when an incorrect character is entered', async () => {
    render(RestrictedTextInput, {
      value: '',
      restrictInput: () => 'not what was entered',
      tooltipDescription: 'tooltip description',
      tooltipDurationMs: 50,
      wiggleDurationMs: 50,
    });

    const input = screen.getByRole('textbox');
    const tooltip = screen.getByRole('tooltip');

    // Type a single invalid character, which shows the tooltip but does not wiggle
    await user.type(input, 'a');

    expect(tooltip).not.toHaveClass('invisible');
    expect(tooltip).not.toHaveClass('animate-wiggle');
    await waitFor(() => expect(tooltip).toHaveClass('invisible'));

    // Type multiple invalid characters, which shows the tooltip and wiggles
    await user.type(input, 'aa');

    expect(tooltip).not.toHaveClass('invisible');
    expect(tooltip).toHaveClass('animate-wiggle');
    await waitFor(() => expect(tooltip).not.toHaveClass('animate-wiggle'));
  });
});
