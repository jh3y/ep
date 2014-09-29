progression = window.progression = (element, options) ->
  return new progression(element, options)  unless this instanceof progression
  @_element = element
  @_color = (if (options isnt `undefined` and options.color isnt `undefined`) then options.color else "green")
  @_position = (if (options isnt `undefined` and options.position isnt `undefined`) then options.position else "top")
  @_percent = (if (options isnt `undefined` and options.percent isnt `undefined`) then options.percent else 0)
  @_mock = (if (options isnt `undefined` and options.mock isnt `undefined`) then true else false)
  @_mockDuration = (if (options isnt `undefined` and options.mock.mockDuration isnt `undefined`) then options.mock.mockDuration else 5)
  @_startMockOnCreate = (if (options isnt `undefined` and options.mock.startMockOnCreate isnt `undefined`) then options.mock.startMockOnCreate else true)
  @_staggered = (if (options isnt `undefined` and options.mock.staggered isnt `undefined`) then options.mock.staggered else false)
  @_timer = (if (options isnt `undefined` and options.timer isnt `undefined`) then true else false)
  @_reverse = (if (options isnt `undefined` and options.reverse isnt `undefined`) then options.reverse else false)
  @_timerDuration = (if (options isnt `undefined` and options.timer isnt `undefined` and options.timer.timerDuration isnt `undefined`) then options.timer.timerDuration else 5)
  @_startTimerOnCreate = (if (options isnt `undefined` and options.timer isnt `undefined` and options.timer.startTimerOnCreate isnt `undefined`) then options.timer.startTimerOnCreate else true)
  @_create()
  return


progression::_create = ->
  progression = this
  progression._element = document.createElement("div")  if progression._element is `undefined`
  progression._element.className = "progression " + progression._position + " " + progression._color
  progression._element.setAttribute "data-progression", progression.percent
  if progression._mock
    progression._element.setAttribute "data-progression-mock", progression._mockDuration
    progression._element.className += ' staggered'  if progression._staggered
    progression._element.className += ' mock'  if progression._startMockOnCreate
    progression._element.className += ' reverse' if progression._reverse
  else if progression._timer
    progression.element.setAttribute "data-progression-timer", progression._timerDuration
    progression.element.className += " timer"  if progression._startTimerOnCreate
    progression._element.className += ' reverse' if progression._reverse
  return

progression::setprogression = (percent) ->
  if percent isnt `undefined` and typeof (percent) is "number" and percent <= 100 and percent >= 0
    @_element.setAttribute "data-progression", percent
    @_percent = percent
  else
    throw Error("progression: ERROR percent must be a number and between 0 and 100.")
  return

progression::pause = ->
  @_element.className += ' pause'

progression::play = ->
  @_element.className = @_element.className.replace 'pause', ''


progression::togglePause = ->
  if @_element.className.indexOf('pause') isnt -1
    @play()
  else
    @pause()

progression::startMock = ->
  progression = this
  progression._element.className += " mock"
  setTimeout (->
    progression._element.className = progression._element.className.replace(/\bmock\b/, "")
    return
  ), progression._mockDuration * 1000
  return

progression::startTimer = ->
  progression = this
  progression._element.className += " timer"
  setTimeout (->
    progression._element.className = progression._element.className.replace(/\btimer\b/, "")
    return
  ), progression._timerDuration * 1000
  return
