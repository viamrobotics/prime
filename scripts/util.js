import fs from 'node:fs'

export const rename = (src, dest) => fs.renameSync(src, dest)
export const copy = (src, dest) => fs.copyFileSync(src, dest)
export const write = (path, data) => fs.writeFileSync(path, data)
export const read = (path) => fs.readFileSync(path, 'utf-8') 
export const mkdir = (path) => fs.mkdirSync(path)
export const readDir = (path) => fs.readdirSync(path)
