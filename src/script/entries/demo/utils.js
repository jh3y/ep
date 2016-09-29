/**
  * Toggle completeness of a bar
*/
const toggleComplete = function(e) {
  const bar = document.getElementById(e.target.getAttribute('data-for'));
  const setButtonText = () => {
    e.target.innerText = (e.target.innerText === 'Complete progress') ? 'Reset progress' : 'Complete progress';
    bar.removeEventListener('transitionend', setButtonText);
  }
  if (bar.getAttribute('data-complete')) {
    bar.addEventListener('transitionend', setButtonText);
    bar.removeAttribute('data-complete');
  } else {
    bar.addEventListener('transitionend', setButtonText);
    bar.setAttribute('data-complete', true);
  }
}

const setBarAndMarkup = function(input, bar, markup) {
  const oldVal = bar.getAttribute('value');
  bar.value = input.value;
  markup.innerHTML = markup.innerHTML.replace(oldVal, input.value);
}

export { toggleComplete, setBarAndMarkup };
