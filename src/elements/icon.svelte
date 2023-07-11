<svelte:options immutable tag="v-icon" />

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
import { addStyles } from '../lib/index';

export let name = '';
const sizes: Record<Size, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  '4xl': 'text-4xl'
}

export const size = 'base';

const paths: Record<string, string> = {
  cancel: mdiCancel,
  plus: mdiPlus,
  close: mdiClose,
  minus: mdiMinus,
  send: mdiSend,
  undo: mdiUndo,
  broadcast: mdiBroadcast,
  download: mdiDownload,
  menu: mdiMenu,
  check: mdiCheck,
  cog: mdiCog,
  logout: mdiLogout,
  twitter: mdiTwitter,
  github: mdiGithub,
  refresh: mdiRefresh,
  instagram: mdiInstagram,
  linkedin: mdiLinkedin,
  'camera-outline': mdiCameraOutline,
  'video-outline': mdiVideoOutline,
  'alert-circle-outline': mdiAlertCircleOutline,
  'alert-outline': mdiAlertOutline,
  'broadcast-off': mdiBroadcastOff,
  'content-copy': mdiContentCopy,
  'image-filter-center-focus': mdiImageFilterCenterFocus,
  'arrow-expand-all': mdiArrowExpandAll,
  'chevron-down': mdiChevronDown,
  'dots-horizontal': mdiDotsHorizontal,
  'arrow-up': mdiArrowUp,
  'open-in-new': mdiOpenInNew,
  'help-circle-outline': mdiHelpCircleOutline,
  'camera-flip-outline': mdiCameraFlipOutline,
  'filter-outline': mdiFilterOutline,
  'arrow-top-right-bottom-left': mdiArrowTopRightBottomLeft,
  'information-outline': mdiInformationOutline,
  'pause-circle-outline': mdiPauseCircleOutline,
  'play-circle-outline': mdiPlayCircleOutline,
  'content-save-outline': mdiContentSaveOutline,
  'pencil-outline': mdiPencilOutline,
  'stop-circle-outline': mdiStopCircleOutline,
  'trash-can-outline': mdiTrashCanOutline,
  'file-download-outline': mdiFileDownloadOutline,
  'check-circle': mdiCheckCircle,
  'alert-circle': mdiAlertCircle,
  'credit-card-outline': mdiCreditCardOutline,
  'account-multiple-outline': mdiAccountMultiple,
};

addStyles();
</script>

<svg
  class={cx(`w-4 h-4`, sizes[size])}
  viewBox="0 0 24 24"
  aria-labelledby={paths[name]}
  role="img"
>
  <title id={paths[name]}>${paths[name]?.replace('-', ' ')} icon</title>
  <path d={paths[name]} />
</svg>
