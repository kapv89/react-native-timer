"use strict";

var timer = {
  timeouts: new Map(),
  intervals: new Map(),
  immediates: new Map(),
  animationFrames: new Map(),

  setTimeout: function (_setTimeout) {
    function setTimeout(_x, _x2, _x3) {
      return _setTimeout.apply(this, arguments);
    }

    setTimeout.toString = function () {
      return _setTimeout.toString();
    };

    return setTimeout;
  }(function (name, fn, interval) {
    timer.clearTimeout(name);
    timer.timeouts.set(name, setTimeout(function () {
      fn();
      timer.clearTimeout(name);
    }, interval));
    return timer;
  }),

  clearTimeout: function (_clearTimeout) {
    function clearTimeout(_x4) {
      return _clearTimeout.apply(this, arguments);
    }

    clearTimeout.toString = function () {
      return _clearTimeout.toString();
    };

    return clearTimeout;
  }(function (name) {
    if (timer.timeouts.has(name)) {
      clearTimeout(timer.timeouts.get(name));
      timer.timeouts.delete(name);
    }

    return timer;
  }),

  setInterval: function (_setInterval) {
    function setInterval(_x5, _x6, _x7) {
      return _setInterval.apply(this, arguments);
    }

    setInterval.toString = function () {
      return _setInterval.toString();
    };

    return setInterval;
  }(function (name, fn, interval) {
    timer.clearInterval(name);
    timer.intervals.set(name, setInterval(fn, interval));
    return timer;
  }),

  clearInterval: function (_clearInterval) {
    function clearInterval(_x8) {
      return _clearInterval.apply(this, arguments);
    }

    clearInterval.toString = function () {
      return _clearInterval.toString();
    };

    return clearInterval;
  }(function (name) {
    if (timer.intervals.has(name)) {
      clearInterval(timer.intervals.get(name));
      timer.intervals.delete(name);
    }

    return timer;
  }),

  setImmediate: function (_setImmediate) {
    function setImmediate(_x9, _x10) {
      return _setImmediate.apply(this, arguments);
    }

    setImmediate.toString = function () {
      return _setImmediate.toString();
    };

    return setImmediate;
  }(function (name, fn) {
    timer.clearImmediate(name);
    timer.immediates.set(name, setImmediate(function () {
      fn();
      timer.clearImmediate(name);
    }));
    return timer;
  }),

  clearImmediate: function (_clearImmediate) {
    function clearImmediate(_x11) {
      return _clearImmediate.apply(this, arguments);
    }

    clearImmediate.toString = function () {
      return _clearImmediate.toString();
    };

    return clearImmediate;
  }(function (name) {
    if (timer.immediates.has(name)) {
      clearImmediate(timer.immediates.get(name));
      timer.immediates.delete(name);
    }

    return timer;
  }),

  requestAnimationFrame: function (_requestAnimationFrame) {
    function requestAnimationFrame(_x12, _x13) {
      return _requestAnimationFrame.apply(this, arguments);
    }

    requestAnimationFrame.toString = function () {
      return _requestAnimationFrame.toString();
    };

    return requestAnimationFrame;
  }(function (name, fn) {
    timer.cancelAnimationFrame(name);
    timer.animationFrames.set(name, requestAnimationFrame(function () {
      fn();
      timer.cancelAnimationFrame(name);
    }));

    return timer;
  }),

  cancelAnimationFrame: function (_cancelAnimationFrame) {
    function cancelAnimationFrame(_x14) {
      return _cancelAnimationFrame.apply(this, arguments);
    }

    cancelAnimationFrame.toString = function () {
      return _cancelAnimationFrame.toString();
    };

    return cancelAnimationFrame;
  }(function (name) {
    if (timer.animationFrames.has(name)) {
      cancelAnimationFrame(timer.animationFrames.get(name));
      timer.animationFrames.delete(name);
    }

    return timer;
  })
};

module.exports = timer;