/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { SvelteToast, toast } from '@zerodevx/svelte-toast/dist';

const app = new SvelteToast({
  target: document.body,
  options: {
    duration: 1000,
    initial: 0,
    dismissable: false,
    pausable: true,
  },
});

const toastTheme = {
  '--toastWidth': '360px',
  '--toastBackground': 'transparent',
  '--toastBoxShadow': 'none',
  '--toastBarBackground': 'transparent',
  '--toastPadding': '0',
  '--toastMsgPadding': '0',
};

const createText = (
  variant: string,
  title: string,
  text?: string,
  action?: string
) => {
  return `
    <v-notify variant='${variant}' title='${title}' message='${text ?? ''}'>
      ${
        action
          ? `<v-button variant='inverse-primary' label='${action}'></v-button>`
          : ''
      }
    </v-notify>
  `;
};

const info = (title: string, text?: string, action?: string) => {
  toast.push(createText('info', title, text, action), {
    theme: toastTheme,
  });
};

const warn = (title: string, text?: string, action?: string) => {
  toast.push(createText('warning', title, text, action), {
    theme: toastTheme,
  });
};

const danger = (title: string, text?: string, action?: string) => {
  toast.push(createText('danger', title, text, action), {
    theme: toastTheme,
  });
};

const success = (title: string, text?: string, action?: string) => {
  toast.push(createText('success', title, text, action), {
    theme: toastTheme,
  });
};

export const notify = {
  info,
  warn,
  danger,
  success,
};
