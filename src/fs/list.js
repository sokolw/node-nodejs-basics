import fs from 'fs/promises';
import path from 'path';

const workFolder = 'files';

export const list = async () => {
  try {
    await isFolderExist();
    const files = await fs.readdir(path.join('./', workFolder));
    console.log(files);
  } catch (error) {
    console.error(error);
  }
};

const isFolderExist = async () => {
  const files = await fs.readdir('./');

  if (!files.includes(workFolder)) {
    throw new Error('FS operation failed');
  }

  return null;
};

list();