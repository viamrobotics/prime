import svelteConfig from '../svelte.config.js';
import { mergeConfig } from 'vite';

/**
 * @type { import('@storybook/html-vite').StorybookConfig & { svelteOptions: import('@sveltejs/vite-plugin-svelte').SvelteOptions}}
 */
const config = {
  stories: [
    '../src/stories/docs/introduction.stories.mdx',
    '../src/stories/docs/**/*.mdx',
    '../src/stories/**/*.mdx',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    '@storybook/addon-mdx-gfm',
  ],
  svelteOptions: {
    preprocess: svelteConfig.preprocess,
    compilerOptions: {
      customElement: true,
    },
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      base: '/',
    });
  },
  framework: {
    name: '@storybook/html-vite',
    options: {},
  },
  features: {
    // @ts-expect-error: this option may have been removed
    // TODO(mc, 2023-03-23): remove if able after upgrading to v7 rc or stable
    modernInlineRender: true,
    storyStoreV7: true,
  },
  docs: {
    autodocs: true,
  },
};
export default config;
