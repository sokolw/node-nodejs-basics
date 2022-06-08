import worker from 'worker_threads';

export const nthFibonacci = (n) => n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

export const sendResult = () => {
  // Test line errors
  // if (Math.random() > 0.5) throw new Error('> 0.5');
  worker.parentPort.postMessage(nthFibonacci(worker.workerData));
};

sendResult();