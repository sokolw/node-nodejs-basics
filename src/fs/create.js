import fs from 'fs/promises';
import path from 'path';
import { getPathFolder } from '../utilities.js';

const fileName = 'fresh.txt';
const distFolder = 'files';
const fullPath = path.join(
  getPathFolder(import.meta.url),
  distFolder,
  fileName
);
const taskContent = 'I am fresh and young';

export const create = async () => {
  try {
    await fs.writeFile(fullPath, taskContent, { flag: 'wx+' });
  } catch {
    throw new Error('FS operation failed');
  }
};

// call function for test
try {
  await create();
  console.log('Done.');
} catch (error) {
  console.error(error);
}
