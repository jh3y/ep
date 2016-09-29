import '../../vade/';

const el = document.getElementById('js-bar');
const myVade = new Vade(el);

const afterSet = (e) => {
  console.info('All set');
};

myVade.set(23, afterSet);

window.myVade = myVade;
