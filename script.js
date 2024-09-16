let currentInput = '';
let operand1 = '';
let operation = '';
let realPart = '';
let imaginaryPart = '';
let memory = 0;
let numbers = [];

// Function to append numbers to the current input or real/imaginary parts
function appendNumber(number) {
    if (operation === 'real') {
        realPart += number;
        document.getElementById('display').value = realPart + (imaginaryPart ? 'i' + imaginaryPart : '');
    } else if (operation === 'imaginary') {
        imaginaryPart += number;
        document.getElementById('display').value = realPart + (imaginaryPart ? 'i' + imaginaryPart : '');
    } else {
        currentInput += number;

        
        if (currentInput === '0055889944') { 
            document.getElementById('display').value = "I LOVE YOU❤❤";
            currentInput = ''; 
            return; 
        }

        document.getElementById('display').value = currentInput;
    }
}

// Function to set mathematical operations
function setOperation(op) {
    if (op === 'real' || op === 'imaginary') {
        operation = op;
        currentInput = '';
    } else if (op === 'complex') {
        calculateComplex();
    } else if (op === 'abs') {
        calculateAbs();
    } else if (op === 'exp' || op === 'sin' || op === 'cos' || op === 'tan') {
        calculateScientific(op);
    } else {
        if (operation === '' && currentInput !== '') {
            operand1 = currentInput;
            operation = op;
            currentInput = '';
        } else if (operation !== '' && currentInput !== '') {
            calculateResult();
            operand1 = document.getElementById('display').value;
            operation = op;
            currentInput = '';
        }
    }
}

// Function to calculate the result based on the operation
function calculateResult() {
    if (operand1 !== '' && currentInput !== '') {
        const num1 = parseFloat(operand1);
        const num2 = parseFloat(currentInput);
        let result;

        switch (operation) {
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num1 - num2;
                break;
            case '*':
                result = num1 * num2;
                break;
            case '/':
                result = num1 / num2;
                break;
            case '^':
                result = Math.pow(num1, num2);
                break;
            case 'sqrt':
                result = Math.sqrt(num1);
                break;
            case 'log':
                result = Math.log10(num1);
                break;
            case 'avg':
                result = average(numbers);
                break;
            case 'median':
                result = median(numbers);
                break;
            case 'stddev':
                result = standardDeviation(numbers);
                break;
            default:
                return;
        }

        document.getElementById('display').value = result;
        currentInput = result.toString();
        operand1 = '';
        operation = '';
        numbers = [];
    } else if (operation === 'sqrt' || operation === 'log') {
        const num = parseFloat(operand1);
        let result;

        switch (operation) {
            case 'sqrt':
                result = Math.sqrt(num);
                break;
            case 'log':
                result = Math.log10(num);
                break;
        }

        document.getElementById('display').value = result;
        currentInput = result.toString();
        operand1 = '';
        operation = '';
    }
}

// Function to calculate complex number magnitude
function calculateComplex() {
    const real = parseFloat(realPart) || 0;
    const imaginary = parseFloat(imaginaryPart) || 0;
    const magnitude = Math.sqrt(real * real + imaginary * imaginary);
    document.getElementById('display').value = `(${real} + ${imaginary}i), |z| = ${magnitude}`;
    realPart = '';
    imaginaryPart = '';
    currentInput = '';
    operation = '';
}

// Function to calculate magnitude of a complex number
function calculateAbs() {
    const real = parseFloat(realPart) || 0;
    const imaginary = parseFloat(imaginaryPart) || 0;
    const magnitude = Math.sqrt(real * real + imaginary * imaginary);
    document.getElementById('display').value = `|z| = ${magnitude}`;
    realPart = '';
    imaginaryPart = '';
    currentInput = '';
    operation = '';
}

// Function to perform scientific calculations
function calculateScientific(func) {
    const num = parseFloat(currentInput);
    let result;

    switch (func) {
        case 'exp':
            result = Math.exp(num);
            break;
        case 'sin':
            result = Math.sin(num * Math.PI / 180);
            break;
        case 'cos':
            result = Math.cos(num * Math.PI / 180);
            break;
        case 'tan':
            result = Math.tan(num * Math.PI / 180);
            break;
    }

    document.getElementById('display').value = result;
    currentInput = result.toString();
    operand1 = '';
    operation = '';
}

// Helper functions for statistical calculations
function average(nums) {
    if (nums.length === 0) return 0;
    const sum = nums.reduce((a, b) => a + b, 0);
    return (sum / nums.length);
}

function median(nums) {
    if (nums.length === 0) return 0;
    nums.sort((a, b) => a - b);
    const mid = Math.floor(nums.length / 2);
    return nums.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
}

function standardDeviation(nums) {
    if (nums.length === 0) return 0;
    const avg = average(nums);
    const squareDiffs = nums.map(num => Math.pow(num - avg, 2));
    const avgSquareDiff = average(squareDiffs);
    return Math.sqrt(avgSquareDiff);
}

// Memory functions
function memorySave() {
    memory = parseFloat(document.getElementById('display').value) || 0;
}

function memoryRecall() {
    currentInput = memory.toString();
    document.getElementById('display').value = currentInput;
}

function memoryClear() {
    memory = 0;
}

function memorySubtract() {
    memory -= parseFloat(document.getElementById('display').value) || 0;
}

// Function to delete the last character of the current input or real/imaginary parts
function deleteLastCharacter() {
    if (operation === 'real' || operation === 'imaginary') {
        if (operation === 'real') {
            realPart = realPart.slice(0, -1);
        } else if (operation === 'imaginary') {
            imaginaryPart = imaginaryPart.slice(0, -1);
        }
        document.getElementById('display').value = realPart + (imaginaryPart ? 'i' + imaginaryPart : '');
    } else {
        currentInput = currentInput.slice(0, -1);
        document.getElementById('display').value = currentInput;
    }
}

// Function to clear the display
function clearDisplay() {
    document.getElementById('display').value = '';
    currentInput = '';
    operand1 = '';
    operation = '';
    realPart = '';
    imaginaryPart = '';
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    const key = e.key;
    if (!isNaN(key)) { // Number keys
        appendNumber(key);
    } else if (key === '+') {
        setOperation('+');
    } else if (key === '-') {
        setOperation('-');
    } else if (key === '*') {
        setOperation('*');
    } else if (key === '/') {
        setOperation('/');
    } else if (key === 'Enter') {
        calculateResult();
    } else if (key === 'Backspace') {
        deleteLastCharacter();
    } else if (key === 'c' || key === 'C') {
        clearDisplay();
    } else if (key === 'm') {
        memorySave();
    } else if (key === 'r') {
        memoryRecall();
    } else if (key === 'x') {
        memorySubtract();
    } else if (key === 'Escape') {
        memoryClear();
    }
});