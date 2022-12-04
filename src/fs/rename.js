import fs from 'fs/promises';
import path from 'path';
import { getPathFolder } from '../utilities.js';

const targetFileName = 'wrongFilename.txt';
const distFileName = 'properFilename.md';
const workFolder = 'files';
const scriptFolderPath = getPathFolder(import.meta.url);

export const rename = async () => {
  try {
    await isFileExist();
    await fs.rename(
      path.join(scriptFolderPath, workFolder, targetFileName),
      path.join(scriptFolderPath, workFolder, distFileName)
    );
  } catch (error) {
    console.error(error);
  }
};

const isFileExist = async () => {
  try {
    const files = await fs.readdir(path.join(scriptFolderPath, workFolder));

    if (!files.includes(targetFileName) || files.includes(distFileName)) {
      throw new Error('FS operation failed');
    }

    return null;
  } catch {
    throw new Error('FS operation failed');
  }
};

// call function for test
await rename();
