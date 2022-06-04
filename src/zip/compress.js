import fs from 'fs/promises';
import path from 'path';
import { pipeline } from 'stream/promises';
import zlib from 'zlib';

const targetFileName = 'fileToCompress.txt';
const distFileName = 'archive.gz';
const workFolder = 'files';

export const compress = async () => {
  try {
    const gzip = zlib.createGzip();
    const readStream = (await fs.open(path.join('./', workFolder, targetFileName), 'r'))
      .createReadStream();
    const writeStream = (await fs.open(path.join('./', workFolder, distFileName), 'w'))
      .createWriteStream();
    await pipeline(readStream, gzip, writeStream);
  } catch (error) {
    console.error(error);
  }
};

compress();