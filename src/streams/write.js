import fs from 'fs/promises';
import path from 'path';
import { getPathFolder } from '../utilities.js';

const targetFileName = 'fileToWrite.txt';
const workFolder = 'files';
const scriptFolderPath = getPathFolder(import.meta.url);

export const write = async () => {
  try {
    const writeStream = (await fs.open(path.join(scriptFolderPath, workFolder, targetFileName), 'w'))
        .createWriteStream();

    console.log('Enter anything! Exit use Ctrl+C')
    const readSteam = process.stdin;
    readSteam.setEncoding('utf8');
    readSteam.on('data', (chunk) => {
      writeStream.write(chunk);
    });
    
    process.on('SIGINT', () => {
      console.log('Bye. Bye.')
      process.exit();
    });

    readSteam.read();
  } catch (error) {
    console.error(error);
  }
};

// call function for test
await write();