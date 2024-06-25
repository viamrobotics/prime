export const ToastVariant = {
  Info: {
    icon: 'information-outline',
    iconClasses: 'text-info-dark',
  },
  Warning: {
    icon: 'alert',
    iconClasses: 'text-warning-bright',
  },
  Danger: {
    icon: 'alert-circle',
    iconClasses: 'text-danger-dark',
  },
  Success: {
    icon: 'check-circle',
    iconClasses: 'text-success-dark',
  },
  Neutral: {
    icon: 'domain',
    iconClasses: 'text-gray-7',
  },
} as const;

export type ToastVariantType = (typeof ToastVariant)[keyof typeof ToastVariant];
