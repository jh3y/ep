proge(c)ss
===
##custom CSS progress bars with minimal effort

###usage
1. include the [stylesheet](https://raw2.github.com/jh3y/progre-c-ss/master/progrecss.css)
2. add the class `progrecss` to your element (any element)
3. add a data attribute `data-progrecss` defining the percent complete.

That's it!

	<div class="progrecss" data-progrecss="77">
		My first progre(c)ss!
	</div>

There are some additional helper classes which can be used to add colors and positioning. Use them in combination.

####positioning
#####`top`(default)
The default positioning for a progrecss bar is at the top of an element.
#####`bottom`
Positions the progrecss bar at the bottom of the element.
#####`fixed`
Gives a fixed position of `0,0` relative to the container of the element.

####colors
#####`green`(default)
#####`blue`
#####`red`
#####`purple`
#####`orange`
#####`yellow`

###development
__progre(c)ss__ is developed with __less__ making the actual amount of code written minimal in order to generate the stylesheet.

When using the __less__ file there are already some variables in place so you can roll out a new theme easily.

Those variables are;

* color
* height
* box-shadow
* opacity
* border-radius
* transition(-webkit-transition)

###contributing
any suggestions, improvements or issues are welcome :)

@jh3y

###license
MIT
