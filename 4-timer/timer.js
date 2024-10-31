const args = process.argv;
const hours = parseInt(args[2]);
const minutes = parseInt(args[3]);
const seconds = parseInt(args[4]);

const totalMilliseconds = hours * 3600000 + minutes * 60000 + seconds * 1000;

console.log(`Таймер установлен на ${hours} ч, ${minutes} мин, ${seconds} сек.`);
setTimeout(() => {
  console.log("Время вышло!");
}, totalMilliseconds);
