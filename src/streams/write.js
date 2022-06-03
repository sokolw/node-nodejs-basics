import fs from 'fs/promises';
import path from 'path';

const targetFileName = 'fileToWrite.txt';
const workFolder = 'files';

export const write = async () => {
  try {
    const writeStream = (await fs.open(path.join('./', workFolder, targetFileName), 'w'))
        .createWriteStream();

    const readSteam = process.stdin;
    readSteam.setEncoding('utf8');
    readSteam.on('data', (chunk) => {
      writeStream.write(chunk);
      process.exit();
    });

    readSteam.read();
  } catch (error) {
    console.error(error);
  }
};

write();