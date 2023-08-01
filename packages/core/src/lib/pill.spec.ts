import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/svelte';
import Pill from './pill.svelte';

describe('Pill', () => {
  it('Renders text within the pill if a value attribute is specified', () => {
    render(Pill, { value: 'test' });
    expect(screen.getByText('test')).toBeVisible();
  });

  it('Renders a normal pill that is not readonly if no readonly attribute has been specified', () => {
    render(Pill);
    expect(screen.getByRole('button')).toBeVisible();
  });

  it('Renders a pill that is readonly if a readonly attribute of true has been specified', () => {
    render(Pill, { readonly: true });
    expect(screen.queryByRole('button')).toBeNull();
  });

  it('Renders a pill that is not readonly if a readonly attribute of false has been specified', () => {
    render(Pill, { readonly: false });
    expect(screen.getByRole('button')).toBeVisible();
  });

  it('Renders a normal pill if no disabled attribute has been specified', () => {
    render(Pill, { value: 'test' });
    expect(screen.getByText('test').parentElement).toHaveAttribute(
      'aria-disabled',
      'false'
    );
  });

  it('Renders a disabled pill if a disabled attribute of true has been specified', () => {
    render(Pill, { value: 'test', disabled: true });
    expect(screen.getByText('test').parentElement).toHaveAttribute(
      'aria-disabled',
      'true'
    );
  });

  it('Renders a normal pill if a disabled attribute of false has been specified', () => {
    render(Pill, { value: 'test', disabled: false });
    expect(screen.getByText('test').parentElement).toHaveAttribute(
      'aria-disabled',
      'false'
    );
  });

  it('Confirms default pill is clickable', async () => {
    const { component } = render(Pill);
    const onClick = vi.fn();
    component.$on('remove', onClick);
    await fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('Confirms disabled pill is not clickable', async () => {
    const { component } = render(Pill, { disabled: true });
    const onClick = vi.fn();
    component.$on('remove', onClick);
    await fireEvent.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });
});
