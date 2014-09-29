'use strict'

// Don't want to `require` all of React (prefer to only include the specific
// parts of it that we need), but removing this line causes an error in React's
// code, so keep this for now with the hope of being able to remove it later
require('react')

var ReactRenderComponent = require('react/lib/ReactMount').renderComponent
  , Rx = require('rx')
  , sample = require('lodash.sample')
  , without = require('lodash.without')

var App = require('./app.es6.js')
  , Staff = require('./staff.es6.js')

var notes = new Rx.BehaviorSubject

notes.subscribe(_ => {
  var guesses = new Rx.BehaviorSubject
    , correctGuesses = guesses.skip(1).filter(g => g === notes.value)

  var renderApp = () => {
    var note = notes.value
      , guess = guesses.value
      , isGuessCorrect = guess === note
      , onGuess = guess => {
          if (!isGuessCorrect) guesses.onNext(guess)
        }
    ReactRenderComponent( App({note, guess, isGuessCorrect, onGuess})
                        , document.body
                        )
  }

  renderApp()
  guesses.subscribe(renderApp, null, renderApp)
  correctGuesses.subscribe(_ =>
    setTimeout(() => {
       guesses.onCompleted()
       notes.onNext(sample(without(Staff.notes, notes.value)))
    }, 1000))
})

notes.onNext(sample(Staff.notes))
