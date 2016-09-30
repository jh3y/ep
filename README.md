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

















#### Usage
1. Include the [stylesheet](https://raw2.github.com/jh3y/ep/master/build/ep.css) (_available through Bower_).
2. Add the class `ep` to your element (any existing element)
3. Add a data attribute `data-ep` defining the completion percentage (1 to 100) and any optional helper data attributes and classes for your desired behaviour/position/appearance[* see helpers](#helpers)
4. Update ep value if necessary using simple vanilla js or whatever suits you best!

That's it!

```html
    <div class="ep" data-ep="77">
		My first ep!
	</div>
```

##### Browser Support

From what I can gather having a look at _caniuse_, ep should be fully supported from IE10 up. This is purely because of the __transition__ property.

##### Mocking ep

You can easily mock progress by using the helper attributes and classes. Refer [here](#helpers).

##### Helpers

There are some helper classes and attributes you can add to help you out!

######Positioning classes
* `top`(default)
	The default positioning for a ep bar is at the top of an element.
* `bottom`
	Positions the ep bar at the bottom of the element.
* `fixed`
	Gives a fixed position of `0,0` relative to the container of the element.

######Color classes
* `blue`(default)
* `green`
* `red`
* `purple`
* `orange`
* `yellow`

######Behavioural classes
* `reverse` - will reverse the direction of a keyframe based ep bar (mock/timer).
* `pause` - will pause a keyframe based ep bar (mock/timer).

######Mocking attribute
* `data-ep-mock` - takes a number value that defines duration of how long the mocked progress should take in seconds (up to 120).

######Mocking classes
* `mock` - required in order to initiate a mock.
* `staggered` - will stagger the mock halting at different percentages (can be customised by altering source files).

######Timer attribute
* `data-ep-timer` - takes a number value that defines duration of how long the timer should take in seconds (up to 120).

######Timer classes
* `timer` - required in order to initiate a timer.

######Duration attribute
* `data-ep-duration` - takes a number value that defines the duration of ep transitions. For example, setting this attribute to 5 would mean that all transitions of ep values will take 5s.

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
