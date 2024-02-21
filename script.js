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
  const R = Number(getComputedStyle(this).backgroundColor.slice(4, 7));
  const G = Number(getComputedStyle(this).backgroundColor.slice(9, 12));
  const B = Number(getComputedStyle(this).backgroundColor.slice(14, 17));
  this.style.backgroundColor = `rgb(${R + 20}, ${G + 20}, ${B + 20})`;
}

// ACTION HANDLERS
function mouseupNumberHandler() {
  if(check === 1 && !operators[0]){
    check = 0;
    nums = [];
    output.textContent = '';
  }

  if(!nums[0]){
    if(this.textContent !== '0'){
      result = 0;
      output.textContent = output.textContent + String(this.textContent);
      nums.push(Number(this.textContent));
    }
  } else if(nums.length - operators.length === 1){
    nums[nums.length - 1] = Number(String(nums.at(-1)) + this.textContent);
    output.textContent = output.textContent + String(this.textContent);
  } else if(nums.length == operators.length){
    output.textContent = output.textContent + ' ' + String(this.textContent);
    nums.push(Number(this.textContent));
  }
}
function mouseupOperatorHandler() {
  if(!nums[0]) return;
  operators.push(this.textContent);

  output.textContent = output.textContent + ' ' + String(this.textContent);
}
function keydownHandler(e){
  if(Number(e.key) + 1){
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
    equals();
  }else if(e.key === 'Backspace'){
    eraseHandler();
  }
  console.log(nums);
  console.log(operators);
}
function eraseHandler(e){
  if(result){
    output.textContent = '';
  }else if(nums.length === operators.length){
    output.textContent = output.textContent.replace(' ' + operators.at(-1), '');
    operators.pop();
  }else if(operators.length === 0){
    output.textContent = output.textContent.replace(nums.at(-1), '');
    nums.pop();
  }else if(nums.length > operators.length){
    output.textContent = output.textContent.replace(' ' + nums.at(-1), '');
    nums.pop();
  }
}


let nums = [];
let operators = [];
let result;
let check;

function clear(){
  nums = [];
  operators = [];
  result = 0;
  output.textContent = '';
}

function equals(){
  // NO CALCLULATIONS
  if(!nums[0]) {
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

  // CHECK IF A BIG DECIMAL
  if(result !== Math.round(result * 100) / 100){
    result = '~' + String(Math.round(result * 100) / 100);
  }
  nums = [result];
  operators = [];
  check = 1;

  output.textContent = nums[0];
}

// ERASE FATURE
const erase = document.querySelector('#erase');
erase.addEventListener('mouseup', eraseHandler);

// KEYBOARD FEATURE
const keyboardBtn = document.querySelector('.keyboard');
let keyboardInput = 0;

keyboardBtn.addEventListener('mouseup', e => {
  if(keyboardInput === 0){
    keyboardBtn.style.backgroundColor = 'rgb(120, 174, 143)';
    keyboardInput = 1;

    window.addEventListener('keydown', keydownHandler);

  }else if(keyboardInput === 1){
    keyboardBtn.style.backgroundColor = 'rgb(170, 170, 170)';
    keyboardInput = 0;

    window.removeEventListener('keydown', keydownHandler);
  }
});






