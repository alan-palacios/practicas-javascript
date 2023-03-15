const keys = [
  {
    audio: new Audio("audios/do.wav"),
    name: 'Do'
  },
  {
    audio: new Audio("audios/re.wav"),
    name: 'Re'
  },
  {
    audio: new Audio("audios/mi.wav"),
    name: 'Mi'
  },
  {
    audio: new Audio("audios/fa.wav"),
    name: 'Fa'
  },
  {
    audio: new Audio("audios/sol.wav"),
    name: 'Sol'
  },
  {
    audio: new Audio("audios/la.wav"),
    name: 'La'
  },
  {
    audio: new Audio("audios/si.wav"),
    name: 'Si'
  },
  {
    audio: new Audio("audios/do-final.wav"),
    name: 'Do'
  }
]

const pressedKeys = [];
let recording = false;
const recordButton = document.getElementById('record');
const playButton = document.getElementById('play');

const playAudio = (index) => {
  keys[index].audio.currentTime = 0;
  keys[index].audio.play();
  if (recording) {
    pressedKeys.push(index);
  }
}

const toggleRecordAudio = () => {
  recording = !recording;
  if (recording) pressedKeys.length = 0;
  recordButton.classList.toggle('active');
  playButton.disabled=!playButton.disabled;
}

const playRecording = () => {
  if (pressedKeys.length===0) return;
  playButton.classList.toggle('active');
  playButton.disabled=!playButton.disabled;
  recordButton.disabled=!recordButton.disabled;
  pressedKeys.forEach((key, i) => {
    setTimeout(() => {
      playAudio(key);
      if (i===pressedKeys.length-1) {
        playButton.classList.toggle('active');
        playButton.disabled=!playButton.disabled;
        recordButton.disabled=!recordButton.disabled;
      } 
    }, i * 500);
  });
}