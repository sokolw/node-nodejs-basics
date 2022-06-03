import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

const targetFileName = 'fileToCalculateHashFor.txt';
const workFolder = 'files';
const typeHash = 'sha256';
const hexadecimal = 'hex';

export const calculateHash = async () => {
  try {
    await isFileExist();
    const readStream = (await fs.open(path.join('./', workFolder, targetFileName), 'r'))
        .createReadStream();
    const hash = crypto.createHash(typeHash);
    readStream.pipe(hash).setEncoding(hexadecimal).pipe(process.stdout);
  } catch (error) {
    console.error(error);
  }
};

const isFileExist = async () => {
  const files = await fs.readdir(path.join('./', workFolder));

  if (!files.includes(targetFileName)) {
    throw new Error('FS operation failed');
  }

  return null;
};

calculateHash();