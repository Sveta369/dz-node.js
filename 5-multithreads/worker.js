const { parentPort, workerData } = require('worker_threads');

const countDivisibleByThree = (array) => {
  return array.filter((num) => num % 3 === 0).length;
};

const count = countDivisibleByThree(workerData);
parentPort.postMessage(count);
