import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/svelte';
import { Pill } from '$lib';
import { cxTestArguments, cxTestResults } from './cx-test';

describe('Pill', () => {
  it('Renders text within the pill if a value attribute is specified', () => {
    render(Pill, { value: 'test' });
    expect(screen.getByText('test')).toBeVisible();
  });

  it('Renders a removable pill', () => {
    render(Pill, { value: 'test' });
    expect(screen.getByLabelText('Remove test')).toBeVisible();
  });

  it('Renders a pill that is readonly if a readonly attribute of true has been specified', () => {
    render(Pill, { readonly: true });
    expect(screen.queryByRole('button')).toBeNull();
  });

  it('Renders a pill that is not readonly if a readonly attribute of false has been specified', () => {
    render(Pill, { value: 'test', readonly: false });
    expect(screen.getByLabelText('Remove test')).toBeVisible();
  });

  it('Renders a normal pill if no disabled attribute has been specified', () => {
    render(Pill, { value: 'test' });
    expect(screen.getByText('test').parentElement).not.toHaveAttribute(
      'aria-disabled'
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
    expect(screen.getByText('test').parentElement).not.toHaveAttribute(
      'aria-disabled'
    );
  });

  it('Renders a resource pill that is not removable if a removable attribute of true has not been specified', () => {
    render(Pill, { variant: 'outlined', removable: false });
    expect(screen.queryByRole('button')).toBeNull();
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

  it('Renders with the passed cx classes', () => {
    render(Pill, { value: 'test', cx: cxTestArguments });
    expect(screen.getByText('test').parentElement).toHaveClass(cxTestResults);
  });
});
