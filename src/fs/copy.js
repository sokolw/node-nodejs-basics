import fs from 'fs/promises';
import { pipeline } from 'stream/promises';
import path from 'path';
import { getPathFolder } from '../utilities.js'

const targetFolder = 'files';
const distFolder = 'files_copy';
const scriptFolderPath = getPathFolder(import.meta.url);
const targetPath = path.join(scriptFolderPath, targetFolder);
const distPath = path.join(scriptFolderPath, distFolder);

export const copy = async () => {
  try {
    await checkFolders();
    await fs.mkdir(distPath);
    const files = await fs.readdir(targetPath);

    for (const file of files) {
      const readStream = (await fs.open(path.join(targetPath, file), 'r'))
          .createReadStream();
      const writeStream = (await fs.open(path.join(distPath, file), 'w'))
          .createWriteStream();
      await pipeline(readStream, writeStream);
    }
  } catch (error) {
    console.error(error);
  }
};

const checkFolders = async () => {
  const files = await fs.readdir(path.join(scriptFolderPath), { withFileTypes : true });
  let tempDirs = [];

  for (const file of files) {
    if (file.isDirectory()) {
      tempDirs.push(file.name);
    }
  }

  if (!tempDirs.includes(targetFolder) || tempDirs.includes(distFolder)) {
    throw new Error('FS operation failed');
  }

  return null;
};

// call function for test
await copy();