import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/svelte';
import { ResourcePill } from '$lib';
import { cxTestArguments, cxTestResults } from './cx-test';

describe('ResourcePill', () => {
  it('Renders text within the resource pill if a value attribute is specified', () => {
    render(ResourcePill, { value: 'test', icon: 'viam-service' });
    expect(screen.getByText('test')).toBeVisible();
  });

  it('Renders a normal resource pill that is removable if removable attribute has been specified', () => {
    render(ResourcePill, { icon: 'viam-service', removable: true });
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('Renders a resource pill that is not removable if a removable attribute of true has not been specified', () => {
    render(ResourcePill);
    expect(screen.queryByRole('button')).toBeNull();
  });

  it('Renders a resource pill that is not removable if a removable attribute of false has been specified', () => {
    render(ResourcePill, { icon: 'viam-service', removable: false });
    expect(screen.queryByRole('button')).toBeNull();
  });

  it('Confirms default resource pill is clickable', async () => {
    const { component } = render(ResourcePill, {
      icon: 'viam-service',
      removable: true,
    });
    const onClick = vi.fn();
    component.$on('remove', onClick);
    await fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('Renders with the passed cx classes', () => {
    render(ResourcePill, {
      value: 'test',
      icon: 'viam-service',
      cx: cxTestArguments,
    });
    expect(screen.getByText('test').parentElement).toHaveClass(cxTestResults);
  });
});
