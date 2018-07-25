# React Native timers
## We follow [breaking].[feature].[fix] versioning

`npm install --save react-native-timer`

#### A better way to manage timers in react-native with ES6 components, using __WeakMap__.
#### Version 1.3.4

1. Often you need to do things like show a message for a few seconds, and then hide it, or run an operation again and again at a specific interval. These things will usually happen *inside* a React Component, and will start *after* a component has mounted. So, you really cannot *just* do a `setTimeout(fn, 2000)` for non trivial things. You need to do a `this.timer = setTimeout(fn, 2000)`, and then `clearTimeout(this.timer)` in `componentWillUnmount`.

2. When a component unmounts, these timers have to be cleared and, so that you are not left with zombie timers doing things when you did not expect them to be there.

3. React, right now, offers a solution using the `react-native-timer-mixin` for this. However, mixins are not part of ES6-7 standard, and probably will never be as they get in the way of good software design. And this brings us to the package in question, `react-native-timer`.

4. With `react-native-timer`, you can set different timers, like `timeout`, `interval` etc in the context of a react component, and unmount all of them when the component unmounts, at context level.

Generic API:

```js
const timer = require('react-native-timer');

// timers maintained in the Map timer.timeouts
timer.setTimeout(name, fn, interval);
timer.clearTimeout(name);
timer.timeoutExists(name);

// timers maintained in the Map timer.intervals
timer.setInterval(name, fn, interval);
timer.clearInterval(name);
timer.intervalExists(name);

// timers maintained in the Map timer.immediates
timer.setImmediate(name, fn);
timer.clearImmediate(name);
timer.immediateExists(name);

// timers maintained in the Map timer.animationFrames
timer.requestAnimationFrame(name, fn);
timer.cancelAnimationFrame(name);
timer.animationFrameExists(name);

```

Mostly, using timers is a pain *inside* react-native components, so we present to you
__Contextual Timers__. API:
```js

timer.setTimeout(context, name, fn, interval);
timer.clearTimeout(context, name);
timer.clearTimeout(context) // clears all timeouts for a context
timer.timeoutExists(context, name);

timer.setInterval(context, name, fn, interval);
timer.clearInterval(context, name);
timer.clearInterval(context); // clears all intervals for a context
timer.intervalExists(context, name);

timer.setImmediate(context, name, fn);
timer.clearImmediate(context, name);
timer.clearImmediate(context); // clears all immediates for a context
timer.immediateExists(context, name);

timer.requestAnimationFrame(context, name, fn);
timer.cancelAnimationFrame(context, name);
timer.cancelAnimationFrame(context); // cancels all animation frames for a context
timer.animationFrameExists(context, name);


```

Example Below:

```js
const timer = require('react-native-timer');

class Foo extends React.Component {
  state = {
    showMsg: false
  };

  componentWillUnmount() {
    timer.clearTimeout(this);
  }

  showMsg() {
    this.setState({showMsg: true}, () => timer.setTimeout(
      this, 'hideMsg', () => this.setState({showMsg: false}), 2000
    ));
  }

  render() {
    return {
      <View style={{flex: 1}}>
        <TouchableOpacity onPress={() => requestAnimationFrame(() => this.showMsg())}>
          <Text>Press Me</Text>
        </TouchableOpacity>

        {this.state.showMsg ? (
          <Text>Hello!!</Text>
        ) : (
          null
        )}
      </View>
    }
  }
}


```

PS: Kinda not a best practice, but `const t = require('react-native-timer')` can cut down some typing.
Also, this lib can be used in browsers too, but will focus on them when I am working with them.
