import { create } from '@storybook/theming';

// @ts-expect-error: TODO(mc, 2023-03-23): are we missing `base` here?
export default create({
  brandImage: 'https://www.viam.com/static/logo.svg',
  fontBase: '"Public Sans", sans-serif',
  appBg: '#333',
});
