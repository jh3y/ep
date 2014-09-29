(function() {
  var progression;

  progression = window.progression = function(element, options) {
    if (!(this instanceof progression)) {
      return new progression(element, options);
    }
    this._element = element;
    this._color = (options !== undefined && options.color !== undefined ? options.color : "green");
    this._position = (options !== undefined && options.position !== undefined ? options.position : "top");
    this._percent = (options !== undefined && options.percent !== undefined ? options.percent : 0);
    this._mock = (options !== undefined && options.mock !== undefined ? true : false);
    this._mockDuration = (options !== undefined && options.mock.mockDuration !== undefined ? options.mock.mockDuration : 5);
    this._startMockOnCreate = (options !== undefined && options.mock.startMockOnCreate !== undefined ? options.mock.startMockOnCreate : true);
    this._staggered = (options !== undefined && options.mock.staggered !== undefined ? options.mock.staggered : false);
    this._timer = (options !== undefined && options.timer !== undefined ? true : false);
    this._reverse = (options !== undefined && options.reverse !== undefined ? options.reverse : false);
    this._timerDuration = (options !== undefined && options.timer !== undefined && options.timer.timerDuration !== undefined ? options.timer.timerDuration : 5);
    this._startTimerOnCreate = (options !== undefined && options.timer !== undefined && options.timer.startTimerOnCreate !== undefined ? options.timer.startTimerOnCreate : true);
    this._create();
  };

  progression.prototype._create = function() {
    progression = this;
    if (progression._element === undefined) {
      progression._element = document.createElement("div");
    }
    progression._element.className = "progression " + progression._position + " " + progression._color;
    progression._element.setAttribute("data-progression", progression.percent);
    if (progression._mock) {
      progression._element.setAttribute("data-progression-mock", progression._mockDuration);
      if (progression._staggered) {
        progression._element.className += ' staggered';
      }
      if (progression._startMockOnCreate) {
        progression._element.className += ' mock';
      }
      if (progression._reverse) {
        progression._element.className += ' reverse';
      }
    } else if (progression._timer) {
      progression.element.setAttribute("data-progression-timer", progression._timerDuration);
      if (progression._startTimerOnCreate) {
        progression.element.className += " timer";
      }
      if (progression._reverse) {
        progression._element.className += ' reverse';
      }
    }
  };

  progression.prototype.setprogression = function(percent) {
    if (percent !== undefined && typeof percent === "number" && percent <= 100 && percent >= 0) {
      this._element.setAttribute("data-progression", percent);
      this._percent = percent;
    } else {
      throw Error("progression: ERROR percent must be a number and between 0 and 100.");
    }
  };

  progression.prototype.pause = function() {
    return this._element.className += ' pause';
  };

  progression.prototype.play = function() {
    return this._element.className = this._element.className.replace('pause', '');
  };

  progression.prototype.togglePause = function() {
    if (this._element.className.indexOf('pause') !== -1) {
      return this.play();
    } else {
      return this.pause();
    }
  };

  progression.prototype.startMock = function() {
    progression = this;
    progression._element.className += " mock";
    setTimeout((function() {
      progression._element.className = progression._element.className.replace(/\bmock\b/, "");
    }), progression._mockDuration * 1000);
  };

  progression.prototype.startTimer = function() {
    progression = this;
    progression._element.className += " timer";
    setTimeout((function() {
      progression._element.className = progression._element.className.replace(/\btimer\b/, "");
    }), progression._timerDuration * 1000);
  };

}).call(this);
