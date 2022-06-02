import fs from 'fs/promises';
import path from 'path';

const targetFileName = 'fileToRemove.txt';
const workFolder = 'files';

export const remove = async () => {
  try {
    await isFileExist();
    await fs.unlink(path.join('./', workFolder, targetFileName));
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

remove();