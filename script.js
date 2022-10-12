let operand1 = '';
let operandInProgress = '';
let operatorInProgress = false;
let witchOperator = ''; //It's Halloween now!

const displayScreen = document.querySelector('.display');
const allNumberButtons = document.querySelectorAll('.number');
const allOperatorButtons = document.querySelectorAll('.operator');
const clearButton = document.querySelector('.clear');

allOperatorButtons.forEach(btn => {
    btn.addEventListener('click', operatorButtonClick);
});

allNumberButtons.forEach(btn => {
    btn.addEventListener('click', NumberButtonClick);
});

clearButton.addEventListener('click', clearAll)

function calculateExpression(e) {
    if (e === 'plus') {
        operand1 = add(operand1, operandInProgress);

    } else if (e === 'minus') {
        operand1 = sub(operand1, operandInProgress)

    } else if (e === 'times') {
        operand1 = mult(operand1, operandInProgress);

    } else if (e === 'divided') {
        operand1 = divide(operand1, operandInProgress)
    }
}

function setOperator(newOperator) {
    witchOperator = newOperator
}

function operatorButtonClick(e) {
    if (witchOperator === e.target.value) {
        return
    }
    setOperator(e.target.value);
    if (operandInProgress);  
    operatorInProgress = true;
    if (operand1 === '') {
        operand1 = parseInt(operandInProgress);
        operandInProgress = '';
    } else if (operand1 != '') {
        operandInProgress = parseInt(operandInProgress);
        calculateExpression(e.target.value);
        operandInProgress = '';
        clearDisplay();
        display(operand1);
    }
    console.log(operandInProgress, operand1, operandInProgress);
    operandInProgress = '';

}
function NumberButtonClick(e) {
    if (operatorInProgress === false) {
        operandInProgress += e.target.value;
        display(e.target.value);
    } else if (operatorInProgress === true) {
        clearDisplay();
        operandInProgress += e.target.value;
        display(operandInProgress);
        operatorInProgress = false;
    }

}

function clearDisplay() {
    displayScreen.textContent = '';
}

function clearAll() {
    displayScreen.textContent = '';
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

function display(input) {
    displayScreen.textContent = displayScreen.textContent + input;

}

