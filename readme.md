# React Native timers
## We follow [breaking].[feature].[fix] versioning


So the thing with timers, and react native, and ES6 components, and the timer-mixin is that
they don't really go too well together.

Personally, I don't have that much problem working without timer mixins. Setup your timers in `componentDidMount` or
`componentWillMount`, tear them down in `componentWillUnmount`. But I really despise all the useless effort of maintaining
instance variables for various timers, checking if they still exist before clearing them etc etc.

Hence this library.

Here is the API:

```js
// not using ES6 modules as babel has broken interop with commonjs for defaults
const timer = require('react-native-timer');

// timers maintained in the Map timer.timeouts
timer.setTimeout(name, fn, interval);
timer.clearTimeout(name);

// timers maintained in the Map timer.intervals
timer.setInterval(name, fn, interval);
timer.clearInterval(name);

// timers maintained in the Map timer.immediates
timer.setImmediate(name, fn);
timer.clearImmediate(name);

// timers maintained in the Map timer.animationFrames
timer.requestAnimationFrame(name, fn);
timer.cancelAnimationFrame(name);

```

An `interval` and a `timeout`, or any other two or more different types of timers, can have the same `name`.
However, creating a *two same type of timers* with the *same* `name` will throw an error.

If you are building a re-usable component, you can catch this error, and register your timer with a different name.
If you are building an app, then just use a different name for your timer.

Usage example:

```js

class Foo extends Component {
  state = {
    count: 0
  };

  componentWillMount() {
    timer.setInterval('foo', () => this.setState({count: this.state.count+1}), 1000);
  }

  componentWillUnmount() {
    timer.clearInterval('foo');
  }
}

```

PS: Kinda not a best practice, but `const t = require('react-native-timer')` can cut down some typing.
Also, this lib can be used in browsers too, but will focus on them when I am working with them.
