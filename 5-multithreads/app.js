const { Worker } = require('worker_threads');
const { performance, PerformanceObserver } = require('perf_hooks');

const array = Array.from({ length: 300000 }, (_, i) => i + 1);
const numThreads = 6;
const chunkSize = Math.ceil(array.length / numThreads);

const performanceObserver = new PerformanceObserver((items) => {
  items.getEntries().forEach((entry) => {
    console.log(`${entry.name}: ${entry.duration}ms`);
  });
});
performanceObserver.observe({ entryTypes: ['measure'] });

const threadCount = async (array) => {
  performance.mark('threads-start');

  const promises = [];
  for (let i = 0; i < numThreads; i++) {
    const chunk = array.slice(i * chunkSize, (i + 1) * chunkSize);
    promises.push(
      new Promise((resolve, reject) => {
        const worker = new Worker('./worker.js', { workerData: chunk });
        worker.on('message', resolve);
      })
    );
  }

  const results = await Promise.all(promises);
  const total = results.reduce((acc, val) => acc + val, 0);

  performance.mark('threads-end');
  performance.measure('Multithreaded Calculation', 'threads-start', 'threads-end');

  return total;
};

const main = async () => {
  // Линейный подход
  performance.mark('linear-start');
  const linearCount = array.filter((num) => num % 3 === 0).length;
  performance.mark('linear-end');
  performance.measure('Linear Calculation', 'linear-start', 'linear-end');
  console.log(`Линейный подход: Количество чисел = ${linearCount}`);

  // Многопоточный подход
  const threadResult = await threadCount(array);
  console.log(`Многопоточный подход: Количество чисел = ${threadResult}`);
};

main();
