import { ToastContainer, toast } from '../elements/notification';

export default new ToastContainer({ target: document.body });

const info = (title: string, message?: string) => {
  toast.push({ title, message });
};

const warn = (title: string, message?: string) => {
  toast.push({ variant: 'warning', title, message });
};

const danger = (title: string, message?: string) => {
  toast.push({ variant: 'danger', title, message });
};

const success = (title: string, message?: string) => {
  toast.push({ variant: 'success', title, message });
};

export const notify = {
  info,
  warn,
  danger,
  success,
};
