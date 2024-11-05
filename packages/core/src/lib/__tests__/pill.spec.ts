import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/svelte';
import { Pill } from '$lib';
import { cxTestArguments, cxTestResults } from './cx-test';
import userEvent from '@testing-library/user-event';

describe('Pill', () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup();
  });

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

  it('Renders with the passed iconCx classes', () => {
    render(Pill, { value: 'test', icon: 'cog', iconCx: cxTestArguments });
    expect(screen.getByTestId('icon-cog')).toHaveClass(cxTestResults);
  });

  it('Renders with the passed href', () => {
    render(Pill, { value: 'link', href: 'https://www.viam.com' });
    expect(screen.getByRole('link', { name: 'link' })).toHaveAttribute(
      'href',
      'https://www.viam.com'
    );
  });

  it('Renders icon tooltip when hovered', async () => {
    render(Pill, { value: 'test', icon: 'cog', iconTooltip: 'Live' });

    const icon = screen.getByTestId('icon-cog');

    await user.hover(icon);

    const tooltip = screen.getByRole('tooltip');

    expect(tooltip).not.toHaveClass('hidden');
    expect(tooltip).toHaveTextContent('Live');
  });
});
