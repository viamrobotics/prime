<svelte:options immutable />

<script lang="ts">
type Size = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';

import {
  mdiCameraOutline,
  mdiVideoOutline,
  mdiAlertCircleOutline,
  mdiAlertOutline,
  mdiCancel,
  mdiBroadcastOff,
  mdiPlus,
  mdiClose,
  mdiContentCopy,
  mdiMinus,
  mdiSend,
  mdiUndo,
  mdiBroadcast,
  mdiDownload,
  mdiImageFilterCenterFocus,
  mdiArrowExpandAll,
  mdiChevronDown,
  mdiMenu,
  mdiDotsHorizontal,
  mdiArrowUp,
  mdiCheck,
  mdiOpenInNew,
  mdiHelpCircleOutline,
  mdiCameraFlipOutline,
  mdiArrowTopRightBottomLeft,
  mdiRefresh,
  mdiInformationOutline,
  mdiPauseCircleOutline,
  mdiPlayCircleOutline,
  mdiLogout,
  mdiInstagram,
  mdiContentSaveOutline,
  mdiPencilOutline,
  mdiStopCircleOutline,
  mdiTwitter,
  mdiLinkedin,
  mdiTrashCanOutline,
  mdiCog,
  mdiFilterOutline,
  mdiGithub,
  mdiFileDownloadOutline,
  mdiCheckCircle,
  mdiAlertCircle,
  mdiCreditCardOutline,
  mdiAccountMultiple,
} from '@mdi/js';

import cx from 'classnames';

export let name = '';

export let fill = '';
const fillColor: Record<string, string> = {
  reversed: '#FFF',
  warn: '#ddab3f',
  danger: '#be3536',
  disabled: '#d7d7d9',
};

const sizes: Record<Size, string> = {
  xs: 'w-3 h-3',
  sm: 'w-3.5 h-3.5',
  base: 'w-4 h-4',
  lg: 'w-4.5 h-4.5',
  xl: 'w-5 h-5',
  '2xl': 'w-6 h-6',
  '3xl': 'w-7 h-7',
  '4xl': 'w-8 h-8',
};

export let size: Size = 'base';

const paths: Record<string, string> = {
  broadcast: mdiBroadcast,
  cancel: mdiCancel,
  check: mdiCheck,
  close: mdiClose,
  cog: mdiCog,
  download: mdiDownload,
  instagram: mdiInstagram,
  linkedin: mdiLinkedin,
  logout: mdiLogout,
  github: mdiGithub,
  menu: mdiMenu,
  minus: mdiMinus,
  plus: mdiPlus,
  refresh: mdiRefresh,
  send: mdiSend,
  twitter: mdiTwitter,
  undo: mdiUndo,
  'account-multiple-outline': mdiAccountMultiple,
  'alert-circle': mdiAlertCircle,
  'alert-circle-outline': mdiAlertCircleOutline,
  'alert-outline': mdiAlertOutline,
  'arrow-expand-all': mdiArrowExpandAll,
  'arrow-top-right-bottom-left': mdiArrowTopRightBottomLeft,
  'arrow-up': mdiArrowUp,
  'broadcast-off': mdiBroadcastOff,
  'camera-flip-outline': mdiCameraFlipOutline,
  'camera-outline': mdiCameraOutline,
  'check-circle': mdiCheckCircle,
  'chevron-down': mdiChevronDown,
  'content-copy': mdiContentCopy,
  'content-save-outline': mdiContentSaveOutline,
  'credit-card-outline': mdiCreditCardOutline,
  'dots-horizontal': mdiDotsHorizontal,
  'file-download-outline': mdiFileDownloadOutline,
  'filter-outline': mdiFilterOutline,
  'help-circle-outline': mdiHelpCircleOutline,
  'image-filter-center-focus': mdiImageFilterCenterFocus,
  'information-outline': mdiInformationOutline,
  'open-in-new': mdiOpenInNew,
  'pause-circle-outline': mdiPauseCircleOutline,
  'pencil-outline': mdiPencilOutline,
  'play-circle-outline': mdiPlayCircleOutline,
  'stop-circle-outline': mdiStopCircleOutline,
  'trash-can-outline': mdiTrashCanOutline,
  'video-outline': mdiVideoOutline,
};

const hasNameProperty = Object.hasOwn(paths, name);
</script>

<svg
  class={cx(sizes[size], {
    'inline-block': hasNameProperty,
    hidden: !hasNameProperty,
  })}
  viewBox="0 0 24 24"
  aria-labelledby="name"
  role="img"
>
  {#if sizes[size]}
    <title id={name}>{`${name} icon`}</title>
    <path d={paths[name]} fill={fillColor[fill]} />
  {/if}
</svg>
