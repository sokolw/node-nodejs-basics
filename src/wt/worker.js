import worker from 'worker_threads';

export const nthFibonacci = (n) => n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

export const sendResult = () => {
  try {
    worker.parentPort.once('message', (value) => {
      value.port.postMessage( { data : nthFibonacci(worker.workerData), index : worker.workerData } );
      value.port.close();
    });
  } catch {
    throw new Error(worker.workerData);
  }
};

sendResult();