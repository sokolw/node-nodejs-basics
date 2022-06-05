import path from 'path';
import { release, version } from 'os';
import { createServer as createServerHttp } from 'http';
import './files/c.js';
import { getPathFolder } from '../utilities.js';
import { fileURLToPath } from 'url';

const random = Math.random();
const scriptFolderPath = getPathFolder(import.meta.url);

export let unknownObject;

if (random > 0.5) {
  unknownObject = await import('./files/a.json', {
    assert: { type: 'json' },
  });
} else {
  unknownObject = await import('./files/b.json', {
    assert: { type: 'json' },
  });
}

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);

console.log(`Path to current file is ${fileURLToPath(import.meta.url)}`);
console.log(`Path to current directory is ${scriptFolderPath}`);

export const createMyServer = createServerHttp((_, res) => {
  res.end('Request accepted');
});
