import { toggleComplete } from '../utils';

/**
  * handle basic demo interaction
*/
const basicBar = document.getElementById('basic-bar');
const changeBasic = document.getElementById('basic-set');
const changeComplete = document.getElementById('basic-complete');
const setBasic = () => {
  basicBar.value = changeBasic.value;
};

changeComplete.addEventListener('click', toggleComplete);
changeBasic.addEventListener('input', setBasic);
