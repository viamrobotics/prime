import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import { Icon } from '$lib';
import { cxTestArguments, cxTestResults } from '$lib/__tests__/cx-test';

describe('Icon', () => {
  it('Renders an icon', () => {
    const { container } = render(Icon, { name: 'camera-outline' });
    expect(container.querySelector('svg')).toBeVisible();
  });

  it('Renders an icon with the correct name attribute', () => {
    const { container } = render(Icon, { name: 'camera-outline' });
    expect(container.querySelector('svg[name=camera-outline]')).toBeVisible();
  });

  it('Renders an extra small icon', () => {
    const { container } = render(Icon, { name: 'cog', size: 'xs' });
    expect(container.querySelector('svg')).toHaveClass('w-3 h-3 ');
  });

  it('Renders a small icon', () => {
    const { container } = render(Icon, { name: 'cog', size: 'sm' });
    expect(container.querySelector('svg')).toHaveClass('w-3.5 h-3.5 ');
  });

  it('Renders the default sized icon', () => {
    const { container } = render(Icon, { name: 'cog', size: 'base' });
    expect(container.querySelector('svg')).toHaveClass('w-4 h-4 ');
  });

  it('Renders a large icon', () => {
    const { container } = render(Icon, { name: 'cog', size: 'lg' });
    expect(container.querySelector('svg')).toHaveClass('w-5 h-5 ');
  });

  it('Renders an extra large icon', () => {
    const { container } = render(Icon, { name: 'cog', size: 'xl' });
    expect(container.querySelector('svg')).toHaveClass('w-6 h-6 ');
  });

  it('Renders a 2xl icon', () => {
    const { container } = render(Icon, { name: 'cog', size: '2xl' });
    expect(container.querySelector('svg')).toHaveClass('w-7 h-7 ');
  });

  it('Renders a 3xl icon', () => {
    const { container } = render(Icon, { name: 'cog', size: '3xl' });
    expect(container.querySelector('svg')).toHaveClass('w-8 h-8 ');
  });

  it('Renders a 4xl icon', () => {
    const { container } = render(Icon, { name: 'cog', size: '4xl' });
    expect(container.querySelector('svg')).toHaveClass('w-9 h-9 ');
  });

  it('Renders with the passed cx classes', () => {
    const { container } = render(Icon, { name: 'cog', cx: cxTestArguments });
    expect(container.querySelector('svg')).toHaveClass(cxTestResults);
  });
});
