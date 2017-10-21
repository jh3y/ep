import { toggleComplete, setBarAndMarkup } from '../utils';

/**
  * handle basic demo interaction
*/
const standardBar = document.getElementById('standard-bar');
const standardSet = document.getElementById('standard-set');
const standardComplete = document.getElementById('standard-complete');
const standardMarkup   = document.getElementById('standard-markup');
const setStandard = () => {
  setBarAndMarkup(standardSet, standardBar, standardMarkup);
};

const toggleMarkup = () => {
  const cl = standardMarkup.className;
  standardMarkup.className = (cl.indexOf('complete') === -1) ? 'language-html demo__markup demo__markup--show-complete' : 'language-html demo__markup';
}

standardComplete.addEventListener('click', (e) => {
  toggleComplete(e);
  toggleMarkup();
});

standardSet.addEventListener('input', setStandard);
