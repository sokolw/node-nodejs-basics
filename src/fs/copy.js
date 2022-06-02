import fs from 'fs/promises';
import { pipeline } from 'stream/promises';
import path from 'path';

const targetFolder = 'files';
const distFolder = 'files_copy';

export const copy = async () => {
  try {
    await checkFolders();
    await fs.mkdir(path.join('./', distFolder));
    const files = await fs.readdir(targetFolder);

    for (const file of files) {
      const readStream = (await fs.open(path.join('./', targetFolder, file), 'r'))
          .createReadStream(path.join('./', targetFolder, file));
      const writeStream = (await fs.open(path.join('./', distFolder, file), 'w'))
          .createWriteStream(path.join('./', distFolder, file));
      await pipeline(readStream, writeStream);
    }
  } catch (error) {
    console.error(error);
  }
};

const checkFolders = async () => {
  const files = await fs.readdir(path.join('./'), { withFileTypes : true });
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

copy();