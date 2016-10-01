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
  simulate: () => myEp.simulate(),
  position: () => myEp.setPosition(['top', 'fixed']),
  resetPosition: () => myEp.setPosition(),
  spreadTrue: () => myEp.setSpread(true),
  spreadFalse: () => myEp.setSpread(false),
  ajax: () => {
    const makeRequest = () => {
      myEp.simulate();
      const xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          myEp.complete();
        }
      };
      xhttp.open('GET', '/index.html', true);
      xhttp.send();
    }
    (myEp._VALUE) ? myEp.set(0, makeRequest) : makeRequest();
  }
};

const jsDemo = document.querySelector('.demo--js');
jsDemo.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    FUNC[e.target.className]();
  }
})


window.myEp = myEp;
