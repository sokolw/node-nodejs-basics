import worker from 'worker_threads';
import path from 'path';
import os from 'os';

const workerScriptFileName = 'worker.js';
const ERR = 0;
const OK = 1;
const END = 2;

export const performCalculations = async () => {
  const workers = [];
  const status = [];
  const results = new Array(os.cpus().length);

  for (let i = 0; i < os.cpus().length; i++) {
    const { port1, port2} = new MessageChannel();

    port1.on('message', (message) => {
      if (status.length < os.cpus().length - 1) {
        status.push(OK);
        results[message.index % 10] = { status : 'resolved', data : message.data };
      } else {
        status.push( {OK, END} );
        results[message.index % 10] = { status : 'resolved', data : message.data };
        console.dir(results);
      }
    });
    
    workers.push(new worker.Worker(path.join(process.cwd(), workerScriptFileName), 
      { workerData: i + 10 }));
    workers[i].postMessage({ port: port2 }, [port2]);

    workers[i].on('error', (err) => {
      if (status.length < os.cpus().length - 1) {
        status.push(ERR);
        results[err.message % 10] = { status : 'error', data : null };
      } else {
        status.push( {ERR, END} );
        results[err.message % 10] = { status : 'error', data : null };
        console.dir(results);
      }
    });
  }
};

performCalculations();