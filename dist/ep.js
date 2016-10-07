'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
  * ep - enhance your progress bars with minimal effort
  *
  * https://jh3y.github.io/ep
  * @license MIT
  * @author jh3y
  * @version 2.0.3
  * (c) 2016
*/
(function () {
  /**
  * Class that acts as a wrapper for interacting with HTML5 <progress> element
  */
  var Ep = function () {
    /**
    * Create interface with <progress> element
    * @param {HTMLProgressElement} el - the <progress> element.
    */
    function Ep(el) {
      _classCallCheck(this, Ep);

      /* If not a <progress> element, throw an error */
      if (!el || Object.getPrototypeOf(el) !== HTMLProgressElement.prototype) throw Error('ep: you must pass a <progress> element instance');
      /* Set internal reference and starting value */
      this._EL = el;
      this._VALUE = parseInt(el.getAttribute('value'), 10) || 0;
    }

    /**
    * Sets <progress> value with optional callback for when transition
    * finishes
    *
    * @param {number} val - the new value to be set
    * @param {function} cb - an optional callback that will be invoked on
    * transitionend
    * @returns {undefined}
    */


    _createClass(Ep, [{
      key: 'set',
      value: function set(val, cb) {
        var _this = this;

        /* Santize values so that value can't be set out of 0-100 range */
        var sanitizeValue = function sanitizeValue(val) {
          var min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
          var max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 100;

          var sanitized = val;
          if (sanitized > max) sanitized = max;
          if (sanitized < min) sanitized = min;
          return sanitized;
        };
        var sVal = sanitizeValue(val);
        if (typeof sVal === 'number' && sVal >= 0 && sVal <= 100) {
          var hasCb = cb && typeof cb === 'function';
          /* If a callback has been defined then hook into transitionend event */
          if (hasCb) {
            (function () {
              var onSetEnd = function onSetEnd() {
                cb();
                _this._EL.removeEventListener('transitionend', onSetEnd);
              };
              _this._EL.addEventListener('transitionend', onSetEnd);
            })();
          }
          /* Set the new value and update the internal reference */
          this._EL.setAttribute('value', sVal);
          this._VALUE = sVal;
        }
      }
      /**
      * Sets the spread class on the <progress> element. The default is to remove
      * it if present
      *
      * @param {bool} spread - whether to set spread class or not
      * @returns {undefined}
      */

    }, {
      key: 'setSpread',
      value: function setSpread() {
        var spread = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        var cl = this._EL.classList;
        spread ? cl.add('ep--spread') : cl.remove('ep--spread');
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
      * @returns {undefined}
      */

    }, {
      key: 'setIndeterminate',
      value: function setIndeterminate() {
        var indeterminate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        var cl = this._EL.classList;
        var indeterminateCL = 'ep--indeterminate';
        indeterminate ? cl.add(indeterminateCL) : cl.remove(indeterminateCL);
      }
      /**
      * Toggles pause attribute helper. This will pause any animations taking
      * place such as those for timers and mocks.
      * @returns {undefined}
      */

    }, {
      key: 'togglePause',
      value: function togglePause() {
        if (this._EL.getAttribute('data-pause')) this._EL.removeAttribute('data-pause');else this._EL.setAttribute('data-pause', true);
      }
      /**
      * Sets positional helper classes on <progress> element from given Array
      *
      * @param {Array} posArr - array of positions to be set from top, fixed,
      * bottom
      * @returns {undefined}
      */

    }, {
      key: 'setPosition',
      value: function setPosition(posArr) {
        var _this2 = this;

        var positions = ['top', 'fixed', 'bottom'];
        for (var p = 0; p < positions.length; p++) {
          for (var cl = 0; cl < this._EL.classList.length; cl++) {
            if (this._EL.classList[cl] === 'ep--' + positions[p]) this._EL.classList.remove('ep--' + positions[p]);
          }
        }if (posArr && posArr.length) posArr.forEach(function (pos) {
          return _this2._EL.classList.add('ep--' + pos);
        });
      }
      /**
      * Helper function to increase <progress> value by a value
      * the default is 5 which can be overridden. Hook into the post set by
      * passing a callback
      *
      * @param {number} amount - amount to increase value by
      * @param {function} cb - optional callback function to be fired on complete
      * @returns {undefined}
      */

    }, {
      key: 'increase',
      value: function increase() {
        var amount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 5;
        var cb = arguments[1];

        this.set(this._VALUE + amount, cb);
      }
      /**
      * Helper function to decrease <progress> value by a value
      * the default is 5 which can be overridden. Hook into the post set by
      * passing a callback
      *
      * @param {number} amount - amount to decrease value by
      * @param {function} cb - optional callback function to be fired on complete
      * @returns {undefined}
      */

    }, {
      key: 'decrease',
      value: function decrease() {
        var amount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 5;
        var cb = arguments[1];

        this.set(this._VALUE - amount, cb);
      }
      /**
      * Resets <progress> element setting value to 0, removing any attributes and
      * simulations
      * @returns {undefined}
      */

    }, {
      key: 'reset',
      value: function reset() {
        var _this3 = this;

        if (this._SIMULATING) clearInterval(this._SIMULATING);
        this.set(0);
        this._EL.removeAttribute('data-complete');
        this._EL.removeAttribute('data-pause');
        setTimeout(function () {
          return _this3._EL.removeAttribute('style');
        }, 0);
      }
      /**
      * Provides a way to quickly mock a <progress> bar progress.
      * Duration is restricted by whatever has been generated on the CSS side.
      *
      * For instance, if I set a duration of 1000. Nothing would happen as the CSS
      * has no rule for [data-mock="1000"].
      *
      * As with setting you can hook into the ending with a callback parameter.
      *
      * @param {number} duration - duration of mock in seconds
      * @param {bool} staggered - whether mock is staggered (determined by
      * keyframes animation)
      * @param {function} cb - optional callback function for when mock animation
      * is complete
      * @returns {undefined}
      */

    }, {
      key: 'mock',
      value: function mock() {
        var duration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 4;

        var _this4 = this;

        var staggered = arguments[1];
        var cb = arguments[2];

        var attr = staggered ? 'data-staggered-mock' : 'data-mock';
        var onMockEnd = function onMockEnd() {
          _this4._EL.removeAttribute(attr);
          if (cb && typeof cb === 'function') cb();
          _this4._EL.removeEventListener('animationend', onMockEnd);
        };
        this._EL.setAttribute(attr, duration);
        this._EL.addEventListener('animationend', onMockEnd);
      }
      /**
      * Display <progress> element as a timer decreasing from full value to 0
      *
      * Much like mocking, restrained by what CSS rules have been generated.
      *
      * @param {number} duration - time in seconds for timer to complete
      * @param {function} cb - optional callback to be invoked when timer
      * completes
      * @returns {undefined}
      */

    }, {
      key: 'time',
      value: function time() {
        var _this5 = this;

        var duration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 4;
        var cb = arguments[1];

        var onTimerEnd = function onTimerEnd() {
          _this5._EL.removeAttribute('data-timer');
          if (cb && typeof cb === 'function') cb();
          _this5._EL.removeEventListener('animationend', onTimerEnd);
        };
        this._EL.setAttribute('data-timer', duration);
        this._EL.addEventListener('animationend', onTimerEnd);
      }
      /**
      * Simulate a <progress> elements progress by having it increase in small
      * increments at a given interval until a value is reached.
      *
      * Handy when you want to simulate progress for something that doesn't have
      * good transparency. For example; you can hook into the success callback
      * of an AJAX request and set the <progress> element as complete whilst it
      * is simulating
      *
      * @param {number} step - ms interval for value increments to be applied
      * @param {number} increment - increment value to be increased at step
      * @param {number} max - max value to be reached before increments cease
      * @returns {undefined}
      */

    }, {
      key: 'simulate',
      value: function simulate() {
        var step = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1000;

        var _this6 = this;

        var increment = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;
        var max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 99;

        this._SIMULATING = setInterval(function () {
          var modMax = max % _this6._VALUE;
          var checkMod = !_this6._VALUE || modMax > increment || modMax === 0;
          var increaseVal = checkMod ? increment : modMax;
          if (_this6._VALUE !== max) _this6.increase(increaseVal);else clearInterval(_this6._SIMULATING);
        }, step);
      }
      /**
      * Completes progress by setting a <progress> value to 100 and then resetting
      * it back to 0
      *
      * Users can hook into this on complete by passing a callback
      *
      * @param {function} cb - optional callback for progress completion
      * @returns {undefined}
      */

    }, {
      key: 'complete',
      value: function complete(cb) {
        var _this7 = this;

        var onComplete = function onComplete() {
          _this7._EL.style.transitionDuration = '0s';
          _this7.reset();
          _this7._EL.removeEventListener('transitionend', onComplete);
          if (cb && typeof cb === 'function') cb();
        };
        this.set(100);
        this._EL.setAttribute('data-complete', true);
        this._EL.addEventListener('transitionend', onComplete);
      }
    }]);

    return Ep;
  }();

  window.Ep = Ep;
})();
