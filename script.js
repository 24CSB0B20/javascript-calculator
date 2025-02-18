const display = document.querySelector(".num");
let currentInput = "";
let operatorStack = [];
let valueStack = [];
let lastInputWasOperator = false;

document.querySelectorAll(".button").forEach((button) =>{
        button.addEventListener("click", () => handleButtonClick(button.innerText))
    }
);

const handleButtonClick = (value) => {
    switch(true){
        case !isNaN(value) || value === ".":
            currentInput += value;
            display.innerText = currentInput;
            lastInputWasOperator = false;
            break;
        case value === "AC":
            clearCalculator();
            break;
        case value === "+/-":
            toggleSign();
            break;
        case value === "%":
            percentage();
            break;
        case value === "=":
            evaluateExpression();
            break;
        default:
            handleOperator(value);
    }
};

const clearCalculator = () => {
    currentInput = "";
    operatorStack = [];
    valueStack = [];
    display.innerText = "0";
    lastInputWasOperator = false;
};

const toggleSign = () => {
    if(currentInput){
        currentInput = (parseFloat(currentInput) * -1).toString();
        display.innerText = currentInput;
    }
};

const percentage = () => {
    if(currentInput){
        currentInput = (parseFloat(currentInput) / 100).toString();
        display.innerText = currentInput;
    }
};

const handleOperator = (operator) => {
    if(lastInputWasOperator){
        operatorStack[operatorStack.length - 1] = operator;
        return;
    }
    if (currentInput !== ""){
        valueStack.push(parseFloat(currentInput));
        currentInput = "";
    }

    while(operatorStack.length && precedence(operatorStack[operatorStack.length - 1]) >= precedence(operator)){
        performOperation();
    }
    
    operatorStack.push(operator);
    lastInputWasOperator = true;
};

const precedence = (op) => {
    switch(op){
        case "+": return 1;
        case "-": return 1;
        case "×": return 2;
        case "÷": return 2;
        default: return 0;
    }
};

const performOperation = () => {
    if (valueStack.length < 2 || operatorStack.length === 0) return;
    let b = valueStack.pop();
    let a = valueStack.pop();
    let op = operatorStack.pop();
    
    let result;
    switch (op) {
        case "+": result = Number(a) + Number(b); break;
        case "-": result = Number(a) - Number(b); break;
        case "×": result = Number((Number(a) * Number(b)).toFixed(2)); break;
        case "÷": result = Number((Number(a) / Number(b)).toFixed(2)); break;
    }
    console.log(result);
    valueStack.push(result);
    currentInput = result.toString();
};

const evaluateExpression = () => {
    if (currentInput !== "") {
        valueStack.push(parseFloat(currentInput));
        currentInput = "";
    }
    while (operatorStack.length) performOperation();
    const ans = valueStack.pop();
    if(ans.toString().length > 9){
        display.innerText = "Exceeds Display";
        valueStack = [];
        operatorStack = [];
        currentInput = "";
    }
    else if(ans == Infinity){
        display.innerText = "∞";
        valueStack = [];
        operatorStack = [];
        currentInput = "";
    }
    else{
        display.innerText = ans;
    }
    lastInputWasOperator = false;
};
