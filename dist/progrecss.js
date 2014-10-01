(function() {
  var progrecss;

  progrecss = window.progrecss = function(element, options) {
    if (!(this instanceof progrecss)) {
      return new progrecss(element, options);
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

  progrecss.prototype._create = function() {
    progrecss = this;
    if (progrecss._element === undefined) {
      progrecss._element = document.createElement("div");
    }
    progrecss._element.className = "progrecss " + progrecss._position + " " + progrecss._color;
    progrecss._element.setAttribute("data-progrecss", progrecss.percent);
    if (progrecss._mock) {
      progrecss._element.setAttribute("data-progrecss-mock", progrecss._mockDuration);
      if (progrecss._staggered) {
        progrecss._element.className += ' staggered';
      }
      if (progrecss._startMockOnCreate) {
        progrecss._element.className += ' mock';
      }
      if (progrecss._reverse) {
        progrecss._element.className += ' reverse';
      }
    } else if (progrecss._timer) {
      progrecss.element.setAttribute("data-progrecss-timer", progrecss._timerDuration);
      if (progrecss._startTimerOnCreate) {
        progrecss.element.className += " timer";
      }
      if (progrecss._reverse) {
        progrecss._element.className += ' reverse';
      }
    }
  };

  progrecss.prototype.setprogrecss = function(percent) {
    if (percent !== undefined && typeof percent === "number" && percent <= 100 && percent >= 0) {
      this._element.setAttribute("data-progrecss", percent);
      this._percent = percent;
    } else {
      throw Error("progrecss: ERROR percent must be a number and between 0 and 100.");
    }
  };

  progrecss.prototype.pause = function() {
    return this._element.className += ' pause';
  };

  progrecss.prototype.play = function() {
    return this._element.className = this._element.className.replace('pause', '');
  };

  progrecss.prototype.togglePause = function() {
    if (this._element.className.indexOf('pause') !== -1) {
      return this.play();
    } else {
      return this.pause();
    }
  };

  progrecss.prototype.startMock = function() {
    progrecss = this;
    progrecss._element.className += " mock";
    setTimeout((function() {
      progrecss._element.className = progrecss._element.className.replace(/\bmock\b/, "");
    }), progrecss._mockDuration * 1000);
  };

  progrecss.prototype.startTimer = function() {
    progrecss = this;
    progrecss._element.className += " timer";
    setTimeout((function() {
      progrecss._element.className = progrecss._element.className.replace(/\btimer\b/, "");
    }), progrecss._timerDuration * 1000);
  };

}).call(this);
