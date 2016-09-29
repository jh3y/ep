import { updateAndSet } from '../utils';

const timerBar = document.getElementById('timer-bar');
const setMock = document.getElementById('timer-set');
const timerMarkup = document.getElementById('timer-markup');
const timerPause = document.getElementById('pause-timer');

const changeMock = (e) => {
  const attr = 'data-timer';
  updateAndSet(e.target, attr, timerMarkup);
}

const toggleMarkup = () => {
  const cl = timerMarkup.className;
  timerMarkup.className = (cl.indexOf('complete') === -1) ? 'language-html demo__markup demo__markup--show-complete' : 'language-html demo__markup';
}

timerPause.addEventListener('click', (e) => {
  toggleMarkup();
  if (timerBar.getAttribute('data-pause')) {
    timerBar.removeAttribute('data-pause');
  } else {
    timerBar.setAttribute('data-pause', true);
  }
});

setMock.addEventListener('input', changeMock);
