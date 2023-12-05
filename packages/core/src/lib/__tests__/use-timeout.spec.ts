import { render, waitFor } from '@testing-library/svelte';
import { describe, expect, it, vi } from 'vitest';
import UseTimeout from './use-timeout.spec.svelte';

describe('useTimeout', () => {
  it('should set and call a handler', async () => {
    const handler = vi.fn();
    render(UseTimeout, { handler });

    expect(handler).not.toHaveBeenCalled();

    await waitFor(() => {
      expect(handler).toHaveBeenCalled();
    });
  });

  it('should set and clear a handler', async () => {
    const handler = vi.fn();
    render(UseTimeout, { handler, shouldClear: true });

    expect(handler).not.toHaveBeenCalled();

    await new Promise((resolve) => {
      setTimeout(resolve, 200);
    });

    expect(handler).not.toHaveBeenCalled();
  });
});
