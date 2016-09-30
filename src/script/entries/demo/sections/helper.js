import '../../vade/';

const el = document.getElementById('js-bar');
const myVade = new Vade(el);

const FUNC = {
  afterSet: () => {
    let afterSet = () => alert('All set!');
    myVade.set(23, afterSet);
  },
  complete: () => {
    let onComplete = () => alert('Completed!');
    myVade.complete(onComplete);
  },
  reset: () => myVade.reset(),
  set: () => myVade.set(75),
  increase: () => myVade.increase(),
  decrease: () => myVade.decrease(25),
  position: () => myVade.setPosition(['top', 'fixed']),
  resetPosition: () => myVade.resetPosition(),
  spreadTrue: () => myVade.setSpread(true),
  spreadFalse: () => myVade.setSpread(false)
};

const jsDemo = document.querySelector('.demo--js');
jsDemo.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    FUNC[e.target.className]();
  }
})


window.myVade = myVade;
