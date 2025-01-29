import plugin from 'tailwindcss/plugin';
import type { OptionalConfig } from 'tailwindcss/types/config';

export const plugins = [
  plugin(({ addUtilities, matchUtilities, theme, addComponents }) => {
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
      { values: theme('width') }
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

    matchUtilities(
      {
        'slider-track': (value: string) => ({
          '&::-webkit-slider-runnable-track': {
            background: value,
          },
          '&::-moz-range-track': {
            background: value,
          },
          '&::-ms-track': {
            background: 'transparent',
          },
          '&::-ms-fill-lower': {
            background: value,
          },
          '&::-ms-fill-upper': {
            background: value,
          },
        }),
      },
      { values: theme('colors') }
    );

    matchUtilities(
      {
        'slider-track-w': (value: string) => ({
          '&::-webkit-slider-runnable-track': {
            width: value,
          },
          '&::-moz-range-track': {
            width: value,
          },
          '&::-ms-track': {
            width: value,
          },
        }),
      },
      { values: theme('width') }
    );

    matchUtilities(
      {
        'slider-track-h': (value: string) => ({
          '&::-webkit-slider-runnable-track': {
            height: value,
          },
          '&::-moz-range-track': {
            height: value,
          },
          '&::-ms-track': {
            height: value,
          },
        }),
      },
      { values: theme('height') }
    );

    matchUtilities(
      {
        'slider-track-cursor': (value: string) => ({
          '&::-webkit-slider-runnable-track': {
            cursor: value,
          },
          '&::-moz-range-track': {
            cursor: value,
          },
          '&::-ms-track': {
            cursor: value,
          },
        }),
      },
      { values: theme('cursor') }
    );

    matchUtilities(
      {
        'slider-thumb': (value: string) => ({
          '&::-webkit-slider-thumb': {
            background: value,
          },
          '&::-moz-range-thumb': {
            background: value,
          },
          '&::-ms-thumb': {
            background: value,
          },
        }),
      },
      {
        values: {
          ...theme('backgroundColor'),
        },
      }
    );

    matchUtilities(
      {
        'slider-thumb-w': (value: string) => ({
          '&::-webkit-slider-thumb': {
            width: value,
          },
          '&::-moz-range-thumb': {
            width: value,
          },
          '&::-ms-thumb': {
            width: value,
          },
        }),
      },
      { values: theme('width') }
    );

    matchUtilities(
      {
        'slider-thumb-h': (value: string) => ({
          '&::-webkit-slider-thumb': {
            height: value,
            marginTop: `calc(-${value} / 2)`,
          },
          '&::-moz-range-thumb': {
            height: value,
          },
          '&::-ms-thumb': {
            height: value,
          },
        }),
      },
      { values: theme('height') }
    );

    /*
     * The default border properties were causing rendering issues, so we
     * split the width utility into it's own class to avoid that
     */
    matchUtilities(
      {
        'slider-thumb-border': (value: string) => ({
          '&::-webkit-slider-thumb': {
            borderWidth: value,
          },
          '&::-moz-range-thumb': {
            borderWidth: value,
          },
          '&::-ms-thumb': {
            borderWidth: value,
          },
        }),
      },
      { values: theme('borderWidth') }
    );

    matchUtilities(
      {
        'slider-thumb-border': (value: string) => ({
          '&::-webkit-slider-thumb': {
            borderStyle: value,
          },
          '&::-moz-range-thumb': {
            borderStyle: value,
          },
          '&::-ms-thumb': {
            borderStyle: value,
          },
        }),
      },
      {
        values: {
          DEFAULT: 'solid',
          solid: 'solid',
          dashed: 'dashed',
          dotted: 'dotted',
          double: 'double',
        },
      }
    );

    matchUtilities(
      {
        'slider-thumb-border': (value: string) => ({
          '&::-webkit-slider-thumb': {
            borderColor: value,
          },
          '&::-moz-range-thumb': {
            borderColor: value,
          },
          '&::-ms-thumb': {
            borderColor: value,
          },
        }),
      },
      {
        values: {
          ...theme('borderColor'),
          DEFAULT: theme('borderColor.light'),
        },
      }
    );

    matchUtilities(
      {
        'slider-thumb-border': (value: string) => ({
          '&::-webkit-slider-thumb': {
            borderRadius: value,
          },
          '&::-moz-range-thumb': {
            borderRadius: value,
          },
          '&::-ms-thumb': {
            borderRadius: value,
          },
        }),
      },
      {
        values: { ...theme('borderRadius'), DEFAULT: '9999px' },
      }
    );

    matchUtilities(
      {
        'slider-thumb-cursor': (value: string) => ({
          '&::-webkit-slider-thumb': {
            cursor: value,
          },
          '&::-moz-range-thumb': {
            cursor: value,
          },
          '&::-ms-thumb': {
            cursor: value,
          },
        }),
      },
      { values: theme('cursor') }
    );


    /* Table style guide with custom classes */
    addComponents({
      '.grid-container': {
        '@apply w-full border border-b-0 border-light text-sm': {},
      },
      '.table-header': {
        '@apply h-8 bg-light text-xs': {},
      },
      '.table-header-cell': {
        '@apply h-8 min-h-0 content-center items-center truncate border-b border-light p-2 text-subtle-1':
          {},
      },
      '.table-cell': {
        '@apply min-h-12 content-center items-center truncate border-b border-light p-2': {},
      },
      '.table-cell-link': {
        '@apply flex h-full w-full items-center hover:underline': {},
      },
      '.table-cell-flex': {
        '@apply flex items-center gap-2': {},
      },
    });
  }),
] satisfies OptionalConfig['plugins'];
