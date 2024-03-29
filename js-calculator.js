const buttons = document.querySelectorAll('.button');
const equationDisplay = document.getElementById('equation');
const answerDisplay = document.getElementById('answer');
const equals = document.getElementById('equals');
const clear = document.getElementById('clear');
const backspace = document.getElementById('delete');

let firstNum;
let secondNum;
let operator;
let answer;
let equation;

let numbers;
let operators;

let possibleOperators = ['+', '-', '/', '*'];

function add(a, b) {
    return parseInt(a) + parseInt(b);
}

function subtract(a, b) {
    return parseInt(a) - parseInt(b);
}

function multiply(a, b) {
    return parseInt(a) * parseInt(b);
}

function divide(a, b) {
    if (b == 0) {
        return 'Heh, nice try!'
    }
    return parseInt(a) / parseInt(b);
}

function displayEquation() {
    if (this.value == '=') {
        return;
    }

    if (possibleOperators.includes(this.value) && answer || answer === 0) {
        equationDisplay.textContent = answer;
        answer = undefined;
    } else if (answer || answer === 0) {
        clearDisplay();
    }

    if (possibleOperators.includes(this.value) && equationDisplay.textContent == '') {
        return;
    }

    equationDisplay.textContent += this.value;
    
    equation = equationDisplay.textContent;
}

function displayAnswer() {
    numbers = equation.match(/\w{1,}/g);
    operators = equation.match(/[^0-9]/g);

    for (let i = 0; i < operators.length; i++) {
        firstNum = numbers[0];
        secondNum = numbers[1];
    
        operator = operators[i];

        switch (operator) {
            case '+':
                answer = add(firstNum, secondNum);
                break;
            case '-':
                answer = subtract(firstNum, secondNum);
                break;
            case '/':
                answer = divide(firstNum, secondNum);
                break;
            case '*':
                answer = multiply(firstNum, secondNum);
        }

        numbers.splice(0, 2, answer);
    }

    answerDisplay.textContent = answer;
}

function clearDisplay() {
    equationDisplay.textContent = '';
    answerDisplay.textContent = '';
    answer = undefined;
    firstNum = undefined;
    secondNum = undefined;
    operator = undefined;
}

function deleteCharacter() {
    let textArray = equationDisplay.textContent.toString().split('');
    textArray.pop();
    equationDisplay.textContent = textArray.join('');
}

buttons.forEach(button => button.addEventListener('click', displayEquation));
equals.addEventListener('click', displayAnswer);
clear.addEventListener('click', clearDisplay);
backspace.addEventListener('click', deleteCharacter);