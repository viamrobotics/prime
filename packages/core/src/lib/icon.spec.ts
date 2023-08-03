import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import Icon from './icon/icon.svelte';

describe('Icon', () => {
  it('Renders the correct icon', () => {
    render(Icon, { name: 'camera-outline' });
    expect(screen.getByRole('img')).toBeVisible();
  });
});
