import './vade.scss';

const sanitizeValue = (val, min = 0, max = 100) => {
  if (val > max) val = max;
  if (val < min)   val = min;
  return val;
}

class Vade {

  constructor(el, opts) {
    const { position, spread } = opts || {};
    if (!el || el.tagName !== 'PROGRESS')
      throw Error('vade: you must pass a <progress> element instance');
    if (spread) el.classList.add('vade--spread');
    if (position && position.length) {
      position.forEach((pos) => el.classList.add(`vade--${pos}`));
    }
    this.el    = el;
    this.value = parseInt(el.getAttribute('value'), 10) || 0;
  }

  set(percent, cb) {
    if (typeof percent === 'number' && percent >= 0 && percent <= 100) {
      const hasCb = cb && typeof cb === 'function';
      /* Add transition end event here */
      if (hasCb) {
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

  decrease(amount = 5, min, cb) {
    this.set(sanitizeValue(this.value - amount, min, undefined), cb);
  }

  reset() {
    if (this._SIMULATING) clearInterval(this._SIMULATING);
    this.set(0);
    this.el.removeAttribute('data-complete');
    this.el.removeAttribute('data-pause');
    setTimeout(() => this.el.removeAttribute('style'), 0);
  }

  mock(duration = 4, staggered, cb) {
    const attr = (staggered) ? 'data-staggered-mock' : 'data-mock';
    const onMockEnd = () => {
      this.el.removeAttribute(attr);
      if (cb && typeof cb === 'function') cb();
      this.el.removeEventListener('animationend', onMockEnd);
    }
    this.el.setAttribute(attr, duration);
    this.el.addEventListener('animationend', onMockEnd);
  }

  time(duration = 4, cb) {
    const onTimerEnd = () => {
      this.el.removeAttribute('data-timer');
      if (cb && typeof cb === 'function') cb();
      this.el.removeEventListener('animationend', onTimerEnd);
    }
    this.el.setAttribute('data-timer', duration);
    this.el.addEventListener('animationend', onTimerEnd);
  }

  simulate(step = 1000) {
    const MAX = 99;
    this._SIMULATING = setInterval(() => {
      if (this.value !== MAX) {
        this.increase(undefined, MAX);
      }
    }, step);
  }

  togglePause() {
    if (this.el.getAttribute('data-pause')) {
      this.el.removeAttribute('data-pause');
    } else {
      this.el.setAttribute('data-pause', true);
    }
  }

  complete(cb) {
    const onComplete = () => {
      this.el.style.transitionDuration = '0s';
      this.reset();
      this.el.removeEventListener('transitionend', onComplete);
      if (cb && typeof cb === 'function') cb();
    }
    this.set(100);
    this.el.setAttribute('data-complete', true);
    this.el.addEventListener('transitionend', onComplete);
  }

};

window.Vade = Vade;
