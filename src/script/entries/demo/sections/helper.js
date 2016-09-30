import '../../ep/';

const el = document.getElementById('js-bar');
const myEp = new Ep(el);

const FUNC = {
  afterSet: () => {
    let afterSet = () => alert('All set!');
    myEp.set(23, afterSet);
  },
  complete: () => {
    let onComplete = () => alert('Completed!');
    myEp.complete(onComplete);
  },
  reset: () => myEp.reset(),
  set: () => myEp.set(75),
  increase: () => myEp.increase(),
  decrease: () => myEp.decrease(25),
  position: () => myEp.setPosition(['top', 'fixed']),
  resetPosition: () => myEp.resetPosition(),
  spreadTrue: () => myEp.setSpread(true),
  spreadFalse: () => myEp.setSpread(false)
};

const jsDemo = document.querySelector('.demo--js');
jsDemo.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    FUNC[e.target.className]();
  }
})


window.myEp = myEp;
