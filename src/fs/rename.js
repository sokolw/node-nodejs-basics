import fs from 'fs/promises';
import path from 'path';

const targetFileName = 'wrongFilename.txt';
const distFileName = 'properFilename.md';
const workFolder = 'files';

export const rename = async () => {
  try {
    await isFileExist();
    await fs.rename(
        path.join('./', workFolder, targetFileName),
        path.join('./', workFolder, distFileName)
    ); 
  } catch (error) {
    console.error(error);
  }
  
};

const isFileExist = async () => {
  const files = await fs.readdir(path.join('./', workFolder));

  if (!files.includes(targetFileName) || files.includes(distFileName)) {
    throw new Error('FS operation failed');
  }

  return null;
};

rename();