import plugin from 'tailwindcss/plugin';
import type { OptionalConfig } from 'tailwindcss/types/config';

export const plugins = [
  plugin(({ addUtilities, matchUtilities, theme }) => {
    addUtilities({
      '.scrollbar-thin': {
        'scrollbar-width': 'thin',
      },
    });

    matchUtilities(
      {
        scrollbar: (value: string) => ({
          scrollbarColor: value,
        }),
      },
      { values: theme('colors') }
    );

    matchUtilities(
      {
        'scrollbar-w': (value: string) => ({
          '&::-webkit-scrollbar': {
            width: value,
          },
        }),
      },
      { values: theme('spacing') }
    );

    matchUtilities(
      {
        'scrollbar-track': (value: string) => ({
          '&::-webkit-scrollbar-track': {
            background: value,
          },
        }),
      },
      { values: theme('colors') }
    );

    matchUtilities(
      {
        'scrollbar-thumb': (value: string) => ({
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: value,
          },
        }),
      },
      { values: theme('colors') }
    );

    matchUtilities(
      {
        'scrollbar-thumb-border': (value: string) => ({
          '&::-webkit-scrollbar-thumb': {
            borderRadius: value,
          },
        }),
      },
      { values: theme('borderRadius') }
    );

    matchUtilities(
      {
        'scrollbar-thumb-border': (value: string) => ({
          '&::-webkit-scrollbar-thumb': {
            borderWidth: value,
          },
        }),
      },
      { values: theme('borderWidth') }
    );

    matchUtilities(
      {
        'scrollbar-thumb-border': (value: string) => ({
          '&::-webkit-scrollbar-thumb': {
            borderColor: value,
          },
        }),
      },
      { values: theme('borderColor') }
    );
  }),
] satisfies OptionalConfig['plugins'];
