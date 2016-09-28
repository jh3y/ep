/**
  * Toggle completeness of a bar
*/
const toggleComplete = function(e) {
  const bar = document.getElementById(e.target.getAttribute('data-for'));
  const setButtonText = () => {
    e.target.innerText = (e.target.innerText === 'Complete') ? 'Reset' : 'Complete';
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

export { toggleComplete };
