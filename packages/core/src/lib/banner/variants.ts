export const BannerVariant = {
  Info: 'info',
  Warning: 'warning',
  Danger: 'danger',
  Success: 'success',
} as const;

export type BannerVariantType =
  (typeof BannerVariant)[keyof typeof BannerVariant];
