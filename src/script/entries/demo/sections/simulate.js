import { toggleComplete } from '../utils';

const simulateComplete = document.getElementById('complete-simulate');
const simulateMarkup = document.getElementById('simulate-markup');

const toggleMarkup = () => {
  const cl = simulateMarkup.className;
  simulateMarkup.className = (cl.indexOf('complete') === -1) ? 'language-html demo__markup demo__markup--show-complete' : 'language-html demo__markup';
}

simulateComplete.addEventListener('click', (e) => {
  toggleComplete(e);
  toggleMarkup();
});
