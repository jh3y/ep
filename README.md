#progre(c)ss


###Pure CSS progress bars with minimal effort

![alt tag](https://raw.github.com/jh3y/pics/master/progrecss/progrecss.gif)

#### Usage
1. Include the [stylesheet](https://raw2.github.com/jh3y/progre-c-ss/master/build/progrecss.css).
2. Add the class `progrecss` to your element (any existing element)
3. Add a data attribute `data-progrecss` defining the completion percentage (1 to 100) and any optional helper data attributes and classes for your desired behaviour/position/appearance[* see helpers](#helpers)
4. Update progre(c)ss value if necessary using simple vanilla js or whatever suits you best!

That's it!

```html
    <div class="progrecss" data-progrecss="77">
		My first progre(c)ss!
	</div>
```

_progre(c)ss is also compatible with npm component_

##### Browser Support

From what I can gather having a look at caniuse, progre(c)ss should be fully supported from IE10 up. This is purely because of transition, but if I remember rightly this can be shimmed.

##### Mocking progre(c)ss

You can easily mock progress by using the helper attributes and classes. Refer [here](#helpers).

##### Hooking into AJAX requests with progre(c)ss

A first attempt at hooking progre(c)ss into a simple AJAX request has been made and you can see it [here](http://jh3y.github.io/demos/using-progrecss-with-jquery-ajax/). Any help with this feature of progre(c)ss would be really appreciated.

__Update__: I came across [this](https://www.codersgrid.com/2014/02/11/progrecss-css-fancy-progress-bars-in-minimal-css/) article on codersgrid.com which shows also a way of hooking into AJAX requests.

##### Helpers

There are some helper classes and attributes you can add to help you out!

######positioning classes
* `top`(default)
	The default positioning for a progrecss bar is at the top of an element.
* `bottom`
	Positions the progrecss bar at the bottom of the element.
* `fixed`
	Gives a fixed position of `0,0` relative to the container of the element.

######color classes
* `blue`(default)
* `green`
* `red`
* `purple`
* `orange`
* `yellow`

######mocking attribute
* `data-progrecss-mock` - takes a number value that defines duration of how long the mocked progress should take in seconds (up to 120).

######mocking classes
* `mock` - required in order to initiate a mock.
* `staggered` - will stagger the mock halting at different percentages (can be customised by altering source files).

######timer attribute
* `data-progrecss-timer` - takes a number value that defines duration of how long the timer should take in seconds (up to 120).

######timer classes
* `timer` - required in order to initiate a timer.

######javascript helper
At the request of some people I have added a small javascript helper to the repo.

It's real simple to use. Here is an example piece of code for using it.

```javascript
var myProgrecss = new progrecss (document.body, {
	color: 'red',
	percent: 0,
	position: 'fixed',
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
* `startMockOnCreate` - _bool_ - defines whether the progre(c)ss bar will mock straight away.

And the following methods;

* `setProgrecss(number percent)` - sets percentage that progre(c)ss is complete.
* `startMock()` - will initiate a progre(c)ss bar mock based on the options passed in.

#### How does this work?
Not surprisingly it's real simple! :)

progre(c)ss takes advantage of CSS pseudo elements and preprocessing tools such as __less__ and __sass__.

making use of pseudo elements means that we can add progre(c)ss bars to any existing element on our page without being intrusive just by adding some attributes and classes as long as the elements pseudo elements aren't currently in use.

preprocessing tools such as __less__ and __sass__ mean we can write minimal code making use of looping in order to sit back and reap the benefits and drink a coffee!

#### Development/Customisation

__progre(c)ss__ is developed with __less__/__sass__ /__scss__ making the actual amount of code written minimal in order to generate the stylesheet by making use of looping.

When using the __less__/__sass__/__scss__ file there are already some variables in place so you can roll out a new theme easily.

Those variables are:

* color
* height
* box-shadow
* opacity
* border-radius
* transition(-webkit-transition)

Also to edit things like the way in which a staggered mock progress behaves you can modify the existing keyframes in place.

#### Contributing

Any suggestions, improvements or issues are welcome. :)

@jh3y

#### License

MIT

Copyright (c) 2014 [@jh3y](https://github.com/jh3y)
