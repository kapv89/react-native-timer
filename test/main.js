const assert = require('assert');
const timer = require('../lib/index');

(() => {
  let done = false;
  timer.setTimeout('testSetTimeout', () => { done = true; }, 100);

  setTimeout(() => {
    assert.ok(done && !timer.timeoutExists('testSetTimeout'), 'setTimeout works');
  }, 105);
})();

(() => {
  const ctx = {};
  let done = false;
  timer.setTimeout(ctx, 'testSetTimeoutCtx', () => { done = true; }, 100);

  setTimeout(() => {
    assert.ok(
      done && !timer.contextTimer(ctx).timeoutExists('testSetTimeout'),
      'setTimeoutCtx works'
    );
  }, 105);
})();


(() => {
  let done = false;
  timer.setTimeout('testClearTimeout', () => { done = true; }, 100);
  setTimeout(() => timer.clearTimeout('testClearTimeout'), 50);

  setTimeout(() => {
    assert.ok(!done, 'clearTimeout works');
  }, 105);
})();

(() => {
  const ctx = {};
  let done = false;
  timer.setTimeout(ctx, 'testClearTimeoutCtx', () => { done = true; }, 100);
  setTimeout(() => timer.clearTimeout(ctx), 50);

  setTimeout(() => {
    assert.ok(!done, 'clearTimeoutCtx works');
  }, 105);
})();

(() => {
  const flags = [];
  timer.setInterval('testInterval', () => { flags.push(flags.length); }, 100);

  setTimeout(() => {
    assert.ok(
      flags.length === 3,
      'setInterval works, if it doesn\'t, modify the timeout of this timeout'
    );
    timer.clearInterval('testInterval');

    setTimeout(() => {
      assert.ok(flags.length === 3 && !timer.intervalExists('testInterval'), 'clearInterval works');
    }, 200);
  }, 420);
  // usually for around 390, this test seems to pass, so setting it greater than that
})();

(() => {
  const ctx = {};
  const flags = [];
  timer.setInterval(ctx, 'testIntervalCtx', () => { flags.push(flags.length); }, 100);

  setTimeout(() => {
    assert.ok(
      flags.length === 3,
      'setIntervalCtx works, if it doesn\'t, modify the timeout of this timeout'
    );
    timer.clearInterval(ctx);

    setTimeout(() => {
      assert.ok(
        flags.length === 3 && !timer.contextTimer(ctx).intervalExists('testIntervalCtx'),
        'clearIntervalCtx works'
      );
    }, 200);
  }, 420);
  // usually for around 390, this test seems to pass, so setting it greater than that
})();

(() => {
  const ctx = {};
  const flags = [];
  const timerName = 'timerName';

  timer.setInterval(ctx, timerName, () => { flags.push(flags.length); }, 100);

  setTimeout(() => {
    assert.ok(
      flags.length === 3,
      'setIntervalCtx works with timerName, if it doesn\'t, modify the timeout of this timeout'
    );
    timer.clearInterval(ctx, timerName);

    setTimeout(() => {
      assert.ok(
        flags.length === 3 && !timer.contextTimer(ctx).intervalExists(timerName),
        'clearIntervalCtx works with timerName works'
      );
    }, 200);
  }, 420);
  // usually for around 390, this test seems to pass, so setting it greater than that
})();


(() => {
  let done = false;
  timer.setTimeout('testSetImmediate', () => { done = true; });

  setTimeout(() => {
    assert.ok(done && !timer.immediateExists('testSetImmediate'), 'setImmediate works');
  }, 50);
})();

(() => {
  const ctx = {};
  let done = false;
  timer.setTimeout(ctx, 'testSetImmediateCtx', () => { done = true; });

  setTimeout(() => {
    assert.ok(
      done && !timer.contextTimer(ctx).immediateExists('testSetImmediateCtx'),
      'setImmediateCtx works'
    );
  }, 50);
})();


(() => {
  let done = false;
  let m = 1;
  for (let i=0; i<1000; i=i+1) {
    if (i === 0) {
      timer.setImmediate('testClearImmediate', () => { done = true; });
    }

    if (i === 5) {
      timer.clearImmediate('testClearImmediate');
    }

    m = m*i+1;
  }
  setTimeout(() => {
    assert.ok(!done, 'clearImmediate works');
  }, 50);
})();

(() => {
  const ctx = {};
  let done = false;
  let m = 1;
  for (let i=0; i<1000; i=i+1) {
    if (i === 0) {
      timer.setImmediate(ctx, 'testClearImmediateCtx', () => { done = true; });
    }

    if (i === 5) {
      timer.clearImmediate(ctx);
    }

    m = m*i+1;
  }
  setTimeout(() => {
    assert.ok(!done, 'clearImmediateCtx works');
  }, 50);
})();


/**
 * below two can only be tested in a UI env, but they should work, code is simple,
 * so commenting them out for now
 */

/*

(() => {
  let done = false;
  timer.requestAnimationFrame('testRequestAnimationFrame', () => { done = true; });

  setTimeout(() => {
    assert.ok(
      done &&
      !timer.animationFrames.has('testRequestAnimationFrame'), 'requestAnimationFrame works'
    );
  }, 50);
})();

(() => {
  let done = false;
  let m = 1;
  for (let i=0; i<1000; i=i+1) {
    if (i === 0) {
      timer.requestAnimationFrame('testCancelRequestAnimationFrame', () => { done = true; });
    }

    if (i === 5) {
      timer.cancelAnimationFrame('testCancelRequestAnimationFrame');
    }

    m = m*i+1;
  }
  setTimeout(() => {
    assert.ok(!done, 'cancelAnimationFrame works');
  }, 50);
})();

*/
