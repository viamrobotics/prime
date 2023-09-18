import type { StorybookConfig } from '@storybook/sveltekit';
import remarkGfm from 'remark-gfm';

const config: StorybookConfig = {
  stories: [
    '../src/stories/docs/**/*.mdx',
    '../src/stories/**/*.mdx',
    '../src/stories/**/*.stories.svelte',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    '@storybook/addon-svelte-csf',
    {
      name: '@storybook/addon-styling',
    },
    {
      name: '@storybook/addon-essentials',
      options: {
        docs: false,
      },
    },
    {
      name: '@storybook/addon-docs',
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
  ],
  framework: {
    name: '@storybook/sveltekit',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
};

export default config;
