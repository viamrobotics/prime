import { base, query } from './config';

export const loadFonts = async () => {
  const pathname =
    base === '' || base.endsWith('/')
      ? `${base}icons.woff2`
      : `${base}/icons.woff2`;
  const font = new FontFace('icons', `url(${pathname}${query})`);

  await font.load();
  document.fonts.add(font);
};
