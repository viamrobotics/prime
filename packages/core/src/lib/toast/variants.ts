export const ToastVariant = {
  Info: 'info',
  Warning: 'warning',
  Danger: 'danger',
  Success: 'success',
  Neutral: 'neutral',
} as const;

export type ToastVariantType = (typeof ToastVariant)[keyof typeof ToastVariant];
