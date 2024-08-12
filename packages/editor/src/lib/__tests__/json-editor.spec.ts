import { describe, expect, it, vi } from 'vitest';
import type { ComponentProps } from 'svelte';
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';

import Subject from '../json-editor.svelte';

const renderSubject = (props?: Partial<ComponentProps<Subject>>) => {
  return render(Subject, {
    label: 'test-editor',
    initialValue: '',
    debouncePeriodMS: 0,
    ...props,
  });
};

describe('json editor', () => {
  it('should render an editor with initial value', async () => {
    const initialJson = { foo: 'bar', baz: 42 };
    renderSubject({
      initialValue: JSON.stringify(initialJson, null, 2),
    });
    const editor = await screen.findByLabelText('test-editor');
    expect(editor).toHaveTextContent(/\{\s*"foo": "bar",\s*"baz": 42\s*\}/u);
  });

  it('should call onChange when content changes', async () => {
    const onChange = vi.fn();
    renderSubject({ onChange });
    const editor = await screen.findByLabelText('test-editor');

    await userEvent.type(editor, '{{"key": "value"}');

    expect(onChange).toHaveBeenCalledWith('{"key": "value"}');
  });

  it('should set readonly mode correctly', async () => {
    renderSubject({ readonly: true });
    const editor = await screen.findByLabelText('test-editor');
    expect(editor).toHaveAttribute('aria-readonly', 'true');
  });

  it('should show error state when isInvalid is true', async () => {
    renderSubject({ isInvalid: true, errorMessageID: 'error-message' });
    const editor = await screen.findByLabelText('test-editor');
    expect(editor).toHaveAttribute('aria-invalid', 'true');
    expect(editor).toHaveAttribute('aria-errormessage', 'error-message');
  });

  it('should update when initialValue prop changes', async () => {
    const { rerender } = renderSubject({
      initialValue: '{"initial": "value"}',
    });
    let editor = await screen.findByLabelText('test-editor');
    expect(editor).toHaveTextContent(/"initial": "value"/u);

    rerender({ initialValue: '{"updated": "value"}', label: 'test-editor' });
    editor = await screen.findByLabelText('test-editor');
    expect(editor).toHaveTextContent(/"updated": "value"/u);
  });

  it('should destroy the editor when the component is unmounted', () => {
    const { unmount } = renderSubject();
    expect(screen.queryByLabelText('test-editor')).toBeInTheDocument();
    unmount();
    expect(screen.queryByLabelText('test-editor')).not.toBeInTheDocument();
  });
});
