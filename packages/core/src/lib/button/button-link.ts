/**
 * Link styled to look like a button.
 *
 * Currently, only the "ghost" variant is implemented.
 *
 * @function
 */

import { twJoin, twMerge, type ClassNameValue } from 'tailwind-merge';

export type ButtonLinkVariant = 'ghost' | 'dark';

export interface ButtonLinkAttributes {
  variant?: ButtonLinkVariant;
  extraClasses?: ClassNameValue;
}

const BUTTON_LINK_CLASSES =
  'flex h-7.5 items-center gap-1.5 whitespace-nowrap px-3 py-1.5 text-xs';

const BUTTON_LINK_VARIANT_CLASSES = {
  ghost: 'text-default hover:bg-ghost-light active:bg-ghost-medium',
  dark: 'border border-gray-9 bg-gray-9 text-white hover:border-black hover:bg-black active:bg-[#000]',
} as const;

// Just export the classes option (I can handle overrides myself)
export const BUTTON_LINK_GHOST = twJoin(
  BUTTON_LINK_CLASSES,
  BUTTON_LINK_VARIANT_CLASSES.ghost
);

export const BUTTON_LINK_DARK = twJoin(
  BUTTON_LINK_CLASSES,
  BUTTON_LINK_VARIANT_CLASSES.dark
);

// Give me a function to generate the classes function (allows overrides)
export const buttonLinkStyles = ({
  variant = 'ghost',
  extraClasses = '',
}: ButtonLinkAttributes) =>
  twMerge(
    BUTTON_LINK_CLASSES,
    BUTTON_LINK_VARIANT_CLASSES[variant],
    extraClasses
  );
