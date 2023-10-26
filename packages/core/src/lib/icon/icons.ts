import * as MDI from '@mdi/js';

/**
 * Keys should match MDI name
 * e.g. 'account-multiple' for MDI.mdiAccountMultiple
 */
export const paths = {
  'account-multiple': MDI.mdiAccountMultiple,
  'alert-circle-outline': MDI.mdiAlertCircleOutline,
  'alert-circle': MDI.mdiAlertCircle,
  'alert-outline': MDI.mdiAlertOutline,
  alert: MDI.mdiAlert,
  'arrow-collapse-left': MDI.mdiArrowCollapseLeft,
  'arrow-collapse-right': MDI.mdiArrowCollapseRight,
  'arrow-expand-all': MDI.mdiArrowExpandAll,
  'arrow-expand-left': MDI.mdiArrowExpandLeft,
  'arrow-expand-right': MDI.mdiArrowExpandRight,
  'arrow-left': MDI.mdiArrowLeft,
  'arrow-right': MDI.mdiArrowRight,
  'arrow-top-right-bottom-left': MDI.mdiArrowTopRightBottomLeft,
  'arrow-up': MDI.mdiArrowUp,
  'axis-arrow': MDI.mdiAxisArrow,
  'broadcast-off': MDI.mdiBroadcastOff,
  broadcast: MDI.mdiBroadcast,
  'camera-flip-outline': MDI.mdiCameraFlipOutline,
  'camera-outline': MDI.mdiCameraOutline,
  cancel: MDI.mdiCancel,
  'check-circle': MDI.mdiCheckCircle,
  check: MDI.mdiCheck,
  'chevron-up': MDI.mdiChevronUp,
  'chevron-right': MDI.mdiChevronRight,
  'chevron-down': MDI.mdiChevronDown,
  'chevron-left': MDI.mdiChevronLeft,
  close: MDI.mdiClose,
  'code-braces': MDI.mdiCodeBraces,
  cog: MDI.mdiCog,
  'content-copy': MDI.mdiContentCopy,
  'content-duplicate': MDI.mdiContentDuplicate,
  'content-save-outline': MDI.mdiContentSaveOutline,
  'credit-card-outline': MDI.mdiCreditCardOutline,
  'dots-horizontal': MDI.mdiDotsHorizontal,
  download: MDI.mdiDownload,
  earth: MDI.mdiEarth,
  'file-download-outline': MDI.mdiFileDownloadOutline,
  'filter-outline': MDI.mdiFilterOutline,
  github: MDI.mdiGithub,
  'help-circle-outline': MDI.mdiHelpCircleOutline,
  'image-filter-center-focus': MDI.mdiImageFilterCenterFocus,
  'information-outline': MDI.mdiInformationOutline,
  information: MDI.mdiInformation,
  instagram: MDI.mdiInstagram,
  linkedin: MDI.mdiLinkedin,
  lock: MDI.mdiLockOutline,
  logout: MDI.mdiLogout,
  magnify: MDI.mdiMagnify,
  menu: MDI.mdiMenu,
  minus: MDI.mdiMinus,
  'open-in-new': MDI.mdiOpenInNew,
  'package-variant-closed': MDI.mdiPackageVariantClosed,
  'pause-circle-outline': MDI.mdiPauseCircleOutline,
  'pencil-outline': MDI.mdiPencilOutline,
  'play-circle-outline': MDI.mdiPlayCircleOutline,
  plus: MDI.mdiPlus,
  'radiobox-blank': MDI.mdiRadioboxBlank,
  'radiobox-indeterminate-variant': MDI.mdiRadioboxIndeterminateVariant,
  'radiobox-marked': MDI.mdiRadioboxMarked,
  refresh: MDI.mdiRefresh,
  'selection-ellipse': MDI.mdiSelectionEllipse,
  send: MDI.mdiSend,
  'stop-circle-outline': MDI.mdiStopCircleOutline,
  tools: MDI.mdiTools,
  'trash-can-outline': MDI.mdiTrashCanOutline,
  twitter: MDI.mdiTwitter,
  undo: MDI.mdiUndo,
  'video-outline': MDI.mdiVideoOutline,
  'account-group-outline': MDI.mdiAccountGroupOutline,
  'robot-outline': MDI.mdiRobotOutline,
  domain: MDI.mdiDomain,
  'database-outline': MDI.mdiDatabaseOutline,
} as const;

/**
 * The possible icon names that can be rendered. This is good for typing props.
 */
export type IconName = keyof typeof paths;
