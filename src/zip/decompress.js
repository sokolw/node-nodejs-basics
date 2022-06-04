import fs from 'fs/promises';
import path from 'path';
import { pipeline } from 'stream/promises';
import zlib from 'zlib';

const targetFileName = 'archive.gz';
const distFileName = 'fileToCompress.txt';
const workFolder = 'files';

export const decompress = async () => {
  try {
    const gunzip = zlib.createGunzip();
    const readStream = (await fs.open(path.join('./', workFolder, targetFileName), 'r'))
      .createReadStream();
    const writeStream = (await fs.open(path.join('./', workFolder, distFileName), 'w'))
      .createWriteStream();
    await pipeline(readStream, gunzip, writeStream);
  } catch (error) {
    console.error(error);
  }
};

decompress();