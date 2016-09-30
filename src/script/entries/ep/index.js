/*!
  * ep - enhance your progress bars with minimal effort
  *
  * https://jh3y.github.io/ep
  * @author jh3y 2016
  * @license MIT
*/

/**
  * Class that acts as a wrapper for interacting with HTML5 <progress> element
*/
class Ep {
  /**
    * Create interface with <progress> element
    * @param {HTMLProgressElement} el - the <progress> element.
  */
  constructor(el) {
    /* If not a <progress> element, throw an error */
    if (!el || el.tagName !== 'PROGRESS')
      throw Error('ep: you must pass a <progress> element instance');
    /* Set internal reference and starting value */
    this._EL    = el;
    this._VALUE = parseInt(el.getAttribute('value'), 10) || 0;
  }

  /**
    * Sets <progress> value with optional callback for when transition
    * finishes
    *
    * @param {number} val - the new value to be set
    * @param {function} cb - an optional callback that will be invoked on
    * transitionend
  */
  set(val, cb) {
    /* Santize values so that value can't be set out of 0-100 range */
    const sanitizeValue = (val, min = 0, max = 100) => {
      if (val > max) val = max;
      if (val < min) val = min;
      return val;
    };
    val = sanitizeValue(val);
    if (typeof val === 'number' && val >= 0 && val <= 100) {
      const hasCb = cb && typeof cb === 'function';
      /* If a callback has been defined then hook into transitionend event */
      if (hasCb) {
        const onSetEnd = () => {
          cb();
          this._EL.removeEventListener('transitionend', onSetEnd);
        }
        this._EL.addEventListener('transitionend', onSetEnd);
      }
      /* Set the new value and update the internal reference */
      this._EL.setAttribute('value', val);
      this._VALUE = val;
    }
  }

  /**
    * Sets the spread class on the <progress> element. The default is to remove
    * it if present
    *
    * @param {bool} spread - whether to set spread class or not
  */
  setSpread(spread = false) {
    (spread) ? this._EL.classList.add('ep--spread') : this._EL.classList.remove('ep--spread');
  }
  /**
    * Sets the indeterminate class on the <progress> element.
    * NOTE:; It's only necessary to use this when dealing with browsers that
    * struggle with indeterminate <progress> elements such as iOS Safari
    *
    * As with the "setSpread" method, the default behavior is to remove the
    * class
    *
    * @param {bool} indeterminate - whether to set indeterminate class or not
  */
  setIndeterminate(indeterminate = false) {
    (indeterminate) ? this._EL.classList.add('ep--indeterminate') : this._EL.classList.remove('ep--indeterminate');
  }
  /**
    * Sets positional helper classes on <progress> element from given Array
    *
    * @param {Array} posArr - array of positions to be set from top, fixed,
    * bottom
  */
  setPosition(posArr) {
    if (posArr && posArr.length) {
      posArr.forEach((pos) => this._EL.classList.add(`ep--${pos}`));
    }
  }
  /**
    * Resets <progress> element position by removing all ep positional helpers
  */
  resetPosition() {
    const positions = ['top', 'fixed', 'bottom'];
    for (let p = 0; p < positions.length; p++) {
      for (let cl = 0; cl < this._EL.classList.length; cl++) {
        if (this._EL.classList[cl] === `ep--${positions[p]}`)
          this._EL.classList.remove(`ep--${positions[p]}`);
      }
    }
  }
  /**
    * Helper function to increase <progress> value by a value
    * the default is 5 which can be overridden. Hook into the post set by
    * passing a callback
    *
    * @param {number} amount - amount to increase value by
    * @param {function} cb - optional callback function to be fired on complete
  */
  increase(amount = 5, cb) {
    this.set(this._VALUE + amount, cb);
  }
  /**
    * Helper function to decrease <progress> value by a value
    * the default is 5 which can be overridden. Hook into the post set by
    * passing a callback
    *
    * @param {number} amount - amount to decrease value by
    * @param {function} cb - optional callback function to be fired on complete
  */
  decrease(amount = 5, cb) {
    this.set(this._VALUE - amount, cb);
  }
  /**
    * Resets <progress> element setting value to 0, removing any attributes and
    * simulations
  */
  reset() {
    if (this._SIMULATING) clearInterval(this._SIMULATING);
    this.set(0);
    this._EL.removeAttribute('data-complete');
    this._EL.removeAttribute('data-pause');
    setTimeout(() => this._EL.removeAttribute('style'), 0);
  }

  mock(duration = 4, staggered, cb) {
    const attr = (staggered) ? 'data-staggered-mock' : 'data-mock';
    const onMockEnd = () => {
      this._EL.removeAttribute(attr);
      if (cb && typeof cb === 'function') cb();
      this._EL.removeEventListener('animationend', onMockEnd);
    }
    this._EL.setAttribute(attr, duration);
    this._EL.addEventListener('animationend', onMockEnd);
  }

  time(duration = 4, cb) {
    const onTimerEnd = () => {
      this._EL.removeAttribute('data-timer');
      if (cb && typeof cb === 'function') cb();
      this._EL.removeEventListener('animationend', onTimerEnd);
    }
    this._EL.setAttribute('data-timer', duration);
    this._EL.addEventListener('animationend', onTimerEnd);
  }

  simulate(step = 1000) {
    const MAX = 99;
    this._SIMULATING = setInterval(() => {
      const increaseVal = (MAX % this._VALUE > 5 || MAX % this._VALUE === 0) ? 5 : MAX % this._VALUE;
      if (this._VALUE !== MAX) {
        this.increase(increaseVal);
      } else {
        clearInterval(this._SIMULATING);
      }
    }, step);
  }

  togglePause() {
    if (this._EL.getAttribute('data-pause')) {
      this._EL.removeAttribute('data-pause');
    } else {
      this._EL.setAttribute('data-pause', true);
    }
  }

  complete(cb) {
    const onComplete = () => {
      this._EL.style.transitionDuration = '0s';
      this.reset();
      this._EL.removeEventListener('transitionend', onComplete);
      if (cb && typeof cb === 'function') cb();
    }
    this.set(100);
    this._EL.setAttribute('data-complete', true);
    this._EL.addEventListener('transitionend', onComplete);
  }

};

window.Ep = Ep;
