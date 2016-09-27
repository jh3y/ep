import './demo.scss';

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

/**
  * Basic progrecss interaction
*/
const basicSet       = document.getElementById('basic-set');
const changeBasic    = () => {
  LOOKUP.basic.setAttribute('value', basicSet.value);
};
const changeDuration = (e) => {
  const ID = e.target.getAttribute('for');
  LOOKUP[ID].setAttribute(ID, e.target.value);
};
const setPosition = (e) => {
  LOOKUP.positional.className = `progrecss ${e.target.value}`;
}


const changeTimer     = document.getElementById('timer-set');
const changeMock      = document.getElementById('mock-set');
const changeStaggered = document.getElementById('staggered-mock-set');
const changePosition  = document.querySelectorAll('[name=position]');
/**
  * Bind events
*/
basicSet.addEventListener('input', changeBasic);
changeTimer.addEventListener('input', changeDuration);
changeMock.addEventListener('input', changeDuration);
changeStaggered.addEventListener('input', changeDuration);
changePosition.forEach((radio) => {
  radio.addEventListener('change', setPosition);
})

console.info(window.Progrecss);
