import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import Notify from './notify.svelte';
import NotifySlot from './notify.spec.svelte';

describe('Notify', () => {
  it('Renders notify element with appropriate title text, message text, if those attributes are specified', () => {
    render(Notify, {
      title: 'This is the title',
      message: 'This is the message.',
    });
    expect(screen.getByText('This is the title')).toBeVisible();
    expect(screen.getByText('This is the message.')).toBeVisible();
  });
});

describe('Notify', () => {
  it('Renders notify with default style if no variant is specified', () => {
    const { container } = render(Notify, {
      title: 'This is the title',
      message: 'This is the message.',
    });
    expect(container.querySelector('.bg-info-dark')).toBeVisible();
    expect(container.querySelector('.text-info-dark')).toBeVisible();
  });
});

describe('Notify', () => {
  it('Renders notify with danger style if the variant is set to danger', () => {
    const { container } = render(Notify, {
      title: 'This is the title',
      message: 'This is the message.',
      variant: 'danger',
    });
    expect(container.querySelector('.bg-danger-dark')).toBeVisible();
    expect(container.querySelector('.text-danger-dark')).toBeVisible();
  });
});

describe('Notify', () => {
  it('Renders notify with warning style if the variant is set to warning', () => {
    const { container } = render(Notify, {
      title: 'This is the title',
      message: 'This is the message.',
      variant: 'warning',
    });
    expect(container.querySelector('.bg-warning-bright')).toBeVisible();
    expect(container.querySelector('.text-warning-bright')).toBeVisible();
  });
});

describe('Notify', () => {
  it('Renders notify with success style if the variant is set to success', () => {
    const { container } = render(Notify, {
      title: 'This is the title',
      message: 'This is the message.',
      variant: 'success',
    });
    expect(container.querySelector('.bg-success-dark')).toBeVisible();
    expect(container.querySelector('.text-success-dark')).toBeVisible();
  });
});

describe('Notify', () => {
  it('Renders notify with info style if the variant is set to info', () => {
    const { container } = render(Notify, {
      title: 'This is the title',
      message: 'This is the message.',
      variant: 'info',
    });
    expect(container.querySelector('.bg-info-dark')).toBeVisible();
    expect(container.querySelector('.text-info-dark')).toBeVisible();
  });
});

describe('Notify', () => {
  it('Renders notify with info style if the variant is set to info', () => {
    render(NotifySlot);
    expect(screen.getByText('title text')).toBeVisible();
    expect(screen.getByText('message text')).toBeVisible();
    expect(screen.getByText('slot text')).toBeVisible();
  });
});
