const pianoContainer = document.getElementById('piano');

const generatePianoKeys = () => {
  keys.forEach((key, i) => {
    const keyElement = document.createElement('div');
    keyElement.classList.add('key');

    const keyName = document.createElement('span');
    keyName.innerHTML = key.name;
    keyName.classList.add('key-name');
    keyElement.appendChild(keyName);
    keyElement.addEventListener('mousedown', ()=>playAudio(i));

    pianoContainer.appendChild(keyElement);
  });
}

const listenKeyboard = () => {
  document.addEventListener('keydown', (event) => {
    const key = event.key;
    const keyboardKeys = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k'];
    let keyIndex;
    if (keyboardKeys.indexOf(key) > -1) {
      keyIndex = keyboardKeys.indexOf(key);
      playAudio(keyIndex);
      const keyElement = pianoContainer.children[keyIndex];
      keyElement.classList.add('active');
    }
  });
  document.addEventListener('keyup', (event) => {
    const key = event.key;
    const keyboardKeys = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k'];
    let keyIndex;
    if (keyboardKeys.indexOf(key) > -1) {
      keyIndex = keyboardKeys.indexOf(key);
      const keyElement = pianoContainer.children[keyIndex];
      keyElement.classList.remove('active');
    }
  });
}

generatePianoKeys();
listenKeyboard();
