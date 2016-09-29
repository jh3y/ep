import './vade.scss';

/**
  * Work out the API for this
*/

const CLASSES = {
  SPREAD: 'vade--spread'
};

const sanitizeValue = (val, min = 0, max = 100) => {
  if (val > max) val = max;
  if (val < min)   val = min;
  return val;
}

class Vade {

  constructor(el, opts) {
    const { position, spread, onComplete } = opts || {};
    if (!el || el.tagName !== 'PROGRESS')
      throw Error('vade: you must pass a <progress> element instance');
    if (spread) el.classList.add(CLASSES.SPREAD);
    if (position && position.length) {
      position.forEach((pos) => el.classList.add(`vade--${pos}`));
    }
    if (onComplete) this.onComplete = onComplete;
    this.el    = el;
    this.value = parseInt(el.getAttribute('value'), 10) || 0;
    // if (onSetEnd) this.el.addEventListener('transitionend', onSetEnd);
  }

  set(percent, cb) {
    if (typeof percent === 'number' && percent >= 0 && percent <= 100) {
      /* Add transition end event here */
      if (cb && typeof cb === 'function') {
        const onSetEnd = () => {
          cb();
          this.el.removeEventListener('transitionend', onSetEnd);
        }
        this.el.addEventListener('transitionend', onSetEnd);
      }


      this.el.setAttribute('value', percent);
      this.value = percent;
    }
  }

  increase(amount = 5, max, cb) {
    this.set(sanitizeValue(this.value + amount, undefined, max), cb);
  }

  decrease(amount = 5) {
    this.set(sanitizeValue(this.value - amount));
  }

  reset() {
    this.set(0);
    this.el.removeAttribute('data-complete');
    setTimeout(() => this.el.removeAttribute('style'), 0);
  }

  mock(staggered, cb) {

  }

  time(duration, cb) {

  }

  simulate(duration, cb) {
    const MAX = 99;
    if (this.value !== MAX) {
      this.increase(undefined, MAX, () => { this.simulate(); });
    }
  }

  togglePause() {

  }

  complete(cb) {
    const onComplete = () => {
      this.el.style.transitionDuration = '0s';
      this.reset();
      this.el.removeEventListener('transitionend', onComplete);
      if (cb && typeof cb === 'function')
        cb();
      if (this.onComplete && typeof this.onComplete === 'function')
        this.onComplete();
    }
    this.set(100);
    this.el.setAttribute('data-complete', true);
    this.el.addEventListener('transitionend', onComplete);
  }

};

window.Vade = Vade;

window.myVade = new Vade(document.getElementById('standard-bar'), {
  position: ['top', 'fixed'],
  onComplete: function() {
    console.info('hey you complete me');
  }
});
