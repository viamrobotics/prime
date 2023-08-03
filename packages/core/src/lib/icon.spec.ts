import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import Icon from './icon/icon.svelte';

describe('Icon', () => {
  it('Renders an icon', () => {
    render(Icon, { name: 'camera-outline' });
    expect(screen.getByRole('img')).toBeVisible();
  });

  it('Renders the correct icon', () => {
    render(Icon, { name: 'cog' });
    expect(screen.getByRole('img', { name: 'cog icon' })).toBeInTheDocument();
  });

  it('Renders an extra small icon', () => {
    render(Icon, { name: 'cog', size: 'xs' });
    expect(screen.getByRole('img')).toHaveClass('w-3 h-3 ');
  });

  it('Renders a small icon', () => {
    render(Icon, { name: 'cog', size: 'sm' });
    expect(screen.getByRole('img')).toHaveClass('w-3.5 h-3.5 ');
  });

  it('Renders the default sized icon', () => {
    render(Icon, { name: 'cog', size: 'base' });
    expect(screen.getByRole('img')).toHaveClass('w-4 h-4 ');
  });

  it('Renders a large icon', () => {
    render(Icon, { name: 'cog', size: 'lg' });
    expect(screen.getByRole('img')).toHaveClass('w-5 h-5 ');
  });

  it('Renders an extra large icon', () => {
    render(Icon, { name: 'cog', size: 'xl' });
    expect(screen.getByRole('img')).toHaveClass('w-6 h-6 ');
  });

  it('Renders a 2xl icon', () => {
    render(Icon, { name: 'cog', size: '2xl' });
    expect(screen.getByRole('img')).toHaveClass('w-7 h-7 ');
  });

  it('Renders a 3xl icon', () => {
    render(Icon, { name: 'cog', size: '3xl' });
    expect(screen.getByRole('img')).toHaveClass('w-8 h-8 ');
  });

  it('Renders a 4xl icon', () => {
    render(Icon, { name: 'cog', size: '4xl' });
    expect(screen.getByRole('img')).toHaveClass('w-9 h-9 ');
  });
});
