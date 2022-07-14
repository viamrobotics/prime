import { base, query } from './config'

export const loadFonts = async () => {
  const font = new FontFace('icons', base ? `url(${base}/icons.woff2${query})` : `url(icons.woff2${query})`)
  await font.load()
  document.fonts.add(font)
}
