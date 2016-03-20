const timer = {
  timeouts: new Map(),
  intervals: new Map(),
  immediates: new Map(),
  animationFrames: new Map(),

  setTimeout: (name, fn, interval) => {
    if (timer.timeouts.has(name)) {
      throw new Error(`timeout with name '${name}' already registered`);
    }

    timer.clearTimeout(name);
    timer.timeouts.set(name, setTimeout(() => {
      fn();
      timer.clearTimeout(name);
    }, interval));
    return timer;
  },

  clearTimeout: (name) =>{
    if (timer.timeouts.has(name)) {
      clearTimeout(timer.timeouts.get(name));
      timer.timeouts.delete(name);
    }

    return timer;
  },

  setInterval: (name, fn, interval) => {
    if (timer.intervals.has(name)) {
      throw new Error(`interval with name '${name}' already registered`);
    }

    timer.clearInterval(name);
    timer.intervals.set(name, setInterval(fn, interval));
    return timer;
  },

  clearInterval: (name) => {
    if (timer.intervals.has(name)) {
      clearInterval(timer.intervals.get(name));
      timer.intervals.delete(name);
    }

    return timer;
  },

  setImmediate: (name, fn) => {
    if (timer.immediates.has(name)) {
      throw new Error(`immediate with name '${name}' already registered`);
    }

    timer.clearImmediate(name);
    timer.immediates.set(name, setImmediate(() => {
      fn();
      timer.clearImmediate(name);
    }));
    return timer;
  },

  clearImmediate: (name) => {
    if (timer.immediates.has(name)) {
      clearImmediate(timer.immediates.get(name));
      timer.immediates.delete(name);
    }

    return timer;
  },

  requestAnimationFrame: (name, fn) => {
    if (timer.animationFrames.has(name)) {
      throw new Error(`animationFrame with name '${name}' already registered`);
    }

    timer.cancelAnimationFrame(name);
    timer.animationFrames.set(name, requestAnimationFrame(() => {
      fn();
      timer.cancelAnimationFrame(name);
    }));

    return timer;
  },

  cancelAnimationFrame: (name) => {
    if (timer.animationFrames.has(name)) {
      cancelAnimationFrame(timer.animationFrames.get(name));
      timer.animationFrames.delete(name);
    }

    return timer;
  }
};

module.exports = timer;
