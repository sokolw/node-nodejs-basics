import fs from 'fs/promises';
import path from 'path';
import { getPathFolder } from '../utilities.js';

const targetFileName = 'fileToRead.txt';
const workFolder = 'files';
const scriptFolderPath = getPathFolder(import.meta.url);

export const read = async () => {
  try {
    await isFileExist();
    const readFileContent = await (
      await fs.open(path.join(scriptFolderPath, workFolder, targetFileName), 'r')
    ).readFile({ encoding: 'utf-8' });
    console.log(readFileContent);
  } catch (error) {
    console.error(error);
  }
};

const isFileExist = async () => {
  try {
    const files = await fs.readdir(path.join(scriptFolderPath, workFolder));

    if (!files.includes(targetFileName)) {
      throw new Error('FS operation failed');
    }

    return null;
  } catch {
    throw new Error('FS operation failed');
  }
};

// call function for test
await read();
