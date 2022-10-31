//default values
let operand1 = '';
let operandInProgress = '';
let operatorInProgress = false;
let witchOperator = ''; //It's Halloween!
let flashlightOn = false;

//construct html elements
const page = document.querySelector('html');
const displayScreen = document.querySelector('.display');
const allNumberButtons = document.querySelectorAll('.number');
const allOperatorButtons = document.querySelectorAll('.operator');
const clearButton = document.querySelector('.clear');
const equalsButton = document.querySelector('.equals');
const negativeSign = document.querySelector('.plus-minus');
const charger = document.querySelector('.flashlight');
const solarPanel = document.querySelector('.solar-panel');
const deleteButton = document.querySelector('.delete');

//Event Listeners
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
    }
    if ((e.key >= 0 && e.key <= 9) || e.key === '.') {
        if (operandInProgress.length >= 10) return;
        if (e.key === '.' && (/\./.test(operandInProgress))) return;
        if (operatorInProgress) {
            operatorInProgress = false;
            clearDisplay();
        }
        operandInProgress += e.key;
        display(operandInProgress);
    } else if (e.key === '*' || e.key === '+' || e.key === '-' || e.key === '/') {
        setOperator(e.key);
        if (operand1 === '') {
            operand1 = operandInProgress;
            operandInProgress = '';
            operatorInProgress = true;
            return;
        } else {
            calculateExpression(e.key);
        }
    } else if (e.key === 'Backspace') {
        deleteBtn();
    } else if (e.key === 'Escape') {
        clearAll();
    } else {
        return;
    }
});
deleteButton.addEventListener('click', deleteBtn);
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
solarPanel.addEventListener('mouseover', charging);
solarPanel.addEventListener('mouseout', doneCharging);

//calculator functions
function deleteBtn() {
    if (typeof (operandInProgress) !== 'string') {
        operandInProgress = operandInProgress.toString();
    }
    operandInProgress = operandInProgress.slice(0, -1);
    display(operandInProgress);
}

function doneCharging() {
    if (flashlightOn) {
        displayScreen.classList.add('no-sun');
        displayScreen.classList.remove('sunny');
    } else {
        return;
    }
}

function charging() {
    if (flashlightOn) {
        displayScreen.classList.remove('no-sun');
        displayScreen.classList.add('sunny');
    } else {
        return;
    }
}

//change mouse pointer to flashlight to 'charge' device
function readyCharge() {
    if (!flashlightOn) {
        flashlightOn = true;
        page.style.cursor = "url('images/flashlight.cur'), auto"
    } else {
        flashlightOn = false;
        page.style.cursor = 'auto';
    }
}

function equalsButtonClick() {
    if (witchOperator === '') {
        return;
    }
    calculateExpression(witchOperator);
    operandInProgress = operand1;
    operand1 = '';
    operatorInProgress = false;
}

function resetValues() {
    operand1 = '';
    operandInProgress = '';
    operatorInProgress = false;
    witchOperator = '';
}

function calculateExpression(e) {
    if (e === '+') {
        if (operandInProgress === '') {
            operandInProgress = 0;
        } else if (operand1 === '') {
            operand1 = 0;
        }
        operand1 = Number(operand1);
        operandInProgress = Number(operandInProgress);
        operand1 = add(operand1, operandInProgress);
        clearDisplay();
        display(formatNumber(operand1));
    } else if (e === '-') {
        if (operandInProgress === '') {
            operandInProgress = 0;
        } else if (operand1 === '') {
            operand1 = 0;
        }
        operand1 = Number(operand1);
        operandInProgress = Number(operandInProgress);
        operand1 = sub(operand1, operandInProgress);
        clearDisplay();
        display(formatNumber(operand1));
    } else if (e === '*') {
        if (operandInProgress === '') {
            operandInProgress = 1;
        } else if (operand1 === '') {
            operand1 = 1;
        }
        operand1 = Number(operand1);
        operandInProgress = Number(operandInProgress);
        operand1 = mult(operand1, operandInProgress);
        clearDisplay();
        display(formatNumber(operand1));
    } else if (e === '/') {
        if (operandInProgress === '') {
            operandInProgress = 1;
        } else if (operand1 === '') {
            operand1 = 1;
        } else if (operandInProgress === '0') {
            clearAll();
            display('ERROR!');
            return;
        }
        operand1 = Number(operand1);
        operandInProgress = Number(operandInProgress);
        operand1 = divide(operand1, operandInProgress);
        clearDisplay();
        display(formatNumber(operand1));
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
        return;
    } else {
        calculateExpression(e.target.value);
    }
}

function plusMinus(e) {
    if (operandInProgress[0] !== '-') {
        operandInProgress = e.target.value + operandInProgress;
        display(operandInProgress);
    } else if (operandInProgress[0] === '-') {
        operandInProgress = operandInProgress.substring(1);
        display(operandInProgress);
    }
}

function NumberButtonClick(e) {
    if (operandInProgress.length >= 10) return;
    if (e.target.value === '.' && (/\./.test(operandInProgress))) return;
    if (operatorInProgress) {
        operatorInProgress = false;
        clearDisplay();
    }
    operandInProgress += e.target.value;
    display(operandInProgress);
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
    if (typeof (num) != 'string') {
        num = num.toString();
        if (num.length >= 11) {
            clearAll();
            num = 'MEM ERROR!'
        }
    }
    return num;
}

function display(input) {
    displayScreen.textContent = input;
}
/*Unused but can limit decimals
Number.prototype.limitDecimals = function (n) {
    const d = Math.pow(10, n);
    return Math.round((this + Number.EPSILON) * d) / d;
}

console log to test the main values
console.log('operand1: ' + operand1,
' andIn: ' + operandInProgress,
' atorIn: ' + operatorInProgress,
' witch: ' + witchOperator);
*/