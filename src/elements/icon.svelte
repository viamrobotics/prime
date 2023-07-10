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
} from '@mdi/js';

import cx from 'classnames';
import { addStyles } from '../lib/index';

export let name = '';
export let size: Size = 'base';

const paths: Record<string, string> = {
  'camera-outline': mdiCameraOutline,
  'video-outline': mdiVideoOutline,
  'alert-circle-outline': mdiAlertCircleOutline,
  'alert-outline': mdiAlertOutline,
  cancel: mdiCancel,
  'broadcast-off': mdiBroadcastOff,
  plus: mdiPlus,
  close: mdiClose,
  'content-copy': mdiContentCopy,
  minus: mdiMinus,
  send: mdiSend,
  undo: mdiUndo,
  broadcast: mdiBroadcast,
  download: mdiDownload,
  'image-filter-center-focus': mdiImageFilterCenterFocus,
  'arrow-expand-all': mdiArrowExpandAll,
  'chevron-down': mdiChevronDown,
  menu: mdiMenu,
  'dots-horizontal': mdiDotsHorizontal,
  'arrow-up': mdiArrowUp,
  check: mdiCheck,
  'open-in-new': mdiOpenInNew,
  cog: mdiCog,
  'help-circle-outline': mdiHelpCircleOutline,
  'camera-flip-outline': mdiCameraFlipOutline,
  'filter-outline': mdiFilterOutline,
  'arrow-top-right-bottom-left': mdiArrowTopRightBottomLeft,
  refresh: mdiRefresh,
  'information-outline': mdiInformationOutline,
  'pause-circle-outline': mdiPauseCircleOutline,
  'play-circle-outline': mdiPlayCircleOutline,
  logout: mdiLogout,
  instagram: mdiInstagram,
  'content-save-outline': mdiContentSaveOutline,
  'pencil-outline': mdiPencilOutline,
  'stop-circle-outline': mdiStopCircleOutline,
  twitter: mdiTwitter,
  linkedin: mdiLinkedin,
  'trash-can-outline': mdiTrashCanOutline,
};

addStyles();
</script>

<svg
  class={cx(`w-4 h-4`, {
    'text-xs': size === 'xs',
    'text-sm': size === 'sm',
    'text-base': size === 'base',
    'text-lg': size === 'lg',
    'text-xl': size === 'xl',
    'text-2xl': size === '2xl',
    'text-3xl': size === '3xl',
    'text-4xl': size === '4xl',
  })}
  viewBox="0 0 24 24"
  aria-labelledby={paths[name]}
  role="img"
>
  <title id={paths[name]}>${paths[name]?.replace('-', ' ')} icon</title>
  <path d={paths[name]} />
</svg>
