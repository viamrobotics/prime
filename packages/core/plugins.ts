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
      { values: theme('colors') ?? {} }
    );

    matchUtilities(
      {
        'scrollbar-w': (value: string) => ({
          '&::-webkit-scrollbar': {
            width: value,
          },
        }),
      },
      { values: theme('width') ?? {} }
    );

    matchUtilities(
      {
        'scrollbar-track': (value: string) => ({
          '&::-webkit-scrollbar-track': {
            background: value,
          },
        }),
      },
      { values: theme('colors') ?? {} }
    );

    matchUtilities(
      {
        'scrollbar-thumb': (value: string) => ({
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: value,
          },
        }),
      },
      { values: theme('colors') ?? {} }
    );

    matchUtilities(
      {
        'scrollbar-thumb-border': (value: string) => ({
          '&::-webkit-scrollbar-thumb': {
            borderRadius: value,
          },
        }),
      },
      { values: theme('borderRadius') ?? {} }
    );

    matchUtilities(
      {
        'scrollbar-thumb-border': (value: string) => ({
          '&::-webkit-scrollbar-thumb': {
            borderWidth: value,
          },
        }),
      },
      { values: theme('borderWidth') ?? {} }
    );

    matchUtilities(
      {
        'scrollbar-thumb-border': (value: string) => ({
          '&::-webkit-scrollbar-thumb': {
            borderColor: value,
          },
        }),
      },
      { values: theme('borderColor') ?? {} }
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
      { values: theme('colors') ?? {} }
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
      { values: theme('width') ?? {} }
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
      { values: theme('height') ?? {} }
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
      { values: theme('cursor') ?? {} }
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
      { values: theme('width') ?? {} }
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
      { values: theme('height') ?? {} }
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
      { values: theme('borderWidth') ?? {} }
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
      { values: theme('cursor') ?? {} }
    );
  }),
] satisfies OptionalConfig['plugins'];
