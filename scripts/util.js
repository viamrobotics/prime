import fs from 'node:fs';

/**
 * Synchronously rename a file.
 *
 * @param {fs.PathLike} src
 * @param {fs.PathLike} dest
 */
export const rename = (src, dest) => fs.renameSync(src, dest);

/**
 * Synchronously copy a file.
 *
 * @param {fs.PathLike} src
 * @param {fs.PathLike} dest
 */
export const copy = (src, dest) => fs.copyFileSync(src, dest);

/**
 * Synchronously write a file.
 *
 * @param {fs.PathLike} path
 * @param {string} data
 */
export const write = (path, data) => fs.writeFileSync(path, data, 'utf8');

/**
 * Synchronously read a file.
 *
 * @param {fs.PathLike} path
 * @returns {string} File contents
 */
export const read = (path) => fs.readFileSync(path, 'utf8');

/**
 * Synchronously create a directory
 *
 * @param {fs.PathLike} path
 */
export const mkdir = (path) => fs.mkdirSync(path);

/**
 * Synchronously read a directory.
 *
 * @param {fs.PathLike} path
 * @returns {string[]} List of files in directory
 */
export const readDir = (path) => fs.readdirSync(path);
