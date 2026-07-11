let timeline = [];
let answer = "";

function addArray(array) {
    let placeHolder = "";
    for (let i of array) {
        placeHolder += String(i)
    }
    return placeHolder;
}

function updateCalcDisplay(string) {
    document.getElementById('display').innerHTML = string;
}

function appendInt(int) {
    timeline.push(int);
    let display = addArray(timeline);
    updateCalcDisplay(display);
}   

function appendChar(char) {
    if (typeof timeline.at(-1) === 'string' || timeline.length == 0) {
        return;
    } 
    timeline.push(char);
    let display = addArray(timeline);
    updateCalcDisplay(display);
}

function specialOperation(operator) {
    if (operator == "CE") {
        timeline = [];
        answer = "";
        updateCalcDisplay("0")
    }
    if (operator == "=") {
        calculate();
        return;
    }
}

function calculate() {
    equation = addArray(timeline);
    answer = calcEquation(equation);
    updateCalcDisplay(answer);
    timeline = [];
    answer = "";
}

function calcEquation(equation) {
    const tokens = equation.match(/\d+(\.\d+)?|[()+\-*/^]/g);

    const precedence = {"+": 1, "-": 1, "*": 2, "/": 2, "^": 3};

    const rightAssociative = {
        "^": true
    };

    const output = [];
    const operators = [];

    for (const token of tokens) {

        if (!isNaN(token)) {
            output.push(Number(token));
        }

        else if (token in precedence) {

            while (
                operators.length &&
                operators.at(-1) in precedence &&
                (
                    precedence[operators.at(-1)] > precedence[token] ||
                    (
                        precedence[operators.at(-1)] === precedence[token] &&
                        !rightAssociative[token]
                    )
                )
            ) {
                output.push(operators.pop());
            }

            operators.push(token);
        }

        else if (token === "(") {
            operators.push(token);
        }

        else if (token === ")") {

            while (operators.at(-1) !== "(") {
                output.push(operators.pop());
            }

            operators.pop();
        }
    }

    while (operators.length) {
        output.push(operators.pop());
    }

    const stack = [];

    for (const token of output) {

        if (typeof token === "number") {
            stack.push(token);
        }

        else {

            const b = stack.pop();
            const a = stack.pop();

            switch (token) {
                case "+": stack.push(a + b); break;
                case "-": stack.push(a - b); break;
                case "*": stack.push(a * b); break;
                case "/": stack.push(a / b); break;
                case "^": stack.push(a ** b); break;
            }
        }
    }

    return stack[0];
}