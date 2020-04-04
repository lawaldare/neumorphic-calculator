const $input = document.querySelector("input");

document.querySelectorAll(".num__key").forEach(element => {
  element.onclick = () => ($input.value = $input.value !== "0" ? $input.value + element.innerText : element.innerText)
});


const buffer = [];

const opCallback = opName => () => {
  let currentValue = parseFloat($input.value);

  if(opName === 'percent'){
    currentValue *= 0.01;
    $input.value = currentValue;
  } else {
    if(buffer && buffer.length){
      buffer.push({value: currentValue});

      const result = evalute(buffer);

      buffer.push({value: result});
      buffer.push({value: opName});

      $input.value = "";


    } else {
      buffer.push({value: currentValue});
      buffer.push({value: opName});
      $input.value = "";
    }
  }
}

const evalute = buffer => {
  const secondOperand = buffer.pop().value;
  const operator = buffer.pop().value;
  const firstOperand = buffer.pop().value;

  if(operator === 'add'){
    return firstOperand + secondOperand;
  } else if(operator === 'subtract'){
    return firstOperand - secondOperand;
  } else if(operator === 'multiply'){
    return firstOperand * secondOperand;
  } else if(operator === 'divide'){
    return firstOperand / secondOperand;
  } else {
    return secondOperand;
  }

}

for(const opName of ['add', 'subtract', 'multiply', 'divide', 'percent']){
  document.querySelector(`.op__key[op=${opName}]`).onclick = opCallback(opName)
}

document.querySelector('.eq__key').onclick = () => {
  if(buffer && buffer.length){
    buffer.push({value: parseFloat($input.value)});
    $input.value = evalute(buffer)
  }
}

document.querySelector('.op__key[op=clear]').onclick = () => {
  $input.value = 0;
  buffer.length = 0;
}


document.querySelector('.op__key[op=negate]').onclick = () => $input.value = -parseFloat($input.value)