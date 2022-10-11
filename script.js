function add(x, y) {
    return (x + y);
}

function sub(x, y) {
    return x - y;
}

function mult(x, y) {
    return (x * y);
}

function divide(x, y) {
    return x / y;
}

function operate(operator, x, y) {
    if (operator === '+') {
        return add(x, y);
    } else if (operator === '-') {
        return sub(x, y);
    } else if (operator === '*') {
        return mult(x, y);
    } else if (operator === '/') {
        return divide(x, y);
    }
}

console.log(add(4, 12));
console.log(operate('*', 8, 4));
console.log(operate('+', 8, 4));
console.log(operate('-', 8, 4));
console.log(operate('/', 8, 4));