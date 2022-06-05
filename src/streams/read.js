import fs from 'fs/promises';
import path from 'path';
import { getPathFolder } from '../utilities.js';

const targetFileName = 'fileToRead.txt';
const workFolder = 'files';
const scriptFolderPath = getPathFolder(import.meta.url);

export const read = async () => {
  try {
    await isFileExist();
    const readStream = (await fs.open(path.join(scriptFolderPath, workFolder, targetFileName), 'r'))
        .createReadStream();
    readStream.pipe(process.stdout);
  } catch (error) {
    console.error(error);
  }
};

const isFileExist = async () => {
  const files = await fs.readdir(path.join(scriptFolderPath, workFolder));

  if (!files.includes(targetFileName)) {
    throw new Error('FS operation failed');
  }

  return null;
};

// call function for test
await read();