import child from 'child_process';
import path from 'path';
import { Transform } from 'stream';
import { EOL } from 'os';
import { getPathFolder } from '../utilities.js'

const targetFileName = 'script.js';
const workFolder = 'files';
const command = 'node';

class TagInput extends Transform {
  constructor(options) {
    super(options);
  }

  _transform(data, encoding, callback) {
    if (data.toString().toLowerCase() === `close${EOL}`) {
      process.stdin.emit('end');
      callback(null, '');
    } else {
      callback(null, `[data from main]->${data}`);
    }
  };
}

class TagOutput extends Transform {
  constructor(options) {
    super(options);
  }

  _transform(data, encoding, callback) {
    if (data.toString().toLowerCase() === `close${EOL}`) {
      process.stdin.emit('end');
      callback(null, '');
    } else {
      callback(null, `[data from child]->${data}`);
    }
  };
}

export const spawnChildProcess = async (args) => {
  const tagInput = new TagInput();
  const tagOutput = new TagOutput();
  const toScriptPath = path.join(getPathFolder(import.meta.url), workFolder, targetFileName);
  
  const childProcess = child.fork(toScriptPath, [...args],
    { stdio : ['pipe', 'pipe', 'pipe', 'ipc'] });

  process.stdin.pipe(tagInput).pipe(childProcess.stdin);
  childProcess.stdout.pipe(tagOutput).pipe(process.stdout);
  
  childProcess.on('exit', function (code) {
    console.log('Child process exited with code ' + code);
  });
};

// call function for test
await spawnChildProcess(process.argv.slice(2));