function add(a, b) {
  return a + b;
}

function multiply(a, b) {
  return a * b;
}

function subtraction(a, b) {
  return a - b;
}

function division(a, b) {
  if (b === 0) {
    throw new Error("Деление на ноль недопустимо");
  }
  return a / b;
}

module.exports = {
  add,
  multiply,
  subtraction,
  division,
};
