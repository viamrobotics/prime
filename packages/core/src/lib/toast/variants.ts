export const ToastVariant = {
  Info: 'info',
  Warning: 'warning',
  Danger: 'danger',
  Success: 'success',
  Neutral: 'neutral',
} as const;

export const DisplayDetailsByVariant = {
  [ToastVariant.Info]: {
    icon: 'information-outline',
    iconClasses: 'text-info-dark',
    label: 'info',
  },
  [ToastVariant.Warning]: {
    icon: 'alert',
    iconClasses: 'text-warning-bright',
    label: 'warning',
  },
  [ToastVariant.Danger]: {
    icon: 'alert-circle',
    iconClasses: 'text-danger-dark',
    label: 'danger',
  },
  [ToastVariant.Success]: {
    icon: 'check-circle',
    iconClasses: 'text-success-dark',
    label: 'success',
  },
  [ToastVariant.Neutral]: {
    icon: 'domain',
    iconClasses: 'text-gray-7',
    label: 'neutral',
  },
} as const;

export type ToastVariantType = (typeof ToastVariant)[keyof typeof ToastVariant];
