const { svelte } = require('@sveltejs/vite-plugin-svelte')
const { preprocess } = require('../svelte.config.js')

// const webpackFinal = async (config) => {
//   if (process.env.NODE_ENV !== 'development') {
//     config.output.publicPath = '/prime/'
//   }
  
//   return config
// }

module.exports = {
  stories: [
    '../src/stories/docs/introduction.stories.mdx',
    '../src/stories/**/*.stories.mdx',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  core: {
    builder: '@storybook/builder-vite'
  },
  svelteOptions: {
    preprocess
  },
  features: {
    storyStoreV7: true
  },
  async viteFinal(config) {
    const index = config.plugins.findIndex(({name}) => name === 'vite-plugin-svelte')
    config.plugins.splice(index, 1)

    config.plugins.push(
      svelte({
        compilerOptions: { customElement: true },
        preprocess
      })
    )

    // if (process.env.NODE_ENV !== 'development') {
    //   config.output.publicPath = '/prime/'
    // }

    return config
  },
  // webpackFinal,
  // managerWebpack: webpackFinal,
}
