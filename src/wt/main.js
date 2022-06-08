import worker from 'worker_threads';
import path from 'path';
import os from 'os';
import { getPathFolder } from '../utilities.js';

const workerScriptFileName = 'worker.js';
const scriptFolderPath = getPathFolder(import.meta.url);
const countCpus = os.cpus().length;

export const performCalculations = async () => {
  const taskNumber = 10;
  const workers = [];
  for (let i = 0; i < countCpus; i++) {
    workers.push(
      new Promise (
        (resolve, reject) => {
          // create worker
          const workerProcess = new worker.Worker(
            path.join(scriptFolderPath, workerScriptFileName), 
            { workerData: i + taskNumber }
          );
          // add event handlers
          workerProcess.on('message', (message) => resolve({ status : 'resolved', data : message }));
          workerProcess.on('error', (err) => reject({ status : 'error', data : null }));
        }
      )
    );
  }
  // wait all results resolve+reject
  const result = await Promise.allSettled(workers);
  console.log(result.map(elem => elem.value ? elem.value : elem.reason));
}

// call function for test
await performCalculations();