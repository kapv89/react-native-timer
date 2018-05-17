class Timer {
  timeouts = new Map();
  intervals = new Map();
  immediates = new Map();
  animationFrames = new Map();

  executedTimeouts = new Set();
  executedImmediates = new Set();
  executedAnimationFrames = new Set();

  contextTimers = new WeakMap();

  contextTimer(ctx) {
    if (!this.contextTimers.has(ctx)) {
      this.contextTimers.set(ctx, new Timer());
    }

    return this.contextTimers.get(ctx);
  }

  setTimeout(...args) {
    if ((typeof args[0]) === 'object') {
      return this._setTimeoutContext(...args);
    } else {
      return this._setTimeoutVanilla(...args);
    }
  }

  _setTimeoutContext(ctx, name, fn, interval) {
    this.contextTimer(ctx).setTimeout(name, fn, interval);
    return this;
  }

  _setTimeoutVanilla(name, fn, interval) {
    this.clearTimeout(name);
    this.timeouts.set(name, setTimeout(() => {
      this.clearTimeout(name);
      this.executedTimeouts.add(name);
      fn();
      this.executedTimeouts.delete(name);
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
      Array.from(this.contextTimer(ctx).timeouts.keys()).forEach((timeout) => {
        this.contextTimer(ctx).clearTimeout(timeout);
      });
    } else {
      const [timeout] = args;
      this.contextTimer(ctx).clearTimeout(timeout);
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

  timeoutExists(...args) {
    if ((typeof args[0]) === 'object') {
      return this._timeoutExistsContext(...args);
    } else {
      return this._timeoutExistsVanilla(...args);
    }
  }

  _timeoutExistsContext(ctx, name) {
    return this.contextTimers.has(ctx) && this.contextTimer(ctx).timeoutExists(name);
  }

  _timeoutExistsVanilla(name) {
    return this.timeouts.has(name) || this.executedTimeouts.has(name);
  }

  setInterval(...args) {
    if ((typeof args[0]) === 'object') {
      return this._setIntervalContext(...args);
    } else {
      return this._setIntervalVanilla(...args);
    }
  }

  _setIntervalContext(ctx, name, fn, interval) {
    this.contextTimer(ctx).setInterval(name, fn, interval);
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
      Array.from(this.contextTimer(ctx).intervals.keys()).forEach((interval) => {
        this.contextTimer(ctx).clearInterval(interval);
      });
    } else {
      const [interval] = args;
      this.contextTimer(ctx).clearInterval(interval);
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

  intervalExists(...args) {
    if (typeof args[0] === 'object') {
      return this._intervalExistsContext(...args);
    } else {
      return this._intervalExistsVanilla(...args);
    }
  }

  _intervalExistsContext(ctx, name) {
    return this.contextTimers.has(ctx) && this.contextTimer(ctx).intervalExists(name);
  }

  _intervalExistsVanilla(name) {
    return this.intervals.has(name);
  }

  setImmediate(...args) {
    if ((typeof args[0]) === 'object') {
      return this._setImmediateContext(...args);
    } else {
      return this._setImmediateVanilla(...args);
    }
  }

  _setImmediateContext(ctx, name, fn) {
    this.contextTimer(ctx).setImmediate(name, fn);
    return this;
  }

  _setImmediateVanilla(name, fn) {
    this.clearImmediate(name);
    this.immediates.set(name, setImmediate(() => {
      this.clearImmediate(name);
      this.executedImmediates.add(name);
      fn();
      this.executedImmediates.delete(name);
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
      Array.from(this.contextTimer(ctx).immediates.keys()).forEach((immediate) => {
        this.contextTimer(ctx).clearImmediate(immediate);
      });
    } else {
      const [immediate] = args;
      this.contextTimer(ctx).clearImmediate(immediate);
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

  immediateExists(...args) {
    if (typeof args[0] === 'object') {
      return this._immediateExistsContext(...args);
    } else {
      return this._immediateExistsVanilla(...args);
    }
  }

  _immediateExistsContext(ctx, name) {
    return this.contextTimers.has(ctx) && this.contextTimer(ctx).immediateExists(name);
  }

  _immediateExistsVanilla(name) {
    return this.immediates.has(name) || this.executedImmediates.has(name);
  }

  requestAnimationFrame(...args) {
    if ((typeof args[0]) === 'object') {
      return this._requestAnimationFrameContext(...args);
    } else {
      return this._requestAnimationFrameVanilla(...args);
    }
  }

  _requestAnimationFrameContext(ctx, name, fn) {
    this.contextTimer(ctx).requestAnimationFrame(name, fn);

    return this;
  }

  _requestAnimationFrameVanilla(name, fn) {
    this.cancelAnimationFrame(name);
    this.animationFrames.set(name, requestAnimationFrame(() => {
      this.cancelAnimationFrame(name);
      this.executedAnimationFrames.add(name);
      fn();
      this.executedAnimationFrames.delete(name);
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
      Array.from(this.contextTimer(ctx).animationFrames.keys()).forEach((animationFrame) => {
        this.contextTimer(ctx).cancelAnimationFrame(animationFrame);
      });
    } else {
      const [animationFrame] = args;
      this.contextTimer(ctx).cancelAnimationFrame(animationFrame);
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

  animationFrameExists(...args) {
    if (typeof args[0] === 'object') {
      return this._animationFrameExistsContext(...args);
    } else {
      return this._animationFrameExistsVanilla(...args);
    }
  }

  _animationFrameExistsContext(ctx, name) {
    return this.contextTimers.has(ctx) && this.contextTimer(ctx).animationFrameExists(name);
  }

  _animationFrameExistsVanilla(name) {
    return this.animationFrames.has(name) || this.executedAnimationFrames.has(name);
  }
}

module.exports = new Timer();
