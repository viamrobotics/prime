import type { Meta, StoryObj } from '@storybook/html';
import { notify } from '../main';

const meta: Meta = {
  title: 'Elements/Notification',
  parameters: {
    docs: {
      source: {
        open: true,
        code: `
import { notify } from '@viamrobotics/prime;

notify.info('This is an info.')
notify.warn('This is a warning.')
notify.danger('This is an error.')
notify.success('This is a success.')

    `.trim(),
      },
    },
  },
};

const render = () => {
  const container = document.createElement('div');
  container.className = 'flex gap-2';

  const variants = [
    { method: 'info', title: 'This is an info.', message: '' },
    { method: 'warn', title: 'This is a warning.', message: '' },
    {
      method: 'danger',
      title: 'This is an error.',
      message: 'Something bad happened',
    },
    { method: 'success', title: 'This is a success.', message: '' },
  ] as const;

  for (const { method, title, message } of variants) {
    const button = document.createElement('v-button');
    button.setAttribute('label', method);
    button.addEventListener('click', () => notify[method](title, message));
    container.append(button);
  }

  return container;
};

export default meta;

export const Primary: StoryObj = { render };
