const positionalBar = document.getElementById('positional-bar');
const setPosition  = document.querySelectorAll('[name=position]');
const positionalMarkup = document.getElementById('positional-markup');

const changePosition = (e) => {
  const oldVal = (positionalBar.className.trim() === '') ? '<nope>' : positionalBar.className;
  positionalBar.className = e.target.value;

  const newVal = (e.target.value.trim() === '') ? '<nope>' : e.target.value;
  positionalMarkup.innerHTML = positionalMarkup.innerHTML.replace(oldVal, newVal);
}
for (let i = 0; i < setPosition.length; i++) {
  setPosition[i].addEventListener('change', changePosition);
}
