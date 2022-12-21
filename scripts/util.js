import fs from 'node:fs'
import { resolve } from 'node:path'

export const rename = (src, dest) =>
  fs.renameSync(
    resolve(__dirname, '..', src),
    resolve(__dirname, '..', dest))

export const copy = (src, dest) =>
  fs.copyFileSync(
    resolve(__dirname, '..', src),
    resolve(__dirname, '..', dest))

export const write = (path, data) =>
  fs.writeFileSync(resolve(__dirname, '..', path), data)
  
export const read = (path) =>
  fs.readFileSync(resolve(__dirname, '..', path), 'utf-8') 

export const mkdir = (path) =>
  fs.mkdirSync(resolve(__dirname, '..', path))

export const readDir = (path) =>
  fs.readdirSync(resolve(__dirname, '..', path))
