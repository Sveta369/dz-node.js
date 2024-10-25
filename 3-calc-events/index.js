const EventEmitter = require("events");
const add = require("./add");
const multiply = require("./multiply");

const myEmitter = new EventEmitter();

let num1 = parseFloat(process.argv[2]);
let num2 = parseFloat(process.argv[3]);
let operation = process.argv[4];

myEmitter.on("add", (a, b) => {
  console.log(`${add(a, b)}`);
});

myEmitter.on("multiply", (a, b) => {
  console.log(`${multiply(a, b)}`);
});

if (operation === "add") {
  myEmitter.emit("add", num1, num2);
} else if (operation === "multiply") {
  myEmitter.emit("multiply", num1, num2);
}
