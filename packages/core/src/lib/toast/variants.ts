export const ToastVariant = {
  Info: {
    icon: 'information-outline',
    iconClasses: 'text-info-dark',
    label: 'info',
  },
  Warning: {
    icon: 'alert',
    iconClasses: 'text-warning-bright',
    label: 'warning',
  },
  Danger: {
    icon: 'alert-circle',
    iconClasses: 'text-danger-dark',
    label: 'danger',
  },
  Success: {
    icon: 'check-circle',
    iconClasses: 'text-success-dark',
    label: 'success',
  },
  Neutral: {
    icon: 'domain',
    iconClasses: 'text-gray-7',
    label: 'neutral',
  },
} as const;

export type ToastVariantType = (typeof ToastVariant)[keyof typeof ToastVariant];
