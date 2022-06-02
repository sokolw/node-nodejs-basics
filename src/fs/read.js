import fs from 'fs/promises';
import path from 'path';

const targetFileName = 'fileToRead.txt';
const workFolder = 'files';

export const read = async () => {
  try {
    await isFileExist();
    const readFileContent = await (await fs.open(path.join('./', workFolder, targetFileName), 'r'))
        .readFile({ encoding : 'utf-8' });
      console.log(readFileContent);
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

read();