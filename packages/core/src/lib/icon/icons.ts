import * as MDI from '@mdi/js';

export type SimpleIconPath = string;

export interface CustomIcon {
  path: string;
  opacity?: number | undefined;
}

export type IconPath = SimpleIconPath | CustomIcon[];

/**
 * Keys should match MDI name
 * e.g. 'account-multiple' for MDI.mdiAccountMultiple
 */
export const IconPathsByName = {
  'account-group-outline': MDI.mdiAccountGroupOutline,
  'account-multiple': MDI.mdiAccountMultiple,
  'alert-circle-outline': MDI.mdiAlertCircleOutline,
  'alert-circle': MDI.mdiAlertCircle,
  'alert-outline': MDI.mdiAlertOutline,
  alert: MDI.mdiAlert,
  apple: MDI.mdiApple,
  'application-outline': MDI.mdiApplicationOutline,
  'apple-keyboard-command': MDI.mdiAppleKeyboardCommand,
  'arrow-collapse-left': MDI.mdiArrowCollapseLeft,
  'arrow-collapse-right': MDI.mdiArrowCollapseRight,
  'arrow-expand-all': MDI.mdiArrowExpandAll,
  'arrow-expand-left': MDI.mdiArrowExpandLeft,
  'arrow-expand-right': MDI.mdiArrowExpandRight,
  'arrow-left': MDI.mdiArrowLeft,
  'arrow-right': MDI.mdiArrowRight,
  'arrow-top-right-bottom-left': MDI.mdiArrowTopRightBottomLeft,
  'arrow-collapse': MDI.mdiArrowCollapse,
  'arrow-up': MDI.mdiArrowUp,
  article: MDI.mdiTextBoxOutline,
  'axis-arrow': MDI.mdiAxisArrow,
  'backup-restore': MDI.mdiBackupRestore,
  'broadcast-off': MDI.mdiBroadcastOff,
  bug: MDI.mdiBug,
  'bug-outline': MDI.mdiBugOutline,
  broadcast: MDI.mdiBroadcast,
  'card-text-outline': MDI.mdiCardTextOutline,
  'camera-flip-outline': MDI.mdiCameraFlipOutline,
  'camera-outline': MDI.mdiCameraOutline,
  cancel: MDI.mdiCancel,
  'chart-line': MDI.mdiChartLine,
  'check-circle': MDI.mdiCheckCircle,
  check: MDI.mdiCheck,
  'checkbox-blank-outline': MDI.mdiCheckboxBlankOutline,
  'checkbox-indeterminate':
    'M5 3H19C20.1 3 21 3.89 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 3.89 3.89 3 5 3ZM7 13V11H17V13H7Z',
  'checkbox-marked': MDI.mdiCheckboxMarked,
  'chevron-double-up': MDI.mdiChevronDoubleUp,
  'chevron-down': MDI.mdiChevronDown,
  'chevron-left': MDI.mdiChevronLeft,
  'chevron-right': MDI.mdiChevronRight,
  'chevron-up': MDI.mdiChevronUp,
  'circle-md': MDI.mdiCircleMedium,
  'clock-outline': MDI.mdiClockOutline,
  close: MDI.mdiClose,
  'code-braces': MDI.mdiCodeBraces,
  'code-json': MDI.mdiCodeJson,
  cog: MDI.mdiCog,
  console: MDI.mdiConsole,
  'content-copy': MDI.mdiContentCopy,
  'content-duplicate': MDI.mdiContentDuplicate,
  'content-save-outline': MDI.mdiContentSaveOutline,
  'credit-card-outline': MDI.mdiCreditCardOutline,
  'cursor-move':
    'M13 6v5h5V7.7l4.3 4.3-4.3 4.3V13h-5v5h3.3L12 22.3 7.7 18H11v-5H6v3.3L1.7 12 6 7.7V11h5V6H7.7L12 1.7 16.3 6H13Z',
  'database-outline': MDI.mdiDatabaseOutline,
  domain: MDI.mdiDomain,
  'dots-horizontal': MDI.mdiDotsHorizontal,
  download: MDI.mdiDownload,
  drag: MDI.mdiDrag,
  earth: MDI.mdiEarth,
  export: MDI.mdiExport,
  'file-chart-outline': MDI.mdiFileChartOutline,
  'file-download-outline': MDI.mdiFileDownloadOutline,
  'file-swap-outline': MDI.mdiFileSwapOutline,
  'filter-outline': MDI.mdiFilterOutline,
  gamepad: MDI.mdiGamepad,
  github: MDI.mdiGithub,
  'grid-orthographic':
    'M11 11V4H4v7h7Zm0 2H4v7h7v-7Zm2 7v-7h7v7h-7ZM3 22l-1-1V3l1-1h18l1 1v18l-1 1H3Zm17-11h-7V4h7v7Z',
  'grid-perspective':
    'M11 11V4.5H6.7l-1 6.5H11Zm0 2H5.4l-1 6.5H11V13Zm2 6.5V13h5.6l1 6.5H13Zm-10.1 2a.7.7 0 0 1-.8-.9L5 3.1c0-.3.4-.6.7-.6h12.8c.3 0 .6.3.7.6L22 20.6c0 .5-.3.9-.8.9H3ZM18.3 11H13V4.5h4.3l1 6.5Z',
  'help-circle-outline': MDI.mdiHelpCircleOutline,
  history: MDI.mdiHistory,
  'image-filter-center-focus': MDI.mdiImageFilterCenterFocus,
  'information-outline': MDI.mdiInformationOutline,
  information: MDI.mdiInformation,
  instagram: MDI.mdiInstagram,
  'lan-connect': MDI.mdiLanConnect,
  'language-cpp': MDI.mdiLanguageCpp,
  'language-go': MDI.mdiLanguageGo,
  'language-python': MDI.mdiLanguagePython,
  'language-typescript': MDI.mdiLanguageTypescript,
  'layers-triple-outline': MDI.mdiLayersTripleOutline,
  link: MDI.mdiLink,
  linkedin: MDI.mdiLinkedin,
  'link-variant': MDI.mdiLinkVariant,
  linux: MDI.mdiLinux,
  lock: MDI.mdiLockOutline,
  logout: MDI.mdiLogout,
  maintenance:
    'M18.85 21.975C18.7167 21.975 18.5917 21.9542 18.475 21.9125C18.3583 21.8708 18.25 21.8 18.15 21.7L13.05 16.6C12.95 16.5 12.8792 16.3917 12.8375 16.275C12.7958 16.1583 12.775 16.0333 12.775 15.9C12.775 15.7667 12.7958 15.6417 12.8375 15.525C12.8792 15.4083 12.95 15.3 13.05 15.2L15.175 13.075C15.275 12.975 15.3833 12.9042 15.5 12.8625C15.6167 12.8208 15.7417 12.8 15.875 12.8C16.0083 12.8 16.1333 12.8208 16.25 12.8625C16.3667 12.9042 16.475 12.975 16.575 13.075L21.675 18.175C21.775 18.275 21.8458 18.3833 21.8875 18.5C21.9292 18.6167 21.95 18.7417 21.95 18.875C21.95 19.0083 21.9292 19.1333 21.8875 19.25C21.8458 19.3667 21.775 19.475 21.675 19.575L19.55 21.7C19.45 21.8 19.3417 21.8708 19.225 21.9125C19.1083 21.9542 18.9833 21.975 18.85 21.975ZM18.85 19.6L19.575 18.875L15.9 15.2L15.175 15.925L18.85 19.6ZM5.125 22C4.99167 22 4.8625 21.975 4.7375 21.925C4.6125 21.875 4.5 21.8 4.4 21.7L2.3 19.6C2.2 19.5 2.125 19.3875 2.075 19.2625C2.025 19.1375 2 19.0083 2 18.875C2 18.7417 2.025 18.6167 2.075 18.5C2.125 18.3833 2.2 18.275 2.3 18.175L7.6 12.875H9.725L10.575 12.025L6.45 7.9H5.025L2 4.875L4.825 2.05L7.85 5.075V6.5L11.975 10.625L14.875 7.725L13.8 6.65L15.2 5.25H12.375L11.675 4.55L15.225 1L15.925 1.7V4.525L17.325 3.125L20.875 6.675C21.1583 6.95833 21.375 7.27917 21.525 7.6375C21.675 7.99583 21.75 8.375 21.75 8.775C21.75 9.175 21.675 9.55833 21.525 9.925C21.375 10.2917 21.1583 10.6167 20.875 10.9L18.75 8.775L17.35 10.175L16.3 9.125L11.125 14.3V16.4L5.825 21.7C5.725 21.8 5.61667 21.875 5.5 21.925C5.38333 21.975 5.25833 22 5.125 22ZM5.125 19.6L9.375 15.35V14.625H8.65L4.4 18.875L5.125 19.6ZM5.125 19.6L4.4 18.875L4.775 19.225L5.125 19.6Z',
  magnet:
    'M3 17v-6a9 9 0 1 1 18 0v6h-4v-6a5 5 0 0 0-10 0v6m10 2h4v3h-4M3 19h4v3H3',
  'magnet-off':
    'M21 16.8V11A9 9 0 0 0 7.2 3.4l3 3A5 5 0 0 1 17 11v2l4 3.8ZM3 19h4v3H3v-3Z M3 11v6h4v-6c0-.6.1-1.3.4-1.9L17.5 19H17v3h3.6l2 1.8 1.3-1.4-2.9-2.8-.6-.6-2-2-1.4-1.3-8.5-8.3-2.9-2.7L2 1 .5 2.5l3.9 3.7A9 9 0 0 0 3 11Z',
  magnify: MDI.mdiMagnify,
  menu: MDI.mdiMenu,
  minus: MDI.mdiMinus,
  'monitor-dashboard': MDI.mdiMonitorDashboard,
  'multiplication-box': MDI.mdiMultiplicationBox,
  'navigation-variant-outline': MDI.mdiNavigationVariantOutline,
  'navigation-variant': MDI.mdiNavigationVariant,
  'network-outline': MDI.mdiNetworkOutline,
  'open-in-new': MDI.mdiOpenInNew,
  'package-variant-closed': MDI.mdiPackageVariantClosed,
  pause: MDI.mdiPause,
  'pause-circle-outline': MDI.mdiPauseCircleOutline,
  'pencil-outline': MDI.mdiPencilOutline,
  'picture-in-picture-top-right': MDI.mdiPictureInPictureTopRight,
  'play-circle-outline': MDI.mdiPlayCircleOutline,
  plus: MDI.mdiPlus,
  'radiobox-blank': MDI.mdiRadioboxBlank,
  'radiobox-indeterminate-variant': MDI.mdiRadioboxIndeterminateVariant,
  'radiobox-marked': MDI.mdiRadioboxMarked,
  refresh: MDI.mdiRefresh,
  resize:
    'm11 12 4-4h-4V6h7v7h-2V9l-4 4v3h8V4H8v8h3ZM22 2v16H12v4H2V12h4V2h16ZM10 14H4v6h6v-6Z',
  'robot-outline': MDI.mdiRobotOutline,
  'script-text-outline': MDI.mdiScriptTextOutline,
  'selection-ellipse': MDI.mdiSelectionEllipse,
  'selection-drag': MDI.mdiSelectionDrag,
  send: MDI.mdiSend,
  'shield-key-outline': MDI.mdiShieldKeyOutline,
  'stop-circle-outline': MDI.mdiStopCircleOutline,
  sync: MDI.mdiSync,
  table: MDI.mdiTable,
  'tag-outline': MDI.mdiTagOutline,
  tools: MDI.mdiTools,
  'trash-can-outline': MDI.mdiTrashCanOutline,
  'toggle-switch': MDI.mdiToggleSwitch,
  'toggle-switch-off': MDI.mdiToggleSwitchOff,
  'toggle-switch-off-outline': MDI.mdiToggleSwitchOffOutline,
  'toggle-switch-outline': MDI.mdiToggleSwitchOutline,
  twitter: MDI.mdiTwitter,
  undo: MDI.mdiUndo,
  'unfold-less-horizontal': MDI.mdiUnfoldLessHorizontal,
  'unfold-more-horizontal': MDI.mdiUnfoldMoreHorizontal,
  upload: MDI.mdiUpload,
  'viam-component':
    'm12 4-8 8 8 8 8-8-8-8Zm.5-2.4a.8.8 0 0 0-1 0l-9.9 9.9c-.3.3-.3.7 0 1l9.9 9.9c.3.3.7.3 1 0l9.9-9.9c.3-.3.3-.7 0-1l-9.9-9.9Z',
  'viam-flutter':
    'M17 1.7h-5.2L3.5 10 6 12.6l2.3-2.3 8.6-8.6Zm-4.5 12.1 4.4-4.5H12l-.3.1-1.8 1.9-2.6 2.5 2.6 2.6 1.8 1.8s0 .2.2.1h5l-4.4-4.5Z',
  'viam-fragment':
    'M17 22v-2h3v-3h2v3.5c0 .4-.2.7-.5 1-.3.3-.6.5-1 .5H17ZM7 22H3.5c-.4 0-.7-.2-1-.5-.3-.3-.5-.6-.5-1V17h2v3h3v2ZM17 2h3.5c.4 0 .7.2 1 .5.3.3.5.6.5 1V7h-2V4h-3V2ZM7 2v2H4v3H2V3.5c0-.4.2-.7.5-1 .3-.3.6-.5 1-.5H7Zm6 15.3 4-2.4v-4.5l-4 2.3v4.6Zm-1-6.4 4-2.3-4-2.3-4 2.3 4 2.3Zm-5 4 4 2.3v-4.5l-4-2.3v4.5Zm11.2-7.3c.5.3.8.7.8 1.3v6.3c0 .6-.3 1-.8 1.4l-5.4 3.1c-.6.4-1 .4-1.6 0l-5.4-3.1c-.5-.4-.8-.8-.8-1.4V9c0-.6.3-1 .8-1.3l5.5-3.2a1.6 1.6 0 0 1 1.4 0l5.5 3.2Z',
  'viam-local-module':
    'M3 3v18h18V3H3Zm5.6 9.9H5V5h8v3.6H8.6V13Zm-3.6 6h14V5h-4v5.6h-4.4V15H5v4Z',
  'viam-mixed-part-status': [
    {
      path: 'M12 11c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2Zm6 2c0-3.31-2.69-6-6-6s-6 2.69-6 6c0 2.22 1.21 4.15 3 5.19l1-1.74c-1.19-.7-2-1.97-2-3.45 0-2.21 1.79-4 4-4s4 1.79 4 4c0 1.48-.81 2.75-2 3.45l1 1.74c1.79-1.04 3-2.97 3-5.19Z',
    },
    {
      path: 'M12 3C6.48 3 2 7.48 2 13c0 3.7 2.01 6.92 4.99 8.65l1-1.73C5.61 18.53 4 15.96 4 13c0-4.42 3.58-8 8-8s8 3.58 8 8c0 2.96-1.61 5.53-4 6.92l1 1.73c2.99-1.73 5-4.95 5-8.65 0-5.52-4.48-10-10-10Z',
      opacity: 0.5,
    },
  ],
  'viam-ml-model':
    'M22 4.3a2.3 2.3 0 0 1-3 2.2L16.2 10a2.6 2.6 0 0 1-.2 3l3.1 4.5a2.3 2.3 0 1 1-1.6 3h-11a2.3 2.3 0 1 1-1-2.8l6.1-5.1a2.6 2.6 0 0 1 0-2l-6-4.4a2 2 0 0 1-1.3.4 2.3 2.3 0 1 1 2.2-3.1h11a2.3 2.3 0 0 1 4.6.8ZM14 14c-.4 0-.8 0-1.2-.2l-6.2 5h11l.2-.4-3.2-4.4H14Zm0-5.2c-.6 0-1 .2-1.5.4L7 5.2h10.7l.1.3L15 9l-1-.2Z',
  'viam-process':
    'M9 14H14V15.7C13.9 15.8 13.9 15.9 13.8 16H9V14ZM9 12H14V10H9V12ZM9 8H14V6H9V8ZM7 5C7 4.4 7.4 4 8 4H16V13.8C16.6 13.4 17.3 13.2 18 13.1V5C18 4.4 18.4 4 19 4C19.6 4 20 4.4 20 5V6H22V5C22 3.3 20.7 2 19 2H8C6.3 2 5 3.3 5 5V16H7V5ZM13 19V18.4V18H2V19C2 20.7 3.3 22 5 22H13.8C13.3 21.1 13 20.1 13 19ZM17 16V22L22 19L17 16Z',
  'viam-registry-module': 'M3 21V3h18v18H3Zm2-2h14V5h-4.7v4.7H9.7v4.6H5V19Z',
  'viam-remote-part':
    'M4 6V4a12 12 0 0 1 12 12h-2A10 10 0 0 0 4 6Zm0 4V8a8 8 0 0 1 8 8h-2a6 6 0 0 0-6-6Zm0 2a4 4 0 0 1 4 4H4v-4Zm-1 6h16v-2l3 3-3 3v-2H3v-2Z',
  'viam-service':
    'M10.6 9.6L9 15L7.4 9.6L2 8L7.4 6.4L9 1L10.6 6.4L16 8L10.6 9.6ZM17 14.2L21 12L18.8 16L21 20L17 17.8L13 20L15.2 16L13 12L17 14.2ZM10 16L8.3 19L10 22L7 20.3L4 22L5.7 19L4 16L7 17.7L10 16Z',
  'video-outline': MDI.mdiVideoOutline,
  'view-dashboard-outline': MDI.mdiViewDashboardOutline,
  webhook: MDI.mdiWebhook,
  windows: MDI.mdiMicrosoftWindows,
} satisfies Record<string, IconPath>;

/**
 * The possible icon names that can be rendered. This is good for typing props.
 */
export type IconName = keyof typeof IconPathsByName;
