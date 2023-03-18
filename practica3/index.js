const boardContainer = document.getElementById('board');
const colors = [
  '#F2CD5C',
  '#F2921D',
  '#EA5455',
  '#FF5F9E',
  '#A459D1',
  '#3F72AF',
  '#A4BE7B',
  '#000000', 
  '#ffffff'
];
let size = 8;
let mouseDown = false;

// generate color options
const colorOptions = document.getElementById('color-options');
colors.forEach((color, i) => {
  const colorOption = document.createElement('div');
  colorOption.classList.add('color');
  colorOption.style.backgroundColor = color;
  if (i === 0) colorOption.classList.add('selected');
  colorOption.addEventListener('click', () => {
    const selectedColor = document.querySelector('.selected');
    selectedColor?.classList.remove('selected');
    colorOption.classList.add('selected');
  });
  colorOptions.appendChild(colorOption);
});

const showBordersCheckbox = document.getElementById('show-borders');
showBordersCheckbox.checked = false;
showBordersCheckbox.addEventListener('change', (e) => {
  if (e.target.checked) {
    boardContainer.classList.add('show-borders');
  } else {
    boardContainer.classList.remove('show-borders');
  }
});

const onChangeBoardSize = (e) => {
  if (!isNaN(e.target.value) && e.target.value > 0) {
    size = parseInt(e.target.value);
    const generateButton = document.getElementById('generate');
    generateButton.innerHTML = `Generate ${size}x${size} board`;
  }
}
const validateIsNumber = (e) => {
  const key = e.keyCode || e.which;
  const keyChar = String.fromCharCode(key);
  const regex = /[0-9]/;
  if (!regex.test(keyChar) || parseInt(e.target.value.toString()+keyChar) > 30) {
    e.preventDefault();
    return false;
  }
}

const onMouseDown = (e, pixel) => {
  if (mouseDown) return;
  const selectedColor = document.querySelector('.selected');
  pixel.style.backgroundColor = selectedColor.style.backgroundColor;
  mouseDown = true;
  e.preventDefault();
}
const onMouseUp = () => {
  mouseDown = false;
}
const onMouseOver = (pixel) => {
  if (!mouseDown) return;
  const selectedColor = document.querySelector('.selected');
  pixel.style.backgroundColor = selectedColor.style.backgroundColor;
}

const generateBoard = () => {
  const inputSize = document.getElementById('size');
  inputSize.addEventListener('input', onChangeBoardSize);
  inputSize.addEventListener('keypress', validateIsNumber);
  inputSize.value = size;

  boardContainer.innerHTML = '';
  boardContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  const boardSize = size * size;
  for (let i = 0; i < boardSize; i++) {
    const color = '#ffffff';
    const pixel = document.createElement('div');
    pixel.classList.add('pixel');
    pixel.style.backgroundColor = color;
    pixel.addEventListener('mousedown', (e) => onMouseDown(e, pixel));
    pixel.addEventListener('mouseover', ()=>onMouseOver(pixel));
    pixel.addEventListener('mouseup', onMouseUp);
    boardContainer.appendChild(pixel);
  }
}
generateBoard();
