import './demo.scss';


/**
  * Basic progrecss interaction
*/
const basicProgrecss = document.getElementById('basic');
const basicSet       = document.getElementById('basic-set');
const changeBasic    = () => {
  basicProgrecss.setAttribute('value', basicSet.value);
};


/**
  * Bind events
*/
basicSet.addEventListener('input', changeBasic);



console.info(window.Progrecss);
