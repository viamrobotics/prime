const fs = require('node:fs')
const { resolve } = require('node:path')

const rename = (src, dest) =>
  fs.renameSync(
    resolve(__dirname, '..', src),
    resolve(__dirname, '..', dest))

const copy = (src, dest) =>
  fs.copyFileSync(
    resolve(__dirname, '..', src),
    resolve(__dirname, '..', dest))

const write = (path, data) =>
  fs.writeFileSync(resolve(__dirname, '..', path), data)
  
const read = (path) =>
  fs.readFileSync(resolve(__dirname, '..', path), 'utf-8') 

const mkdir = (path) =>
  fs.mkdirSync(resolve(__dirname, '..', path))

const readDir = (path) =>
  fs.readdirSync(resolve(__dirname, '..', path))

module.exports = { rename, copy, mkdir, write, read, readDir }
