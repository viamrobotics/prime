export const ToastVariant = {
  Neutral: 'neutral',
  Upload: 'upload',
  Success: 'success',
} as const;

export type ToastVariantType = (typeof ToastVariant)[keyof typeof ToastVariant];
