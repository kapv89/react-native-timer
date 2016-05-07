class Timer {
  timeouts = new Map();
  intervals = new Map();
  immediates = new Map();
  animationFrames = new Map();

  contextTimers = new WeakMap();

  setTimeout(...args) {
    if ((typeof args[0]) === 'object') {
      return this._setTimeoutContext(...args);
    } else {
      return this._setTimeoutVanilla(...args);
    }
  }

  _setTimeoutContext(ctx, name, fn, interval) {
    if (!this.contextTimers.has(ctx)) {
      this.contextTimers.set(ctx, new Timer());
    }

    this.contextTimers.get(ctx).setTimeout(name, fn, interval);

    return this;
  }

  _setTimeoutVanilla(name, fn, interval) {
    this.clearTimeout(name);
    this.timeouts.set(name, setTimeout(() => {
      fn();
      this.clearTimeout(name);
    }, interval));

    return this;
  }

  clearTimeout(...args) {
    if ((typeof args[0]) === 'object') {
      return this._clearTimeoutContext(...args);
    } else {
      return this._clearTimeoutVanilla(...args);
    }
  }

  _clearTimeoutContext(ctx, ...args) {
    if (!this.contextTimers.has(ctx)) {
      return this;
    }

    if (args.length === 0) {
      Array.from(this.contextTimers.get(ctx).timeouts.keys()).forEach((timeout) => {
        this.contextTimers.get(ctx).clearTimeout(timeout);
      });
    } else {
      const [timeout] = args;
      this.contextTimers.get(ctx).clearTimeout(timeout);
    }

    return this;
  }

  _clearTimeoutVanilla(name) {
    if (this.timeouts.has(name)) {
      clearTimeout(this.timeouts.get(name));
      this.timeouts.delete(name);
    }

    return this;
  }

  setInterval(...args) {
    if ((typeof args[0]) === 'object') {
      return this._setIntervalContext(...args);
    } else {
      return this._setIntervalVanilla(...args);
    }
  }

  _setIntervalContext(ctx, name, fn, interval) {
    if (!this.contextTimers.has(ctx)) {
      this.contextTimers.set(ctx, new Timer());
    }

    this.contextTimers.get(ctx).setInterval(name, fn, interval);

    return this;
  }

  _setIntervalVanilla(name, fn, interval) {
    this.clearInterval(name);
    this.intervals.set(name, setInterval(fn, interval));
    return this;
  }

  clearInterval(...args) {
    if ((typeof args[0]) === 'object') {
      return this._clearIntervalContext(...args);
    } else {
      return this._clearIntervalVanilla(...args);
    }
  }

  _clearIntervalContext(ctx, ...args) {
    if (!this.contextTimers.has(ctx)) {
      return this;
    }

    if (args.length === 0) {
      Array.from(this.contextTimers.get(ctx).intervals.keys()).forEach((interval) => {
        this.contextTimers.get(ctx).clearInterval(interval);
      });
    } else {
      const [interval] = args;
      this.contextTimers.get(ctx).clearInterval(interval);
    }

    return this;
  }

  _clearIntervalVanilla(name) {
    if (this.intervals.has(name)) {
      clearInterval(this.intervals.get(name));
      this.intervals.delete(name);
    }

    return this;
  }

  setImmediate(...args) {
    if ((typeof args[0]) === 'object') {
      return this._setImmediateContext(...args);
    } else {
      return this._setImmediateVanilla(...args);
    }
  }

  _setImmediateContext(ctx, name, fn) {
    if (!this.contextTimers.has(ctx)) {
      this.contextTimers.set(ctx, new Timer());
    }

    this.contextTimers.get(ctx).setImmediate(name, fn);

    return this;
  }

  _setImmediateVanilla(name, fn) {
    this.clearImmediate(name);
    this.immediates.set(name, setImmediate(() => {
      fn();
      this.clearImmediate(name);
    }));

    return this;
  }

  clearImmediate(...args) {
    if ((typeof args[0]) === 'object') {
      return this._clearImmediateContext(...args);
    } else {
      return this._clearImmediateVanilla(...args);
    }
  }

  _clearImmediateContext(ctx, ...args) {
    if (!this.contextTimers.has(ctx)) {
      return this;
    }

    if (args.length === 0) {
      Array.from(this.contextTimers.get(ctx).immediates.keys()).forEach((immediate) => {
        this.contextTimers.get(ctx).clearImmediate(immediate);
      });
    } else {
      const [immediate] = args;
      this.contextTimers.get(ctx).clearImmediate(immediate);
    }

    return this;
  }

  _clearImmediateVanilla(name) {
    if (this.immediates.has(name)) {
      clearImmediate(this.immediates.get(name));
      this.immediates.delete(name);
    }

    return this;
  }

  requestAnimationFrame(...args) {
    if ((typeof args[0]) === 'object') {
      return this._requestAnimationFrameContext(...args);
    } else {
      return this._requestAnimationFrameVanilla(...args);
    }
  }

  _requestAnimationFrameContext(ctx, name, fn) {
    if (!this.contextTimers.has(ctx)) {
      this.contextTimers.set(ctx, new Timer());
    }

    this.contextTimers.get(ctx).requestAnimationFrame(name, fn);

    return this;
  }

  _requestAnimationFrameVanilla(name, fn) {
    this.cancelAnimationFrame(name);
    this.animationFrames.set(name, requestAnimationFrame(() => {
      fn();
      this.cancelAnimationFrame(name);
    }));

    return this;
  }

  cancelAnimationFrame(...args) {
    if ((typeof args[0]) === 'object') {
      return this._cancelAnimationFrameContext(...args);
    } else {
      return this._cancelAnimationFrameVanilla(...args);
    }
  }

  _cancelAnimationFrameContext(ctx, ...args) {
    if (!this.contextTimers.has(ctx)) {
      return this;
    }

    if (args.length === 0) {
      Array.from(this.contextTimers.get(ctx).animationFrames.keys()).forEach((animationFrame) => {
        this.contextTimers.get(ctx).cancelAnimationFrame(animationFrame);
      });
    } else {
      const [animationFrame] = args;
      this.contextTimers.get(ctx).cancelAnimationFrame(animationFrame);
    }

    return this;
  }

  _cancelAnimationFrameVanilla(name) {
    if (this.animationFrames.has(name)) {
      cancelAnimationFrame(this.animationFrames.get(name));
      this.animationFrames.delete(name);
    }

    return this;
  }
}

module.exports = new Timer();
