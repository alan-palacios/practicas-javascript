const gameContainer = document.getElementById('game');
const n = 4;
const images = [
  'images/bandera.png',
  'images/catrin.png',
  'images/diablito.png',
  'images/escalera.png',
  'images/gallo.png',
  'images/muerte.png',
  'images/pajaro.png',
  'images/sirena.png',
];
const flippedCards = [];
const cards = [];
let pairs=0;
let plays=0;
const maxPlays = 24;
const maxPairs = images.length;
const showCardTime = 1000;

// initialize the cards array
for (let i = 0; i < 2; i++) {
  for (let j = 0; j < images.length; j++) {
    const card = {
      image: images[j],
      id: j,
      clickable: true
    };
    cards.push(card);
  }
}

const shuffle = (array)=>{
  let currentIndex = array.length,  randomIndex;
  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

const updatePairsText = () => {
  const pairsText = document.getElementById('pairs');
  pairsText.innerHTML = `${pairs}/${maxPairs} parejas`;
};

const updatePlaysText = () => {
  const playsText = document.getElementById('plays');
  playsText.innerHTML = `${plays}/${maxPlays} jugadas`;
};

const onGameWin = () => {
  const messageText = document.getElementById('message');
  messageText.innerHTML = `¡Felicidades! Has ganado en ${plays} jugadas.`;
  messageText.classList.add('green');
  messageText.classList.remove('hidden');
}

const onGameLose = () => {
  const messageText = document.getElementById('message');
  messageText.innerHTML = `¡Lo siento! Has perdido.`;
  messageText.classList.add('red');
  messageText.classList.remove('hidden');
}

const onPairMismatch = () => {
  setTimeout(() => {
    flippedCards.forEach((card) => {
      card.element.style.backgroundImage = `url(images/back.png)`;
      card.clickable = true;
    });
    flippedCards.length = 0;
  }, showCardTime);
};

const onPairMatch = () => {
  pairs++;
  if (pairs === maxPairs) {
    onGameWin();
  }
  updatePairsText();
  flippedCards.length = 0;
}

const flipCard = (card) => {
  if (!card.clickable || flippedCards.length === 2) {
    return;
  }
  if (plays === maxPlays) {
    onGameLose();
    return;
  }
  card.element.style.backgroundImage = `url(${card.image})`;
  card.clickable = false;
  flippedCards.push(card);
  if (flippedCards.length === 2) {
    plays++;
    updatePlaysText();
    if (flippedCards[0].id === flippedCards[1].id) {
      onPairMatch();
    } else {
      onPairMismatch();
    }
  }
}

const resetState = () => {
  const messageText = document.getElementById('message');
  messageText.classList.add('hidden');
  messageText.classList.remove('green', 'red');
  gameContainer.innerHTML = '';
  pairs = 0;
  plays = 0;
  updatePairsText();
  updatePlaysText();
  flippedCards.length = 0;
}

const generateMemoryGame = () => {
  resetState();
  shuffle(cards);
  cards.forEach((card, i) => {
    const cardElement = document.createElement('div');
    card.element= cardElement;
    card.clickable = true;
    cardElement.classList.add('card');
    cardElement.style.backgroundImage = `url(images/back.png)`;
    cardElement.addEventListener('mousedown', (e)=>flipCard(card));
    gameContainer.appendChild(cardElement);
  });
}
generateMemoryGame();
