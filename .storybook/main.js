import { preprocess } from '../svelte.config.js';
import { mergeConfig } from 'vite';

export default {
  stories: [
    '../src/stories/docs/introduction.stories.mdx',
    '../src/stories/**/*.stories.mdx',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
  ],
  svelteOptions: {
    preprocess,
    compilerOptions: {
      customElement: true,
    },
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      base: '/'
    });
  },
  framework: {
    name: '@storybook/html-vite',
    options: {}
  },
  features: {
    modernInlineRender: true,
    storyStoreV7: true,
  },
};