![alt tag](https://github.com/jh3y/pics/blob/master/ep/ep.png)
## enhance your HTML5 `<progress>` bars with minimal effort!

![alt tag](https://github.com/jh3y/pics/blob/master/ep/ep.gif)

The `<progress>` element doesn't always play nice.

It doesn't have a consistent appearance across the popular browsers. In addition, different browsers impose different limitations on the `<progress>` element.

Because of this, it's often overlooked in favor of styled `<div>` combos.

`ep` tackles this;

* Cross browser reset and styling to pull `<progress>` element in line with modern slim-style bars
* CSS helpers that provide classes and attributes to deal with things like positioning, growth style, simulation etc.
* Optional JS helper for better control and interaction with `<progress>` elements.
* Plays nice wherever the `<progress>` element is supported!


## Browser support

| Chrome  | Firefox | Safari | Opera | Edge | IE(_10+_)           |
| ------------- |:-------------:| -----:| -----|-----|-----|----|
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
######Javascript helper
At the request of some people I have added a small javascript helper to the repo.

It's real simple to use. Here is an example piece of code for using it.

```javascript
var myep = new ep (document.body, {
	color: 'red',
	percent: 0,
	position: 'fixed',
  reverse: true,
	mock: {
		staggered: true,
		startMockOnCreate: false,
		mockDuration: 5
	}
})
```

The following options are available;

* `color` - _string_ - 'green', 'red', 'blue', 'purple', 'orange', 'yellow'.
* `percent` - _number_ - 0 to 100.
* `position` - _string_ - 'fixed', 'top', 'bottom'.
* `mock` - _object consisting of mock, mockDuration, and staggered_
* `staggered` - _string_ - defines whether the mock will stagger.
* `mockDuration` - _number_ - defines how long the mock will take in seconds.
* `startMockOnCreate` - _bool_ - defines whether the ep bar will mock straight away.
* `reverse` - will reverse the direction of keyframe based ep bars.

And the following methods;

* `setep(number percent)` - sets percentage that ep is complete.
* `startMock()` - will initiate a ep bar mock based on the options passed in.
* `togglePause()` - will toggle the play state of a keyframe based ep bar.
* `pause()` - will pause a keyframe based ep bar.
* `play()` - will play a keyframe based ep bar.

#### How does this work?
ep takes advantage of CSS pseudo elements and preprocessing tools such as __less__ and __sass__.

making use of pseudo elements means that we can add ep bars to any existing element on our page without being intrusive just by adding some attributes and classes as long as the elements pseudo elements aren't currently in use.

preprocessing tools such as __less__ and __sass__ mean we can write minimal code making use of looping in order to sit back and reap the benefits and drink a coffee!

#### Development/Customisation
##### Generating custom builds
You might not need all the features implemented for ep. You can customise the build being generated by modifying __ep-config.json__ and setting features to _true_ or _false_. Doing this can save some filesize.
##### Editing the source
__ep__ is developed with __less__/__sass__ /__scss__ making the actual amount of code written minimal in order to generate the stylesheet by making use of looping.

When using the __less__/__sass__/__scss__ file there are already some variables in place so you can roll out a new theme easily.

Those variables are:

* color
* height
* box-shadow
* opacity
* border-radius
* transition(-webkit-transition)
* iterations - this defines the number of iterations the mocking and duration loops will be invoked. By default this is 120. This means that for say a _mock_, you can define durations up to 120 seconds. You can trim down some filesize by lowering the amount of iterations.

Also to edit things like the way in which a staggered mock progress behaves you can modify the existing keyframes in place.

#### Contributing

Any suggestions, improvements or issues are welcome. :)

@jh3y

#### License

MIT

Copyright 2014 [@jh3y](https://github.com/jh3y)
