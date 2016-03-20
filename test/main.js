const assert = require('assert');
const timer = require('../lib/index');

(() => {
  let done = false;
  timer.setTimeout('testSetTimeout', () => { done = true; }, 100);

  setTimeout(() => {
    assert.ok(done && !timer.timeouts.has('testSetTimeout'), 'setTimeout works');
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
  const flags = [];
  timer.setInterval('testInterval', () => { flags.push(flags.length); }, 100);

  setTimeout(() => {
    assert.ok(flags.length === 3, 'setInterval works');
    timer.clearInterval('testInterval');

    setTimeout(() => {
      assert.ok(flags.length === 3 && !timer.intervals.has('testInterval'), 'clearInterval works');
    }, 200);
  }, 400);
  // usually for around 390, this test seems to pass, so setting it greater than that
})();

(() => {
  let done = false;
  timer.setTimeout('testSetImmediate', () => { done = true; });

  setTimeout(() => {
    assert.ok(done && !timer.immediates.has('testImmediate'), 'setImmediate works');
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
