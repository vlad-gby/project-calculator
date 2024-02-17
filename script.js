const buttons = document.querySelectorAll('button');
const numButtons = document.querySelectorAll('.numbers button');
const operatorButtons = document.querySelectorAll('.operator');
const clearBtn = document.querySelector('#clear');
const equalsBtn = document.querySelector('#equals');
const output = document.querySelector('.text-line p');

buttons.forEach((button) => {
  button.addEventListener('mouseover', mouseoverHandler);
  button.addEventListener('mouseout', mouseoutHandler);
  button.addEventListener('mousedown', mousedownHandler);
  button.addEventListener('mouseup', mouseupHandler);
});

numButtons.forEach((button) => {
  button.addEventListener('mouseup', mouseupNumberHandler);
});
operatorButtons.forEach((button) => {
  button.addEventListener('mouseup', mouseupOperatorHandler);
});

clearBtn.addEventListener('mouseup', clear);
equalsBtn.addEventListener('mouseup', equals);


// UI HANDLERS FOR ALL BUTTONS
function mouseoverHandler() {
  const R = Number(getComputedStyle(this).backgroundColor.slice(4, 7));
  const G = Number(getComputedStyle(this).backgroundColor.slice(9, 12));
  const B = Number(getComputedStyle(this).backgroundColor.slice(14, 17));
  this.style.backgroundColor = `rgb(${R - 15}, ${G - 15}, ${B - 15})`;
}
function mouseoutHandler() {
  const R = Number(getComputedStyle(this).backgroundColor.slice(4, 7));
  const G = Number(getComputedStyle(this).backgroundColor.slice(9, 12));
  const B = Number(getComputedStyle(this).backgroundColor.slice(14, 17));
  this.style.backgroundColor = `rgb(${R + 15}, ${G + 15}, ${B + 15})`;
}
function mousedownHandler() {
  const R = Number(getComputedStyle(this).backgroundColor.slice(4, 7));
  const G = Number(getComputedStyle(this).backgroundColor.slice(9, 12));
  const B = Number(getComputedStyle(this).backgroundColor.slice(14, 17));
  this.style.backgroundColor = `rgb(${R - 20}, ${G - 20}, ${B - 20})`;
}
function mouseupHandler() {
  console.log(5)
  const R = Number(getComputedStyle(this).backgroundColor.slice(4, 7));
  const G = Number(getComputedStyle(this).backgroundColor.slice(9, 12));
  const B = Number(getComputedStyle(this).backgroundColor.slice(14, 17));
  this.style.backgroundColor = `rgb(${R + 20}, ${G + 20}, ${B + 20})`;
}

// ACTION HANDLERS
function mouseupNumberHandler() {
  const addDigit = () => {
    if(!num1) {
      num1 = Number(this.textContent);
    }else if(num1 && !operator){
      num1 = Number(String(num1) + this.textContent);
    }else if(operator && !num2) {
      num2 = Number(this.textContent);
    }else if(num2) {
      num2 = Number(String(num2) + this.textContent)
    }
  }

  switch(this.textContent){
    case '1':addDigit();
    break;
    case '2':addDigit();
    break;
    case '3':addDigit();
    break;
    case '4':addDigit();
    break;
    case '5':addDigit();
    break;
    case '6':addDigit();
    break;
    case '7':addDigit();
    break;
    case '8':addDigit();
    break;
    case '9':addDigit();
    break;
    case '0':addDigit();
    break;
  }
  display();

}
function mouseupOperatorHandler() {
  switch(this.textContent){
    case '+':
      if(!operator) operator = this.textContent;
    break;
    case '-':
      if(!operator) operator = this.textContent;
    break;
    case '*':
      if(!operator) operator = this.textContent;
    break;
    case '/':
      if(!operator) operator = this.textContent;
    break;
  }
  display();

}


let num1;
let operator;
let num2;
let result;

// OPERATIONS
function add(a, b){
  return a + b;
}
function subtract(a, b){
  return a - b;
}
function multiply(a, b){
  return a * b;
}
function divide(a, b){
  return a / b;
}


function display(){
  if(result) {
    output.textContent = `${result}`;
    return;
  }

  if(num1){
    output.textContent = `${num1}`;
    if(operator){
      output.textContent = `${num1} ${operator}`;
      if(num2){
        output.textContent = `${num1} ${operator} ${num2}`
      }
    }
  }
  if(!num1) output.textContent = '';
}

function clear(){
  num1 = num2 = operator = result = 0;
  display();
}

function equals(){
  switch(operator){
    case '+': result = num1 + num2;
    break;
    case '-': result = num1 - num2;
    break;
    case '*': result = num1 * num2;
    break;
    case '/':
      result = num1 / num2 
      if(result !== Math.round(100*(num1 / num2)) / 100){
        result = `~${Math.round(100*(num1 / num2)) / 100}`
      }
    break;
  }
  display();
}


