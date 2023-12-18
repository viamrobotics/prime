import type { IconName } from '$lib/icon/icons';

export const ToastVariant = {
  Success: 'success',
} as const;

export const iconName: IconName = 'check-circle';
export const iconClasses = 'text-success-dark';

export type ToastVariantType = (typeof ToastVariant)[keyof typeof ToastVariant];
