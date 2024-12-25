const zero = document.querySelector("#zero");
const one = document.querySelector("#one");
const two = document.querySelector("#two");
const three = document.querySelector("#three");
const four = document.querySelector("#four");
const five = document.querySelector("#five");
const six = document.querySelector("#six");
const seven = document.querySelector("#seven");
const eight = document.querySelector("#eight");
const nine = document.querySelector("#nine");
const decimal = document.querySelector("#decimal");
const add = document.querySelector("#add");
const subtract = document.querySelector("#subtract");
const multiply = document.querySelector("#multiply");
const divide = document.querySelector("#divide");
const equal = document.querySelector("#equal");
const del = document.querySelector("#del");
const AC = document.querySelector("#AC");
const percentage = document.querySelector("#percentage");
const square = document.querySelector("#square");
const screen = document.querySelector("#cal-screen");

let expression = "";
let lastResult = null;

function updateScreen() {
    screen.innerText = expression || "0";
}

const addDigit = (digit) => {
    expression += digit;
    updateScreen();
};

zero.addEventListener("click", () => addDigit("0"));
one.addEventListener("click", () => addDigit("1"));
two.addEventListener("click", () => addDigit("2"));
three.addEventListener("click", () => addDigit("3"));
four.addEventListener("click", () => addDigit("4"));
five.addEventListener("click", () => addDigit("5"));
six.addEventListener("click", () => addDigit("6"));
seven.addEventListener("click", () => addDigit("7"));
eight.addEventListener("click", () => addDigit("8"));
nine.addEventListener("click", () => addDigit("9"));

decimal.addEventListener("click", () => {
    const lastNumber = expression.split(/[\+\-\*\/]/).pop();
    if (!lastNumber.includes(".")) {
        expression += ".";
        updateScreen();
    }
});

function addOperator(op) {
    if (!expression && (op === "+" || op === "-")) {
        expression += op;
    } else if (expression && !['+', '-', '*', '/'].includes(expression.slice(-1))) {
        expression += op;
    } else if (lastResult !== null) {
        expression = lastResult + op;
        lastResult = null;
    }
    updateScreen();
}

add.addEventListener("click", () => addOperator("+"));
subtract.addEventListener("click", () => addOperator("-"));
multiply.addEventListener("click", () => addOperator("*"));
divide.addEventListener("click", () => addOperator("/"));

del.addEventListener("click", () => {
    expression = expression.slice(0, -1);
    updateScreen();
});

AC.addEventListener("click", () => {
    expression = "";
    lastResult = null;
    updateScreen();
});

percentage.addEventListener("click", () => {
    if (expression) {
        const lastNumber = parseFloat(expression.split(/[\+\-\*\/]/).pop());
        if (!isNaN(lastNumber)) {
            expression = expression.slice(0, -lastNumber.toString().length) + (lastNumber / 100).toString();
            updateScreen();
        }
    }
});

square.addEventListener("click", () => {
    if (expression) {
        try {
            const lastNumber = parseFloat(expression.split(/[\+\-\*\/]/).pop());
            if (!isNaN(lastNumber)) {
                expression = expression.slice(0, -lastNumber.toString().length) + (lastNumber ** 2).toString();
                updateScreen();
            }
        } catch (error) {
            screen.innerText = "Error";
        }
    }
});

AC.addEventListener("click", () => {
    expression = "";
    lastResult = null;
    screen.innerText = "";
});

function addOperator(op) {
    if (!expression && (op === "+" || op === "-")) {
        expression += op;
    } else if (expression) {
        if (['+', '-', '*', '/'].includes(expression.slice(-1))) {
            if (op === "-" && expression.slice(-1) !== "-") {
                expression += op;
            } else {
                expression = expression.slice(0, -1) + op;
            }
        } else {
            expression += op;
        }
    } else if (lastResult !== null) {
        expression = lastResult + op;
        lastResult = null;
    }
    updateScreen();
}

equal.addEventListener("click", () => {
    try {
        if (!expression && lastResult === null) {
            screen.innerText = "0";
            return;
        }
        if (!expression && lastResult !== null) {
            screen.innerText = lastResult;
            return;
        }
        if (['+', '-', '*', '/'].includes(expression.slice(-1))) {
            expression = expression.slice(0, -1);
        }
        expression = expression.replace(/^0+(?=\d)/, '');
        lastResult = eval(expression);
        lastResult = parseFloat(lastResult.toFixed(6));
        screen.innerText = lastResult;
        expression = lastResult.toString();
    } catch (error) {
        screen.innerText = "Error";
    }
});