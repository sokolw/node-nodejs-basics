import path from 'path';
import { release, version } from 'os';
import { createServer as createServerHttp } from 'http';
import './files/c.js';
import { getPathFolder } from '../utilities.js';
import { fileURLToPath } from 'url';
import { readFile } from 'fs/promises';

const random = Math.random();
const scriptFolderPath = getPathFolder(import.meta.url);
const workFolder = 'files';

export let unknownObject;

const fileA = 'a.json';
const pathA = path.join(scriptFolderPath, workFolder, fileA);
const fileB = 'b.json';
const pathB = path.join(scriptFolderPath, workFolder, fileB);

const getJSON = async (path) => {
  const data = await readFile(path);
  return JSON.parse(data);
}

if (random > 0.5) {
  unknownObject = await getJSON(pathA);
} else {
  unknownObject = await getJSON(pathB);
}

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);

console.log(`Path to current file is ${fileURLToPath(import.meta.url)}`);
console.log(`Path to current directory is ${scriptFolderPath}`);

export const createMyServer = createServerHttp((_, res) => {
  res.end('Request accepted');
});
