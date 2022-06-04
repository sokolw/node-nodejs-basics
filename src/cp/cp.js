import child from 'child_process';
import path from 'path';

const targetFileName = 'script.js';
const workFolder = 'files';
const command = 'node';

export const spawnChildProcess = async (args) => {

  const childProcess = child.fork(path.join(workFolder, targetFileName), [...args],
    { stdio : ['pipe', 'pipe', 'pipe', 'ipc'] });
  
  process.stdin.pipe(childProcess.stdin);
  childProcess.stdout.pipe(process.stdout);
  
  childProcess.on('exit', function (code) {
    console.log('Child process exited with code ' + code);
  });
};

spawnChildProcess(process.argv.slice(2));