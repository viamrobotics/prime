import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import Input from './text-input.svelte';

describe('Text Input', () => {
  it('Renders the input', () => {
    render(Input, { placeholder: 'Enter your name' });
    expect(screen.getByPlaceholderText('Enter your name')).toHaveAttribute(
      'type',
      'text'
    );
  });

  it('Renders the input as an email input', () => {
    render(Input, { placeholder: 'Enter your email', type: 'email' });
    expect(screen.getByPlaceholderText('Enter your email')).toHaveAttribute(
      'type',
      'email'
    );
  });

  it('Renders the input as a password input', () => {
    render(Input, { placeholder: 'Enter your password', type: 'password' });
    expect(screen.getByPlaceholderText('Enter your password')).toHaveAttribute(
      'type',
      'password'
    );
  });
});
