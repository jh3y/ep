import './demo.scss';
import 'prismjs';

const generateLookup = (ids) => {
  const result = {};
  for (let id of ids) {
    result[id] = document.getElementById(id);
  }
  return result;
};

const LOOKUP = generateLookup([
  'basic',
  'mock',
  'staggered-mock',
  'timer',
  'positional'
]);

const updateMarkup = (newVal, oldVal, markupContainer) => {
  markupContainer.innerHTML = markupContainer.innerHTML.replace(oldVal, newVal);
}


/**
  * Basic vade interaction
*/
const changeBasic    = () => {
  const oldVal = LOOKUP.basic.getAttribute('value');
  LOOKUP.basic.setAttribute('value', setBasic.value);
  updateMarkup(setBasic.value, oldVal, document.getElementById('basic-markup'));
};
const changeDuration = (e) => {
  const ID = e.target.getAttribute('for');
  LOOKUP[ID].setAttribute(`data-${ID}`, e.target.value);
};
const changePosition = (e) => {
  LOOKUP.positional.className = `vade ${e.target.value}`;
};
const toggleComplete = (e) => {
  if (LOOKUP.basic.getAttribute('data-complete')) {
    LOOKUP.basic.removeAttribute('data-complete');
    e.target.innerText = 'Complete';
  } else {
    LOOKUP.basic.setAttribute('data-complete', true);
    e.target.innerText = 'Reset';
  }
};


const setBasic     = document.getElementById('basic-set');
const setTimer     = document.getElementById('timer-set');
const setMock      = document.getElementById('mock-set');
const setStaggered = document.getElementById('staggered-mock-set');
const setPosition  = document.querySelectorAll('[name=position]');
const setComplete  = document.getElementById('complete');
/**
  * Bind events
*/
setBasic.addEventListener('input', changeBasic);
setTimer.addEventListener('input', changeDuration);
setMock.addEventListener('input', changeDuration);
setStaggered.addEventListener('input', changeDuration);
for(let i = 0; i < setPosition.length; i++) {
  setPosition[i].addEventListener('change', changePosition);
}
setComplete.addEventListener('click', toggleComplete);

const myVade = new Vade();
