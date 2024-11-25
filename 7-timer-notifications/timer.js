const args = process.argv;
const notifier = require("node-notifier");
const path = require('path');

const hours = parseInt(args[2]);
const minutes = parseInt(args[3]);
const seconds = parseInt(args[4]);

if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
  console.error("Ошибка: Операнды должны быть числами.");
  process.exit(1);
}

if (hours < 0 || minutes < 0 || seconds < 0) {
  console.error("Ошибка: Операнды не должны быть меньше нуля.");
  process.exit(1);
}

const totalMilliseconds = hours * 3600000 + minutes * 60000 + seconds * 1000;

console.log(`Таймер установлен на ${hours} ч, ${minutes} мин, ${seconds} сек.`);

setTimeout(() => {
  console.log("Время вышло!");

  notifier.notify({
    title: "Таймер завершён",
    message: "Время вышло! Пора действовать.",
    icon: path.join(__dirname, 'timer.png'),
    sound: true,
    wait: false,
  });
}, totalMilliseconds);
