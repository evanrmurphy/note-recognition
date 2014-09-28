'use strict'

require('react')

var ReactRenderComponent = require('react/lib/ReactMount').renderComponent
  , Rx = require('rx')
  , sample = require('lodash.sample')
  , without = require('lodash.without')

var App = require('./app.es6.js')
  , Staff = require('./staff.es6.js')

var notes = new Rx.BehaviorSubject
  , guesses = new Rx.BehaviorSubject
  , correctGuesses = guesses.filter(g => g === notes.value)
  , last2Notes =
      notes.scan([null, null], ([_, last], current) => [last, current])
  , lastNote
  , otherNotes

correctGuesses.subscribe(_ => notes.onNext(sample(otherNotes)))

notes.merge(guesses).subscribe
  (() => ReactRenderComponent
           ( App( { note: notes.value
                  , onGuess: guesses.onNext.bind(guesses)
                  , lastGuess: guesses.value
                  , isLastGuessCorrect: guesses.value === lastNote
                  }
                )
           , document.body
           ))
last2Notes.subscribe(([last, _]) => lastNote = last)
notes.subscribe(_ => otherNotes = without(Staff.notes, notes.value))

notes.onNext(sample(Staff.notes))
