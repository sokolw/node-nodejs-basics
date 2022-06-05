import fs from 'fs/promises';
import path from 'path';
import { getPathFolder } from '../utilities.js';

const targetFileName = 'fileToRemove.txt';
const workFolder = 'files';
const scriptFolderPath = getPathFolder(import.meta.url);

export const remove = async () => {
  try {
    await isFileExist();
    await fs.unlink(path.join(scriptFolderPath, workFolder, targetFileName));
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
await remove();