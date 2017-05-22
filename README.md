![alt tag](https://github.com/jh3y/pics/blob/master/ep/ep.png)
## enhance your HTML5 `<progress>` bars with minimal effort!

![alt tag](https://github.com/jh3y/pics/blob/master/ep/ep.gif)

The `<progress>` element doesn't always play nice.

It doesn't have a consistent appearance across the popular browsers. In addition, different browsers impose different limitations on the `<progress>` element.

Because of this, it's often overlooked in favor of styled `<div>` combos.

`ep` tackles this;

* Cross browser reset and styling to pull `<progress>` element in line with modern slim-style bars
* CSS helpers that provide classes and attributes to deal with things like positioning, growth style, simulation etc.
* Optional JS helper for better control and interaction with `<progress>` elements. For example; being able to hook into network request status and display this to the end user.
* Plays nice wherever the `<progress>` element is supported!

```js
  const myEp = new Ep(document.querySelector('progress'));
  const makeRequest = () => {
    myEp.simulate();
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        myEp.complete();
      }
    };
    xhttp.open('GET', '/index.html', true);
    xhttp.send();
  };
  (myEp._VALUE) ? myEp.set(0, makeRequest) : makeRequest();
```

## Index

* [Browser support](https://github.com/jh3y/ep#browser-support)
  * [Caveats](https://github.com/jh3y/ep#caveats)
* [Usage](https://github.com/jh3y/ep#usage)
  * [Install](https://github.com/jh3y/ep#install)
  * [Just using the stylesheet](https://github.com/jh3y/ep#just-using-the-stylesheet)
  * [Including the optional JS helper](https://github.com/jh3y/ep#including-the-optional-js-helper)
  * [Integrating with your own SASS files](https://github.com/jh3y/ep#integrating-with-your-own-sass-files)
  * [CSS Helpers Api](https://github.com/jh3y/ep#css-helpers-api)
    * [Aesthetic helpers](https://github.com/jh3y/ep#aesthetic-helpers)
    * [Behavioural helpers](https://github.com/jh3y/ep#behavioural-helpers)
    * [Sass variables](https://github.com/jh3y/ep#sass-variables)
    * [Sass mixin](https://github.com/jh3y/ep#sass-mixin)
  * [Javascript Helper Api](https://github.com/jh3y/ep#javascript-helper-api)
    * [Hooking into network requests](https://github.com/jh3y/ep#hooking-into-network-requests)
* [What happened to progrecss?](https://github.com/jh3y/ep#what-happened-to-progrecss)
* [Development](https://github.com/jh3y/ep#development)
* [Contributing](https://github.com/jh3y/ep#contributing)
* [License](https://github.com/jh3y/ep#license)


## Browser support

| Chrome  | Firefox | Safari | Opera | Edge | IE(_10+_)|
| ------------- |-------------| -----| -----|-----|-----|
| :smile:   | :smile:  | :smile:  | :smile: | :smile: | :smile: |

### Caveats
* iOS Safari doesn't like indeterminate `<progress>` elements. Get round this by not setting your `<progress>` element to be indeterminate but instead using the helper class `ep--indeterminate` which will mock the indeterminate state.
* In IE, ensure that the `max` attribute is set when using specific values. If no `max` is set, the value won't go higher than `1` :cry:

## Usage
You have various options with how to use `ep`;

* Use the stylesheet by adding [`ep.css`](https://github.com/jh3y/ep/blob/master/dist/ep.css) to your app.
* Include the optional JS helper [`ep.js`](https://github.com/jh3y/ep/blob/master/ep.js) for some more control.
* Integrate the `ep` styles with your own SASS by importing the parts you need.

### Install
You can grab a copy of `ep` through `bower` or `npm`;

```shell
  bower install ep

  npm install @jh3y/ep
```

### Just using the stylesheet
If you're just using the stylesheet, you just need to include it. No alterations need to be made to your current `<progress>` elements unless you want to make use of some of the helper classes and attributes.

```html
  <progress value="75" max="100"></progress>

  <progress class="ep--fixed ep--top" value="75" max="100"></progress>

  <progress data-simulate="true" value="75" max="100"></progress>
```

Need to change the color of a `<progress>` element or something else? Override the rule. For example, change the color to `purple`;
```css
  progress {
    background: purple;
  }

  progress::-moz-progress-bar {
    background: purple;
  }

  progress::-webkit-progress-bar {
    background: purple;
  }

  progress::-webkit-progress-value {
    background: purple;
  }
```
There is also a `SASS` mixin included to as a shorthand to do this;
```sass
@import '~ep/mixins';
.progress {
  @include color-bar(purple);
}
```
### Including the optional JS helper
If you choose to use the optional JS helper. You'll have access to the `Ep` constructor class. Refer to the JS API for further info.

```js
  const el   = document.querySleect
  const myEp = new Ep()
```

### Integrating with your own SASS files
Say you want to pick and choose pieces of `ep`. Simple. This is actually the easiest way to override `ep`s configuration variables. `ep` makes use of the `!default` flag in `sass` to make this possible. For example; let's say we only want the core styles but we don't want any opacity and we want the primary color to be be purple.

```sass
  $ep-fg: purple;
  $ep-opacity: 1;
  @import '~ep/core'
```

### CSS Helpers API
Without the use of JS, `ep` provides some CSS helpers in the form of attributes and classes you can apply to `<progress>` elements to define behaviors.

#### Aesthetic helpers
Aesthetic helpers come in the form of classes;

* `ep--top` - position absolute top
* `ep--bottom` - position absolute bottom
* `ep--fixed` - position fixed
* `ep--spread` - change style of `<progress>` bar to spread
* `ep--indeterminate` - show indeterminate state

#### Behavioural helpers
Behavioural helpers come in the form of attributes that must be applied to your `<progress>` elements;

* `data-complete` - complete progress(_set to 100 and hide, more control with JS helper_)
* `data-simulate` - slowly simulate progress in steps up to `99%`over 30 seconds(_request timeout_), can be configured/overrode
* `data-mock="value"` - mock progress for given number of seconds
* `data-staggered-mock="value"` - mock progress but with staggered style
* `data-timer="value"` - use progress element as timer for given seconds
* `data-pause` - pauses any animation in place such as timer, mock etc.

_NOTE::_ The `mock`, `staggered-mock`, `timer` and `simulate` behaviors have duration defaults set in the source. For example; the max duration is set at `4`. This is to keep the size down. But these can easily be altered by building your own version of `ep` or adding rules for the durations you require. For example; I want the simulation to only take `10s` and a timer that will take `15s`.

```css
progress[data-simulate] {
  animation-duration: 10s;
  animation-timing-function: steps(28);
}

progress[data-timer="15"] {
  animation-duration: 15s;
}

```

#### Sass variables
`ep` leverages the `!default` flag in Sass so it's easier to override `ep` configuration variables. Simply set any of the following variables before importing `ep`.

* `$ep-ns: ep` - set the class helper prefix
* `$ep-height: 6px` - set the height of `<progress>` elements
* `$ep-fg: #3498db` - set the primary color of `<progress>` elements
* `$ep-indeterminate-fg: $ep-fg` - set the primary color when in indeterminate state
* `$ep-opacity: .6` - set the opacity of `<progress>` elements
* `$ep-transition: .25s` - set the duration for `<progress>` elements to transition value
* `$ep-timeout-threshold: 30` - the time it takes for simulation to complete in seconds
* `$ep-simulate-max: 99` - at which value should simulation stop
* `$ep-mocks-min: 1` - minimum mocking duration in seconds
* `$ep-mocks-max: 4` - maximum mocking duration in seconds
* `$ep-staggered-mocks-min: 1` - minimum staggered mock duration in seconds
* `$ep-staggered-mocks-max: 4` - maximum staggered mock duration in seconds
* `$ep-timers-min: 1` - minimum timer duration in seconds
* `$ep-timers-max: 4` - maximum timer duration in seconds

```sass
$ep-fg: #e74c3c3;
$ep-opacity: .8;
// import with default variables override
@import '~ep/core';
```

#### Sass mixin
`ep` also has a mixin available for coloring `progress` elements. Simply pass a color to `color-bar`. You may use this without even importing the `ep` reset if you just want to color some `progress` elements.

```sass
@import '~ep/mixins';

.my-progress-element { @include color-bar(#7bff7b); }

```

### Javascript helper/API
`ep` also provides an optional Javascript helper/api. This can be used for convenience and also gives a little more control and power when interacting with `<progress>` elements. It doesn't create any extra elements, but you must pass a `HTMLProgressElement` into the constructor.

```js
const bar = document.querySelector('progress');
const myEp = new Ep(bar);
```
It's main purpose is that it saves you the burden of having to set/remove attributes/classes. But it also provides some nice to haves such as being able to hook into when progress is complete or set.

The source is quite heavily documented and written with `babel` so be sure to check that out [here](https://github.com/jh3y/ep/blob/master/src/script/entries/ep/index.js).

As for the methods available(`?` denotes an optional parameter);

* `set({number} val, ? {function} cb)` - Sets `<progress>` value with optional callback.
* `setSpread(? {bool} spread)` - Set whether `<progress>` element should be spred style. By default will set to false.
* `setIndeterminate(? {bool} indeterminate)` - Set whether `<progress>` element is using `indeterminate` helper class. By default, will remove helper class.
* `togglePause` - Toggles pause attribute for play/pause animation.
* `setPosition(? {Array string} positions)` - Takes an optional array of positions that will be applied to the element. For example, `['top', 'fixed']` will set `ep--top ep--fixed` class to the `<progress>` element. If no positions are declared, all currently applied will be wiped.
* `increase(? {number} value, ? {function} cb)` - Increase progress value by optional increment with an optional callback. By default, increment is 5.
* `decrease(? {number} value, ? {function} cb)` - Decrease progress value by optional decrement with an optional callback. By default, decrement is 5.
* `reset` - Resets `<progress>` value to 0.
* `mock(? {number} duration, ? {bool} staggered, ? {function} cb)` - Mocks progress with a mocking animation. Optional duration in seconds. Optional staggered attribute defines which mock style use. Optional callback can be invoked when mock is complete. By default, duration is 4.
* `time(? {number} duration, ? {function} cb)` - Timing mock for using element as timer. Optional duration in seconds. Optional callback can be invoked when timer is complete. By default, duration is 4.
* `simulate(? {number} step, ? {number} increment, ? {number} max)` - Simulation on the Javascript side is an example where we have more control than we do with CSS. Set a simulation by declaring a step duration in `ms`, an `increment` and a `max` value for the simulation to reach. The default simulation will increment by 5 every second until the `<progress>` element has a value of 99.
* `complete(? {function} cb)` - Complete a progress bar by setting value to 100 and then resetting it. Provide optional callback for when complete.

#### Hooking into network requests
Yep. You can easily integrate `ep` to communicate network request status to the end user. The most basic example being something like the following;
```js
  const myEp = new Ep(document.querySelector('progress'));
  const makeRequest = () => {
    myEp.simulate();
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        myEp.complete();
      }
    };
    xhttp.open('GET', '/index.html', true);
    xhttp.send();
  }
  (myEp._VALUE) ? myEp.set(0, makeRequest) : makeRequest();
```
We start with a simple `progress` element. Reset it to make sure it starts at `0` and start a simulation. When we get the `OK` from our network request, set our element to complete :tada:

## What happened to progrecss?
For some time, I'd intended to revisit `progre(c)ss` with some ideas I had. When I finally got round to it, I went back over the issues and something struck me. Someone had pointed out why not use the `<progress>` element?

I'd previously struck this off because I liked being able to add `:pseudo` element progress bars to any element with relative ease where the `:pseudo` elements were available.

However, using `:pseudo` elements to display progress isn't ideal and not very semantic.

It makes more sense to create something that can be integrated without big changes.

`progre(c)ss` is still available under the release tab if you really want it but realistically the code for `progre(c)ss` is as simple as;

```sass
.progrecss {
  &:before {
    color: green;
    content: '';
    height: 6px;
    left: 0;
    opacity: .8;
    position: absolute;
    top: 0;
  }
  @for $percent from 1 through 100 {
    &[data-progrecss-value='#{$percent}'] {
      &:before {
        width: $percent * 1%;
      }
    }
  }
}
```

## Development
`ep` is developed using `webpack`, `webpack-dev-server`, `babel` and `sass`.

It uses a self-documented `Makefile` for development.

### See available tasks
```shell
  make
```

### Setup
```shell
  make setup
```

### Start developing
```shell
  make develop
```


## Contributing
Don't hesitate to post and issue, PR or suggestion. Alternatively, get in touch via email or by tweeting me [@_jh3y](https://twitter.com/_jh3y)! :smile:

## License
MIT

-----------------

Made real by [@jh3y](https://twitter.com/_jh3y) 2016 :sunglasses:
