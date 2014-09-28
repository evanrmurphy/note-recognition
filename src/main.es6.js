'use strict'

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
    , renderApp = () => ReactRenderComponent
        ( App({ note: notes.value
              , onGuess: guesses.onNext.bind(guesses)
              , lastGuess: guesses.value
              , isLastGuessCorrect: guesses.value === notes.value
              })
        , document.body
        )
  renderApp()
  guesses.subscribe(renderApp, null, renderApp)
  correctGuesses.subscribe(_ =>
    setTimeout(() => {
       guesses.onCompleted()
       notes.onNext(sample(without(Staff.notes, notes.value)))
    }, 1000))
})

notes.onNext(sample(Staff.notes))
