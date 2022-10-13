//default values
let operand1 = '';
let operandInProgress = '';
let operatorInProgress = false;
let witchOperator = ''; //It's Halloween now!

const displayScreen = document.querySelector('.display');
const allNumberButtons = document.querySelectorAll('.number');
const allOperatorButtons = document.querySelectorAll('.operator');
const clearButton = document.querySelector('.clear');
const equalsButton = document.querySelector('.equals');



allOperatorButtons.forEach(btn => {
    btn.addEventListener('click', operatorButtonClick);
});

allNumberButtons.forEach(btn => {
    btn.addEventListener('click', NumberButtonClick);
});

clearButton.addEventListener('click', clearAll);
equalsButton.addEventListener('click', equalsButtonClick);

function equalsButtonClick() {
    calculateExpression(witchOperator);
    operandInProgress = operand1;
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
        operand1 = parseInt(operand1);
        operandInProgress = parseInt(operandInProgress);
        operand1 = add(operand1, operandInProgress);
        operandInProgress = '';
        clearDisplay();
        display(operand1);

    } else if (e === 'minus') {
        if (operandInProgress === '') {
            operandInProgress = 0;
        } else if (operand1 === '') {
            operand1 = 0;
        }
        operand1 = parseInt(operand1);
        operandInProgress = parseInt(operandInProgress);
        operand1 = sub(operand1, operandInProgress);
        operandInProgress = '';
        clearDisplay();
        display(operand1);
    } else if (e === 'times') {
        if (operandInProgress === '') {
            operandInProgress = 1;
        } else if (operand1 === '') {
            operand1 = 1;
        }
        operand1 = parseInt(operand1);
        operandInProgress = parseInt(operandInProgress);
        operand1 = mult(operand1, operandInProgress);
        operandInProgress = '';
        clearDisplay();
        display(operand1);
    } else if (e === 'divided') {
        if (operandInProgress === '') {
            operandInProgress = 1;
        } else if (operand1 === '') {
            operand1 = 1;
        }
        operand1 = parseInt(operand1);
        operandInProgress = parseInt(operandInProgress);
        operand1 = divide(operand1, operandInProgress);
        operandInProgress = '';
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
    // if (operatorInProgress && witchOperator === e.target.value) {
    //     return;
    // } else if (operatorInProgress && witchOperator != e.target.value) {
    //     setOperator(e.target.value);
    //     return;
    // } else if (operand1 === '') {
    //     operand1 = parseInt(operandInProgress);
    //     operandInProgress = '';
    // } else if (operand1 != '') {
    //     operandInProgress = parseInt(operandInProgress);
    //     calculateExpression(e.target.value);
    // }
    // setOperator(e.target.value);
    // operatorInProgress = true;
    console.log('operand1: ' + operand1,
    ' andIn: ' + operandInProgress,
    ' atorIn: ' + operatorInProgress,
    ' witch: ' + witchOperator);
}

function NumberButtonClick(e) {
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

function display(input) {
    displayScreen.textContent = input;
}

