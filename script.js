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
  if(result){
    clear();
    display();
  }

  if(!nums[0]){
    output.textContent = output.textContent + String(this.textContent);
    nums.push(Number(this.textContent));
  } else if(nums.length - operators.length === 1){
    nums[nums.length - 1] = Number(String(nums.at(-1)) + this.textContent);
    output.textContent = output.textContent + String(this.textContent);
    console.log();
  } else if(nums.length == operators.length){
    output.textContent = output.textContent + ' ' + String(this.textContent);
    nums.push(Number(this.textContent));
  }

  console.log(nums);
}
function mouseupOperatorHandler() {
  if(!nums[0]) return;
  operators.push(this.textContent);

  output.textContent = output.textContent + ' ' + String(this.textContent);
}


let nums = [];
let operators = [];
let result;

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
    display();
    return;
  };
  if(nums.length === 1) {
    result = nums[0];
    display();
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
  console.log(nums);
  console.log(operators);

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
  console.log(result);

  output.textContent = result;
}

