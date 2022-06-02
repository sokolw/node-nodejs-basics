import fs from 'fs/promises';
import path from 'path';

const fileName = 'fresh.txt';
const distFolder = 'files';
const fullPath = path.join('./', distFolder, fileName);
const taskContent = 'I am fresh and young';

export const create = async () => {
  try {
    await isFileExist();
    const file = await fs.open(fullPath, 'w');
    const writeStream = file.createWriteStream();
    writeStream.write(taskContent);
  } catch (error) {
    console.log(error);
  }
};

const isFileExist = async () => {
  try {
    const file = await fs.open(fullPath, 'r');
  } catch {
    return null;
  }

  throw new Error('FS operation failed');
};

create();