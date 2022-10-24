//default values
let operand1 = '';
let operandInProgress = '';
let operatorInProgress = false;
let witchOperator = ''; //It's Halloween!

const page = document.querySelector('html');
const displayScreen = document.querySelector('.display');
const allNumberButtons = document.querySelectorAll('.number');
const allOperatorButtons = document.querySelectorAll('.operator');
const clearButton = document.querySelector('.clear');
const equalsButton = document.querySelector('.equals');
const negativeSign = document.querySelector('.plus-minus');
const charger = document.querySelector('.fa-sun');
const solarPanel = document.querySelector('.fake-panel');

charger.addEventListener('mousedown', readyCharge);

negativeSign.addEventListener('click', plusMinus);

allOperatorButtons.forEach(btn => {
    btn.addEventListener('click', operatorButtonClick);
});

allNumberButtons.forEach(btn => {
    btn.addEventListener('click', NumberButtonClick);
});

clearButton.addEventListener('click', clearAll);
equalsButton.addEventListener('click', equalsButtonClick);

function charge() {
    displayScreen.classList.remove('no-sun');
}

function readyCharge() {
   
    page.style.cursor = "url('images/flashlight.cur'), auto"
}

function equalsButtonClick() {
    if (witchOperator === '') {
        return;
    }
    calculateExpression(witchOperator);
    operandInProgress = operand1;
    //formatNumber(operandInProgress);
    operand1 = '';
    operatorInProgress = false;
    console.log('operand1: ' + operand1,
        ' andIn: ' + operandInProgress,
        ' atorIn: ' + operatorInProgress,
        ' witch: ' + witchOperator);
}

function resetValues() {
    operand1 = '';
    operandInProgress = '';
    operatorInProgress = false;
    witchOperator = '';
}

function calculateExpression(e) {
    if (e === 'plus') {
        if (operandInProgress === '') {
            operandInProgress = 0;
        } else if (operand1 === '') {
            operand1 = 0;
        }
        operand1 = Number(operand1);
        operandInProgress = Number(operandInProgress);
        operand1 = add(operand1, operandInProgress);


        console.log(typeof (operand1));
        clearDisplay();
        display(operand1);

    } else if (e === 'minus') {
        if (operandInProgress === '') {
            operandInProgress = 0;
        } else if (operand1 === '') {
            operand1 = 0;
        }
        operand1 = Number(operand1);
        operandInProgress = Number(operandInProgress);
        operand1 = sub(operand1, operandInProgress);

        clearDisplay();
        display(operand1);
    } else if (e === 'times') {
        if (operandInProgress === '') {
            operandInProgress = 1;
        } else if (operand1 === '') {
            operand1 = 1;
        }
        operand1 = Number(operand1);
        operandInProgress = Number(operandInProgress);
        operand1 = mult(operand1, operandInProgress);

        clearDisplay();
        display(operand1);
    } else if (e === 'divided') {
        if (operandInProgress === '') {
            operandInProgress = 1;
        } else if (operand1 === '') {
            operand1 = 1;
        } else if (operandInProgress = '0') {
            clearAll();
            display('Does not compute!');
            return;
        }
        operand1 = Number(operand1);
        operandInProgress = Number(operandInProgress);
        operand1 = divide(operand1, operandInProgress);

        clearDisplay();
        display(operand1);
    }
    operatorInProgress = true;
}

function setOperator(newOperator) {
    witchOperator = newOperator
}

function operatorButtonClick(e) {
    setOperator(e.target.value);
    if (operand1 === '') {
        operand1 = operandInProgress;
        operandInProgress = '';
        operatorInProgress = true;
        console.log('operand1: ' + operand1,
            ' andIn: ' + operandInProgress,
            ' atorIn: ' + operatorInProgress,
            ' witch: ' + witchOperator);
        return;
    } else {
        calculateExpression(e.target.value);
    }
    console.log('operand1: ' + operand1,
        ' andIn: ' + operandInProgress,
        ' atorIn: ' + operatorInProgress,
        ' witch: ' + witchOperator);
}

function plusMinus(e) {
    if (operandInProgress[0] !== '-') {
        operandInProgress = e.target.value + operandInProgress;
        display(operandInProgress);
    } else if (operandInProgress[0] === '-') {
        operandInProgress = operandInProgress.substring(1);
        display(operandInProgress);
    }
    console.log('operand1: ' + operand1,
        ' andIn: ' + operandInProgress,
        ' atorIn: ' + operatorInProgress,
        ' witch: ' + witchOperator);
}


function NumberButtonClick(e) {
    if (operandInProgress.length >= 10) return;
    if (e.target.value === '.' && operandInProgress % 1 != 0) return;
    if (operatorInProgress) {
        operatorInProgress = false;
        clearDisplay();
    }
    operandInProgress += e.target.value;
    display(operandInProgress);
    console.log('operand1: ' + operand1,
        ' andIn: ' + operandInProgress,
        ' atorIn: ' + operatorInProgress,
        ' witch: ' + witchOperator);
}

function clearDisplay() {
    displayScreen.textContent = '';
}

function clearAll() {
    displayScreen.textContent = '';
    resetValues();
}

function add(x, y) {
    return (x + y);
}

function sub(x, y) {
    return (x - y);
}

function mult(x, y) {
    return (x * y);
}

function divide(x, y) {
    return (x / y);
}

function formatNumber(num) {
    if (typeof (num) !== 'string') {
        num = num.limitDecimals(4);
        num = toString(num);
    }
    return num;
}

function display(input) {
    formatNumber(input);
    displayScreen.textContent = input;
    //operandInProgress = input.substring(0,10);
}

Number.prototype.limitDecimals = function (n) {
    const d = Math.pow(10, n);
    return Math.round((this + Number.EPSILON) * d) / d;
}

console.log(1234444444444.678999.limitDecimals(2.4691358022219753e+21), 1.5 % 1);
console.log(Number('1.88888'));
console.log('hello'.substring(1));
console.log(mult(1111111111, 2222222222222));
console.log('555555');
