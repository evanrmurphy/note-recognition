'use strict'

require('react')

var ReactRenderComponent = require('react/lib/ReactMount').renderComponent
  , Rx = require('rx')
  , sample = require('lodash.sample')
  , without = require('lodash.without')

var App = require('./app.es6.js')
  , Staff = require('./staff.es6.js')

var notes = new Rx.BehaviorSubject
  , answers = new Rx.BehaviorSubject
  , last2Notes =
      notes.scan([null, null], ([_, last], current) => [last, current])
  , lastNote
  , otherNotes

answers.subscribe(function(answer) {
  if (answer === notes.value)
    notes.onNext(sample(otherNotes))
})

notes.merge(answers).subscribe
  (() => ReactRenderComponent
           ( App( { note: notes.value
                  , onAnswer: answers.onNext.bind(answers)
                  , lastAnswer: answers.value
                  , isLastAnswerCorrect: answers.value === lastNote
                  }
                )
           , document.body
           ))
last2Notes.subscribe(([last, _]) => lastNote = last)
notes.subscribe(_ => otherNotes = without(Staff.notes, notes.value))

notes.onNext(sample(Staff.notes))
