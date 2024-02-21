const buttons = document.querySelectorAll('button');
const numButtons = document.querySelectorAll('.numbers button');
const operatorButtons = document.querySelectorAll('.operator');
const clearBtn = document.querySelector('#clear');
const eraseBtn = document.querySelector('#erase');
const equalsBtn = document.querySelector('#equals');
const output = document.querySelector('.text-line p');

let nums = [];
let operators = [];
let result;
let check;

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

clearBtn.addEventListener('mouseup', clearHandler);
equalsBtn.addEventListener('mouseup', equalsHandler);


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
  const R = Number(getComputedStyle(this).backgroundColor.slice(4, 7));
  const G = Number(getComputedStyle(this).backgroundColor.slice(9, 12));
  const B = Number(getComputedStyle(this).backgroundColor.slice(14, 17));
  this.style.backgroundColor = `rgb(${R + 20}, ${G + 20}, ${B + 20})`;
}

// ACTION HANDLERS==================
function mouseupNumberHandler() {
  if(check === 1 && !operators[0] && output.textContent !== ' -'){
    check = 0;
    nums = [];
    output.textContent = '';
  }
  if(nums.at(-1) === 0 && nums.length > operators.length) return;

  if(nums[0] === undefined && output.textContent === ' -'){
    output.textContent = output.textContent + this.textContent;
    nums.push(Number(this.textContent) * (-1));
  }else if(nums[0] === undefined && this.textContent !== '0'){
    result = 0;
    output.textContent = output.textContent + this.textContent;
    nums.push(Number(this.textContent));
  }else if(nums.length > operators.length){
    nums[nums.length - 1] = Number(String(nums.at(-1)) + this.textContent);
    output.textContent = output.textContent + this.textContent;
  }else if(nums.length == operators.length){
    output.textContent = output.textContent + ' ' + this.textContent;
    nums.push(Number(this.textContent));
  }
}

function mouseupOperatorHandler() {
  if(nums[0] === undefined && this.textContent !== '-') return;
  if(nums[0] === undefined && this.textContent === '-'){
    output.textContent = output.textContent + ' ' + String(this.textContent);
    return;
  }
  if(nums.length === operators.length) return;

  operators.push(this.textContent);
  output.textContent = output.textContent + ' ' + String(this.textContent);
}

function equalsHandler(){

  // NO CALCLULATIONS
  if(nums[0] === undefined) {
    result = 'Nothing entered';
    output.textContent = result;
    return;
  };
  if(nums.length === 1) {
    result = nums[0];
    output.textContent = result;
    return;
  };

  // EXECUTE MULTIPLICATIONS AND DIVISIONS
  for(let i = 0; i < operators.length; i++){
    if(operators[i] === '*'){
      nums.splice(i, 2, nums[i] * nums[i + 1]);
      operators.splice(i, 1);
      i--;
    }
    if(operators[i] === '/'){
      nums.splice(i, 2, nums[i] / nums[i + 1]);
      operators.splice(i, 1);
      i--;
    }
  };

  // ADD EVERYTHIGN ELSE UP
  result = operators.reduce((result, operator, index) => {
    if(operator === '+'){
      result += nums[index + 1];
    }
    if(operator === '-'){
      result -= nums[index + 1];
    }
    return result;
  }, nums[0]);

  nums = [result];
  operators = [];
  check = 1;

  // CHECK IF A BIG DECIMAL
  if(result !== Math.round(result * 100) / 100){
    output.textContent = '~' + Math.round(result * 100) / 100;
  }else{
    output.textContent = nums[0];
  }
}

function eraseHandler(e){
  if(nums.length === operators.length && operators.length !== 0){
    output.textContent = output.textContent.replace(' ' + operators.at(-1), '');
    operators.pop();
  }else if(operators.length === 0){
    output.textContent = ''
    nums.pop();
  }else if(nums.length > operators.length){
    output.textContent = output.textContent.replace(' ' + nums.at(-1), '');
    nums.pop();
  }else output.textContent = '';
}
function clearHandler(){
  nums = [];
  operators = [];
  result = 0;
  output.textContent = '';
}

function keydownHandler(e){
  if(Number(e.key) || e.key === '0'){
    const currBtn = Array.from(numButtons).find((btn) => {
      return btn.textContent === e.key;
    });
    mouseupNumberHandler.call(currBtn);
  }else if(e.key === '*' || e.key === '/'
  || e.key === '+' || e.key === '-'){
    const currBtn = Array.from(operatorButtons).find((btn) => {
      return btn.textContent === e.key;
    });
    mouseupOperatorHandler.call(currBtn);
  }else if(e.key === 'Enter'){
    equalsHandler();
  }else if(e.key === 'Backspace'){
    eraseHandler();
  }
}

// ERASE FATURE

eraseBtn.addEventListener('mouseup', eraseHandler);

// KEYBOARD FEATURE
window.addEventListener('keydown', keydownHandler);

