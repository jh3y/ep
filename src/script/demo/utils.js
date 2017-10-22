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
  if (input.value.trim() === '') return;
  const oldVal = bar.getAttribute('value');
  bar.value = input.value;
  markup.innerHTML = markup.innerHTML.replace(new RegExp(oldVal, 'g'), input.value);
};

const updateAndSet = function(el, attr, markup) {
  const newVal = el.value;
  if (newVal.trim() === '') return;
  const bar = document.getElementById(el.getAttribute('data-for'));
  const oldVal = bar.getAttribute(attr);
  bar.setAttribute(attr, newVal);
  markup.innerHTML = markup.innerHTML.replace(new RegExp(oldVal, 'g'), newVal);
};

export { toggleComplete, setBarAndMarkup, updateAndSet };
