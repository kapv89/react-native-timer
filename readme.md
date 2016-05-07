# React Native timers
## We follow [breaking].[feature].[fix] versioning

`npm install --save react-native-timer`

#### A better way to manage timers in react-native with ES6 components, using __WeakMap__.

Generic API:

```js
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

Mostly, using timers is a pain *inside* react-native components, so we present to you
__Contextual Timers__. API:
```js

timer.setTimeout(context, name, fn, interval);
timer.clearTimeout(context, name);
timer.clearTimeout(context) // clears all timeouts for a context

timer.setInterval(context, name, fn, interval);
timer.clearInterval(context, name);
timer.clearInterval(context); // clears all intervals for a context

timer.setImmediate(context, name, fn);
timer.clearImmediate(context, name);
timer.clearImmediate(context); // clears all immediates for a context

timer.requestAnimationFrame(context, name, fn);
timer.cancelAnimationFrame(context, name);
timer.cancelAnimationFrame(context); // cancels all animation frames for a context


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
