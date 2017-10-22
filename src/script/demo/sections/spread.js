import { toggleComplete, setBarAndMarkup } from '../utils';

const spreadBar = document.getElementById('spread-bar');
const spreadSet = document.getElementById('spread-set');
const spreadComplete = document.getElementById('spread-complete');
const spreadMarkup   = document.getElementById('spread-markup');
const setStandard = () => {
  setBarAndMarkup(spreadSet, spreadBar, spreadMarkup);
};

const toggleMarkup = () => {
  const cl = spreadMarkup.className;
  spreadMarkup.className = (cl.indexOf('complete') === -1) ? 'language-html demo__markup demo__markup--show-complete' : 'language-html demo__markup';
}

spreadComplete.addEventListener('click', (e) => {
  toggleComplete(e);
  toggleMarkup();
});

spreadSet.addEventListener('input', setStandard);
