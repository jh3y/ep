progrecss = window.progrecss = (element, options) ->
  return new progrecss(element, options)  unless this instanceof progrecss
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


progrecss::_create = ->
  progrecss = this
  progrecss._element = document.createElement("div")  if progrecss._element is `undefined`
  progrecss._element.className = "progrecss " + progrecss._position + " " + progrecss._color
  progrecss._element.setAttribute "data-progrecss", progrecss.percent
  if progrecss._mock
    progrecss._element.setAttribute "data-progrecss-mock", progrecss._mockDuration
    progrecss._element.className += ' staggered'  if progrecss._staggered
    progrecss._element.className += ' mock'  if progrecss._startMockOnCreate
    progrecss._element.className += ' reverse' if progrecss._reverse
  else if progrecss._timer
    progrecss.element.setAttribute "data-progrecss-timer", progrecss._timerDuration
    progrecss.element.className += " timer"  if progrecss._startTimerOnCreate
    progrecss._element.className += ' reverse' if progrecss._reverse
  return

progrecss::setprogrecss = (percent) ->
  if percent isnt `undefined` and typeof (percent) is "number" and percent <= 100 and percent >= 0
    @_element.setAttribute "data-progrecss", percent
    @_percent = percent
  else
    throw Error("progrecss: ERROR percent must be a number and between 0 and 100.")
  return

progrecss::pause = ->
  @_element.className += ' pause'

progrecss::play = ->
  @_element.className = @_element.className.replace 'pause', ''


progrecss::togglePause = ->
  if @_element.className.indexOf('pause') isnt -1
    @play()
  else
    @pause()

progrecss::startMock = ->
  progrecss = this
  progrecss._element.className += " mock"
  setTimeout (->
    progrecss._element.className = progrecss._element.className.replace(/\bmock\b/, "")
    return
  ), progrecss._mockDuration * 1000
  return

progrecss::startTimer = ->
  progrecss = this
  progrecss._element.className += " timer"
  setTimeout (->
    progrecss._element.className = progrecss._element.className.replace(/\btimer\b/, "")
    return
  ), progrecss._timerDuration * 1000
  return
