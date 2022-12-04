import fs from 'fs/promises';
import path from 'path';
import { getPathFolder } from '../utilities.js';

const workFolder = 'files';
const scriptFolderPath = getPathFolder(import.meta.url);

export const list = async () => {
  try {
    await isFolderExist();
    const files = await fs.readdir(path.join(scriptFolderPath, workFolder));
    console.log(files);
  } catch (error) {
    console.error(error);
  }
};

const isFolderExist = async () => {
  try {
    const files = await fs.readdir(scriptFolderPath);

    if (!files.includes(workFolder)) {
      throw new Error('FS operation failed');
    }

    return null;
  } catch {
    throw new Error('FS operation failed');
  }
};

// call function for test
await list();
