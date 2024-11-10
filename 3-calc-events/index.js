const EventEmitter = require("events");
const operations = require("./operations");

const myEmitter = new EventEmitter();

let num1 = parseFloat(process.argv[2]);
let num2 = parseFloat(process.argv[3]);
let operation = process.argv[4];

if (isNaN(num1) || isNaN(num2)) {
  console.error("Ошибка: Операнды должны быть числами.");
  process.exit(1);
}

if (process.argv[4] === "division" && num2 === 0) {
  console.error("Ошибка: Деление на ноль недопустимо.");
  process.exit(1);
}

myEmitter.on("add", (a, b) => {
  console.log(`${operations.add(a, b)}`);
});

myEmitter.on("multiply", (a, b) => {
  console.log(`${operations.multiply(a, b)}`);
});

myEmitter.on("subtraction", (a, b) => {
  console.log(`${operations.subtraction(a, b)}`);
});

myEmitter.on("division", (a, b) => {
  console.log(`${operations.division(a, b)}`);
});

if (operation === "add") {
  myEmitter.emit("add", num1, num2);
} else if (operation === "multiply") {
  myEmitter.emit("multiply", num1, num2);
} else if (operation === "subtraction") {
  myEmitter.emit("subtraction", num1, num2);
} else if (operation === "division") {
  myEmitter.emit("division", num1, num2);
}
