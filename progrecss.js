;(function(){

/**
 * Require the given path.
 *
 * @param {String} path
 * @return {Object} exports
 * @api public
 */

function require(path, parent, orig) {
  var resolved = require.resolve(path);

  // lookup failed
  if (null == resolved) {
    orig = orig || path;
    parent = parent || 'root';
    var err = new Error('Failed to require "' + orig + '" from "' + parent + '"');
    err.path = orig;
    err.parent = parent;
    err.require = true;
    throw err;
  }

  var module = require.modules[resolved];

  // perform real require()
  // by invoking the module's
  // registered function
  if (!module._resolving && !module.exports) {
    var mod = {};
    mod.exports = {};
    mod.client = mod.component = true;
    module._resolving = true;
    module.call(this, mod.exports, require.relative(resolved), mod);
    delete module._resolving;
    module.exports = mod.exports;
  }

  return module.exports;
}

/**
 * Registered modules.
 */

require.modules = {};

/**
 * Main definitions.
 */

require.mains = {};

/**
 * Define a main.
 */

require.main = function(name, path){
  require.mains[name] = path;
};

/**
 * Resolve `path`.
 *
 * Lookup:
 *
 *   - PATH/index.js
 *   - PATH.js
 *   - PATH
 *
 * @param {String} path
 * @return {String} path or null
 * @api private
 */

require.resolve = function(path) {
  if ('/' == path.charAt(0)) path = path.slice(1);

  var paths = [
    path,
    path + '.js',
    path + '.json',
    path + '/index.js',
    path + '/index.json'
  ];

  if (require.mains[path]) {
    paths = [path + '/' + require.mains[path]];
  }

  for (var i = 0, len = paths.length; i < len; i++) {
    var path = paths[i];
    if (require.modules.hasOwnProperty(path)) {
      return path;
    }
  }
};

/**
 * Normalize `path` relative to the current path.
 *
 * @param {String} curr
 * @param {String} path
 * @return {String}
 * @api private
 */

require.normalize = function(curr, path) {
  var segs = [];

  if ('.' != path.charAt(0)) return path;

  curr = curr.split('/');
  path = path.split('/');

  for (var i = 0, len = path.length; i < len; ++i) {
    if ('..' == path[i]) {
      curr.pop();
    } else if ('.' != path[i] && '' != path[i]) {
      segs.push(path[i]);
    }
  }

  return curr.concat(segs).join('/');
};

/**
 * Register module at `path` with callback `definition`.
 *
 * @param {String} path
 * @param {Function} definition
 * @api private
 */

require.register = function(path, definition) {
  require.modules[path] = definition;
};

/**
 * Return a require function relative to the `parent` path.
 *
 * @param {String} parent
 * @return {Function}
 * @api private
 */

require.relative = function(parent) {
  var root = require.normalize(parent, '..');

  /**
   * lastIndexOf helper.
   */

  function lastIndexOf(arr, obj) {
    var i = arr.length;
    while (i--) {
      if (arr[i] === obj) return i;
    }
    return -1;
  }

  /**
   * The relative require() itself.
   */

  function localRequire(path) {
    var resolved = localRequire.resolve(path);
    return require(resolved, parent, path);
  }

  /**
   * Resolve relative to the parent.
   */

  localRequire.resolve = function(path) {
    var c = path.charAt(0);
    if ('/' == c) return path.slice(1);
    if ('.' == c) return require.normalize(root, path);
    return path;
  };

  /**
   * Check if module is defined at `path`.
   */

  localRequire.exists = function(path) {
    return require.modules.hasOwnProperty(localRequire.resolve(path));
  };

  return localRequire;
};
require.register("progrecss/index.js", function(exports, require, module){
module.exports = progrecss;
function progrecss(element, options) {
	if (!(this instanceof progrecss)) return new progrecss(element, options);
	this._element = element;
	this._color = (options !== undefined && options.color !== undefined) ? options.color: 'green';
	this._position = (options !== undefined && options.position !== undefined) ? options.position: 'top';
	this._percent = (options !== undefined && options.percent !== undefined) ? options.percent: 0;
	this._mock = (options !== undefined && options.mock !== undefined) ? true: false;
	this._mockDuration = (options !== undefined && options.mock.mockDuration !== undefined) ? options.mock.mockDuration: 5;
	this._startMockOnCreate = (options !== undefined && options.mock.startMockOnCreate !== undefined) ? options.mock.startMockOnCreate: true;
	this._staggered = (options !== undefined && options.mock.staggered !== undefined) ? options.mock.staggered: false;
	this._timer = (options !== undefined && options.timer !== undefined) ? true: false;
	this._timerDuration = (options !== undefined && options.timer !== undefined && options.timer.timerDuration !== undefined) ? options.timer.timerDuration: 5;
	this._startTimerOnCreate = (options !== undefined && options.timer.startTimerOnCreate !== undefined) ? options.timer.startTimerOnCreate: true;
	this._create();
}
progrecss.prototype._create = function () {
	var progrecss = this;
	if (progrecss._element === undefined) {
		progrecss._element = document.createElement('div');
	}
	progrecss._element.className = 'progrecss ' + progrecss._position + ' ' + progrecss._color;
	progrecss._element.setAttribute('data-progrecss', progrecss.percent);
	if (progrecss._mock) {
		progrecss._element.setAttribute('data-progrecss-mock', progrecss._mockDuration);
		if (progrecss._staggered) {
			progrecss._element.className +=  ' staggered';
		}
		if (progrecss._startMockOnCreate) {
			progrecss._element.className += ' mock';
		}
	} else if (progrecss._timer) {
		progrecss.element.setAttribute('data-progrecss-timer', progrecss._timerDuration);
		if (progrecss._startTimerOnCreate) {
			progrecss.element.className += ' timer';
		}
	}
}
progrecss.prototype.setProgrecss = function (percent) {
	if (percent !== undefined && typeof(percent) === 'number' && percent <= 100 && percent >= 0) {
		this._element.setAttribute('data-progrecss', percent);
		this._percent = percent;	
	} else {
		throw Error('progrecss: ERROR percent must be a number and between 0 and 100.')
	}
}
progrecss.prototype.startMock = function () {
	var progrecss = this;
	progrecss._element.className += ' mock';
	setTimeout(function () {
		progrecss._element.className = progrecss._element.className.replace(/\bmock\b/,'');
	}, progrecss._mockDuration * 1000);
}
progrecss.prototype.startTimer = function () {
	var progrecss = this;
	progrecss._element.className += ' timer';
	setTimeout(function () {
		progrecss._element.className = progrecss._element.className.replace(/\btimer\b/,'');
	}, progrecss._timerDuration * 1000);
}
});if (typeof exports == "object") {
  module.exports = require("progrecss");
} else if (typeof define == "function" && define.amd) {
  define(function(){ return require("progrecss"); });
} else {
  this["progrecss"] = require("progrecss");
}})();