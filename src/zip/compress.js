import fs from 'fs/promises';
import path from 'path';
import { pipeline } from 'stream/promises';
import zlib from 'zlib';
import { getPathFolder } from '../utilities.js';

const targetFileName = 'fileToCompress.txt';
const distFileName = 'archive.gz';
const workFolder = 'files';
const scriptFolderPath = getPathFolder(import.meta.url);

export const compress = async () => {
  try {
    const gzip = zlib.createGzip();
    const readStream = (await fs.open(path.join(scriptFolderPath, workFolder, targetFileName), 'r'))
      .createReadStream();
    const writeStream = (await fs.open(path.join(scriptFolderPath, workFolder, distFileName), 'w'))
      .createWriteStream();
    await pipeline(readStream, gzip, writeStream);
  } catch (error) {
    console.error(error);
  }
};

// call function for test
await compress();