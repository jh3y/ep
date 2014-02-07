#progre(c)ss


###Pure CSS progress bars with minimal effort


#### Usage
1. Include the [stylesheet](https://raw2.github.com/jh3y/progre-c-ss/master/progrecss.css).
2. Add the class `progrecss` to your element (any element)
3. Add a data attribute `data-progrecss` defining the completion percentage (1 to 100).

That's it!

```html
    <div class="progrecss" data-progrecss="77">
		My first progre(c)ss!
	</div>
```

##### Browser Support

From what I can gather having a look at caniuse, progre(c)ss should be fully supported from IE10 up. This is purely because of transition, but if I remember rightly this can be shimmed.


##### Mocking progre(c)ss
You can easily mock the progress bar by using keyframe animations as is does in the demo.
```css
	@keyframes progress {
		0% { width: 0%; }
		100% { width: 100%; }
	}
	// you could also stage this using different percentages etc.
```	

Then apply the keyframe animation to the `:after` of the progre(c)ss with the amount of time you want it to take.

```css
	.progrecss:after {
		animation: progress 5s;
	}
```

See issue [#2](https://github.com/jh3y/progre-c-ss/issues/2), this is due to be out of the box as standard.

##### Helper Classes

There are some additional helper classes which can be used to add colors and positioning. Use them in combination.

######positioning
* `top`(default)
	The default positioning for a progrecss bar is at the top of an element.
* `bottom`
	Positions the progrecss bar at the bottom of the element.
* `fixed`
	Gives a fixed position of `0,0` relative to the container of the element.

######colors
* `green`(default)
* `blue`
* `red`
* `purple`
* `orange`
* `yellow`

#### Development

__progre(c)ss__ is developed with __less__/__sass__ making the actual amount of code written minimal in order to generate the stylesheet by making use of looping.

When using the __less__/__sass__ file there are already some variables in place so you can roll out a new theme easily.

Those variables are:

* color
* height
* box-shadow
* opacity
* border-radius
* transition(-webkit-transition)

#### Contributing

Any suggestions, improvements or issues are welcome. :)

@jh3y

#### License

MIT

Copyright (c) 2014 [@jh3y](https://github.com/jh3y)
